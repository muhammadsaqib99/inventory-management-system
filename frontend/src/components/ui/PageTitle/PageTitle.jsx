import styles from "./PageTitle.module.css";

function PageTitle({

    title,

    subtitle

}) {

    return (

        <div className={styles.container}>

            <h1 className={styles.title}>

                {title}

            </h1>

            {

                subtitle && (

                    <p className={styles.subtitle}>

                        {subtitle}

                    </p>

                )

            }

        </div>

    );

}

export default PageTitle;