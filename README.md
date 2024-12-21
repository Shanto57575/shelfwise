# Bookshop E-commerce Application

This repository contains the source code for a e-commerce application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application is a bookshop that allows buyers, sellers, and admins to interact with the platform based on their respective roles.

---

## Features

### General Features

- User authentication via Firebase with password validation and Google social login.
- JWT-based authorization to secure API routes.
- Fully responsive design for both mobile and desktop devices.

### Pages

1. **Home Page:** Includes sections like hero, featured products, testimonials, categories, FAQs, and contact information.
2. **Products Page:**
   - Displays all products with filtering and sorting options.
   - Includes search functionality by product name.
   - Sorting by price (ascending and descending order).
   - Filtering by category and brand.
   - Product details page for each product.
3. **About Page:** Description of the bookshop.

### Buyer Features

- Add products to a wishlist.
- Add products to a shopping cart.
- Restricted access to seller and admin features.

### Seller Features

- **Dashboard:**
  - Add new products.
  - View, edit, and delete their own products.
- Protected API routes for seller-specific actions.

### Admin Features

- **Dashboard:**
  - View all registered users.
  - Change user roles (promote a buyer to a seller).
  - Delete any user.
- Admin accounts must be manually created in the database.

---

## Technology Stack

### Front-End

- **Framework:** React.js
- **Styling:** TailwindCSS
- **Authentication:** Firebase

### Back-End

- **Framework:** Node.js with Express.js
- **Database:** MongoDB
- **Authorization:** JWT

---

## Installation and Setup

### Prerequisites

- Node.js and npm installed.
- MongoDB set up locally or via a cloud provider.

### Steps to Run the Application Locally

1. Clone the repositories for both the frontend and backend.
   ```bash
   git clone <frontend-repo-url>
   git clone <backend-repo-url>
   ```
2. Navigate to each folder and install dependencies:

   ```bash
   cd frontend
   npm install

   cd backend
   npm install
   ```

3. Set up environment variables:
   - **Frontend:** Add Firebase configuration.
   - **Backend:** Add MongoDB URI and JWT secret.
4. Start the applications:
   - Frontend:
     ```bash
     npm run dev
     ```
   - Backend:
     ```bash
     npm run dev
     ```
5. Access the application at `http://localhost:5173`

---

## Deployment

The application is deployed and accessible at the following link:
[Live Application URL](#)

---

## Credentials

### Buyer Account

- **Email:** shanto1@gmail.com
- **Password:** SH@nto316

### Seller Account

- **Email:** shanto3@gmail.com
- **Password:** SH@nto316

### Admin Account

- **Email:** admin1@gmail.com
- **Password:** SH@nto316

---
