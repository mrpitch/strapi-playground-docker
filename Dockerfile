# Use Node Alpine Linux as base image
FROM node:20-alpine AS base

# Set the working directory in the container
WORKDIR /usr/src/app

RUN apk update && apk upgrade && apk cache purge && apk cache clean && rm -rf /var/cache/apk

# Create a non-root user
RUN addgroup -S strapi && adduser -S strapi -G strapi

FROM base AS builder

# Copy package.json and package-lock.json
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --prod

# Copy the rest of the application code
COPY . .

# Expose port 1337 for the Strapi server
EXPOSE 1337

# Set environment variables
ENV NODE_ENV=production

# Run Strapi build command
RUN yarn build:prod

# Change ownership of the application directory to the non-root user
RUN chown -R strapi:strapi /usr/src/app

FROM base

RUN mkdir -p /usr/src/app && chown strapi:strapi /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app/

# Switch to the non-root user
USER strapi

# Start the Strapi server
CMD ["yarn", "start:prod"]