import toast from "react-hot-toast";

function useNotification() {
  const showError = () => {
    toast.error("Network unreachable to server");
  };
  return [showError];
}

export default useNotification;
