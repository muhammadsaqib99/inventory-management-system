import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

import productService from "../services/productService";
import supplierService from "../services/supplierService";
import transactionService from "../services/transactionService";
import categoryService from "../services/categoryService";

import PageTitle from "../components/ui/PageTitle/PageTitle";
import Card from "../components/ui/Card/Card";
import Button from "../components/ui/Button/Button";
import Loader from "../components/ui/Loader/Loader";

import { ROUTES } from "../constants/routes";

import styles from "./Dashboard.module.css";


function Dashboard() {

    const { token } = useAuth();


    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [suppliers, setSuppliers] = useState([]);

    const [transactions, setTransactions] = useState([]);


    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================
    // Load Dashboard Data
    // =========================

    async function loadDashboardData() {

        setLoading(true);

        setError("");


        try {

            const [

                productsData,

                categoriesData,

                suppliersData,

                transactionsData

            ] = await Promise.all([

                productService.getAll(),

                categoryService.getAll(),

                supplierService.getAll(),

                transactionService.getAll()

            ]);


            setProducts(
                productsData.results ?? productsData
            );


            setCategories(
                categoriesData.results ?? categoriesData
            );


            setSuppliers(
                suppliersData.results ?? suppliersData
            );


            setTransactions(
                transactionsData.results ??
                transactionsData
            );

        }

        catch (error) {

            console.error(
                "DASHBOARD ERROR:",
                error
            );

            setError(
                "Failed to load dashboard data."
            );

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadDashboardData();

    }, []);


    // =========================
    // Calculations
    // =========================

    const totalStock = products.reduce(

        (total, product) =>

            total + Number(product.quantity || 0),

        0

    );


    const lowStockProducts = products.filter(

        (product) =>

            Number(product.quantity || 0) <= 5

    );


    const recentTransactions = [

        ...transactions

    ]

        .sort(

            (a, b) =>

                new Date(b.created_at) -
                new Date(a.created_at)

        )

        .slice(0, 5);


    // =========================
    // Navigation
    // =========================

    function goTo(route) {

        window.location.href = route;

    }


    return (

        <div className={styles.dashboard}>

            <PageTitle

                title="Inventory Dashboard"

                subtitle="Overview of your inventory system"

            />


            {/* =========================
                AUTHENTICATION
            ========================= */}

            <Card>

                <p>

                    <strong>
                        Authenticated:
                    </strong>{" "}

                    {token

                        ? "Yes ✅"

                        : "No ❌"

                    }

                </p>

            </Card>


            <br />


            {loading && (

                <Loader
                    text="Loading dashboard..."
                />

            )}


            {!loading && error && (

                <Card>

                    <p>{error}</p>

                    <Button
                        onClick={loadDashboardData}
                    >
                        Try Again
                    </Button>

                </Card>

            )}


            {!loading && !error && (

                <>


                    {/* =========================
                        STATISTICS
                    ========================= */}

                    <div className={styles.statsGrid}>


                        <Card>

                           <div className={`${styles.statCard} ${styles.statProducts}`}>

                                <p
                                    className={
                                        styles.statValue
                                    }
                                >
                                    {products.length}
                                </p>

                                <p
                                    className={
                                        styles.statLabel
                                    }
                                >
                                    Total Products
                                </p>

                            </div>

                        </Card>


                        <Card>

                            <div className={`${styles.statCard} ${styles.statCategories}`}>

                                <p
                                    className={
                                        styles.statValue
                                    }
                                >
                                    {categories.length}
                                </p>

                                <p
                                    className={
                                        styles.statLabel
                                    }
                                >
                                    Categories
                                </p>

                            </div>

                        </Card>


                        <Card>

                            <div className={`${styles.statCard} ${styles.statSuppliers}`}>

                                <p
                                    className={
                                        styles.statValue
                                    }
                                >
                                    {suppliers.length}
                                </p>

                                <p
                                    className={
                                        styles.statLabel
                                    }
                                >
                                    Suppliers
                                </p>

                            </div>

                        </Card>


                        <Card>

                            <div className={`${styles.statCard} ${styles.statStock}`}>

                                <p
                                    className={
                                        styles.statValue
                                    }
                                >
                                    {totalStock}
                                </p>

                                <p
                                    className={
                                        styles.statLabel
                                    }
                                >
                                    Total Stock Units
                                </p>

                            </div>

                        </Card>

                    </div>


                    {/* =========================
                        LOW STOCK
                    ========================= */}

                    <div className={styles.section}>

                        <Card
                            header="Low Stock Products"
                        >

                            {lowStockProducts.length === 0 ? (

                                <p
                                    className={
                                        styles.empty
                                    }
                                >
                                    No low-stock products. ✅
                                </p>

                            ) : (

                                <div>

                                    {lowStockProducts.map(

                                        (product) => (

                                            <div

                                                key={
                                                    product.id
                                                }

                                                className={
                                                    styles.item
                                                }

                                            >

                                                <div
                                                    className={
                                                        styles.itemTitle
                                                    }
                                                >

                                                    {product.name}

                                                    <span
                                                        className={`${styles.stockBadge} ${styles.lowStock}`}
                                                    >
                                                        Low Stock
                                                    </span>

                                                </div>


                                                <div
                                                    className={
                                                        styles.itemDetails
                                                    }
                                                >

                                                    Category:{" "}

                                                    {
                                                        product.category_name
                                                    }

                                                    <br />

                                                    Quantity:{" "}

                                                    <strong>
                                                        {
                                                            product.quantity
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                        )

                                    )}

                                </div>

                            )}

                        </Card>

                    </div>


                    {/* =========================
                        RECENT TRANSACTIONS
                    ========================= */}

                    <div className={styles.section}>

                        <Card
                            header="Recent Transactions"
                        >

                            {recentTransactions.length === 0 ? (

                                <p
                                    className={
                                        styles.empty
                                    }
                                >
                                    No transactions found.
                                </p>

                            ) : (

                                <div>

                                    {recentTransactions.map(

                                        (transaction) => (

                                            <div

                                                key={
                                                    transaction.id
                                                }

                                                className={
                                                    styles.item
                                                }

                                            >

                                                <div
                                                    className={
                                                        styles.itemTitle
                                                    }
                                                >

                                                    {
                                                        transaction.product_name
                                                    }

                                                </div>


                                                <div
                                                    className={
                                                        styles.itemDetails
                                                    }
                                                >

                                                    Type:{" "}

                                                    {transaction.transaction_type ===
                                                    "IN" ? (

                                                        <span
                                                            className={
                                                                styles.inBadge
                                                            }
                                                        >
                                                            Stock In
                                                        </span>

                                                    ) : (

                                                        <span
                                                            className={
                                                                styles.outBadge
                                                            }
                                                        >
                                                            Stock Out
                                                        </span>

                                                    )}


                                                    <br />


                                                    Quantity:{" "}

                                                    <strong>
                                                        {
                                                            transaction.quantity
                                                        }
                                                    </strong>


                                                    <br />


                                                    Date:{" "}

                                                    {new Date(

                                                        transaction.created_at

                                                    ).toLocaleString()}

                                                </div>

                                            </div>

                                        )

                                    )}

                                </div>

                            )}

                        </Card>

                    </div>


                    {/* =========================
                        QUICK ACTIONS
                    ========================= */}

                    <div className={styles.section}>

                        <Card
                            header="Quick Actions"
                        >

                            <p>

                                Manage your inventory
                                from the following sections.

                            </p>


                            <br />


                            <div
                                className={
                                    styles.actions
                                }
                            >

                                <Button
                                    onClick={() =>
                                        goTo(
                                            ROUTES.CATEGORIES
                                        )
                                    }
                                >
                                    Categories
                                </Button>


                                <Button
                                    onClick={() =>
                                        goTo(
                                            ROUTES.PRODUCTS
                                        )
                                    }
                                >
                                    Products
                                </Button>


                                <Button
                                    onClick={() =>
                                        goTo(
                                            ROUTES.SUPPLIERS
                                        )
                                    }
                                >
                                    Suppliers
                                </Button>


                                <Button
                                    onClick={() =>
                                        goTo(
                                            ROUTES.TRANSACTIONS
                                        )
                                    }
                                >
                                    Transactions
                                </Button>

                            </div>

                        </Card>

                    </div>


                </>

            )}


            {/* =========================
                FOOTER
            ========================= */}

            <Card>

                <p
                    className={
                        styles.footerText
                    }
                >
                    Dashboard data is loaded directly
                    from the Django API.
                </p>

            </Card>


        </div>

    );

}


export default Dashboard;