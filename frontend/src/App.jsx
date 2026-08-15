import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import Suppliers from "./pages/suppliers/Suppliers";
import Transactions from "./pages/transactions/Transactions";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import { ROUTES } from "./constants/routes";


function App() {

    return (

        <Routes>

            <Route element={<MainLayout />}>

           

                <Route
                    path={ROUTES.HOME}
                    element={<Home />}
                />


                

                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />


               

                <Route
                    path={ROUTES.REGISTER}
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />


               

                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path={ROUTES.CATEGORIES}
                    element={
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path={ROUTES.PRODUCTS}
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path={ROUTES.SUPPLIERS}
                    element={
                        <ProtectedRoute>
                            <Suppliers />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path={ROUTES.TRANSACTIONS}
                    element={
                        <ProtectedRoute>
                            <Transactions />
                        </ProtectedRoute>
                    }
                />

            </Route>


            

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}


export default App;