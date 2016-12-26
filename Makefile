git-pull:
	@git pull
	@git submodule init
	@git submodule update
	@git pull --recurse-submodules
	@git submodule update --remote --merge
	@git submodule foreach "git checkout master"
	@git submodule foreach "git pull"

install:
	@docker-compose down && docker-compose up -d --build

install-dump:
	@docker-compose down && docker-compose up --build

install-dump-no-cache:
	@docker-compose down && docker-compose build --no-cache && docker-compose up

test:
	@docker exec -it eloytinfra_api_1 npm test

image-cleanup:
	@if [[ $$(docker images -f "dangling=true" -q) ]]; then @docker rmi $$(docker images -f "dangling=true" -q) 1>/dev/null; fi
