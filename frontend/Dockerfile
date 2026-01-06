####################### BUILD STAGE ########################
FROM node:20-alpine AS build

WORKDIR /app

# Copy only package.json first
COPY package*.json ./

# Install deps as root (default)
RUN npm install

# Copy rest of the code
COPY . .


# "I need a variable called VITE_API_URL during build"
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Vite reads VITE_API_URL here and bakes it in here 
RUN npm run build 



################### PRODUCTION STAGE ###################
FROM nginx:alpine

# copy the built artifact from the above stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Port
EXPOSE 80
