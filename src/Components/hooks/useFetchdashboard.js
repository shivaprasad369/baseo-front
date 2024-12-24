import { useQuery } from 'react-query';

const useFetchData = (params) => {
  return useQuery(
    {
      queryKey: ['datas', params],  // Unique query key
      queryFn: async () => {
        const response = await fetch(`https://baseo.onrender.com/dashboard?user=${params}`, {
          method: 'GET',  // Using GET method instead of POST for query parameters
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        return data;
      },
      retry: 3,  // Retry logic on failure
      refetchOnWindowFocus: false,  // Disable refetching on window focus
    }
  );
};

export default useFetchData;
