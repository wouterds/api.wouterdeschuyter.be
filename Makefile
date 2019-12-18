PWD = $(shell pwd)
VERSION = $(shell cat package.json | grep "\"version\"" | sed -e 's/^.*: "\(.*\)".*/\1/')

DOCKER_COMPOSE = ./.docker/docker-compose${ENV_SUFFIX}.yml
DOCKERFILE_NODE = ./.docker/node/Dockerfile

TAG_PREFIX = docker.wouterdeschuyter.be/api.wouterdeschuyter.be
TAG_NODE = ${TAG_PREFIX}/node

all: build

clean:
	-rm -rf node_modules
	-rm -rf dist
	-rm -rf .env
	-rm -rf .build-*
	-rm -rf qemu-arm-static

node_modules: yarn.lock
	docker run --rm -v ${PWD}:/code -w /code node:12-slim yarn

lint: node_modules
	docker run --rm -v ${PWD}:/code -w /code node:12-slim yarn lint

qemu-arm-static:
	docker run --rm --privileged multiarch/qemu-user-static:register --reset
	curl -OL https://github.com/multiarch/qemu-user-static/releases/download/v4.1.0-1/qemu-arm-static
	chmod +x qemu-arm-static

.build-app: node_modules
	docker run --rm -v $(PWD):/code -w /code -e ENV_SUFFIX -e DATABASE_HOST -e DATABASE_NAME -e DATABASE_USER -e DATABASE_PASS -e JWT_SECRET -e MAILJET_API_KEY -e MAILJET_API_SECRET -e SPOTIFY_ACCESS_TOKEN node:12-slim yarn build
	touch .build-app

.build-node: qemu-arm-static .build-app ${DOCKERFILE_NODE}
	docker build -f ${DOCKERFILE_NODE} -t ${TAG_NODE}:latest${ENV_SUFFIX} .
	touch .build-node

build: .build-node
	docker tag ${TAG_NODE}:latest${ENV_SUFFIX} ${TAG_NODE}:${VERSION}${ENV_SUFFIX}

docker-login:
	docker login docker.wouterdeschuyter.be -u ${DOCKER_REGISTRY_USER} -p ${DOCKER_REGISTRY_PASS}

push: build docker-login
	docker push ${TAG_NODE}:latest${ENV_SUFFIX}
	docker push ${TAG_NODE}:${VERSION}${ENV_SUFFIX}

deploy:
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "mkdir -p ${DEPLOY_PATH}${ENV_SUFFIX}"
	scp ${DOCKER_COMPOSE} ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}${ENV_SUFFIX}/docker-compose.yml
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH}${ENV_SUFFIX}; docker-compose pull"
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH}${ENV_SUFFIX}; docker-compose up -d"
