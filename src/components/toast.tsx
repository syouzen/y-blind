import { toast as toastify, ToastContent, ToastOptions } from "react-toastify";

interface ToastWrapperOptions<TData> extends ToastOptions<TData> {
  type?: "success" | "error" | "info" | "warning";
}

const toastId = "yb-toast-id";

function toast<TData = unknown>(
  content: ToastContent<TData>,
  options?: ToastWrapperOptions<TData>
) {
  const defaultOptions: ToastOptions<TData> = {
    closeButton: false,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: true,
    ...options,
  };

  if (toastify.isActive(toastId)) {
    toastify.update(toastId, {
      render: content,
      ...defaultOptions,
    });
  } else {
    toastify(content, {
      toastId,
      ...defaultOptions,
    });
  }
}

toast.success = (
  content: ToastContent<unknown>,
  options?: ToastWrapperOptions<unknown>
) => {
  toast(content, {
    ...options,
    type: "success",
  });
};

toast.error = (
  content: ToastContent<unknown>,
  options?: ToastWrapperOptions<unknown>
) => {
  toast(content, {
    ...options,
    type: "error",
  });
};

toast.info = (
  content: ToastContent<unknown>,
  options?: ToastWrapperOptions<unknown>
) => {
  toast(content, {
    ...options,
    type: "info",
  });
};

toast.warning = (
  content: ToastContent<unknown>,
  options?: ToastWrapperOptions<unknown>
) => {
  toast(content, {
    ...options,
    type: "warning",
  });
};

export { toast };
