# Inventory Management System

A full-stack inventory management system built with **React**, **Vite**, **Django**, and **Django REST Framework**.

The application provides authentication, protected routes, product and supplier management, category management, and stock transaction tracking through a REST API.

## Features

### Authentication

- JWT authentication
- User registration
- Login and logout
- Access and refresh tokens
- Protected routes
- Automatic token refresh
- Staff-only inventory operations

### Inventory Management

- Product management
- Category management
- Supplier management
- Product stock tracking
- Stock-in transactions
- Stock-out transactions
- Transaction editing and deletion
- Automatic stock quantity updates
- Stock validation

### Transactions

- Record stock entering inventory
- Record stock leaving inventory
- Prevent stock-out transactions when available stock is insufficient
- Automatically reverse stock changes when transactions are edited or deleted
- Search transactions
- Paginated transaction history

### Frontend

- React
- Vite
- React Router
- Axios
- CSS Modules
- Reusable UI components
- Reusable hooks
- Protected and public routes
- Responsive layouts

### Backend

- Django
- Django REST Framework
- Simple JWT
- Django ORM
- RESTful API architecture
- Permission-based access control
- PostgreSQL-ready production configuration

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS Modules

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT

### Database

- SQLite for development
- PostgreSQL for production

## Project Structure

```text
inventory-management-system/
│
├── backend/
│   ├── accounts/
│   ├── products/
│   ├── suppliers/
│   ├── transactions/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── axios/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/muhammadsaqib99/inventory-management-system.git
cd inventory-management-system
```

## Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Create a superuser if required:

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will normally run at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the required environment file:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173/
```

## Authentication Flow

1. A user registers an account.
2. The user logs in with their username and password.
3. Django REST Framework returns an access token and refresh token.
4. The frontend stores the authentication state.
5. Axios attaches the access token to protected API requests.
6. When required, the refresh token is used to obtain a new access token.
7. Protected routes prevent unauthenticated users from accessing inventory pages.

## Inventory Flow

### Categories

Categories organize products into logical groups.

Users can:

- Create categories
- View categories
- Search categories
- Update categories
- Delete categories

### Products

Products contain inventory information such as:

- Product name
- Category
- Supplier
- Quantity
- Other product information

### Suppliers

Suppliers can be created, viewed, updated, and deleted.

### Transactions

Transactions control inventory quantities.

A **Stock In** transaction increases product quantity.

A **Stock Out** transaction decreases product quantity.

The backend validates stock availability before allowing a Stock Out transaction.

Updating or deleting a transaction also adjusts the product quantity accordingly.

## API

The backend provides REST API endpoints for:

```text
/api/token/
/api/token/refresh/
/api/register/

/api/categories/
/api/products/
/api/suppliers/
/api/transactions/
```

Protected endpoints require authentication.

## Production Build

To create a production build of the React frontend:

```bash
cd frontend
npm run build
```

The generated production files are placed in:

```text
frontend/dist/
```

## Current Status

The application is a completed portfolio project demonstrating a full-stack React and Django REST Framework workflow.

Implemented:

- JWT authentication
- User registration
- Protected routes
- Categories CRUD
- Products CRUD
- Suppliers CRUD
- Transactions CRUD
- Stock-in and stock-out logic
- Stock validation
- Transaction reversal logic
- Search
- Pagination
- Reusable React components
- Reusable services and hooks
- Production frontend build

# Author

Muhammad Saqib

GitHub: https://github.com/muhammadsaqib99

BS Computer Science

React • Django • REST API • Full Stack Development

## License

This project is intended for educational and portfolio purposes.
