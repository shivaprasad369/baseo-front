import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";

// Custom hook for deleting a cart item
const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ productAttributeID, cartNumber }) => {
      const response = await axios.delete("https://baseo.onrender.com/delete-cart-item", {
        data: { productAttributeID, cartNumber },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate the cart data query to refetch updated data
        queryClient.invalidateQueries(["cart-details", productAttributeID]);
      },
      onError: (error) => {
        console.error("Error deleting the cart item:", error);
      },
    }
  );
};

export default useDeleteCartItem;
