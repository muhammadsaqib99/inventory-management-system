import { useEffect, useState } from "react";

import productService from "../../services/productService";

import ProductForm from "./ProductForm";

import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import Loader from "../../components/ui/Loader/Loader";

import styles from "./Products.module.css";


function Products() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [editingProduct, setEditingProduct] =
        useState(null);


    // =========================
    // Load Products
    // =========================

    async function loadProducts() {

        setLoading(true);

        setError("");

        try {

            const data =
                await productService.getAll();

            setProducts(
                data.results ?? data
            );

        }

        catch (error) {

            console.error(error);

            setError(
                "Failed to load products."
            );

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadProducts();

    }, []);


    // =========================
    // Created Product
    // =========================

    function handleCreated(product) {

        setProducts((prev) => [

            ...prev,

            product

        ]);

    }


    // =========================
    // Updated Product
    // =========================

    function handleUpdated(updatedProduct) {

        setProducts((prev) =>

            prev.map((product) =>

                product.id === updatedProduct.id

                    ? updatedProduct

                    : product

            )

        );

        setEditingProduct(null);

    }


    // =========================
    // Delete Product
    // =========================

    async function handleDelete(product) {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${product.name}"?`
            );

        if (!confirmed) {

            return;

        }

        try {

            await productService.remove(
                product.id
            );

            setProducts((prev) =>

                prev.filter(
                    (item) =>
                        item.id !== product.id
                )

            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Failed to delete product."
            );

        }

    }


    // =========================
    // Search
    // =========================

    const filteredProducts =
        products.filter((product) => {

            const searchValue =
                search.toLowerCase().trim();

            if (!searchValue) {

                return true;

            }

            return (

                product.name
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                product.category_name
                    ?.toLowerCase()
                    .includes(searchValue)

            );

        });


    // =========================
    // Stock Status
    // =========================

    function getStockStatus(quantity) {

        const stock = Number(quantity);

        if (stock === 0) {

            return {

                text: "Out of Stock",

                className:
                    styles.outOfStock

            };

        }

        if (stock <= 5) {

            return {

                text: "Low Stock",

                className:
                    styles.lowStock

            };

        }

        return {

            text: "In Stock",

            className:
                styles.inStock

        };

    }


    return (

        <div className={styles.page}>

            <PageTitle

                title="Products"

                subtitle="Manage your inventory products"

            />


            {/* =========================
                PRODUCT FORM
            ========================= */}

            <Card

                header={

                    <div className={styles.cardHeader}>

                        <div>

                            <h2>

                                {editingProduct
                                    ? "Edit Product"
                                    : "Add Product"
                                }

                            </h2>

                            <p>

                                {editingProduct
                                    ? "Update the product information."
                                    : "Add a new product to your inventory."
                                }

                            </p>

                        </div>

                    </div>

                }

            >

                <ProductForm

                    editingProduct={
                        editingProduct
                    }

                    onCreated={
                        handleCreated
                    }

                    onUpdated={
                        handleUpdated
                    }

                    onCancel={() =>
                        setEditingProduct(null)
                    }

                />

            </Card>


            {/* =========================
                PRODUCT LIST
            ========================= */}

            <Card header="Product List">

                <div className={styles.listTop}>

                    <div>

                        <h3>

                            All Products

                        </h3>

                        <span>

                            {filteredProducts.length}{" "}

                            {filteredProducts.length === 1
                                ? "product"
                                : "products"
                            }

                        </span>

                    </div>


                    <div className={styles.search}>

                        <Input

                            type="text"

                            name="productSearch"

                            placeholder="Search by product or category..."

                            value={search}

                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }

                        />

                    </div>

                </div>


                {/* =========================
                    LOADING
                ========================= */}

                {loading && (

                    <div className={styles.state}>

                        <Loader
                            text="Loading products..."
                        />

                    </div>

                )}


                {/* =========================
                    ERROR
                ========================= */}

                {!loading &&
                error && (

                    <div
                        className={
                            styles.errorState
                        }
                    >

                        <p>

                            {error}

                        </p>

                        <Button
                            onClick={
                                loadProducts
                            }
                        >

                            Try Again

                        </Button>

                    </div>

                )}


                {/* =========================
                    EMPTY
                ========================= */}

                {!loading &&
                !error &&
                filteredProducts.length === 0 && (

                    <div className={styles.empty}>

                        <div
                            className={
                                styles.emptyIcon
                            }
                        >

                            📦

                        </div>

                        <h3>

                            {search
                                ? "No products found"
                                : "No products yet"
                            }

                        </h3>

                        <p>

                            {search
                                ? "Try a different search term."
                                : "Add your first product using the form above."
                            }

                        </p>

                    </div>

                )}


                {/* =========================
                    PRODUCT TABLE
                ========================= */}

                {!loading &&
                !error &&
                filteredProducts.length > 0 && (

                    <div
                        className={
                            styles.tableWrapper
                        }
                    >

                        <table
                            className={
                                styles.table
                            }
                        >

                            <thead>

                                <tr>

                                    <th>
                                        Product
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Price
                                    </th>

                                    <th>
                                        Quantity
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Description
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredProducts.map(
                                    (product) => {

                                        const status =
                                            getStockStatus(
                                                product.quantity
                                            );

                                        return (

                                            <tr
                                                key={
                                                    product.id
                                                }
                                            >

                                                <td>

                                                    <div
                                                        className={
                                                            styles.productName
                                                        }
                                                    >

                                                        <span
                                                            className={
                                                                styles.productIcon
                                                            }
                                                        >

                                                            📦

                                                        </span>

                                                        <strong>

                                                            {
                                                                product.name
                                                            }

                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            styles.category
                                                        }
                                                    >

                                                        {
                                                            product.category_name
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <strong>

                                                        Rs.{" "}

                                                        {
                                                            product.price
                                                        }

                                                    </strong>

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            styles.quantity
                                                        }
                                                    >

                                                        {
                                                            product.quantity
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            `${styles.status} ${status.className}`
                                                        }
                                                    >

                                                        {
                                                            status.text
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            styles.description
                                                        }
                                                    >

                                                        {
                                                            product.description ||
                                                            "—"
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <div
                                                        className={
                                                            styles.actions
                                                        }
                                                    >

                                                        <Button

                                                            onClick={() =>
                                                                setEditingProduct(
                                                                    product
                                                                )
                                                            }

                                                        >

                                                            Edit

                                                        </Button>


                                                        <Button

                                                            variant="danger"

                                                            onClick={() =>
                                                                handleDelete(
                                                                    product
                                                                )
                                                            }

                                                        >

                                                            Delete

                                                        </Button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    }

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </Card>

        </div>

    );

}


export default Products;