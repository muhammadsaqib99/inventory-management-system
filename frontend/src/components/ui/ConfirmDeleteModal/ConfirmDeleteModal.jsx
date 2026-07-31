import Modal from "../Modal/Modal";

function ConfirmDeleteModal({

    isOpen,

    item,

    itemName = "item",

    onConfirm,

    onCancel

}) {

    return (

        <Modal

            isOpen={isOpen}

            title={`Delete ${itemName}`}

            message={

                item

                    ? `Are you sure you want to delete "${item.name}"?`

                    : ""

            }

            confirmText="Delete"

            cancelText="Cancel"

            onConfirm={onConfirm}

            onCancel={onCancel}

        />

    );

}

export default ConfirmDeleteModal;