import { X } from "lucide-react";

function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          <X size={22} />
        </button>

        <h2>{title}</h2>

        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;