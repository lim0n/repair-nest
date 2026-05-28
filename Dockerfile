# Stage 1: Build the application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Generate the production build (creates /dist folder)
RUN npm run build

# Stage 2: Create the runtime image
FROM node:22-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy only production dependencies and the compiled build from the builder stage
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# Expose the application port (default NestJS port is 3000)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]