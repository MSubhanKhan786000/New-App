import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import axios from "axios";
import { Modal, message } from "antd";

function Contact() {
  const { Formik } = formik;
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phoneNo: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be numeric"),
    email: yup.string().email("Invalid email").required("Email is required"),
    description: yup.string().required("Description is required"),
  });

  const handleSubmit = async (values, resetForm) => {
    setLoading(true);
  
    // Open confirmation modal
    Modal.confirm({
      title: "Confirm Submission",
      content: "Are you sure you want to submit this form?",
      onOk: async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/call",
            {
              fname: values.firstName,
              lname: values.lastName,
              pnumber: values.phoneNo,
              email: values.email,
              message: values.description,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          console.log("Response:", response.data);
          message.success(
            "Your request has been submitted successfully! Your representative will contact you in 24 hrs"
          );
          resetForm(); // Reset form fields after successful submission
        } catch (error) {
          console.error("Error:", error);
          // Check if the error response contains the specific message about the email already existing
          if (error.response && error.response.data.message === "Email already exists") {
            message.error("Email already exists.");
          } else {
            message.error("Something went wrong. Please try again later.");
          }
        } finally {
          setLoading(false);
        }
      },
      onCancel() {
        // Handle cancellation if needed
      },
    });
  
    setLoading(false); // Reset loading state after the submission attempt
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl mt-5 mb-20">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Request a Callback
        </h2>
        <p className="mb-5 text-gray-600">
          We understand that managing your products is important. By requesting
          a callback, you can inform us about your large product stock and
          discuss how we can help you manage your online sales through our
          eCommerce store. Our team will contact you to understand your needs
          and assist you in optimizing your rental and buying stats according to
          your status.
        </p>
        <Formik
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNo: "",
            email: "",
            description: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormik101"
                  className="position-relative"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                  />
                  <Form.Control.Feedback tooltip>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormik102"
                  className="position-relative"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                  />
                  <Form.Control.Feedback tooltip>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormikUsername2"
                >
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormik103"
                  className="position-relative"
                >
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone No"
                    name="phoneNo"
                    value={values.phoneNo}
                    onChange={handleChange}
                    isInvalid={!!errors.phoneNo}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.phoneNo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="position-relative mb-3">
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                  id="validationFormik106"
                  feedbackTooltip
                />
              </Form.Group>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white hover:bg-blue-700"
              >
                {loading ? "Submitting..." : "Submit form"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Contact;
