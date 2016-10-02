update-git-submodules:
	git pull --recurse-submodules
	git submodule foreach git checkout master
	git submodule update --remote --merge

install:
	docker-compose down && docker-compose up -d --build

install-dump:
	docker-compose down && docker-compose up --build

symlinks:
	cd ../
	ln -s idea-studio-docker/docker/api/ idea-studio-api
	cd idea-studio-docker

image-cleanup:
	docker rm -f $$(docker ps -aq)
