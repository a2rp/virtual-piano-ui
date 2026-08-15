import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Notifications = ({ theme }) => {
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
        />
    );
};

export default Notifications;
