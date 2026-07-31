import styles from "./Modal.module.css";

function Modal({

    isOpen,

    title,

    message,

    onConfirm,

    onCancel,

    confirmText = "Confirm",

    cancelText = "Cancel"

}) {

    if (!isOpen) {

        return null;

    }

    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2>

                    {title}

                </h2>

                <p>

                    {message}

                </p>

                <div className={styles.actions}>

                    <button

                        className={styles.cancel}

                        onClick={onCancel}

                    >

                        {cancelText}

                    </button>

                    <button

                        className={styles.confirm}

                        onClick={onConfirm}

                    >

                        {confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Modal;