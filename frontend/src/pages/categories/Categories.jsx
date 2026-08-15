import { useEffect, useState } from "react";

import categoryService from "../../services/categoryService";

import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import Loader from "../../components/ui/Loader/Loader";

import useToast from "../../hooks/useToast";

import styles from "./Categories.module.css";


function Categories() {

    const { showToast } = useToast();

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [name, setName] = useState("");

    const [editingCategory, setEditingCategory] =
        useState(null);

    const [submitting, setSubmitting] =
        useState(false);


    // =========================
    // Load Categories
    // =========================

    async function loadCategories() {

        setLoading(true);
        setError("");

        try {

            const data =
                await categoryService.getAll();

            setCategories(
                data.results ?? data
            );

        }

        catch (error) {

            console.error(error);

            setError(
                "Failed to load categories."
            );

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadCategories();

    }, []);


    // =========================
    // Search
    // =========================

    const filteredCategories =
        categories.filter(

            (category) =>
                category.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase().trim()
                    )

        );


    // =========================
    // Edit
    // =========================

    function handleEdit(category) {

        setEditingCategory(category);

        setName(category.name);

    }


    // =========================
    // Cancel Edit
    // =========================

    function handleCancel() {

        setEditingCategory(null);

        setName("");

    }


    // =========================
    // Create / Update
    // =========================

    async function handleSubmit(e) {

        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {

            showToast(
                "Category name is required.",
                "error"
            );

            return;

        }

        setSubmitting(true);

        try {

            // UPDATE
            if (editingCategory) {

                const updatedCategory =
                    await categoryService.update(
                        editingCategory.id,
                        {
                            name: trimmedName
                        }
                    );

                setCategories((prev) =>
                    prev.map((category) =>
                        category.id ===
                        updatedCategory.id
                            ? updatedCategory
                            : category
                    )
                );

                showToast(
                    "Category updated successfully.",
                    "success"
                );

            }

            // CREATE
            else {

                const newCategory =
                    await categoryService.create(
                        {
                            name: trimmedName
                        }
                    );

                setCategories((prev) => [
                    ...prev,
                    newCategory
                ]);

                showToast(
                    "Category created successfully.",
                    "success"
                );

            }

            handleCancel();

        }

        catch (error) {

            console.error(
                "CATEGORY ERROR:",
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
                "Failed to save category.",
                "error"
            );

        }

        finally {

            setSubmitting(false);

        }

    }


    // =========================
    // Delete
    // =========================

    async function handleDelete(category) {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${category.name}"?`
            );

        if (!confirmed) {

            return;

        }

        try {

            await categoryService.remove(
                category.id
            );

            setCategories((prev) =>
                prev.filter(
                    (item) =>
                        item.id !== category.id
                )
            );

            showToast(
                "Category deleted successfully.",
                "success"
            );

            if (
                editingCategory?.id ===
                category.id
            ) {

                handleCancel();

            }

        }

        catch (error) {

            console.error(error);

            showToast(
                error.response?.data?.detail ||
                "Failed to delete category.",
                "error"
            );

        }

    }


    return (

        <div className={styles.page}>

            <PageTitle
                title="Categories"
                subtitle="Organize your inventory products into categories."
            />


            {/* =========================
                FORM
            ========================= */}

            <Card
                header={
                    <div className={styles.cardHeader}>

                        <div>

                            <h2>

                                {editingCategory
                                    ? "Edit Category"
                                    : "Add Category"
                                }

                            </h2>

                            <p>

                                {editingCategory
                                    ? "Update the category name."
                                    : "Create a category for your products."
                                }

                            </p>

                        </div>

                    </div>
                }
            >

                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                >

                    <Input
                        label="Category Name"
                        type="text"
                        name="name"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        disabled={submitting}
                    />


                    <div className={styles.formActions}>

                        <Button
                            type="submit"
                            disabled={submitting}
                        >

                            {submitting
                                ? "Saving..."
                                : editingCategory
                                    ? "Update Category"
                                    : "Add Category"
                            }

                        </Button>


                        {editingCategory && (

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCancel}
                                disabled={submitting}
                            >

                                Cancel

                            </Button>

                        )}

                    </div>

                </form>

            </Card>


            {/* =========================
                CATEGORY LIST
            ========================= */}

            <Card header="Category List">

                <div className={styles.listTop}>

                    <div>

                        <h3>

                            All Categories

                        </h3>

                        <span>

                            {filteredCategories.length}{" "}
                            {filteredCategories.length === 1
                                ? "category"
                                : "categories"
                            }

                        </span>

                    </div>


                    <div className={styles.search}>

                        <Input
                            type="text"
                            name="categorySearch"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>


                {loading && (

                    <div className={styles.state}>

                        <Loader
                            text="Loading categories..."
                        />

                    </div>

                )}


                {!loading && error && (

                    <div className={styles.errorState}>

                        <p>

                            {error}

                        </p>

                        <Button
                            onClick={loadCategories}
                        >

                            Try Again

                        </Button>

                    </div>

                )}


                {!loading &&
                !error &&
                filteredCategories.length === 0 && (

                    <div className={styles.empty}>

                        <div className={styles.emptyIcon}>

                            📁

                        </div>

                        <h3>

                            {search
                                ? "No categories found"
                                : "No categories yet"
                            }

                        </h3>

                        <p>

                            {search
                                ? "Try a different search term."
                                : "Create your first category using the form above."
                            }

                        </p>

                    </div>

                )}


                {!loading &&
                !error &&
                filteredCategories.length > 0 && (

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

                                        ID

                                    </th>

                                    <th>

                                        Category

                                    </th>

                                    <th>

                                        Actions

                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredCategories.map(
                                    (category) => (

                                        <tr
                                            key={
                                                category.id
                                            }
                                        >

                                            <td>

                                                <span
                                                    className={
                                                        styles.id
                                                    }
                                                >

                                                    #
                                                    {category.id}

                                                </span>

                                            </td>


                                            <td>

                                                <div
                                                    className={
                                                        styles.categoryName
                                                    }
                                                >

                                                    <span
                                                        className={
                                                            styles.categoryIcon
                                                        }
                                                    >

                                                        📁

                                                    </span>

                                                    <strong>

                                                        {
                                                            category.name
                                                        }

                                                    </strong>

                                                </div>

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
                                                                category
                                                            )
                                                        }
                                                    >

                                                        Edit

                                                    </Button>


                                                    <Button
                                                        variant="danger"
                                                        onClick={() =>
                                                            handleDelete(
                                                                category
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

            </Card>

        </div>

    );

}


export default Categories;