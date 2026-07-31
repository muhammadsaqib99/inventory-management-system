import styles from "./Select.module.css";

function Select({

    label,

    value,

    onChange,

    options,

    defaultOption = "Select"

}) {

    return (

        <div className={styles.group}>

            {

                label &&

                <label className={styles.label}>

                    {label}

                </label>

            }

            <select

                className={styles.select}

                value={value}

                onChange={onChange}

            >

                <option value="">

                    {defaultOption}

                </option>

                {

                    options.map((option) => (

                        <option

                            key={option.value}

                            value={option.value}

                        >

                            {option.label}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}

export default Select;