
# MERN Stack Chat App With Socket.io

Build a real-time full-stack chat application using the MERN stack (MongoDB, Express, React, Node.js) with **Socket.io** for real-time communication, styled using **Tailwind CSS**, and bundled with **Vite**.

---

## Features

* Real-time messaging with Socket.io
* User authentication with JWT
* MongoDB for data storage
* Responsive UI styled with Tailwind CSS
* Fast development with Vite
* Cloudinary integration for media upload
* Clean and modular backend & frontend code

---

## Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js, Socket.io
* **Database:** MongoDB (Atlas)
* **Authentication:** JWT
* **Media Storage:** Cloudinary
* **Real-time Communication:** Socket.io

---

## Project Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Backend Setup

Navigate to the backend folder (if your backend is in a separate folder, e.g. `/server`):

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend root directory with the following environment variables:

```env
MONGODB_URI="Your MongoDB_URI"
PORT=5000
JWT_SECRET="Your secret key"

CLOUDINARY_CLOUD_NAME='Your Keyname'
CLOUDINARY_API_KEY='Your API key'
CLOUDINARY_API_SECRET='YOUR API Secret'
```

Start the backend server:

```bash
npm run server
```

---

### 3. Frontend Setup

Navigate to the frontend folder (e.g., `/client`):

```bash
cd ../client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend root directory with the backend URL:

```env
VITE_BACKEND_URL='http://localhost:5000'
```

Start the frontend development server:

```bash
npm run dev
```

---

## Usage

* Open the frontend URL (usually `http://localhost:5173`) in your browser.
* Register or log in to the chat app.
* Start real-time chatting with other users.
* Upload images or media via Cloudinary.
* Enjoy responsive design with Tailwind CSS styling.

---

## Important Notes

* Make sure to replace your MongoDB URI, JWT secret, and Cloudinary credentials with your own secrets in `.env`.
* The frontend `VITE_BACKEND_URL` should point to your backend server address.
* For production deployment, configure environment variables accordingly and build the frontend (`npm run build`).

---


