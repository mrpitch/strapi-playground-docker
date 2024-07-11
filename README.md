# 🚀 Strapi v5 Playground

This is a boilerplate for strapi v5 using docker and docker-compose configured with postgres and nginx (including ssl). It uses Amazon S3 as bucket for all assets and can be deployed to AWS EC2 using github actions.

* [Quickstart](#quickstart)
* [Deployment](#deployment)
* [Learn more](#learn-more)

## Quickstart

### .env-development vars

Add .env.development with following vars

```
#strapi app
NODE_ENV=development
HOST=0.0.0.0
PORT=1337
APP_KEYS=5N9rGNxrbw0I4ATXBA5qsQ==,ENUyEvmqLC14E6p2y2C0Ww==,nN/l7EE+oyJuCWPddACjbQ==,XMy2K9Jb7nw/4wBOVObHKA==
API_TOKEN_SALT=pgZYXSTiPOmQMpZOfC4oEQ==
ADMIN_JWT_SECRET=M8w4QJMbVqzMsv3g+8bMJQ==
JWT_SECRET=ZFDhVVsnoXjkgN7LVfUoXg==

#postgres
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=strapi_db_user
DATABASE_PASSWORD=strapi_db_pw
DATABASE_NAME=db_strapi_dev
DATABASE_SCHEMA=public
DATABASE_SSL=false
```

### `dev:docker`

Start postgress docker fo local development

```
yarn dev:docker
```

### `start:dev`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
yarn start:dev
```

### `nuke`

Remove node_modules and yarn.lock

```
yarn nuke
```

## ⚙️ Deployment

* [Configure S3](docs/s3.md)
* [Setup EC2](docs/ec2.md)
* [Configure nginx](docs/nginx.md)
* [Setup Ci/CD](docs/github-actions.md)

## 📚 Learn more

* [Resource center](https://strapi.io/resource-center) - Strapi resource center.
* [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
* [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
* [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
* [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.
