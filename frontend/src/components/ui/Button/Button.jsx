import styles from "./Button.module.css";

function Button({

    children,

    type = "button",

    variant = "primary",

    onClick,

    disabled = false

}) {

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            className={`${styles.button} ${styles[variant]}`}

        >

            {children}

        </button>

    );

}

export default Button;