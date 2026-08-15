import { useEffect, useState } from "react";

import supplierService from "../../services/supplierService";

import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import Loader from "../../components/ui/Loader/Loader";

import useToast from "../../hooks/useToast";

import styles from "./Suppliers.module.css";


function Suppliers() {

    const { showToast } = useToast();


    const [suppliers, setSuppliers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [editingSupplier, setEditingSupplier] =
        useState(null);

    const [submitting, setSubmitting] =
        useState(false);


    const [form, setForm] = useState({

        name: "",
        contact_person: "",
        email: "",
        phone: "",
        address: ""

    });


    // =========================
    // LOAD SUPPLIERS
    // =========================

    async function loadSuppliers() {

        setLoading(true);

        setError("");


        try {

            const data =
                await supplierService.getAll();

            setSuppliers(
                data.results ?? data
            );

        }

        catch (error) {

            console.error(error);

            setError(
                "Failed to load suppliers."
            );

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadSuppliers();

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

            name: "",
            contact_person: "",
            email: "",
            phone: "",
            address: ""

        });


        setEditingSupplier(null);

    }


    // =========================
    // EDIT
    // =========================

    function handleEdit(supplier) {

        setEditingSupplier(supplier);


        setForm({

            name: supplier.name ?? "",

            contact_person:
                supplier.contact_person ?? "",

            email:
                supplier.email ?? "",

            phone:
                supplier.phone ?? "",

            address:
                supplier.address ?? ""

        });

    }


    // =========================
    // CREATE / UPDATE
    // =========================

    async function handleSubmit(e) {

        e.preventDefault();


        const trimmedName =
            form.name.trim();


        if (!trimmedName) {

            showToast(
                "Supplier name is required.",
                "error"
            );

            return;

        }


        setSubmitting(true);


        const supplierData = {

            name: trimmedName,

            contact_person:
                form.contact_person.trim(),

            email:
                form.email.trim(),

            phone:
                form.phone.trim(),

            address:
                form.address.trim()

        };


        try {

            // =========================
            // UPDATE
            // =========================

            if (editingSupplier) {

                const updatedSupplier =
                    await supplierService.update(

                        editingSupplier.id,

                        supplierData

                    );


                setSuppliers((prev) =>

                    prev.map((supplier) =>

                        supplier.id ===
                        updatedSupplier.id

                            ? updatedSupplier

                            : supplier

                    )

                );


                showToast(
                    "Supplier updated successfully.",
                    "success"
                );

            }


            // =========================
            // CREATE
            // =========================

            else {

                const newSupplier =
                    await supplierService.create(
                        supplierData
                    );


                setSuppliers((prev) => [

                    ...prev,

                    newSupplier

                ]);


                showToast(
                    "Supplier created successfully.",
                    "success"
                );

            }


            resetForm();

        }

        catch (error) {

            console.error(
                "SUPPLIER ERROR:",
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

                "Failed to save supplier.",

                "error"

            );

        }

        finally {

            setSubmitting(false);

        }

    }


    // =========================
    // DELETE
    // =========================

    async function handleDelete(supplier) {

        const confirmed =
            window.confirm(

                `Are you sure you want to delete "${supplier.name}"?`

            );


        if (!confirmed) {

            return;

        }


        try {

            await supplierService.remove(
                supplier.id
            );


            setSuppliers((prev) =>

                prev.filter(

                    (item) =>
                        item.id !== supplier.id

                )

            );


            showToast(
                "Supplier deleted successfully.",
                "success"
            );


            if (
                editingSupplier?.id ===
                supplier.id
            ) {

                resetForm();

            }

        }

        catch (error) {

            console.error(error);

            showToast(

                error.response?.data?.detail ||

                "Failed to delete supplier.",

                "error"

            );

        }

    }


    // =========================
    // SEARCH
    // =========================

    const searchValue =
        search.toLowerCase().trim();


    const filteredSuppliers =
        suppliers.filter((supplier) => {

            if (!searchValue) {

                return true;

            }


            return (

                supplier.name
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                supplier.contact_person
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                supplier.email
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                supplier.phone
                    ?.toLowerCase()
                    .includes(searchValue)

            );

        });


    return (

        <>

            <PageTitle

                title="Suppliers"

                subtitle="Manage your inventory suppliers"

            />


            {/* =========================
                ADD / EDIT FORM
            ========================= */}

            <Card

                header={

                    editingSupplier

                        ? "Edit Supplier"

                        : "Add Supplier"

                }

            >

                <form onSubmit={handleSubmit}>

                    <Input

                        label="Supplier Name"

                        type="text"

                        name="name"

                        placeholder="Enter supplier name"

                        value={form.name}

                        onChange={handleChange}

                        disabled={submitting}

                    />


                    <br />


                    <Input

                        label="Contact Person"

                        type="text"

                        name="contact_person"

                        placeholder="Enter contact person"

                        value={form.contact_person}

                        onChange={handleChange}

                        disabled={submitting}

                    />


                    <br />


                    <Input

                        label="Email"

                        type="email"

                        name="email"

                        placeholder="Enter supplier email"

                        value={form.email}

                        onChange={handleChange}

                        disabled={submitting}

                    />


                    <br />


                    <Input

                        label="Phone"

                        type="text"

                        name="phone"

                        placeholder="Enter phone number"

                        value={form.phone}

                        onChange={handleChange}

                        disabled={submitting}

                    />


                    <br />


                    <label>

                        Address

                    </label>


                    <br />


                    <textarea

                        name="address"

                        placeholder="Enter supplier address"

                        value={form.address}

                        onChange={handleChange}

                        rows="4"

                        disabled={submitting}

                    />


                    <br />
                    <br />


                    <Button

                        type="submit"

                        disabled={submitting}

                    >

                        {submitting

                            ? "Saving..."

                            : editingSupplier

                                ? "Update Supplier"

                                : "Add Supplier"

                        }

                    </Button>


                    {editingSupplier && (

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
                SUPPLIER LIST
            ========================= */}

            <Card header="Supplier List">


                <div className={styles.search}>

                    <Input

                        type="text"

                        placeholder="Search by supplier, contact, email or phone..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>


                <br />


                {loading && (

                    <Loader
                        text="Loading suppliers..."
                    />

                )}


                {!loading && error && (

                    <div className={styles.error}>

                        <p>{error}</p>

                        <Button
                            onClick={loadSuppliers}
                        >

                            Try Again

                        </Button>

                    </div>

                )}


                {!loading &&
                !error &&
                filteredSuppliers.length === 0 && (

                    <p className={styles.empty}>

                        {searchValue

                            ? "No suppliers match your search."

                            : "No suppliers found."

                        }

                    </p>

                )}


                {!loading &&
                !error &&
                filteredSuppliers.length > 0 && (

                    <div className={styles.tableWrapper}>

                        <table className={styles.table}>

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Supplier</th>

                                    <th>Contact Person</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Address</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredSuppliers.map(

                                    (supplier) => (

                                        <tr
                                            key={supplier.id}
                                        >

                                            <td>
                                                {supplier.id}
                                            </td>


                                            <td>

                                                <strong>

                                                    {
                                                        supplier.name
                                                    }

                                                </strong>

                                            </td>


                                            <td>

                                                {
                                                    supplier.contact_person ||
                                                    "—"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    supplier.email ||
                                                    "—"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    supplier.phone ||
                                                    "—"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    supplier.address ||
                                                    "—"
                                                }

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
                                                                supplier
                                                            )
                                                        }

                                                    >

                                                        Edit

                                                    </Button>


                                                    <Button

                                                        variant="danger"

                                                        onClick={() =>
                                                            handleDelete(
                                                                supplier
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

        </>

    );

}


export default Suppliers;