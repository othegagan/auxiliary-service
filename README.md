# MyBundee Auxiliary APIs

This project contains auxiliary APIs for MyBundee, including chat functionality, Turo vehicle data integration, Firebase admin operations, and more.


-   Chat functionality
-   Turo vehicle data integration
-   Firebase admin operations
-   Booking management
-   Insurance-related operations
-   Time conversion utilities
-   Geolocation services

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```


## Dependencies

The project uses several key dependencies:

-   Express.js for the web server
-   Firebase Admin for Firebase operations
-   Twilio for chat functionality
-   Swagger for API documentation
-   Winston for logging
-   Zod for input validation
-   Axios for HTTP requests
-   Puppeteer for web scraping (Turo data)

For a full list of dependencies, refer to the `package.json` file.

## Building

To build the project, run:

```bash
npm run build
```

This command will:

1. Generate Swagger documentation
2. Remove the existing `dist` directory
3. Compile TypeScript files
4. Generate alias paths

## Serving

There are several ways to serve the application:

### Development

```bash
npm run serve-dev
```

### QA

```bash
npm run serve-qa
```

### Production

```bash
npm run serve-prod
```

These commands use environment-specific configurations and run the application using `tsx`.

## API Documentation

Swagger UI is available at the `/api-docs` endpoint when the server is running.

## Environment Variables

The application uses various environment variables for configuration. Ensure you have the following `.env` files set up:

-   `.env.development`
-   `.env.qa`
-   `.env.production`

Refer to the `env.ts` file for the required environment variables.

## Linting and Formatting

The project uses Biome for linting and formatting. To run the linter:

```bash
npm run lint
```

## Testing

Currently, there are no specific test scripts defined in the `package.json`. Consider adding test coverage in the future.

## Logging

The application uses Winston for logging, with daily log rotation. Logs are stored in the `logs` directory.


## License

ISC


