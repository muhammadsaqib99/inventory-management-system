import styles from "./Alert.module.css";

function Alert({

    type = "info",

    children

}) {

    return (

        <div className={`${styles.alert} ${styles[type]}`}>

            {children}

        </div>

    );

}

export default Alert;