# Makefile — manage the ABQueer WCS Eleventy dev container.
#
# The site runs inside Docker Compose (service: eleventy).
# The built output lands in docs/ and is served by GitHub Pages.
# A nightly GitHub Actions workflow rebuilds docs/ automatically.

COMPOSE  := docker compose
SERVICE  := eleventy
PORT     := 8091
URL      := http://localhost:$(PORT)

.PHONY: help build up down restart logs shell ps clean open build-site

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "  build        Build (or rebuild) the Docker image and start the dev server"
	@echo "  up           Start the dev server (no rebuild)"
	@echo "  down         Stop and remove the container"
	@echo "  restart      Restart the container"
	@echo "  logs         Tail container logs (Ctrl-C to exit)"
	@echo "  shell        Open a shell inside the running container"
	@echo "  ps           Show container status"
	@echo "  clean        Stop container and remove the node_modules volume"
	@echo "  open         Open the dev site in the default browser"
	@echo "  build-site   Run a one-shot production build inside a temporary container"
	@echo ""
	@echo "Dev server: $(URL)"

build:
	$(COMPOSE) up --build -d
	@echo "→ Dev server starting at $(URL)"

up:
	$(COMPOSE) up -d
	@echo "→ Dev server starting at $(URL)"

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart
	@echo "→ Restarted"

logs:
	$(COMPOSE) logs -f

shell:
	$(COMPOSE) exec $(SERVICE) sh

ps:
	@$(COMPOSE) ps --format "{{.Name}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null | \
	awk -F'\t' '\
	    BEGIN { GREEN = "\033[0;32m"; RED = "\033[0;31m"; DIM = "\033[2m"; RESET = "\033[0m"; }\
	    {\
	        ok = ($$2 ~ /Up/ || $$2 ~ /running/);\
	        if (ok) {\
	            printf "  %s✓%s  %-30s %s%s%s  %s%s%s\n",\
	                GREEN, RESET, $$1, GREEN, $$2, RESET, DIM, $$3, RESET;\
	        } else {\
	            printf "  %s✗%s  %-30s %s%s%s  %s%s%s\n",\
	                RED, RESET, $$1, RED, $$2, RESET, DIM, $$3, RESET;\
	        }\
	    }' || $(COMPOSE) ps

clean:
	$(COMPOSE) down -v
	@echo "→ Container stopped and node_modules volume removed"

open:
	@echo "→ Opening $(URL)"
	@xdg-open $(URL) 2>/dev/null || open $(URL) 2>/dev/null || echo "Could not open browser — visit $(URL)"

build-site:
	@echo "→ Running production build..."
	$(COMPOSE) run --rm $(SERVICE) npm run build
	@echo "→ Built output is in docs/"
