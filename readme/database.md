# Database

## Reference

- Docs: <https://www.prisma.io/docs/>
- @prisma/client: <https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/>
- @prisma/cli: <https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/command-reference>

## Setup Local Postgres with Docker

Create a directory for postgres configuration

```sh
mkdir config/postgres
```

Create a `docker-compose.yaml` for a local development database

```yaml
# config/postgres/docker-compose.yaml

version: "3.1"

services:
  xxx-db: # TODO: Change this to the app with `-db` at end
    image: postgres
    restart: always
    ports:
      - "xxxx:5432" # TODO: Replace XXXX with the port you want to use
    environment:
      POSTGRES_PASSWORD: my-password
```

Add a startup script to `package.json`

```json
{
  "scripts": {
    "start:db": "cd config/postgres && docker-compose up"
  }
}
```

## Create a Datagrip Connection

Create a Datagrip connection to the database

## Add Libraries

```sh
yarn add pg
yarn add @prisma/client
yarn add @prisma/cli --dev
```

## Configure Prisma

<https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-sql-typescript-postgres>

- Copy the files under `readme/init/prisma` into `prisma` in the root directory.
- Update `.env` to point the `DATABASE_URL` to the correct port

If you have an existing database schema (e.g. you already executed the CREATE TABLE commands from `next-auth`) then run `npx prisma introspect` on the command line.
