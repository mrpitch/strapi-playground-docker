#FROM node:20-bullseye-slim AS base
FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .

# FROM base AS prod-deps
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# FROM base AS build
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
# RUN pnpm build:prod  
FROM base AS build
WORKDIR /app
COPY ./pnpm-lock.yaml .
RUN pnpm fetch --prod
RUN pnpm build:prod

 
# copy all stuff needed, install & build
FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist 

EXPOSE 1337
CMD [ "pnpm", "start:prod" ]
