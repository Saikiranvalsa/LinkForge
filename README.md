# 🔗 LinkForge — URL Shortener

LinkForge is a full-stack URL shortening application built using **Java Spring Boot, React.js, MySQL, Spring Security, and JWT**.

The application allows authenticated users to create and manage shortened URLs, while anyone with a generated short URL can use it to redirect to the original URL.

## 🚀 Features

* 🔗 Create shortened URLs
* ↪️ Redirect short URLs to original URLs
* 🔐 User registration and authentication
* 🛡️ JWT-based authentication and authorization
* 📊 Track URL click activity
* 📝 Manage created URLs
* 🗑️ Delete shortened URLs
* 📱 Responsive React dashboard
* 🗄️ MySQL database integration
* 🔒 Secured REST APIs using Spring Security

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* REST APIs
* Maven

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios

### Database

* MySQL

### Tools

* IntelliJ IDEA
* Visual Studio Code
* Postman
* Git
* GitHub

## 🏗️ Project Architecture

```text
                 ┌─────────────────────┐
                 │     React.js        │
                 │    Frontend         │
                 └──────────┬──────────┘
                            │
                         REST API
                            │
                            ▼
                 ┌─────────────────────┐
                 │    Spring Boot      │
                 │      Backend        │
                 ├─────────────────────┤
                 │ Spring Security     │
                 │ JWT Authentication  │
                 │ REST Controllers    │
                 │ Service Layer       │
                 │ JPA / Repositories  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │       MySQL         │
                 │      Database       │
                 └─────────────────────┘
```

## 🔐 Authentication Flow

LinkForge uses **JWT-based authentication**.

```text
User
 │
 ▼
Login
 │
 ▼
Spring Security
 │
 ▼
Authentication
 │
 ▼
JWT Token
 │
 ▼
React Frontend
 │
 ▼
Authenticated API Requests
```

The JWT token is sent with protected API requests to verify the authenticated user.

## 🔄 URL Shortening Flow

```text
Original URL
     │
     ▼
React Frontend
     │
     ▼
Spring Boot REST API
     │
     ▼
Generate Short URL
     │
     ▼
Store in MySQL
     │
     ▼
Return Short URL
```

When someone opens the short URL:

```text
Short URL
    │
    ▼
Spring Boot
    │
    ▼
Find Original URL
    │
    ▼
Record Click
    │
    ▼
Redirect to Original URL
```

## 📊 Click Tracking

LinkForge records click activity for shortened URLs.

This allows users to monitor how their links are being used through the dashboard.

## 📁 Project Structure

### Backend

```text
LinkForge-Backend
├── configuration
├── controller
├── dto
├── model
├── repository
├── service
└── LinkForgeBackendApplication
```

### Frontend

```text
LinkForge-Frontend
├── src
│   ├── components
│   ├── pages
│   ├── context
│   ├── services
│   └── App.jsx
└── package.json
```

## ⚙️ Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/Saikiranvalsa/LinkForge.git
cd LinkForge
```

### 2. Configure MySQL

Create a MySQL database and configure the database credentials in your environment configuration.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/linkforge
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Configure environment variables

Create your `.env` / environment configuration with the required JWT and database values.

**Do not commit passwords, JWT secrets, or other sensitive credentials to GitHub.**

### 4. Run the backend

Using Maven:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend will start on the configured Spring Boot port.

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd LinkForge-Frontend
```

Install dependencies:

```bash
npm install
```

Configure the backend URL:

```env
VITE_BACKEND_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

## 🔑 API Overview

### Authentication

```text
POST /api/auth/public/login
```

Used to authenticate users and obtain a JWT token.

### URL Management

The application provides REST APIs for:

* Creating shortened URLs
* Retrieving URLs
* Updating/managing URLs
* Deleting URLs
* Tracking clicks

### URL Redirection

The generated short URL can be opened by anyone who has the link and redirects the user to the original URL.

## 🧪 Testing

API endpoints can be tested using **Postman**.

The frontend communicates with the Spring Boot backend through REST APIs.

## 🔒 Security

The project uses:

* Spring Security
* JWT authentication
* Password-based authentication
* Protected REST endpoints
* Environment variables for sensitive configuration

Sensitive configuration such as database passwords and JWT secrets should never be committed to GitHub.

## 🎯 Future Improvements

* QR code generation for shortened URLs
* Advanced analytics and charts
* Custom short URL aliases
* Link expiration
* Rate limiting
* Docker deployment
* Cloud deployment
* Email-based authentication

## 👨‍💻 Author

**Valsa Sai Kiran**

Java Full Stack Developer

* GitHub: [Add your GitHub profile]
* LinkedIn: https://www.linkedin.com/in/saikiran-valsa-2a891a288/
* LeetCode: https://leetcode.com/u/8gMm2PwVKZ

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
