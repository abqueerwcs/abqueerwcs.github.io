# ABQueerWCS

## Running with Docker

Requires [Docker](https://docs.docker.com/get-docker/) with the Compose plugin.

```bash
# First run — builds the image and installs dependencies
docker compose up --build

# Subsequent runs
docker compose up
```

The site will be available at `http://localhost:8080`. Eleventy watches `src/` and `assets/` for changes and reloads the browser automatically.

To stop the container, press `Ctrl+C` or run:

```bash
docker compose down
```

## Project structure

- `src/` — Nunjucks templates and data files (input)
- `assets/` — CSS, JS, and images (copied to output as-is)
- `docs/` — generated output, served by GitHub Pages
