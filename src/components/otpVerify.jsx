import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { verifyEmail } from '../services/auth';
import { ROUTES } from '../constants/routes';

const OtpVerifyModal = ({ setShowOtpModal, navigate }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.target.value;
    setOtp(newOtp);

    if (element.target.value.length === 1 && index < 5) {
      element.target.nextSibling?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    try {
      const response = await verifyEmail(code);
      if (response.success && response.message === "Email verified successfully") {
        setShowOtpModal(false); // Close the OTP modal
        navigate(ROUTES.LOGIN); // Redirect to login
      } else {
        setErrorMessage("Verification failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Internal server error");
    }
  };

  return (
    <Modal
      title="Enter Your OTP"
      open={true}
      onCancel={() => setShowOtpModal(false)}
      footer={[
        <Button key="cancel" onClick={() => setShowOtpModal(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      ]}
    >
      <div className="flex justify-center space-x-2">
        {otp.map((value, index) => (
          <Input
            className="text-center form-control"
            maxLength={1}
            key={index}
            value={value}
            onChange={(e) => handleChange(e, index)}
            style={{ width: '3rem', height: '3rem', fontSize: '1.5rem' }}
          />
        ))}
      </div>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
    </Modal>
  );
};

export default OtpVerifyModal;
