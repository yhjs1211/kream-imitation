FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY . ./

RUN npm ci --silent

RUN npx prisma generate

RUN npm run build && npm prune --production

FROM node:24-alpine AS dev

ENV NODE_ENV=development

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules