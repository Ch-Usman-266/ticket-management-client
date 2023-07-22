## Ticket Management System - Client

### Overview

This is the front-end client application for the Ticket Management System. It provides a user interface to interact with the ticket management functionalities.

### Prerequisites

- Node.js version 16.0.0 or higher is required.
- npm package manager is recommended for installation.

## Enviroment Variables

The `.env` file for the client application contains environment variables used during the development and build processes. Below are the details of the variables:

```
PORT=<your_desired_port>
REACT_APP_API_BASE_URL=<your_api_base_url>
```

Explanation of each environment variable:

- `PORT`: The port number on which the client application will run in development mode. It is set to `8000`, so when you start the development server, the client application will be accessible at [http://localhost:8000](http://localhost:8000).

- `REACT_APP_API_BASE_URL`: The base URL for the API endpoints of the Ticket Management System. It is set to `http://localhost:4000/api/v1`. This means that the client application will make API requests to this URL to interact with the server-side API for ticket management.

The `REACT_APP_` prefix is used for environment variables in Create React App to distinguish them from regular environment variables. This prefix ensures that the variables will be embedded in the client-side JavaScript bundle.

Ensure that the API server is running on `http://localhost:4000` (as specified in the `REACT_APP_API_BASE_URL`) to make successful API requests from the client application.

Remember to keep this `.env` file secure and do not share sensitive information like secret keys or passwords publicly. Also, make sure to update these values accordingly based on your specific setup and configuration.
### Installation

1. Clone the repository:

   ```
   git clone https://github.com/example/ticket-management-client.git
   ```

2. Change into the client directory:

   ```
   cd client
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Available Scripts

In the project directory, you can run the following scripts:

- `start`: Starts the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application in development mode.

- `build`: Builds the application for production to the `build` folder.

- `test`: Runs the test suite using Jest.

- `eject`: Ejects the app from the Create React App setup. **Note: This is a one-way operation and cannot be undone.**

### Technologies Used

- React.js: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Axios: A promise-based HTTP client for making API requests.
- Formik: A library for building forms in React.
- Yup: A JavaScript schema validation library used with Formik for form validation.
- React Router: A routing library for managing navigation in a React application.
- Tailwind CSS: A utility-first CSS framework for styling the components.

### Folder Structure

The client application follows a standard React project structure:

```
client/
  |-- public/
  |-- src/
       |-- api/
       |-- components/
       |-- context/
       |-- pages/
       |-- routes/
       |-- sbg/
       |-- App.tsx
       |-- index.tsx
       |-- ...
  |-- package.json
  |-- tsconfig.json
  |-- ...
```
