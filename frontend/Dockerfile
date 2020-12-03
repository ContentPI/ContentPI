# Sellect node image
FROM node:14-alpine

# Set app directory
WORKDIR /usr/src/app/frontend

# Installing dependencies
ADD package*.json ./
RUN npm install

# Copying source files
ADD . .

# Building app (This for production)
# RUN npm run build

EXPOSE 3000

# Running app
CMD [ "npm", "run", "dev" ]

# Running app (This for production)
# CMD [ "npm", "start" ]
