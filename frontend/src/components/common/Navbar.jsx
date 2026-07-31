import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import { ROUTES } from "../../constants/routes";

function Navbar() {

    const { token, logout } = useAuth();

    const navigate = useNavigate();

    function handleLogout() {

        logout();

        navigate(ROUTES.LOGIN);

    }

    return (

        <nav

            style={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                padding: "15px",

                background: "#f4f4f4",

                marginBottom: "20px"

            }}

        >

            <div

                style={{

                    display: "flex",

                    gap: "20px"

                }}

            >

                <Link to={ROUTES.HOME}>

                    Home

                </Link>

                {

                    token &&

                    <Link to={ROUTES.DASHBOARD}>

                        Dashboard

                    </Link>

                }

            </div>

            <div>

                {

                    token ?

                    <button onClick={handleLogout}>

                        Logout

                    </button>

                    :

                    <Link to={ROUTES.LOGIN}>

                        Login

                    </Link>

                }

            </div>

        </nav>

    );

}

export default Navbar;