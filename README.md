# Manage Item

Brief description of your project.

## Prerequisites

Make sure you have the following installed on your machine:

-    Docker: [Install Docker](https://docs.docker.com/get-docker/)
-    Node.js: [Install Node.js](https://nodejs.org/)

## Getting Started

These instructions will help you set up and run the project.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Build and Run Docker Containers

```
bash
Copy code
docker-compose up --build
This command will build and start the Docker containers for the server, PostgreSQL database, and Redis.
```

### 3. Set Up the Server

```bash
Copy code
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Run Sequelize migrations and seed data
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Run the server
npm start
```

### 4. Set Up the Frontend

```Open a new terminal window/tab and run the following commands:

bash
Copy code
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the frontend
npm start
```

### 5. Access the Application

Once the containers are up and running, you can access the application at:

Server: http://localhost:3001
Frontend: http://localhost:3000
Server Configuration
Database
The server is configured with Sequelize and PostgreSQL for a many-to-one relationship. Migrations and seed data have been set up.

Authentication
Authentication is implemented using JSON Web Tokens (JWT). Make sure to include the token in the headers for authenticated requests.

Caching
Redis is used for caching to improve performance. The server is configured to cache certain data using Redis.

Testing
The server includes test cases using Jest. Run the tests with the following command:

```
    npm test
```
