import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/Layout"
import AuthRegister from "./pages/auth/Register"
import AuthLogin from "./pages/auth/Login"
import AdminLayout from "./components/admin-view/Layout-Admin"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminOrders from "./components/admin-view/Orders"
import AdminFeatures from "./pages/admin/Features"
import AdminProducts from "./pages/admin/Products"
import ShoppingLayout from "./components/shopping-view/LayoutShopping"
import NotFound from "./pages/notFound"
import ShoppingHome from "./pages/shopping-view/Home"
import ShoppingAccount from "./pages/shopping-view/Account"
import ShoppingListing from "./pages/shopping-view/Listing"
import ShoppingCheckOut from "./pages/shopping-view/CheckOut"
import CheckAuth from "./components/common/CheckAuth.jsx"
import UnauthPage from "./pages/un-auth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"
import OrderReturnPage from "./pages/shopping-view/OrderRetrun"
import PaymentSuccessPage from "./pages/shopping-view/PaymentSuccess"
import SearchProducts from "./pages/shopping-view/Search"

function App() {
  const {user, isAuthenticated,isLoading}=useSelector(state=> state.auth)
  const dispatch= useDispatch()

  useEffect(()=>{
dispatch(checkAuth())
  },[dispatch])

  if(isLoading ) return <Skeleton className="h-[600px] w-[700px] rounded-full" />
  return (
    <div>
    
      <Routes>
        <Route path="/"  element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>    
         
          </CheckAuth>
        }  />
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>    
            <AuthLayout />
          </CheckAuth>
        } 
          
          >
          <Route path="login" element={<AuthLogin />} />      
          <Route path="register" element={<AuthRegister />} /> 
        </Route>
        <Route path="/admin" element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>    
          <AdminLayout/>
          </CheckAuth>
          } >
  
        <Route path="dashboard" element={<AdminDashboard />} />      
          <Route path="orders" element={<AdminOrders />} /> 
          <Route path="features" element={<AdminFeatures />} /> 
          <Route path="products" element={<AdminProducts />} /> 
        </Route>

        <Route path="/shop" element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>    
          <ShoppingLayout />
          </CheckAuth>
          }>
      <Route  path="home" element={<ShoppingHome/>}  />
      <Route  path="listing" element={<ShoppingListing />}  />
      <Route  path="checkout" element={<ShoppingCheckOut />}  />
      <Route  path="account" element={<ShoppingAccount />}  />
      <Route  path="strip-retrun" element={<OrderReturnPage />}  />
      <Route  path="payment-success" element={<PaymentSuccessPage />}  />
      <Route  path="search" element={<SearchProducts />}  />

        </Route>
          <Route  path="*"  element={<NotFound /> }/>
          <Route  path="unauth-page"  element={<UnauthPage /> }/>
      </Routes>
    </div>
  )
}

export default App
