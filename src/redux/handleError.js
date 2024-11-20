// handleError.js
export const handleError = (error) => {
    console.error("An error occurred:", error.message || error);
    alert("Something went wrong. Please try again later.");
  };
  