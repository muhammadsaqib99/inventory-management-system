import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Card from "../../components/ui/Card/Card";

import styles from "./CrudPage.module.css";

function CrudPage({

    title,

    subtitle,

    form,

    children

}) {

    return (

        <div className={styles.container}>

            <PageTitle

                title={title}

                subtitle={subtitle}

            />

            {

                form

            }

            <Card>

                {

                    children

                }

            </Card>

        </div>

    );

}

export default CrudPage;