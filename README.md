## Weather App

## Functionality

This app displays the weather of random points using Mapbox.  It will load the complete map after making requests to the backend api.

###To run
1. Setup the backend server and start it.  See the documentation for the backend-weather-api repository for how to do that.
2. Open package.json.  Edit REACT_APP_WEATHER_BACKEND_URL='http://localhost:8080/' to ensure that it is pointing to your backend server.
3. Run 'yarn start'.  You can access the frontend by going to http://localhost:3000/.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



### Sources
bootstrapped from https://github.com/facebook/create-react-app
https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a
Secret react keys uses backend:
https://www.rockyourcode.com/secret-keys-in-react
