import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import { ROUTES } from "../../constants/routes";

import styles from "./Navbar.module.css";


function Navbar() {

    const { token, logout } = useAuth();


    function handleLogout() {

        logout();

    }


    function getLinkClass({ isActive }) {

        return isActive

            ? `${styles.link} ${styles.active}`

            : styles.link;

    }


    return (

        <nav className={styles.navbar}>

            <div className={styles.container}>

                {/* Brand */}

                <NavLink

                    to={ROUTES.HOME}

                    className={styles.brand}

                >

                    Inventory System

                </NavLink>


                {/* Navigation */}

                <div className={styles.links}>

                    <NavLink

                        to={ROUTES.HOME}

                        className={getLinkClass}

                    >

                        Home

                    </NavLink>


                    {token && (

                        <>

                            <NavLink

                                to={ROUTES.DASHBOARD}

                                className={getLinkClass}

                            >

                                Dashboard

                            </NavLink>


                            <NavLink

                                to={ROUTES.PRODUCTS}

                                className={getLinkClass}

                            >

                                Products

                            </NavLink>


                            <NavLink

                                to={ROUTES.CATEGORIES}

                                className={getLinkClass}

                            >

                                Categories

                            </NavLink>


                            <NavLink

                                to={ROUTES.SUPPLIERS}

                                className={getLinkClass}

                            >

                                Suppliers

                            </NavLink>


                            <NavLink

                                to={ROUTES.TRANSACTIONS}

                                className={getLinkClass}

                            >

                                Transactions

                            </NavLink>


                            <button

                                type="button"

                                onClick={handleLogout}

                                className={styles.logout}

                            >

                                Logout

                            </button>

                        </>

                    )}


                    {!token && (
    <>
        <NavLink
            to={ROUTES.LOGIN}
            className={getLinkClass}
        >
            Login
        </NavLink>

        <NavLink
            to={ROUTES.REGISTER}
            className={getLinkClass}
        >
            Register
        </NavLink>
    </>
)}


                </div>

            </div>

        </nav>

    );

}


export default Navbar;