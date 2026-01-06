# backend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copy only package.json first
COPY package*.json ./

# Install deps as root (default)
RUN npm install --production

# Copy rest of the code
COPY . .

# Fix permissions AFTER all files are copied
RUN chown -R node:node /app

# Switch to non-root user
USER node

EXPOSE 40000


CMD ["node", "index.js"]