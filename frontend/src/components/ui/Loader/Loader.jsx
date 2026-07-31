import styles from "./Loader.module.css";

function Loader({

    text = "Loading..."

}) {

    return (

        <div className={styles.loader}>

            {text}

        </div>

    );

}

export default Loader;