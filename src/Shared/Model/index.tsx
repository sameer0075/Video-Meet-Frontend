import React from 'react';
import { Modal } from 'antd';
import { ModelInterface } from './interface';

const CustomModel: React.FC<ModelInterface> = ({
    title,
    open,
    handleClose,
    handleSubmit,
    children,
  }) => {
  const handleClick = () => {
      handleSubmit();
  }
  return (
    <React.Fragment>
      <Modal
        title={title}
        centered
        open={open}
        onOk={handleClick}
        onCancel={handleClose}
      >
        {children}
      </Modal>
    </React.Fragment>
  );
};

export default CustomModel;