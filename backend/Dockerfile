FROM node:20-alpine AS build
RUN apk add --no-cache build-base python3 vips-dev

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile || npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS production
RUN apk add --no-cache vips
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./
COPY --from=build /app/config ./config
COPY --from=build /app/database ./database
COPY --from=build /app/src ./src

ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start"]
