# Build the React application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source code and build the project
COPY . .
RUN npm run build

# Stage 2: Serve with lightweight Nginx web server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]