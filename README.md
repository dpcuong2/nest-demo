# Welcome to my nestjs demo 

## Description

This is my demo about Nestjs and Graphql using code first approach and Prisma ORM

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

make sure nodejs version >= 16.0.0 and postgres db is installed in your computer

First step run to install dependencies

```bash
$ npm install
```

Second step
add postgres connection string to .env file

``DATABASE_URL="postgresql://<<user>>:<<password>>@<<host>>:<<port>>/<<databasename>>"``

Third run 

```bash
$ npx prisma migrate dev
```

then follow the cli guide to sync the schema with the db

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
