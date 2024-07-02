# Simple Todo (Next.js)

A Todo app frontend built with Next.js and Material UI.

This application replicates the functionality of the [Remix-based frontend app](https://github.com/AntonCodesCom/simple-todo-remix).

**2024-07-02: The functionality of this app has been transitioned from the Remix-based one. This Next.js version of the Todo frontend may not be as clean as the Remix version, but it fully replicates the original functionality and the transition from Remix to Next.js took less than 1 day!**

## Getting Started

1.  Set up the [API backend](https://github.com/AntonCodesCom/simple-todo-nest).

1.  Clone this repository.

        git clone https://github.com/AntonCodesCom/simple-todo-nextjs
        cd simple-todo-nextjs

1.  Install dependencies:

        npm install

1.  Run the development server:

        npm run dev

The app will be opened on `localhost:3002`.

## End-to-end testing

Running Playwright end-to-end tests:

- launch the API backend in non-production mode on `localhost:3000` (see [here](https://github.com/AntonCodesCom/simple-todo-nest?tab=readme-ov-file#running-the-app));
- launch this app in development mode;

        npm run dev

- run the e2e tests:

        npm run test:e2e:dev
