import { useEffect, useState } from "react";

import useForm from "../../hooks/useForm";
import useToast from "../../hooks/useToast";

import productService from "../../services/productService";
import categoryService from "../../services/categoryService";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import Loader from "../../components/ui/Loader/Loader";


function ProductForm({

    editingProduct,

    onCreated,

    onUpdated,

    onCancel

}) {

    const { showToast } = useToast();


    const {

        values,

        handleChange,

        resetForm,

        setValues

    } = useForm({

        category: "",

        name: "",

        description: "",

        price: "",

        quantity: 0

    });


    const [categories, setCategories] =
        useState([]);

    const [loadingCategories, setLoadingCategories] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);


    // =========================
    // Load Categories
    // =========================

    async function loadCategories() {

        try {

            const data =
                await categoryService.getAll();

            setCategories(
                data.results ?? data
            );

        }

        catch (error) {

            console.error(error);

            showToast(
                "Failed to load categories.",
                "error"
            );

        }

        finally {

            setLoadingCategories(false);

        }

    }


    useEffect(() => {

        loadCategories();

    }, []);


    // =========================
    // Load Product For Editing
    // =========================

    useEffect(() => {

        if (!editingProduct) {

            resetForm();

            return;

        }


        setValues({

            category:
                editingProduct.category ?? "",

            name:
                editingProduct.name ?? "",

            description:
                editingProduct.description ?? "",

            price:
                editingProduct.price ?? "",

            quantity:
                editingProduct.quantity ?? 0

        });

    }, [editingProduct]);


    // =========================
    // Submit
    // =========================

    async function handleSubmit(e) {

        e.preventDefault();


        if (!values.category) {

            showToast(
                "Please select a category.",
                "error"
            );

            return;

        }


        if (!values.name.trim()) {

            showToast(
                "Product name is required.",
                "error"
            );

            return;

        }


        setSubmitting(true);


        const productData = {

            category:
                Number(values.category),

            name:
                values.name.trim(),

            description:
                values.description.trim(),

            price:
                values.price,

            quantity:
                Number(values.quantity)

        };


        try {

            // =========================
            // UPDATE
            // =========================

            if (editingProduct) {

                const updatedProduct =
                    await productService.update(

                        editingProduct.id,

                        productData

                    );


                showToast(
                    "Product updated successfully.",
                    "success"
                );


                if (onUpdated) {

                    onUpdated(
                        updatedProduct
                    );

                }

                return;

            }


            // =========================
            // CREATE
            // =========================

            const product =
                await productService.create(
                    productData
                );


            showToast(
                "Product created successfully.",
                "success"
            );


            resetForm();


            if (onCreated) {

                onCreated(product);

            }

        }

        catch (error) {

            console.error(
                "PRODUCT ERROR:",
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


            showToast(

                error.response?.data?.detail ||

                "Failed to save product.",

                "error"

            );

        }

        finally {

            setSubmitting(false);

        }

    }


    // =========================
    // Loading Categories
    // =========================

    if (loadingCategories) {

        return (

            <Loader
                text="Loading categories..."
            />

        );

    }


    return (

        <form onSubmit={handleSubmit}>

            {/* =========================
                CATEGORY
            ========================= */}

            <label htmlFor="product-category">

                Category

            </label>


            <br />


            <select

                id="product-category"

                name="category"

                value={values.category}

                onChange={handleChange}

                disabled={submitting}

            >

                <option value="">

                    Select Category

                </option>


                {categories.map(
                    (category) => (

                        <option
                            key={category.id}
                            value={category.id}
                        >

                            {category.name}

                        </option>

                    )
                )}

            </select>


            <br />
            <br />


            {/* =========================
                NAME
            ========================= */}

            <Input

                label="Product Name"

                type="text"

                name="name"

                placeholder="Enter product name"

                value={values.name}

                onChange={handleChange}

                disabled={submitting}

            />


            <br />


            {/* =========================
                DESCRIPTION
            ========================= */}

            <Input

                label="Description"

                type="text"

                name="description"

                placeholder="Enter product description"

                value={values.description}

                onChange={handleChange}

                disabled={submitting}

            />


            <br />


            {/* =========================
                PRICE
            ========================= */}

            <Input

                label="Price"

                type="number"

                name="price"

                step="0.01"

                min="0"

                placeholder="Enter price"

                value={values.price}

                onChange={handleChange}

                disabled={submitting}

            />


            <br />


            {/* =========================
                QUANTITY
            ========================= */}

            <Input

                label="Quantity"

                type="number"

                name="quantity"

                min="0"

                placeholder="Enter quantity"

                value={values.quantity}

                onChange={handleChange}

                disabled={submitting}

            />


            <br />


            {/* =========================
                BUTTONS
            ========================= */}

            <Button

                type="submit"

                disabled={submitting}

            >

                {submitting
                    ? "Saving..."
                    : editingProduct
                        ? "Update Product"
                        : "Add Product"
                }

            </Button>


            {editingProduct && (

                <>

                    {" "}

                    <Button

                        type="button"

                        variant="secondary"

                        onClick={() => {

                            resetForm();

                            onCancel?.();

                        }}

                        disabled={submitting}

                    >

                        Cancel

                    </Button>

                </>

            )}

        </form>

    );

}


export default ProductForm;