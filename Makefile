.PHONY: audit build clean install reinstall lint outdated test upgrade

.DEFAULT_GOAL := build

audit:
	@yarn npm audit --all

build:
	@yarn run build

clean:
	@rm -f yarn.lock
	@rm -rf node_modules

install:
	@yarn install

reinstall: clean install

lint:
	@yarn run lint

outdated:
	@yarn outdated

test:
	@yarn run test

upgrade:
	@pre-commit autoupdate
	@yarn upgrade-interactive
