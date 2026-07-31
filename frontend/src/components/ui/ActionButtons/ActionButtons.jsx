import Button from "../Button";

import styles from "./ActionButtons.module.css";

function ActionButtons({

    onEdit,

    onDelete,

    editText = "Edit",

    deleteText = "Delete"

}) {

    return (

        <div className={styles.actions}>

            <Button

                variant="secondary"

                onClick={onEdit}

            >

                ✏ {editText}

            </Button>

            <Button

                variant="danger"

                onClick={onDelete}

            >

                🗑 {deleteText}

            </Button>

        </div>

    );

}

export default ActionButtons;