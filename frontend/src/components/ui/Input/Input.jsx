import styles from "./Input.module.css";

function Input({

    label,

    error,

    ...props

}) {

    return (

        <div className={styles.inputGroup}>

            {

                label &&

                <label className={styles.label}>

                    {label}

                </label>

            }

            <input

                className={`${styles.input} ${error ? styles.errorInput : ""}`}

                {...props}

            />

            {

                error &&

                <p className={styles.errorText}>

                    {error}

                </p>

            }

        </div>

    );

}

export default Input;