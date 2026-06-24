# Vortex Backend

Backend API for **Vortex**, powering authentication, database operations, and server-side functionality.

## 🚀 Tech Stack

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- Axios
- dotenv

---

## 📂 Project Structure

```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
├── app.js
├── package.json
└── .env
```

---

## ⚙️ Prerequisites

- Node.js (v18 or later)
- npm
- MySQL Server

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/vortex-backend.git
cd vortex-backend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database

JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on:

```
http://localhost:5000
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts the production server |
| `npm run dev` | Starts the server with Nodemon |

---

## 📦 Dependencies

- Express
- MySQL2
- JWT
- bcrypt
- dotenv
- cors
- axios

---

## 🔒 Security

Never commit:

- `.env`
- `node_modules`

Your `.gitignore` should contain:

```gitignore
node_modules/
.env
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Rahul Rimal**
