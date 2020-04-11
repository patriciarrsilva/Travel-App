# Travel App

A travel application that includes a form where the user can enter the location he is traveling to and the date he is leaving.

Then, the page will show an image and the weather of the location entered.

- If the entered location brings up no image results, it will show an image for the country.
- If the day of the trip is the same as today, the page shows the current weather.
- If the trip is within 2 weeks, the page will show the predicted forecast for the day of the trip.
- If the trip is after 2 weeks, the page will show the predicted forecast for the last available day on the prediction.

# Web APIs

- [GeoNames](http://www.geonames.org): in this project, this API was used to return coordinates from the destination city name.

- [Weatherbit](https://www.weatherbit.io): given the coordinates previously retrieved from GeoNames, this API was used to return weather forecasts.

- [Pixabay](https://pixabay.com): returns images of the location entered.

# Dependencies

- [Express](https://expressjs.com/)
- [Webpack](https://webpack.js.org/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)

## Webpack Loaders

- [Babel](https://github.com/babel/babel-loader)
- [CSS](https://webpack.js.org/loaders/css-loader/)
- [SASS](https://github.com/webpack-contrib/sass-loader)
- [Style](https://github.com/webpack-contrib/style-loader)

## Webpack Plugins

- [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin)
- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
- [OptimizeCSSAssetsPlugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
- [TerserPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/)
- [WorkboxPlugin](https://github.com/GoogleChrome/workbox): this plugin was used to add a service worker to the app.

## Quickstart

To see it:

- download the zip or clone the directory to your computer and, from inside the directory, install the dependencies with `npm i`, build the project with `npm run build-prod`, start the server with `npm start` and open the page on a web browser on `http://localhost:8081/`.

> #**MadeWithUdacity**
