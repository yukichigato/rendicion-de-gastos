# Expense report application

_"Application for emplyees of business X (not real) to submit and validate expense reports with accountants."_

The app uses a Python REST API to manage reports and employee data in a PostgreSQL, alongside a NextJS frontend for a
fast and smooth client experience in the reports' dashboard.

---

## Nombre y rol de los integrantes

202287004-4 Andres Araya

202373052-1 Bastian Jimenez

202373098-K Simón Sobenes

202173112-1 Baltazar Portilla

---

## Requirements

1. **Docker**: Make sure to have both Docker and Docker Compose installed locally. For a GUI experience, use [Docker Desktop](https://www.docker.com/products/docker-desktop).

---

## Installation steps

### 1. Clone the repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/Flauvourr/expense-report-app.git
cd expense-report-app
```

### 2. Docker initialization

Ensure to have docker installed. If you use Docker Desktop, open it before moving to the next step.

### 3. Build the Database API using Docker

Once Docker is running, use the following command to build the app images and to lift the containers:

```bash
docker-compose up --build
```

### 4. Build and run the Authentication API

Run these commands to start the Authentication API:

```bash
cd Auth\ API
npm run build
npm run dev
```

### 5. Set up Vercel enviroment variables

Since the app uses Vercel BLOB, ensure that you have set up the correct enviroment variables in a `.env.local` file inside the `client` folder.
For more information, please read the documentation on how to use the Vercel BLOB API [here](https://vercel.com/docs/vercel-blob/server-upload)

### 5.1 Run the client locally

To use the client, type the following commands in your terminal:

```bash
cd client
npm install
npm run dev
```

The client will run locally by default in *http://localhost:3000*.

> [!WARNING]
> We use Vercel BLOB for image/file storage, so it's not possible to fetch files from the client while hosting the app locally (localhost);
> you have to use a gateway API like [ngrok](https://ngrok.com/) or the client might possibly break trying to fetch
> files from Vercel.

---

## API Usage

### Exposed endpoints:

#### Database API (Base URL: _http://localhost:8000_):

- **GET** `/api/users`: Get all users from the database. Query parameters: email, offset, limit.
- **GET** `/api/users/:id`: Get a user from the database by their ID.
- **POST** `/api/users`: Create a user in the database.
- **GET** `/api/expense_report`: Get all expense reports from the database.
- **GET** `/api/expense_report/:id`: Get an expense report from the database by its ID.
- **POST** `/api/expense_report/`: Create a user in the database.

#### Authentication API (Base URL: _http://localhost:8001_):

- **POST** `/api/login`: If the credentials are valid, generated a cookie containing a jsonwebtoken that can get validated later.
- **POST** `/api/authentication`: Authenticate a jsonwebtoken.

## Client Usage

Once the client and the other APIs are running, go to the correct URL to use it.

