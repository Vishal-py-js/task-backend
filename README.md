📌 Task Manager (MERN App)

A full-stack Task Manager Application built with:

Backend → Node.js, Express, MongoDB, JWT Authentication

Frontend → React.js (Vite), Material UI, Zod Validation, Axios

Users can Register, Login, Manage Tasks (CRUD), and all routes are JWT-protected.

⚡ Getting Started
1️⃣ Clone the Repository

➡️ Run:

git clone https://github.com/Vishal-py-js/task-backend.git
cd task-backend

2️⃣ Setup Backend (server)

➡️ Go to server folder:

cd server


➡️ Install dependencies:

npm install


➡️ Create .env file inside server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


➡️ Start the server:

npm start


⚡ Server runs at: http://localhost:3000

3️⃣ Setup Frontend (client)

➡️ Go to client folder:

cd client


➡️ Install dependencies:

npm install


➡️ Create .env file inside client/:

VITE_API_URL=http://localhost:3000/api/v1

➡️ Start the frontend:

npm run dev


⚡ Frontend runs at: http://localhost:5173

🔐 Authentication Flow

After login/register, backend returns a JWT token.

Token is stored in http-cookie.

Protected routes (Dashboard) check for valid JWT.
