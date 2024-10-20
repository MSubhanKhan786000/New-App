import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { useState, useContext } from "react";
import HeroImg from "../assets/images/earn.png";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Import the UserContext

function Earn() {
  const { userInfo } = useContext(UserContext); // Get userInfo from context
  const { Formik } = formik;

  // Sample data for category and type handling
  const typesForMen = ["Shirt", "Pants", "Jacket"];
  const typesForWomen = ["Dress", "Skirt", "Blouse"];

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  // Yup schema for validation
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    buyPrice: yup.number().min(0, "Enter valid Price").nullable(),
    rentPrice: yup.number().min(0, "Enter valid Price").nullable(),
    status: yup.string().required("Status is required"),
    category: yup.string().required("Category is required"),
    type: yup.string().required("Type is required"),
    quantity: yup.number().min(0, "Quantity is required").nullable(),
    file: yup
      .mixed()
      .required("File is required")
      .test(
        "fileSize",
        "File too large. Maximum size is 5MB",
        (value) => value && value.size <= 5242880 // 5MB limit
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ),
  });

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "Men") {
      setType(typesForMen[0] || ""); // Set first type of men, or empty string
    } else if (selectedCategory === "Women") {
      setType(typesForWomen[0] || ""); // Set first type of women, or empty string
    }
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const renderTypeOptions = () => {
    if (category === "Men") {
      return typesForMen.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ));
    } else if (category === "Women") {
      return typesForWomen.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ));
    } else {
      return <option value="">Select Category First</option>;
    }
  };

  const handleFormSubmit = async (values, { resetForm, setFieldValue }) => {
    const { buyPrice, rentPrice, status, quantity } = values;
    const sellerId = localStorage.getItem("userId");

    if (status === "Buy" && !buyPrice) {
      alert("Buy Price is required when status is Buy");
      return;
    } else if (status === "Rent" && !rentPrice) {
      alert("Rent Price is required when status is Rent");
      return;
    } else if (status === "Both" && (!buyPrice || !rentPrice)) {
      alert("Both Buy and Rent Price are required when status is Both");
      return;
    }

    if (userInfo && userInfo.role === "seller") {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("buyPrice", Number(values.buyPrice));
      formData.append(
        "rentPrice",
        status === "Buy" ? null : Number(values.rentPrice)
      );
      formData.append("status", values.status);
      formData.append("category", values.category);
      formData.append("type", values.type);
      formData.append("image", values.file);
      formData.append("sellerId", sellerId);
      formData.append("quantity", values.quantity);
      formData.append("approvalStatus", "pending");

      try {
        const response = await axios.post(
          "http://localhost:5000/collections",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          alert("Product submitted successfully!");
          resetForm(); // Reset form fields after successful submission
          setFieldValue("file", null); // Reset file input manually
          setFieldValue("quantity", 1); // Reset quantity manually
        }
      } catch (error) {
        console.error("Error submitting product:", error);
        alert("There was an error submitting your product.");
      }
    } else {
      alert("You must be logged in as a seller to submit a product.");
    }
  };

  return (
    <>
      {/* hero section for earn with us */}
      <div className="bg-bg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* div for text on left */}
          <div
            className="
         flex flex-col justify-center items-center text-left md:text-left px-10 py-20 md:py-0 md-px-0 md:items-start
        md:pr-24 space-y-2"
          >
            <h3 className="text-white xl:text-4xl font-bold">
              <p>Earn with Us</p>
            </h3>
            <p className="">
              Why let your closet stay idle? Monetize it and rent your dresses
              to us to earn some cash on the side.
            </p>
            <Button variant="danger" className="mt-3">
              Browse Catalog
            </Button>
            <p className="text-sm text-red-700">
              Free shipping for orders over Rs. 40,000
            </p>
          </div>
          {/* div for image on right */}
          <div className="">
            <img
              src={HeroImg}
              alt=""
              className="w-[100%] md:w-[550px] xl:w-[650px] md:h-[400px]"
            />
          </div>
        </div>
      </div>
      {/* form for earn with us */}
      <div className="flex items-center justify-center min-h-screen">
        {/* top section of Earn With Us */}
        {/* Form for Earn with Us */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl mt-5 mb-20">
          <Formik
            validationSchema={schema}
            onSubmit={handleFormSubmit}
            initialValues={{
              name: "",
              description: "",
              buyPrice: "",
              rentPrice: "",
              status: "",
              category: "",
              type: "",
              file: null,
              quantity: 1,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={values.status}
                      onChange={(e) => {
                        handleChange(e);
                        handleStatusChange(e);
                      }}
                      isInvalid={!!errors.status}
                    >
                      <option value="">Choose...</option>
                      <option value="Buy">Buy</option>
                      <option value="Rent">Rent</option>
                      <option value="Both">Both</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="buyPrice">
                    <Form.Label>Buy Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="buyPrice"
                      value={values.buyPrice}
                      onChange={handleChange}
                      disabled={status === "Rent"}
                      isInvalid={!!errors.buyPrice}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.buyPrice}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="rentPrice">
                    <Form.Label>Rent Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="rentPrice"
                      value={values.rentPrice}
                      onChange={handleChange}
                      disabled={status === "Buy"}
                      isInvalid={!!errors.rentPrice}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.rentPrice}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      isInvalid={!!errors.quantity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.quantity}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      name="category"
                      value={values.category}
                      onChange={(e) => {
                        handleChange(e);
                        handleCategoryChange(e);
                      }}
                      isInvalid={!!errors.category}
                    >
                      <option value="">Choose...</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.category}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      value={values.type}
                      onChange={(e) => {
                        handleChange(e);
                        handleTypeChange(e);
                      }}
                      disabled={!category}
                      isInvalid={!!errors.type}
                    >
                      {renderTypeOptions()}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.type}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="file">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                      }}
                      isInvalid={!!errors.file}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.file}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button type="submit">Submit form</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Earn;
