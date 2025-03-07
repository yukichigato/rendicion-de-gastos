# Database API

Database API using Python FastAPI/Psycopg2.

## API Usage

### Exposed endpoints:

#### Database API (Base URL: _http://localhost:8000_):

---

### Get Many Users  

**Endpoint:**  

**GET** /api/users

**Description:**  
Retrieves an array of users.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email`  | `string` | No | Search for a user that matches this email string. |
| `limit`  | `int`  | No | Limits the number of users returned. |
| `offset` | `int`  | No | Specifies the offset for pagination. |

---

### Get One User

**Endpoint:**  

**GET** /api/users/{id}

**Description:**  
Retrieves a single user by their ID.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id`  | `string` | Yes | Search for a user that matches this id string. |

---

### Create A User

**Endpoint:**  

**POST** /api/users

**Description:**  
Creates a user

**Body:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name`  | `string` | Yes | Name of the user. |
| `rut`  | `string` | Yes | Chilean RUT of the user. |
| `password`  | `string` | Yes | User password. |
| `tel`  | `string` | No | Telephone number of the user. |
| `email`  | `string` | Yes | Email of the user. |
| `status`  | `string` | No | User workplace status. |
| `area`  | `string` | No | User workplace area. |

---

### Get Many Expense Reports 

**Endpoint:**  

**GET** /api/expense_report

**Description:**  
Retrieves an array of expense reports.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `author_id`  | `string` | No | Search for an expense report that matches this author id string. |
| `name`  | `string` | No | Search for an expense report that matches this author name string. |
| `type`  | `string` | No | Search for an expense report that matches this expense type string. |
| `minAmount`  | `int` | No | Search for an expense report with an amount of at least this value. |
| `maxAmount`  | `int` | No | Search for an expense report with an amount of at most this value. |
| `limit`  | `int`  | No | Limits the number of users returned. |
| `offset` | `int`  | No | Specifies the offset for pagination. |
| `order` | `string`  | No | Specifies the offset for pagination. |

---

### Get One Expense Report

**Endpoint:**  

**GET** /api/expense_report/{id}

**Description:**  
Retrieves a single expense report by their ID.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id`  | `string` | Yes | Search for an expense report that matches this id string. |

---

### Create An Expense Report

**Endpoint:**  

**POST** /api/expense_report

**Description:**  
Creates a user

**Body:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `author_id`  | `string` | Yes | Author id of the expense report. |
| `type`  | `string` | No | Expense type of the report. |
| `amount`  | `int` | Yes | Specified amount of the report. |
| `backup_url`  | `string` | Yes | Expense report backup download url. |
