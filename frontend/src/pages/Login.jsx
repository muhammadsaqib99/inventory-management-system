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

import { setRefreshToken } from "../utils/storage";

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

            // Save Access Token in Context
            login(data.access);

            // Save Refresh Token
            setRefreshToken(data.refresh);

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

        <>

            <PageTitle

                title="Login"

                subtitle="Sign in to continue"

            />

            <Card>

                <form onSubmit={handleLogin}>

                    <Input

                        type="text"

                        name="username"

                        placeholder="Enter Username"

                        value={values.username}

                        onChange={handleChange}

                    />

                    <br /><br />

                    <Input

                        type="password"

                        name="password"

                        placeholder="Enter Password"

                        value={values.password}

                        onChange={handleChange}

                    />

                    <br /><br />

                    <Button

                        type="submit"

                    >

                        Login

                    </Button>

                </form>

            </Card>

        </>

    );

}

export default Login;