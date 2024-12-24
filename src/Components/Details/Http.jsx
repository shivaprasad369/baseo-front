import { useQuery } from 'react-query';
import Cookies from "js-cookie";
import axios from "axios";
import useTokenVerification from "../hooks/useTokenVerification";

export default function Http() {
  const cartNumber = Cookies.get("userId");
  const { isVerified, isLoading: isTokenLoading, user } = useTokenVerification();

  const { isLoading, error, data } = useQuery({
    queryKey: ["cart-details", cartNumber, isVerified && user?.userId],
    queryFn: async () => {
      if (!cartNumber) {
        return []; 
      }
      try {
        const response = await axios.get(
          `https://baseo.onrender.com/get-cart-by-number`,
          {
            params: user?.userId && isVerified
              ? { cartNumber, user: user.userId }
              : { cartNumber },
          } 
        );
        return response.data.data || [];
      } catch (err) {
        // console.error("Error fetching cart details:");
        // throw err;
      }
    },
    enabled: !!cartNumber && (isVerified ? !!user?.userId : true), 
    refetchOnWindowFocus: true, 
  });

  if (isTokenLoading) {
    return { data: [], loading: true, error: null };
  }

  return { data: data || [], loading: isLoading, error };
}
