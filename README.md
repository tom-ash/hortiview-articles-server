# HortiView News Server

## Git Commits Naming Convention
For Git commit naming use Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/).

## GraphQL
The project uses GraphQL data query and manipulation language for API.

Schema: `hortiview/hortiview-news-server/src/schema.qql`.

Playground: `http://localhost:3000/graphql`.

## Dev Setup
1. Setup databases (ensure that Docker is installed):
`docker compose up`

2. Setup dev database - run migrations:
`npm run migrations`

3. Propagate article data:
`npm run insert-articles`

The `insert-articles` script is idempotent (when provided the same set of data). It can be run multiple times and it won't add data that has already been added. At the same time it is possible to add new articles to `src/db/fixtures/articles.json` and re-run the script which will result in only new articles being added.

4. Start server:
`npm run start:dev`

## Spec Setup
1. Setup databases (ensure that Docker is installed; skip if already effected for the Dev Setup):
`docker compose up`

2. Run tests:
`npm run test`
