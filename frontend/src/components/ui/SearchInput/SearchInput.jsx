import styles from "./SearchInput.module.css";

function SearchInput({

    value,

    onChange,

    placeholder = "Search..."

}) {

    return (

        <div className={styles.container}>

            <input

                type="text"

                className={styles.input}

                placeholder={placeholder}

                value={value}

                onChange={onChange}

            />

        </div>

    );

}

export default SearchInput;