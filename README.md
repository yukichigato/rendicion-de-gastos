# Expense report application

_"Application for emplyees of business X (not real) to submit and validate expense reports with accountants."_

The app uses a Python REST API to manage reports and employee data in a PostgreSQL, alongside a NextJS frontend for a
fast and smooth client experience in the reports' dashboard.

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

### 3. Build the project using Docker

Once Docker is running, use the following command to build the app images and to lift the containers:

```bash
docker-compose up --build
```

---

## API Usage

### Exposed endpoints:

#### Database API (Base URL: _http://localhost:8000_):

- **GET '/api/users'**: Get all users from the database.
- **POST '/api/users'**: Create a user in the database.

## Client Usage

To use the client, type the following commands in your terminal:

```bash
cd client
npm run dev
```

This will run the frontend locally.

> [!IMPORTANT]
> To handle image/file storage, we use Vercel BLOB. To fetch data from there, the domain _needs_ to be https.
> To achieve that use a gateway API like [ngrok](https://ngrok.com/) or else the application might break trying to fetch
> files and images.
