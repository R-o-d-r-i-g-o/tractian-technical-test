import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfigs: ToastOptions<{}> = {
  className: 'custom-toast',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const useToast = () => ({
  success: (message: string) => toast.success(message, toastConfigs),
  failure: (message: string) => toast.error(message, toastConfigs),
  warning: (message: string) => toast.warn(message, toastConfigs),
});

export default useToast;