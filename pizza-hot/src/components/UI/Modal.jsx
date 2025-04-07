import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    open ? modal.showModal() : modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="modal-box">
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
