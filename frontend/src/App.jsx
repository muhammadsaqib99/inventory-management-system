import { Routes, Route } from "react-router-dom";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
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

                    element={<Login />}

                />

                <Route

                    path={ROUTES.DASHBOARD}

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />

            </Route>

            <Route

                 path={ROUTES.STUDENT}
        
                 element={

                     <ProtectedRoute>

                         <Students />

                     </ProtectedRoute>

                 }

            />

            <Route

                            path="/teachers"

                                element={
                    
                                            <Teachers />
                                   }

                />



            <Route

                path="*"

                element={<NotFound />}

            />

        </Routes>

    );

}

export default App;