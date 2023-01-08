import React from 'react';
import { toast } from 'react-toastify';

const ErrorMessage = ({ errorMessage }) => {
    errorMessage&&toast.warn(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    return (
        <div className='error_message_container'>
            
        </div>
    )
}


export default ErrorMessage;