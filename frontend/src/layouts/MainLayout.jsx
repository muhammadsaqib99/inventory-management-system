import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";

import styles from "./MainLayout.module.css";


function MainLayout() {

    return (

        <div className={styles.layout}>

            <header>

                <Navbar />

            </header>


            <main className={styles.main}>

                <Outlet />

            </main>


            <footer className={styles.footer}>

                <p>
                    © 2026 Inventory Management System
                </p>

                <p>
                    Manage products, suppliers, categories
                    and stock transactions efficiently.
                </p>

            </footer>

        </div>

    );

}


export default MainLayout;