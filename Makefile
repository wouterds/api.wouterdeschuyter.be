PWD = $(shell pwd)
VERSION = $(shell cat package.json | grep "\"version\"" | sed -e 's/^.*: "\(.*\)".*/\1/')
PROJECT = $(shell cat package.json | grep "\"name\"" | sed -e 's/^.*: "\(.*\)".*/\1/')

DOCKER_COMPOSE = ./.docker/docker-compose${ENV_SUFFIX}.yml
DOCKERFILE_NODE = ./.docker/node/Dockerfile

TAG_NODE = $(DOCKER_REGISTRY_HOST)/$(PROJECT)${ENV_SUFFIX}-node

all: build

clean:
	-rm -rf node_modules
	-rm -rf dist

node_modules: package.json
	docker run --rm -v $(PWD):/code -w /code node:12-slim npm install --loglevel verbose

lint: node_modules
	docker run --rm -v $(PWD):/code -w /code node:12-slim npm run lint

.build-app: node_modules
	docker run --rm -v $(PWD):/code -w /code node:12-slim npm run build
	touch .build-app

.build-node: .build-app $(DOCKERFILE_NODE)
	docker build -f $(DOCKERFILE_NODE) -t $(TAG_NODE) .
	touch .build-node

build: .build-node
	docker tag $(TAG_NODE) $(TAG_NODE):$(VERSION)

push: build
	docker push $(TAG_NODE)
	docker push $(TAG_NODE):$(VERSION)

deploy:
	ssh ${DEPLOY_USER}@${DEPLOY_SERVER} "mkdir -p ${DEPLOY_LOCATION}${ENV_SUFFIX}"
	scp ${DOCKER_COMPOSE} ${DEPLOY_USER}@${DEPLOY_SERVER}:${DEPLOY_LOCATION}${ENV_SUFFIX}/docker-compose.yml
	ssh ${DEPLOY_USER}@${DEPLOY_SERVER} "cd ${DEPLOY_LOCATION}${ENV_SUFFIX}; docker-compose pull"
	ssh ${DEPLOY_USER}@${DEPLOY_SERVER} "cd ${DEPLOY_LOCATION}${ENV_SUFFIX}; docker-compose up -d"
