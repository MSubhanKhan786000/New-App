import React, { useState, useRef } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { verifyEmail } from '../services/auth';
import { ROUTES } from '../constants/routes';

const { confirm } = Modal;

const OtpVerifyModal = ({ setShowOtpModal, navigate }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.target.value;
    setOtp(newOtp);

    if (element.target.value.length === 1 && index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 100);
    }
  };

  const showSubmitWarning = () => {
    Modal.warning({
      title: "Confirm OTP Submission",
      content: "Please confirm the OTP once again, otherwise you may need to request it again.",
      okText: "OK",
    });
  };
  

  const handleCancel = () => {
    confirm({
      title: "Are you sure you want to cancel?",
      icon: <ExclamationCircleOutlined />,
      content: "If you cancel, you'll need to request a new OTP.",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        setShowOtpModal(false);
      }
    });
  };

  const handleSubmit = async () => {
    showSubmitWarning();
  
    const code = otp.join("");
    try {
      const response = await verifyEmail(code);
      if (response.success && response.message === "Email verified successfully") {
        message.info("OTP verified. Navigating to the login screen...");
  
        // Wait briefly before navigating to allow the user to see the message
        setTimeout(() => {
          setShowOtpModal(false);
          navigate(ROUTES.LOGIN);
        }, 1500); // 1.5 seconds delay
      } else {
        setErrorMessage("Verification failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Internal server error");
    }
  };
  

  return (
    <Modal
      title="Enter Verification Code"
      open={true}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} type="default">
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      ]}
      centered
      bodyStyle={{ textAlign: 'center', padding: '20px' }}
      titleStyle={{ fontSize: '1.5rem', fontWeight: 'bold' }}
    >
      <p style={{ marginBottom: '16px', color: '#595959', fontSize: '1rem' }}>
        Please enter the 6-digit OTP sent to your email.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {otp.map((value, index) => (
          <Input
            key={index}
            value={value}
            onChange={(e) => handleChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            maxLength={1}
            style={{
              width: '3rem',
              height: '3rem',
              fontSize: '1.5rem',
              textAlign: 'center',
              borderRadius: '8px',
              border: '1px solid #d9d9d9',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
    </Modal>
  );
};

export default OtpVerifyModal;
