FROM node:20-alpine

WORKDIR /app

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3050

CMD ["npm", "run", "dev:vite-csr"]
