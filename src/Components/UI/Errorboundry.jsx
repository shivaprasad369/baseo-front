import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children, fallback }) {
  const [hasError, setHasError] = useState(false);

  // Fallback UI is shown when an error occurs
  const handleError = (error, info) => {
    console.error('Error caught by Error Boundary:', error, info);
    setHasError(true);
  };

  useEffect(() => {
    const onError = (event) => {
      handleError(event.error, { componentStack: event.message });
      return true; // Prevent default error handling
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onError);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onError);
    };
  }, []);

  if (hasError) {
    return fallback || <div>Something went wrong!</div>;
  }

  return children;
}

export default ErrorBoundary;
