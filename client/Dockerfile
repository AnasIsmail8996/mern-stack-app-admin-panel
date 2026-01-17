# Use Node.js 24 image
FROM node:24

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the frontend
RUN npm run build

# Set environment variables (example)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL


EXPOSE 5173


CMD ["npm", "run", "preview"]
