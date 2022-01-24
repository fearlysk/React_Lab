import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

type Props = {
  modalOpen: boolean;
  children: React.ReactNode;
};

const portal = document.getElementById("portal")!;

function Modal({ modalOpen, children }: Props) {
  if (!modalOpen) return null;

  return createPortal(<div className={styles.modal}>{children}</div>, portal);
}

export default Modal;
