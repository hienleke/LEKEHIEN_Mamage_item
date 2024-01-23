import axios from "axios";

const api = axios.create({
     baseURL: "http://localhost:3001/api", // Replace with your backend API URL
});

const fetchToken = async () => {
     try {
          const response = await api.post("/auth/login", {
               username: "hienle",
               password: "hienlefeedback",
          });

          const token = response.data.token;

          // Set the obtained token in the headers for subsequent requests
          setAuthToken(token);

          // Store the token in localStorage or any other state management solution if needed
          localStorage.setItem("token", token);

          return token;
     } catch (error) {
          console.error("Authentication failed:", error);
          throw error;
     }
};

// Function to set the token in the headers
const setAuthToken = async (token) => {
     api.defaults.headers.common["authorization"] = `${token}`;
};

export default api;

// Export the setAuthToken function for external use if needed
export { fetchToken };
