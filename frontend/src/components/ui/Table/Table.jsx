import Loader from "../Loader";
import Alert from "../Alert";
import styles from "./Table.module.css";
import EmptyState from "../EmptyState/EmptyState";

function Table({

    columns,

    data = [],

    renderActions,

    onSort,

    sortField,

    loading = false,

    error = null,

    emptyMessage = "No Data Found."

}) {

    
    // Loading
   

    if (loading) {

        return <Loader text="Loading..." />;

    }

    
    // Error
   

    if (error) {

        return (

            <Alert type="error">

                Something went wrong.

            </Alert>

        );

    }

   
    // Empty State
    

   if (data.length === 0) {

    return (

        <EmptyState

            title={emptyMessage}

        />

    );

}
   
    // Table
    

    return (

        <div className={styles.tableContainer}>

            <table className={styles.table}>

                <thead>

                    <tr>

                        {

                            columns.map((column) => (

                                <th

                                    key={column.key}

                                    onClick={() => onSort?.(column.key)}

                                    style={{

                                        cursor: onSort

                                            ? "pointer"

                                            : "default"

                                    }}

                                >

                                    {column.label}

                                    {

                                        sortField === column.key

                                            ? " ▲"

                                            : sortField === `-${column.key}`

                                            ? " ▼"

                                            : ""

                                    }

                                </th>

                            ))

                        }

                        {

                            renderActions &&

                            <th>

                                Actions

                            </th>

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        data.map((row) => (

                            <tr key={row.id}>

                                {

                                    columns.map((column) => (

                                        <td key={column.key}>

                                            {row[column.key]}

                                        </td>

                                    ))

                                }

                                {

                                    renderActions &&

                                    <td>

                                        {renderActions(row)}

                                    </td>

                                }

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Table;