import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
function MainLayout() {

    return (

        <>

            <header>

                 <Navbar />

            </header>

            <main>

                <Outlet />

            </main>

            <footer>

                <h2>Footer</h2>

            </footer>

        </>

    );

}

export default MainLayout;