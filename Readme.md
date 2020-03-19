# Blogr API

## Installation

To install, clone the repository to your preferred location on your machine:

`$ git clone https://github.com/Jolaolu/graphql-blog-api.git blogr-api`

Next, cd to the directory of the project.

`$ cd blogr-api`

Make a copy of the `.env.example` file and name it `.env`

`$ cp .env.example .env`


Add the following `.env`  keys in the `.env` file

```
DB_USERNAME = xxxx
DB_PASSWORD = xxxx
DB_NAME = xxxx
WT_SECRET = xxxx
```

Next, install the dependencies for the project using the following command:

`$ yarn install`

migrate the db collection

` yarn migrate`

Serve the project

`$ yarn start`

Then check it on http://localhost:4000

