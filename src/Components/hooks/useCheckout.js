import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
 const navigate= useNavigate()

  // The checkout function
  const checkout = async (orderData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Make the API request using axios
      const response = await axios.post('https://baseo.onrender.com/checkout', orderData);
      
      // Handle successful response
      setData(await response.data); // `response.data` contains the parsed JSON data from the server
      alert('Order submitted successfully');
      navigate('/checkout-summary')
    } catch (err) {
      // Handle errors
      alert(err.message || 'An unexpected error occurred');
    } finally {
      // Stop the loading indicator
      setLoading(false);
    }
  };

  return {
    checkout,  // Return the checkout function
    loading,
    setData,
    data,
    error,
    success,
  };
};

export default useCheckout;
