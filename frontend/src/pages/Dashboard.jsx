import { useState } from "react";

import useAuth from "../hooks/useAuth";
import { testProtectedAPI } from "../services/apiService";
import { MESSAGES } from "../constants/messages";
import PageTitle from "../components/ui/PageTitle/PageTitle";
import Card from "../components/ui/Card/Card";
import Button from "../components/ui/Button/Button";
import Loader from "../components/ui/Loader/Loader";

function Dashboard() {

    const { token } = useAuth();

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    async function handleTestAPI() {

        setLoading(true);

        try {

            const data = await testProtectedAPI();

            setResult(data);

        }

        catch (error) {

            console.log(error);

            alert(MESSAGES.API_FAILED);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <>

            <PageTitle

                title="Dashboard"

                subtitle="Welcome to the React Django Starter Template"

            />

            <Card

                footer={

                    <p>

                        React Django Starter Template v1.0

                    </p>

                }

            >

                <p>

                    <strong>Authenticated:</strong>

                    {token ? " Yes ✅" : " No ❌"}

                </p>

                <Button

                    onClick={handleTestAPI}

                >

                    Test Protected API

                </Button>

                <br /><br />

                {

                    loading &&

                    <Loader

                          text={MESSAGES.LOADING_API}

                    />

                }

                {

                    result &&

                    <pre>

                        {JSON.stringify(result, null, 2)}

                    </pre>

                }

            </Card>

        </>

    );

}

export default Dashboard;