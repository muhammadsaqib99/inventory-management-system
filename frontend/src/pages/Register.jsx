import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/authService";

import PageTitle from "../components/ui/PageTitle/PageTitle";
import Card from "../components/ui/Card/Card";
import Input from "../components/ui/Input/Input";
import Button from "../components/ui/Button/Button";

import { ROUTES } from "../constants/routes";

import useToast from "../hooks/useToast";

import styles from "./Register.module.css";


function Register() {

    const navigate = useNavigate();

    const { showToast } = useToast();


    const [form, setForm] = useState({

        username: "",
        email: "",
        password: ""

    });


    const [submitting, setSubmitting] =
        useState(false);


    function handleChange(e) {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: value

        }));

    }


    async function handleSubmit(e) {

        e.preventDefault();


        if (!form.username.trim()) {

            showToast(
                "Username is required.",
                "error"
            );

            return;

        }


        if (!form.email.trim()) {

            showToast(
                "Email is required.",
                "error"
            );

            return;

        }


        if (!form.password) {

            showToast(
                "Password is required.",
                "error"
            );

            return;

        }


        if (form.password.length < 8) {

            showToast(
                "Password must be at least 8 characters.",
                "error"
            );

            return;

        }


        setSubmitting(true);


        try {

            await register(

                form.username.trim(),
                form.email.trim(),
                form.password

            );


            showToast(

                "Registration successful. Please login.",

                "success"

            );


            navigate(ROUTES.LOGIN);

        }

        catch (error) {

            console.error(
                "REGISTER ERROR:",
                error
            );


            const data =
                error.response?.data;


            if (data?.username) {

                showToast(

                    Array.isArray(data.username)

                        ? data.username[0]

                        : data.username,

                    "error"

                );

            }

            else if (data?.email) {

                showToast(

                    Array.isArray(data.email)

                        ? data.email[0]

                        : data.email,

                    "error"

                );

            }

            else if (data?.password) {

                showToast(

                    Array.isArray(data.password)

                        ? data.password[0]

                        : data.password,

                    "error"

                );

            }

            else {

                showToast(

                    data?.detail ||
                    "Registration failed.",

                    "error"

                );

            }

        }

        finally {

            setSubmitting(false);

        }

    }


    return (

        <div className={styles.registerPage}>

            <PageTitle

                title="Create Account"

                subtitle="Register a new inventory system account"

            />


            <div className={styles.formWrapper}>

                <Card header="Register">

                    <form onSubmit={handleSubmit}>

                        <Input

                            label="Username"

                            type="text"

                            name="username"

                            placeholder="Enter username"

                            value={form.username}

                            onChange={handleChange}

                            disabled={submitting}

                        />


                        <Input

                            label="Email"

                            type="email"

                            name="email"

                            placeholder="Enter email"

                            value={form.email}

                            onChange={handleChange}

                            disabled={submitting}

                        />


                        <Input

                            label="Password"

                            type="password"

                            name="password"

                            placeholder="Enter password"

                            value={form.password}

                            onChange={handleChange}

                            disabled={submitting}

                        />


                        <Button

                            type="submit"

                            disabled={submitting}

                        >

                            {submitting

                                ? "Creating Account..."

                                : "Register"

                            }

                        </Button>

                    </form>

                </Card>

            </div>

        </div>

    );

}


export default Register;