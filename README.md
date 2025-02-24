# 📚 ALT-LIFE Library Management System

## 🚀 About the Project
ALT-LIFE is a **Library Management System** designed to simplify book lending, user management, and inventory tracking for libraries. Built with **Node.js**, **Express**, and **PostgreSQL**, this system provides a scalable backend API for handling library operations efficiently.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (hosted on AWS RDS)
- **ORM:** Sequelize
- **Hosting:** Vercel (API Deployment)
- **Authentication:** JWT (JSON Web Token)
- **Version Control:** Git & GitHub

---

## 📌 Features
- 📖 **Book Management**: Add, update, delete, and fetch book details.
- 🧑‍💼 **User Management**: Register, login, and manage users.
- 🔑 **Authentication & Authorization**: Secure access with JWT authentication.
- 📊 **Borrow & Return Books**: Track issued and returned books.
- 🛡️ **Role-Based Access Control (RBAC)**: Restrict admin and user actions.
- 🚀 **Cloud Deployment**: Hosted on Vercel with a PostgreSQL database on AWS RDS.

---

## 🎯 API Endpoints

### 🔹 Authentication
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| POST   | `/auth/register` | Register a new user         |
| POST   | `/auth/login`    | User login                  |

### 🔹 Books
| Method | Endpoint      | Description                   |
|--------|--------------|------------------------------|
| GET    | `/books`     | Get all books                 |
| POST   | `/books`     | Add a new book (Admin only)  |
| PUT    | `/books/:id` | Update a book (Admin only)   |
| DELETE | `/books/:id` | Delete a book (Admin only)   |

### 🔹 Borrowing
| Method | Endpoint             | Description                         |
|--------|----------------------|-------------------------------------|
| POST   | `/borrow`            | Borrow a book                      |
| POST   | `/return/:borrowId`  | Return a borrowed book             |

---

## 📌 Getting Started

### 🔹 Prerequisites
Make sure you have the following installed:
- **Node.js** (v16+)
- **PostgreSQL**
- **Vercel CLI** (for deployment)

### 🔹 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ALT-LIFE-library-management-app.git
   cd ALT-LIFE-library-management-app/server
