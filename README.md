# Inventory Management System

A reusable full-stack starter template built with **React**, **Vite**, **Django REST Framework**, and **JWT Authentication**.

This project is designed to be used as a foundation for future web applications by providing reusable CRUD components, hooks, layouts, services, and authentication.

---

# Features

## Authentication

- JWT Authentication
- Login
- Logout
- Token Refresh
- Protected Routes
- Axios Interceptors

## CRUD

- Create
- Read
- Update
- Delete

## Reusable Hooks

- useCrud
- useFetch
- useForm
- useDebounce
- useToast

## Reusable Components

- CrudPage
- CrudToolbar
- CrudTable
- ConfirmDeleteModal
- SearchInput
- Select
- Pagination
- Loader
- Alert
- Button
- Card
- FormActions
- ActionButtons

## Included Modules

- Students
- Teachers

---

# Tech Stack

## Frontend

- React
- Vite
- Axios
- React Router

## Backend

- Django
- Django REST Framework
- Simple JWT

---

# Project Structure

```
src
│
├── axios/
├── components/
│   ├── students/
│   ├── teachers/
│   └── ui/
│
├── constants/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/react-django-starter.git
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file inside the frontend directory.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

# Authentication Flow

1. User logs in.
2. Backend returns Access Token and Refresh Token.
3. Tokens are stored on the client.
4. Axios automatically attaches the Access Token.
5. When the Access Token expires, Axios requests a new one using the Refresh Token.
6. If refresh fails, the user is redirected to the login page.

---

# Creating a New CRUD Module

1. Create a new service.

Example:

```
productService.js
```

2. Create a form.

```
ProductForm.jsx
```

3. Create a page.

```
Products.jsx
```

4. Reuse:

- CrudPage
- CrudToolbar
- CrudTable
- useCrud
- useFetch
- useForm

No additional CRUD infrastructure is required.

---

# Current Version

## v1.0.0

Includes:

- JWT Authentication
- CRUD Architecture
- Reusable Components
- Reusable Hooks
- Students Module
- Teachers Module
- Pagination
- Sorting
- Search
- Filtering

---

# Planned Features (v1.1)

- User Registration
- Forgot Password
- Reset Password
- Change Password
- User Profile

---

# License

This project is provided for learning and future project development.

Feel free to modify and extend it for personal or commercial projects.

---
# Author

Muhammad Saqib

GitHub: https://github.com/muhammadsaqib99

BS Computer Science

React • Django • REST API • Full Stack Development
