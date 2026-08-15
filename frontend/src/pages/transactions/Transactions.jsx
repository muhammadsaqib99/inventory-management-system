import { useEffect, useState } from "react";

import transactionService from "../../services/transactionService";
import productService from "../../services/productService";

import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import Loader from "../../components/ui/Loader/Loader";

import useToast from "../../hooks/useToast";

import styles from "./Transactions.module.css";


function Transactions() {

    const { showToast } = useToast();

    const [transactions, setTransactions] = useState([]);

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [loadingProducts, setLoadingProducts] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [editingTransaction, setEditingTransaction] =
        useState(null);

    const [submitting, setSubmitting] = useState(false);

    // =========================
    // PAGINATION
    // =========================

    const [currentPage, setCurrentPage] = useState(1);

    const [nextPage, setNextPage] = useState(null);

    const [previousPage, setPreviousPage] = useState(null);


    const [form, setForm] = useState({

        product: "",
        transaction_type: "IN",
        quantity: ""

    });


    // =========================
    // LOAD TRANSACTIONS
    // =========================

    async function loadTransactions(page = 1) {

        setLoading(true);

        setError("");

        try {

            const data =
                await transactionService.getAll(
                    `?page=${page}`
                );

            // Paginated response
            if (data.results) {

                setTransactions(data.results);

                setNextPage(data.next);

                setPreviousPage(data.previous);

            }

            // Non-paginated response fallback
            else {

                setTransactions(data);

                setNextPage(null);

                setPreviousPage(null);

            }

            setCurrentPage(page);

        }

        catch (error) {

            console.error(error);

            setError(
                "Failed to load transactions."
            );

        }

        finally {

            setLoading(false);

        }

    }


    // =========================
    // LOAD PRODUCTS
    // =========================

    async function loadProducts() {

        setLoadingProducts(true);

        try {

            const data =
                await productService.getAll();

            setProducts(
                data.results ?? data
            );

        }

        catch (error) {

            console.error(error);

            showToast(
                "Failed to load products.",
                "error"
            );

        }

        finally {

            setLoadingProducts(false);

        }

    }


    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(() => {

        loadTransactions(1);

        loadProducts();

    }, []);


    // =========================
    // FORM CHANGE
    // =========================

    function handleChange(e) {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: value

        }));

    }


    // =========================
    // RESET FORM
    // =========================

    function resetForm() {

        setForm({

            product: "",
            transaction_type: "IN",
            quantity: ""

        });

        setEditingTransaction(null);

    }


    // =========================
    // EDIT
    // =========================

    function handleEdit(transaction) {

        setEditingTransaction(transaction);

        setForm({

            product:
                transaction.product ?? "",

            transaction_type:
                transaction.transaction_type ?? "IN",

            quantity:
                transaction.quantity ?? ""

        });

    }


    // =========================
    // CREATE / UPDATE
    // =========================

    async function handleSubmit(e) {

        e.preventDefault();

        if (!form.product) {

            showToast(
                "Please select a product.",
                "error"
            );

            return;

        }

        if (!form.quantity) {

            showToast(
                "Quantity is required.",
                "error"
            );

            return;

        }

        const quantity =
            Number(form.quantity);

        if (quantity <= 0) {

            showToast(
                "Quantity must be greater than 0.",
                "error"
            );

            return;

        }

        setSubmitting(true);

        const transactionData = {

            product:
                Number(form.product),

            transaction_type:
                form.transaction_type,

            quantity

        };


        try {

            // =========================
            // UPDATE
            // =========================

            if (editingTransaction) {

                await transactionService.update(

                    editingTransaction.id,

                    transactionData

                );

                showToast(
                    "Transaction updated successfully.",
                    "success"
                );

            }


            // =========================
            // CREATE
            // =========================

            else {

                await transactionService.create(
                    transactionData
                );

                showToast(
                    "Transaction created successfully.",
                    "success"
                );

            }


            resetForm();

            // Reload current page so
            // pagination stays correct.
            await loadTransactions(currentPage);

            // Product quantities may have changed.
            await loadProducts();

        }

        catch (error) {

            console.error(
                "TRANSACTION ERROR:",
                error
            );

            console.error(
                "STATUS:",
                error.response?.status
            );

            console.error(
                "DATA:",
                error.response?.data
            );


            const backendError =
                error.response?.data;


            if (backendError?.quantity) {

                const quantityError =
                    Array.isArray(
                        backendError.quantity
                    )

                        ? backendError.quantity[0]

                        : backendError.quantity;


                showToast(
                    quantityError,
                    "error"
                );

            }

            else {

                showToast(

                    backendError?.detail ||

                    "Failed to save transaction.",

                    "error"

                );

            }

        }

        finally {

            setSubmitting(false);

        }

    }


    // =========================
    // DELETE
    // =========================

    async function handleDelete(transaction) {

        const confirmed =
            window.confirm(

                "Are you sure you want to delete this transaction?"

            );


        if (!confirmed) {

            return;

        }


        try {

            await transactionService.remove(
                transaction.id
            );


            showToast(
                "Transaction deleted successfully.",
                "success"
            );


            if (
                editingTransaction?.id ===
                transaction.id
            ) {

                resetForm();

            }


            // Reload current page.
            await loadTransactions(currentPage);

            // Django reverses the stock automatically.
            await loadProducts();

        }

        catch (error) {

            console.error(error);

            showToast(

                error.response?.data?.detail ||

                "Failed to delete transaction.",

                "error"

            );

        }

    }


    // =========================
    // SEARCH
    // =========================

    const searchValue =
        search.toLowerCase().trim();


    const filteredTransactions =
        transactions.filter((transaction) => {

            if (!searchValue) {

                return true;

            }


            return (

                transaction.product_name
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                transaction.transaction_type
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                String(
                    transaction.quantity
                ).includes(searchValue)

            );

        });


    // =========================
    // LOADING PRODUCTS
    // =========================

    if (loadingProducts) {

        return (

            <>

                <PageTitle

                    title="Transactions"

                    subtitle="Manage stock in and stock out transactions"

                />


                <Card header="Transaction">

                    <Loader
                        text="Loading products..."
                    />

                </Card>

            </>

        );

    }


    return (

        <>

            <PageTitle

                title="Transactions"

                subtitle="Manage stock in and stock out transactions"

            />


            {/* =========================
                ADD / EDIT FORM
            ========================= */}

            <Card

                header={

                    editingTransaction

                        ? "Edit Transaction"

                        : "Add Transaction"

                }

            >

                <form onSubmit={handleSubmit}>

                    <label>

                        Product

                    </label>


                    <br />


                    <select

                        name="product"

                        value={form.product}

                        onChange={handleChange}

                        disabled={submitting}

                    >

                        <option value="">

                            Select Product

                        </option>


                        {products.map((product) => (

                            <option

                                key={product.id}

                                value={product.id}

                            >

                                {product.name}

                            </option>

                        ))}

                    </select>


                    <br />
                    <br />


                    <label>

                        Transaction Type

                    </label>


                    <br />


                    <select

                        name="transaction_type"

                        value={form.transaction_type}

                        onChange={handleChange}

                        disabled={submitting}

                    >

                        <option value="IN">

                            Stock In

                        </option>

                        <option value="OUT">

                            Stock Out

                        </option>

                    </select>


                    <br />
                    <br />


                    <Input

                        label="Quantity"

                        type="number"

                        name="quantity"

                        min="1"

                        placeholder="Enter quantity"

                        value={form.quantity}

                        onChange={handleChange}

                        disabled={submitting}

                    />


                    <br />


                    <Button

                        type="submit"

                        disabled={submitting}

                    >

                        {submitting

                            ? "Saving..."

                            : editingTransaction

                                ? "Update Transaction"

                                : "Add Transaction"

                        }

                    </Button>


                    {editingTransaction && (

                        <>

                            {" "}


                            <Button

                                type="button"

                                variant="secondary"

                                onClick={resetForm}

                                disabled={submitting}

                            >

                                Cancel

                            </Button>

                        </>

                    )}

                </form>

            </Card>


            <br />


            {/* =========================
                TRANSACTION LIST
            ========================= */}

            <Card header="Transaction List">


                <div className={styles.search}>

                    <Input

                        type="text"

                        placeholder="Search by product, type or quantity..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>


                <br />


                {loading && (

                    <Loader
                        text="Loading transactions..."
                    />

                )}


                {!loading && error && (

                    <div className={styles.error}>

                        <p>{error}</p>

                        <Button
                            onClick={() =>
                                loadTransactions(currentPage)
                            }
                        >

                            Try Again

                        </Button>

                    </div>

                )}


                {!loading &&
                !error &&
                filteredTransactions.length === 0 && (

                    <p className={styles.empty}>

                        {searchValue

                            ? "No transactions match your search."

                            : "No transactions found."

                        }

                    </p>

                )}


                {!loading &&
                !error &&
                filteredTransactions.length > 0 && (

                    <div className={styles.tableWrapper}>

                        <table className={styles.table}>

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Product</th>

                                    <th>Type</th>

                                    <th>Quantity</th>

                                    <th>Date</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredTransactions.map(

                                    (transaction) => (

                                        <tr
                                            key={transaction.id}
                                        >

                                            <td>

                                                {transaction.id}

                                            </td>


                                            <td>

                                                <strong>

                                                    {
                                                        transaction.product_name ||
                                                        "Unknown Product"
                                                    }

                                                </strong>

                                            </td>


                                            <td>

                                                <span

                                                    className={

                                                        transaction.transaction_type ===
                                                        "IN"

                                                            ? styles.stockIn

                                                            : styles.stockOut

                                                    }

                                                >

                                                    {

                                                        transaction.transaction_type ===
                                                        "IN"

                                                            ? "Stock In"

                                                            : "Stock Out"

                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                {transaction.quantity}

                                            </td>


                                            <td>

                                                {new Date(

                                                    transaction.created_at

                                                ).toLocaleString()}

                                            </td>


                                            <td>

                                                <div
                                                    className={
                                                        styles.actions
                                                    }
                                                >

                                                    <Button

                                                        onClick={() =>
                                                            handleEdit(
                                                                transaction
                                                            )
                                                        }

                                                    >

                                                        Edit

                                                    </Button>


                                                    <Button

                                                        variant="danger"

                                                        onClick={() =>
                                                            handleDelete(
                                                                transaction
                                                            )
                                                        }

                                                    >

                                                        Delete

                                                    </Button>

                                                </div>

                                            </td>

                                        </tr>

                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                )}


                {/* =========================
                    PAGINATION
                ========================= */}

                {!loading &&
                !error &&
                (previousPage || nextPage) && (

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "12px",
                            marginTop: "20px"
                        }}
                    >

                        <Button

                            type="button"

                            variant="secondary"

                            disabled={!previousPage || loading}

                            onClick={() =>
                                loadTransactions(
                                    currentPage - 1
                                )
                            }

                        >

                            Previous

                        </Button>


                        <span>

                            Page {currentPage}

                        </span>


                        <Button

                            type="button"

                            disabled={!nextPage || loading}

                            onClick={() =>
                                loadTransactions(
                                    currentPage + 1
                                )
                            }

                        >

                            Next

                        </Button>

                    </div>

                )}

            </Card>

        </>

    );

}


export default Transactions;