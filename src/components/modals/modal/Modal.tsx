import { useState, type FunctionComponent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
import { LiaSave } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  children: ReactNode;
  onSubmit: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ children, onSubmit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true); // the defult should be false

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return createPortal(
    <div className={`modal ${!isOpen && "closed"}`}>
      <div onClick={handleCloseModal} className="modal-overlay"></div>
      <div className="modal-content">
        {children}
        <div className="modal-controlles">
          <button className="modal-btn submit" onClick={onSubmit}>
            <i>
              <LiaSave />
            </i>
            Save
          </button>
          <button className="modal-btn" onClick={handleCloseModal}>
            <i>
              <IoMdClose />
            </i>
            Cancle
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
