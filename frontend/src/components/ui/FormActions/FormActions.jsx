import Button from "../Button/Button";

import styles from "./FormActions.module.css";

function FormActions({

    isEditing,

    onCancel

}) {

    return (

        <div className={styles.actions}>

            <Button type="submit">

                {isEditing ? "Update" : "Create"}

            </Button>

            {

                isEditing && (

                    <Button

                        type="button"

                        onClick={onCancel}

                    >

                        Cancel

                    </Button>

                )

            }

        </div>

    );

}

export default FormActions;