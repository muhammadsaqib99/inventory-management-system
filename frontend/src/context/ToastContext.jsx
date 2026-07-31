import { createContext, useState } from "react";

import Toast from "../components/ui/Toast/Toast";

export const ToastContext = createContext();

function ToastProvider({ children }) {

    const [toast, setToast] = useState({

        show: false,

        message: "",

        type: "success"

    });

    function showToast(message, type = "success") {

        setToast({

            show: true,

            message,

            type

        });

        setTimeout(() => {

            setToast({

                show: false,

                message: "",

                type: "success"

            });

        }, 3000);

    }

    return (

        <ToastContext.Provider

            value={{

                showToast

            }}

        >

            {children}

            {

                toast.show &&

                <Toast

                    message={toast.message}

                    type={toast.type}

                />

            }

        </ToastContext.Provider>

    );

}

export default ToastProvider;