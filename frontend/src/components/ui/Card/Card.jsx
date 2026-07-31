import styles from "./Card.module.css";

function Card({

    header,

    children,

    footer

}) {

    return (

        <div className={styles.card}>

            {

                header && (

                    <div className={styles.header}>

                        {header}

                    </div>

                )

            }

            <div className={styles.body}>

                {children}

            </div>

            {

                footer && (

                    <div className={styles.footer}>

                        {footer}

                    </div>

                )

            }

        </div>

    );

}

export default Card;