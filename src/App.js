// import Container from "./Components/Homepage/Container";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from "react-router";
// import ProductContaine from "./Components/Product/ProductContaine";
// import ProductSub from "./Components/ProductSub/ProductSub";
// import SubTwo from "./Components/SubTwoProducts.jsx/SubTwo";
// import Detail from "./Components/Details/Detail";
// import List from "./Components/Details/List";
// import Navbar from "./Components/Homepage/Navbar";
// import Categories from "./Components/Homepage/Categories";
// import Footer from "./Components/Homepage/Footer";
// import Register from "./Components/Authentivation/Register";
// import Login from "./Components/Authentivation/Login";
// import Checkout from "./Components/CheckOut/Checkout";
// import CheckoutSum from "./Components/CheckoutSum/CheckoutSum";
// import Success from "./Components/CheckoutSum/Success";
// import UserDashboard from "./Components/UserDashboard/UserDashboard";
// import Orderlist from "./Components/UserDashboard/Orderlist";
// import Wrapper from "./Components/UserDashboard/Wrapper";
// import Details from "./Components/UserDashboard/Details";
// import Profile from "./Components/UserDashboard/Profile";
// import Password from "./Components/UserDashboard/Password";
// import Home from "./Components/Homepage/Home";
import React, { Suspense } from "react";
import ErrorBoundary from "./Components/UI/Errorboundry.jsx";
import NotFoundPage from "./Components/UI/NotFoundPage .jsx";
import UserRoutes from "./Components/Homepage/UserRoutes.jsx";
import AdminLogin from "./AdminComponents/Login.jsx";
import Auth from "./AdminComponents/Auth.jsx";
import Forget from "./AdminComponents/Forget.jsx";
import Containers from './AdminComponents/Container/Containers.jsx';
import AddProduct from './Components/AddProduct.jsx';
import ImageUpload from './Components/BannerImage.jsx';
import AddCategory from './Components/AddCategory.jsx';
import Add from './Components/Add.jsx';
import ManageCategory from './AdminComponents/Container/ManageCategory.jsx';
import SubCategory from './AdminComponents/Container/SubCategory.jsx';
import SubCategoryTwo from './AdminComponents/Container/SubCategoryTwo.jsx';
import Attribute from './AdminComponents/Container/Attribute.jsx';
import AddBrands from './Components/AddBrand.jsx';
const Home = React.lazy(()=>import('./Components/Homepage/Home'))
const Container = React.lazy(() => import('./Components/Homepage/Container'));
const ProductContaine = React.lazy(() => import("./Components/Product/ProductContaine"));
const ProductSub = React.lazy(() => import("./Components/ProductSub/ProductSub"));
const SubTwo = React.lazy(() => import("./Components/SubTwoProducts.jsx/SubTwo"));
const Detail = React.lazy(() => import("./Components/Details/Detail"));
const List = React.lazy(() => import("./Components/Details/List"));
const Navbar = React.lazy(() => import("./Components/Homepage/Navbar"));
const Categories = React.lazy(() => import("./Components/Homepage/Categories"));
const Footer = React.lazy(() => import("./Components/Homepage/Footer"));
const Register = React.lazy(() => import("./Components/Authentivation/Register"));
const Login = React.lazy(() => import("./Components/Authentivation/Login"));
const Checkout = React.lazy(() => import("./Components/CheckOut/Checkout"));
const CheckoutSum = React.lazy(() => import("./Components/CheckoutSum/CheckoutSum"));
const Success = React.lazy(() => import("./Components/CheckoutSum/Success"));
const UserDashboard = React.lazy(() => import("./Components/UserDashboard/UserDashboard"));
const Orderlist = React.lazy(() => import("./Components/UserDashboard/Orderlist"));
const Wrapper = React.lazy(() => import("./Components/UserDashboard/Wrapper"));
const Details = React.lazy(() => import("./Components/UserDashboard/Details"));
const Profile = React.lazy(() => import("./Components/UserDashboard/Profile"));
const Password = React.lazy(() => import("./Components/UserDashboard/Password"));
function App() {
  const apiUrl = process.env.REACT_APP_VARIABLE_NAME;
  // console.log(process.env)
console.log(apiUrl)
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong...</div>}>
      <Suspense fallback={<div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <img src={require('./images/logo.png')} className="w-[10rem]" alt="Baseo" />
        </div>}>
    
        <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<UserRoutes/>}>
          <Route path="/" element={<Container />} />
          <Route path="/product/:id/:name" element={<ProductContaine />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id/:name/:subid/:subname"  element={<ProductSub />}/>
          <Route path="/product/:id/:name/:subid/:subname/:two/:twoname" element={<SubTwo />}/>
          <Route path="/products/details/:id/:name/:aid" element={<Detail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-summary" element={<CheckoutSum />} />
          <Route path={`/order-success/:id`} element={<Success />} />
          <Route path={`/dashboard`} element={<UserDashboard />} />
          <Route path="user" element={<Wrapper />}>
            <Route path="list" element={<Orderlist />} />
            <Route path="details/:id" element={<Details />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="change-password" element={<Password />} />

          </Route>
          </Route>
          <Route path="/admin" element={<Auth  isAdmin={true}/>}>
          <Route index element={<AdminLogin />} />
          <Route path="forget-password" element={<Forget />} />
          <Route path='dashboard' element={<Containers/>}>
          <Route path='products' element={<AddProduct/>}/>
          <Route path='banner' element={<ImageUpload/>}/>
          <Route path="category" element={<ManageCategory/>}/>
          <Route path="sub-category" element={<SubCategory/>}/>
          <Route path="sub-category-two" element={<SubCategoryTwo/>}/>
          <Route path="attribute" element={<Attribute/>}/>
          <Route path="brands" element={<AddBrands/>}/>

          </Route>
          
          </Route>
        </Routes>
   
        </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
