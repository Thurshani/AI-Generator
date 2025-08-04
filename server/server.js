import exprsess from 'express';
import"dotenv/config.js";
import cors from 'cors';
import http from 'http';
import {connectDB} from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {Server} from "socket.io";

//create express and & http server
const app = exprsess();
const server = http.createServer(app);

//Initialze socket.io server
export const io=new Server(server,{
   cors:{origin:"*"} 
})

//store online users
export const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  // Listen for the user's ID when they connect
  socket.on("addUser", (userId) => {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; // store user ID in the socket object
    console.log("User Registered:", userId);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // When disconnected
  socket.on("disconnect", () => {
    const userId = socket.userId;
    console.log("User Disconnected", userId);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

//Middleware Setup
app.use(exprsess.json({limit:"4mb"}));
app.use(cors());

//routes setup
app.use("/api/status", (req, res) => res.send("Server is running"));
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)

//Connect to MongoDB
await connectDB()


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));