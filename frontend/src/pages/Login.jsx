import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";

import { login as loginService } from "../services/authService";

import { ROUTES } from "../constants/routes";
import { MESSAGES } from "../constants/messages";

import PageTitle from "../components/ui/PageTitle";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import styles from "./Login.module.css";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        values,
        handleChange,
        resetForm
    } = useForm({

        username: "",
        password: ""

    });


    async function handleLogin(e) {

        e.preventDefault();

        try {

            const data = await loginService(

                values.username,
                values.password

            );

            login(
                data.access,
                data.refresh
            );

            alert(MESSAGES.LOGIN_SUCCESS);

            resetForm();

            navigate(ROUTES.DASHBOARD);

        }

        catch (error) {

            console.error(error);

            alert(MESSAGES.LOGIN_FAILED);

        }

    }


    return (

        <div className={styles.loginPage}>

            <PageTitle
                title="Login"
                subtitle="Sign in to continue"
            />


            <div className={styles.formWrapper}>

                <Card header="Account Login">

                    <form onSubmit={handleLogin}>

                        <Input

                            label="Username"

                            type="text"

                            name="username"

                            placeholder="Enter username"

                            value={values.username}

                            onChange={handleChange}

                        />


                        <Input

                            label="Password"

                            type="password"

                            name="password"

                            placeholder="Enter password"

                            value={values.password}

                            onChange={handleChange}

                        />


                        <Button
                            type="submit"
                        >
                            Login
                        </Button>

                    </form>

                </Card>

            </div>

        </div>

    );

}


export default Login;