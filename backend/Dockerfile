# Sellect node image
FROM node:14-alpine
RUN npm install -g --unsafe-perm @prisma/cli@alpha

# Set app directory
WORKDIR /usr/src/app/backend

# ARGS
# ARG DB_NAME_SERVICE

# ENV
# ENV DB_DIALECT "$DB_NAME_SERVICE"
# ENV DB_PORT=5432
# ENV DB_HOST=localhost
# ENV DB_DATABASE=
# ENV DB_USERNAME=
# ENV DB_PASSWORD=
# ENV SECURITY_SECRET_KEY=

# const {
#   DB_DIALECT = '',
#   DB_PORT = '',
#   DB_HOST = '',
#   DB_DATABASE = '',
#   DB_USERNAME = '',
#   DB_PASSWORD = '',
#   SECURITY_SECRET_KEY = ''
# } = process.env

# const db: iDb = {
#   dialect: DB_DIALECT,
#   port: DB_PORT,
#   host: DB_HOST,
#   database: DB_DATABASE,
#   username: DB_USERNAME,
#   password: DB_PASSWORD
# }

# Installing dependencies
ADD package.json .
RUN npm install

# Copying source files
ADD . .

# Running app
CMD [ "npm", "run", "dev" ]
