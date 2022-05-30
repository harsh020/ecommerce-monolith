import React from 'react';

import {Navigate, Routes, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NotFound from "./components/ui/NotFound";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";


function Router(props) {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/app'} replace />} />
            <Route path={'/app'} element={<HomeScreen />} />
            <Route path={'/app/login'} element={<LoginScreen />} />
            <Route path={'/app/register'} element={<RegisterScreen />} />
            <Route path={'/app/cart'} element={<CartScreen />} />
            <Route path={'/app/profile'} element={<ProfileScreen />} />
            <Route path={'/app/shipping'} element={<ShippingScreen />} />
            <Route path={'/app/payment'} element={<PaymentScreen />} />
            <Route path={'/app/place-order'} element={<PlaceOrderScreen />} />
            <Route path={'/app/order/:orderId'} element={<OrderScreen />} />
            <Route path={'/app/product/:productId'} element={<ProductScreen />} />

            <Route path={'/app/admin/users'} element={<UserListScreen />} />
            <Route path={'/app/admin/user/:userId/edit'} element={<UserEditScreen />} />

            <Route path={'/app/admin/products'} element={<ProductListScreen />} />
            <Route path={'/app/admin/product/:productId/edit'} element={<ProductEditScreen />} />

            <Route path={'/app/admin/orders'} element={<OrderListScreen />} />

            <Route path={'*'} element={<NotFound />} />
        </Routes>
    );
}

export default Router;