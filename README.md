### Prerequisites

- NodeJS v10+
- Yarn
- Docker

### Run the app

Install all packages used by the monorepo. You only have to run this once at the root
of the repo.

- `yarn install`

Make sure the following ports are available on your machine:

- 3309 - used by the `db` container (MySQL)
- 3003 - used by the `server` container (Express)
- 4200 - used by the `webclient` container (Angular)
- 8080 - used by the `adminer` container (MySQL Web Client)

Start up the docker containers.

- `docker-compose up -d`

On the initial run the `server` docker container will throw errors saying it cannot connect to the
DB. Wait until the `db` container starts accepting connections, and then the `server` container
should stop throwing errors, and manage to sync the models into the DB.

After all containers are up and running, fill in the DB with dummy data by running this
at the root of the repo. You can run it every time you want to reset your DB data.

- `yarn reseed`

The `webclient` server takes a bit longer to start up. When it's finished you should see this
message in it's logs:

    ** Angular Live Development Server is listening on 0.0.0.0:4200, open your browser on http://localhost:4200/ **
    : Compiled successfully.

After the `webclient` is up and running, you can launch the app at http://localhost:4200 and see
the challenge.

Make sure you keep an eye on the containers' logs while working on the challenge, as sometimes you
might have to restart some containers (looking at you Angular).
You can always stop the container and run the process locally if that's easier for you.

### Using Adminer

If you don't have a MySQL client installed, you can use Adminer which is started at http://localhost:8080.
Use the following data on form to login:

    System: MySQL
    Server: db
    Username: root
    Password: example
    Database: sldb

### Running tests

With the existing setup you can run tests for both the server and the webclient.
The integration tests on the backend use a separate db (`sldbtest`), but the data seed is the same
and gets run at the beginning of a test session. Check out the test commands from both packages.
