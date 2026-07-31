import Button from "../Button";
import styles from "./EmptyState.module.css";

function EmptyState({

    title = "No Data Found",

    subtitle = "",

    buttonText,

    onButtonClick

}) {

    return (

        <div className={styles.container}>

            <div className={styles.icon}>

                📂

            </div>

            <h3 className={styles.title}>

                {title}

            </h3>

            {

                subtitle && (

                    <p className={styles.subtitle}>

                        {subtitle}

                    </p>

                )

            }

            {

                buttonText && (

                    <Button

                        onClick={onButtonClick}

                    >

                        {buttonText}

                    </Button>

                )

            }

        </div>

    );

}

export default EmptyState;