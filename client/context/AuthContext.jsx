import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // ✅ Check authentication status
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user, data.token || token);
      }
    } catch (error) {
      toast.error(error.message || "Authentication check failed");
    }
  };

  // ✅ Login / Signup
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["token"] = data.token;

        toast.success(data.message);

        connectSocket(data.userData, data.token); // ✅ Pass token to socket

        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
      return false;
    }
  };

  // ✅ Logout
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    if (socket) socket.disconnect();
    setSocket(null);
    toast.success("Logged out successfully");
  };

  // ✅ Update profile
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error(error.message || "Profile update failed");
    }
  };

  // ✅ Connect socket with token auth
  const connectSocket = (userData, authToken) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      auth: {
        token: authToken,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("addUser", userData._id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    newSocket.on("disconnect", () => {
      setOnlineUsers([]); // Reset on disconnect
    });
  };

  // ✅ Initial effect to check auth if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
      checkAuth();
    }
  }, []);

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
