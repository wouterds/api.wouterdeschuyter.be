PWD = $(shell pwd)
VERSION = $(shell cat package.json | grep "\"version\"" | sed -e 's/^.*: "\(.*\)".*/\1/')
PROJECT = $(shell cat package.json | grep "\"name\"" | sed -e 's/^.*: "\(.*\)".*/\1/')

all: build

clean:
	-rm -rf node_modules
	-rm -rf dist

node_modules: package.json
	docker run --rm -v $(PWD):/code -w /code node:12-slim npm install

lint: node_modules
	docker run --rm -v $(PWD):/code -w /code node:12-slim npm run lint

.build-app: node_modules
	docker run --rm -v $(PWD):/code -w /code node:12-slim npm run build
	touch .build-app

build: .build-app
