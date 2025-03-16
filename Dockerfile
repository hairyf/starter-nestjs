# specify a base image
FROM node:latest AS base

# set path for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# use pnpm as package manager
RUN corepack enable

# copy from system to docker container
COPY . ./app

# set working directory
WORKDIR /app

# install dependencies for prod-deps container
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# build the app for build container
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build:prisma
RUN pnpm run build

FROM base
# copy from prod-deps container to final container
COPY --from=prod-deps /app/node_modules /app/node_modules
# copy from build container to final container
COPY --from=build /app/dist /app/dist

# expose a port
EXPOSE 3000
# run a shell command, this command will be executed when the container starts
CMD ["pnpm", "start"]

