# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!

## Description
The **OlympicGamesStarter** application provides users with an interactive dashboard to visualize information from previous Olympic Games. Users can explore the results of the Olympics, including the number of medals won by different countries and specific details for each nation.

## Features
- **Home Page**: Presents a summary of the Olympic results with a chart illustrating the total number of medals by country, as well as an overview of the Olympic events. Clicking on a country redirects the user to the details of that country.
- **Detail Page**: Displays a chart representing the medals won by the country in each edition of the Games, along with an overview of the statistics for that country.
- **Error Page**: Users are redirected to this page if an error occurs during data retrieval or processing.
- **Not Found Page**: This page appears when the entered URL is incorrect, directing the user to useful information.