import SearchInput from "../SearchInput/SearchInput";
import Select from "../Select/Select";

import styles from "./CrudToolbar.module.css";

function CrudToolbar({

    search,

    onSearch,

    filters = []

}) {

    return (

        <div className={styles.toolbar}>

            <SearchInput

                value={search}

                onChange={(e) =>

                    onSearch(e.target.value)

                }

                placeholder="Search..."

            />

            <div className={styles.filters}>

                {

                    filters.map((filter) => (

                        <Select

                            key={filter.name}

                            label={filter.label}

                            value={filter.value}

                            onChange={filter.onChange}

                            defaultOption={filter.defaultOption}

                            options={filter.options}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default CrudToolbar;