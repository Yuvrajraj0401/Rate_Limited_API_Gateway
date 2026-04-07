# 🚀 API Gateway with Authentication & Rate Limiting

A backend system built using Node.js and Express that demonstrates API key authentication and Redis-based rate limiting to control request traffic per user.

---

## 📌 Overview

This project implements a middleware-based API gateway that:

* Authenticates users using API keys
* Applies per-user rate limiting using Redis
* Differentiates users based on subscription plans
* Protects APIs from excessive requests

---

## ⚙️ Features

### 🔐 API Key Authentication

* Validates incoming requests using `x-api-key` header
* Rejects invalid or missing API keys

---

### ⚡ Rate Limiting (Redis-based)

* Uses Redis to track request counts
* Implements fixed window rate limiting
* Limits requests per user based on plan:

| Plan    | Limit                 |
| ------- | --------------------- |
| Free    | 5 requests / 120 sec  |
| Premium | 20 requests / 120 sec |

---

### 👤 User Plan Handling

* Users are mapped to plans (free/premium)
* Rate limits dynamically applied based on plan

---

### 📊 Response Headers

* `X-RateLimit-Limit`
* `X-RateLimit-Remaining`

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Redis
* JavaScript (ES6)

---

## 📁 Project Structure

```
api-gateway-project/
│
├── middleware/
│   ├── auth.js
│   ├── rateLimiter.js
│
├── config/
│   └── redis.js
│
├── app.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Start Redis

Using Docker:

```bash
docker run -d -p 6379:6379 redis
```

---

### 3️⃣ Run the Server

```bash
npm run dev
```

Server will run on:

```
http://localhost:4000
```

---

## 🧪 Testing the API

### 🔹 Endpoint

```
GET /api
```

---

### 🔹 Required Header

```
x-api-key: 123abc
```

---

### 🔹 Example (curl)

```bash
curl.exe -H "x-api-key: 123abc" http://localhost:4000/api
```

---

## 📊 Rate Limiting Behavior

* Requests are counted per API key
* After exceeding the limit, user receives:

```json
{
  "success": false,
  "message": "Rate limit exceeded"
}
```

---

## 🧠 Key Learnings

* Middleware chaining in Express
* Redis atomic operations (`INCR`, `EXPIRE`)
* Building per-user rate limiting
* Handling authentication in backend systems

---

## 🔥 Future Improvements

* Add API Gateway proxying to microservices
* Implement sliding window rate limiting
* Add JWT-based authentication
* Add request logging & analytics
* Dockerize the entire system

---

## 💼 Resume Highlight

> Built a Node.js backend system implementing API key authentication and Redis-based per-user rate limiting with plan-based quotas, demonstrating scalable middleware architecture.

---

## ⭐ License

This project is open-source and available under the MIT License.
