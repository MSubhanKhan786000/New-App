import React from "react";
import { Modal } from "antd";

const CustomModal = ({ type, title, content, onClose }) => {
  const modalProps = {
    title: title || "Modal Title",
    content: content || "This is the content of the modal.",
    onOk: onClose,
    onCancel: onClose,
    centered: true,
  };

  switch (type) {
    case "info":
      Modal.info(modalProps);
      break;
    case "success":
      Modal.success(modalProps);
      break;
    case "warning":
      Modal.warning(modalProps);
      break;
    case "error":
      Modal.error(modalProps);
      break;
    default:
      Modal.info(modalProps);
  }

  return null; // Modal components are handled by Ant Design automatically
};

export default CustomModal;
