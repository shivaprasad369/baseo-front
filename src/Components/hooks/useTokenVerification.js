import { useState, useEffect } from 'react';

const useTokenVerification = () => {
  const [isVerified, setIsVerified] = useState(null); // State to store verification status
  const [isLoading1, setIsLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State for error handling
const [user,setUser]=useState([])
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        
      setIsVerified(false);
      setIsLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("https://baseo.onrender.com/users/verify-token", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setIsVerified(true); 
          setIsLoading(true);
        setUser(result.user)
        } else {
          setIsVerified(false); // Token is invalid or expired
          localStorage.removeItem("token"); // Clear token from local storage
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsVerified(false); // Handle network errors or other issues
        localStorage.removeItem("token"); // Clear token on error
      } finally {
        setIsLoading(false); // Stop loading state after verification attempt
      }
    };

    verifyToken();
  }, []);

  return { isVerified, user,isLoading1, error,setUser,setIsVerified,setIsLoading };
};

export default useTokenVerification;
