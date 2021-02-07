# MERN template

A simple MERN app template that includes socket.io for real-time data

### Getting Started

To get started:

1. Clone from this repo and run 'npm i' from a terminal within the app's root directory
2. Configure your local development environment by creating a .env file referencing the .env-sample file included
3. The app can be launched locally for development using 'npm run dev-client' &'npm run dev-server'
4. To test the application run 'npm run test', this will trigger the Jest testing suites to execute
5. This application has a couple of hooks to enforce code quality using Husky, commits to Git will trigger a prettier run against the code, push's will run the test suite first and then run an Eslint. If any of these produce issues the process will fail.
6. To build the app for a production release run 'npm run build'

### Contact

Any questions contact chaycarnell@gmail.com
