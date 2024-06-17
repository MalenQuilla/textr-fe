import {Bounce, toast} from "react-toastify";

const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
}

export const Toaster = {

    ok(msg) {
        return toast.success(msg, options);
    },

    error(msg) {
        return toast.error(msg, options);
    },

    info(msg) {
        return toast.info(msg, options);
    },

    warn(msg) {
        return toast.warning(msg, options);
    },

    loading(msg) {
        return toast.loading(msg, options);
    },

    update(id, msg, type, isLoading) {
        toast.update(id, {
            render: msg,
            type: type,
            isLoading: isLoading,
            ...options});
    }
}