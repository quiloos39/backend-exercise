## Requirements

- A running Postgres database
- Node.js runtime environment

## Getting Started ?

### Using Docker Compose

1. Copy `.env.example` to `.env` and modify `DATABASE_URL` and Postgres settings accordingly.
2. Inside project directory run `docker compose up --abort-on-container-exit` (depending on docker version it might be `docker-compose`).

You can access documentation from here [http://localhost/api/documentation](http://localhost/api/documentation)

### Manually

1. Inside project directory run `yarn install`.
2. Modify `.env` file according to your settings.
3. To apply database migrations `yarn prisma migrate deploy`
4. Run backend by running `yarn start`

You can access documentation from here [http://localhost:3000/documentation](http://localhost:3000/documentation)

## Technology Stack used

| Technology | Usage                             |
| ---------- | --------------------------------- |
| Node       | JavaScript runtime                |
| TypeScript | Type safety                       |
| Express    | Minimalist web framework          |
| Jest       | Testing framework                 |
| Prisma     | Next generation ORM               |
| Swagger    | Visualize and interact with API's |
| Postgres   | Database                          |

## Notes

- I wasn't able to mock prisma client so tests are meant to fail.
- Extending API, takes too much human labor. There should be probably way to generalize pagination, filtering.
