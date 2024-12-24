import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  toggle: true,
  count:0,
  total:0,
  shipping: JSON.parse(localStorage.getItem('shipping')) || [],
  billing: JSON.parse(localStorage.getItem('shipping')) || [],
  
  cart:[]

};
const cartSlice = createSlice({
  name: 'toogle',
  initialState,
  reducers: {
    handleShiping:(state,action)=>{
      state.shipping=action.payload;
    },
    handleBilling:(state,action)=>{
      state.billing=action.payload;
    },
    handleCart:(state,action)=>{
      state.cart=action.payload;
    },
    handleToggle: (state, action) => {
     state.toggle = !state.toggle;      
    },
    handleCount: (state, action) => {
      state.count = action.payload;
      // state.total += action.payload;
    },
    handleTotal: (state, action) => {
      // state.count += action.payload;
      state.total = action.payload;
    }
  },
});
export const { handleToggle,handleCount,handleTotal,handleBilling,handleShiping,handleCart } = cartSlice.actions;
export default cartSlice.reducer;
