# Stage 1: build the React frontend
FROM node:26-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: install backend dependencies
FROM node:26-alpine AS backend-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production
COPY server/ ./

# Stage 3: final image with built client and backend
FROM node:26-alpine AS runtime
WORKDIR /app
COPY --from=client-build /app/client/build ./client/build
COPY --from=backend-build /app/server ./server

EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "server/server.js"]
