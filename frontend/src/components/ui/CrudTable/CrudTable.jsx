import Table from "../Table/Table";
import ActionButtons from "../ActionButtons/ActionButtons";

function CrudTable({

    columns,

    data,

    loading,

    error,

    emptyMessage,

    sortField,

    onSort,

    onEdit,

    onDelete

}) {

    return (

        <Table

            columns={columns}

            data={data}

            loading={loading}

            error={error}

            emptyMessage={emptyMessage}

            sortField={sortField}

            onSort={onSort}

            renderActions={(item) => (

                <ActionButtons

                    onEdit={() => onEdit(item)}

                    onDelete={() => onDelete(item)}

                />

            )}

        />

    );

}

export default CrudTable;