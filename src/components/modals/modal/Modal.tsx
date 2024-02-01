import { useState, type FunctionComponent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
interface ModalProps {
  children: ReactNode;
}

const Modal: FunctionComponent<ModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true); // the defult should be false

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return createPortal(
    <div className={`modal ${!isOpen && "closed"}`}>
      <div onClick={handleCloseModal} className="modal-overlay"></div>
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
