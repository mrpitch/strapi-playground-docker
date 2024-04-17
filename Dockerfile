###
## for referece please see https://github.com/BretFisher/nodejs-rocks-in-docker/blob/main/dockerfiles/ubuntu-copy.Dockerfile
###
###
## ubuntu base with nodejs coppied in from official image, for a more secure base
###
#cache our node version for installing later
FROM node:20-bullseye-slim as node
FROM ubuntu:focal-20230126 as base

# new way to get node, let's copy in the specific version we want from a docker image
# this avoids depdency package installs (python3) that the deb package requires
COPY --from=node /usr/local/include/ /usr/local/include/
COPY --from=node /usr/local/lib/ /usr/local/lib/
COPY --from=node /usr/local/bin/ /usr/local/bin/
# ensures we fix symlinks for npx, yarn and PnPm
RUN corepack disable && corepack enable

# create node user and group, then create app dir
RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node \
    && mkdir /app \
    && chown -R node:node /app

# copy all stuff needed, install & build
FROM base as prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
EXPOSE 1337
WORKDIR /app
COPY . .
RUN pnpm install 
RUN pnpm build:prod

#run it
CMD ["pnpm", "start:prod"]
