import styles from "./Pagination.module.css";

function Pagination({

    currentPage,

    totalPages,

    onPageChange

}) {

    if (totalPages <= 1) {

        return null;

    }

    return (

        <div className={styles.pagination}>

            <button

                disabled={currentPage === 1}

                onClick={() => onPageChange(currentPage - 1)}

            >

                Previous

            </button>

            {

                [...Array(totalPages)].map((_, index) => (

                    <button

                        key={index}

                        className={

                            currentPage === index + 1

                                ? styles.active

                                : ""

                        }

                        onClick={() => onPageChange(index + 1)}

                    >

                        {index + 1}

                    </button>

                ))

            }

            <button

                disabled={currentPage === totalPages}

                onClick={() => onPageChange(currentPage + 1)}

            >

                Next

            </button>

        </div>

    );

}

export default Pagination;