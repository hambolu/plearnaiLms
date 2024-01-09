import React, { useState } from "react";

const Modal = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
    onClose();
  };

  return isVisible ? (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <p>{message}</p>
        <button
  onClick={closeModal}
  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
  tabIndex={0}
>
  Close
</button>

      </div>
    </div>
  ) : null;
};

export default Modal;
