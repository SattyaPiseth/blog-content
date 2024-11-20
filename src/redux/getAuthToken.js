export const getAuthToken = async () => {
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
  
      return token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };
  