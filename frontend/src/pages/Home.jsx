import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import PageTitle from "../components/ui/PageTitle/PageTitle";
import Card from "../components/ui/Card/Card";
import Button from "../components/ui/Button/Button";

import { ROUTES } from "../constants/routes";

import styles from "./Home.module.css";


function Home() {

    const { token } = useAuth();


    return (

        <div className={styles.home}>

            <PageTitle
                title="Inventory Management System"
                subtitle="Simple and reliable inventory management for your business"
            />


            <Card>

                <div className={styles.hero}>

                    <h2>
                        Manage Your Inventory
                    </h2>

                    <p>
                        Keep track of products, categories,
                        suppliers, and stock transactions
                        from one place.
                    </p>


                    <div className={styles.actions}>

                        {token ? (

                            <Link to={ROUTES.DASHBOARD}>

                                <Button>
                                    Go to Dashboard
                                </Button>

                            </Link>

                        ) : (

                            <Link to={ROUTES.LOGIN}>

                                <Button>
                                    Login
                                </Button>

                            </Link>

                        )}

                    </div>

                </div>

            </Card>


            <div className={styles.features}>


                <Card>

                    <h3>
                        Products
                    </h3>

                    <p>
                        Manage your inventory products
                        and monitor available stock.
                    </p>

                </Card>


                <Card>

                    <h3>
                        Suppliers
                    </h3>

                    <p>
                        Keep supplier information
                        organized and accessible.
                    </p>

                </Card>


                <Card>

                    <h3>
                        Transactions
                    </h3>

                    <p>
                        Record stock-in and stock-out
                        transactions easily.
                    </p>

                </Card>


            </div>

        </div>

    );

}


export default Home;