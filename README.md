# 🚀 Getting started

Dockerized Playground for Strapi to test features, plugins etc.
You will find two versions. Both versions using postgres docker image in docker-compose.

Disclaimer: using pnpm as package manager although not officially supported by strapi. Please see `.npmrc` for config (shamefully-hoisting is enabled).

## development

Run docker compose to start (build) dev version run (see package.json)

```
pnpm docker:dev
```

Please find example .env.development in the repo (nothing to hide here). If using differnet db add env vars here.

## production

Run docker compose to start (build) prod version run (see package.json)

```
pnpm docker:prod
```

Please find example .env in the repo (nothing to hide here). If using differnet db add env vars here.
