# Stellar Cabs

Welcome to **Stellar Cabs**, an Uber-inspired taxi service app built using the **MERN** stack (MongoDB, Express.js, React, Node.js).

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Folder Structure](#folder-structure)
- [License](#license)

## Technologies

- **Frontend**: React, Tailwind CSS, React Router, Axios, Redux (optional)
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication, WebSockets
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth
- **Deployment**: Docker, AWS (if applicable)

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/stellar-cabs.git
```

Navigate into the project folder:

```bash
cd stellar-cabs
```

Frontend Setup

- Navigate to the frontend directory:

```bash
cd frontend
```

- Install dependencies:

```bash
npm install
```

- Run the frontend:

```bash
npm run dev
```

Backend Setup

- Navigate to the backend directory:

```bash
cd backend
```

- Install dependencies:

```bash
npm install
```

- Set up environment variables (refer to .env.example for the required variables).

- Run the backend server:

```bash
npm start
```

- *The API will be running on <http://localhost:3000>*

Folder Structure

```bash
stellar-cabs/
├── frontend/            # React frontend
│   ├── public/          # Public assets (images, index.html)
│   ├── src/             # React components, pages, and services
│   └── tailwind.config.js
├── backend/             # Express backend
│   ├── controllers/     # Route handlers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic and utilities
│   ├── middleware/      # Authentication, validation, etc.
│   └── server.js        # Express app entry point

```

Feel free to customize these according to your app's specific features and structure! Let m
