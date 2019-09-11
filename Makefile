PWD = $(shell pwd)
VERSION = $(shell cat package.json | grep "\"version\"" | sed -e 's/^.*: "\(.*\)".*/\1/')
PROJECT = $(shell cat package.json | grep "\"name\"" | sed -e 's/^.*: "\(.*\)".*/\1/')

DOCKERFILE_NODE = ./.docker/node/Dockerfile

TAG_NODE = $(DOCKER_REGISTRY)/$(PROJECT)${ENV_SUFFIX}-node

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
