.PHONY: build up down restart logs shell

build:
	docker compose up --build -d

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

shell:
	docker compose exec eleventy sh
