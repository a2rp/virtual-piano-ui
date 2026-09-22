import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import styles from "./styles.module.scss";

const Toast = ({ theme }) => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2600}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === "light" ? "light" : "dark"}
            className={styles.container}
            toastClassName={styles.toast}
            progressClassName={styles.progress}
        />
    );
};

export default Toast;
