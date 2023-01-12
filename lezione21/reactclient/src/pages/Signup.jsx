import React from "react";
import { Alert, Container } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const regexPassword = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  city: Yup.string().required("Required"),
  age: Yup.number().positive('Not Negative Number').required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().matches(
    regexPassword,
    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ).required("Required"),
});

export default function Signup() {

  const navigate = useNavigate();


  const saveUser = (obj) => {
    axios.post('http://localhost:3000/register', obj).then(response => {
        console.log(response.statusText);
        navigate("/users");
    });
  }

  return (
    <>
      <Container style={{ width: "600px" }}>
        <h2 className="my-3 text-center display-3">Register</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            city: "",
            age: 18,
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            saveUser(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="firstName"
                className="form-control mb-3"
                placeholder="Firstname..."
              />
              {errors.firstName && touched.firstName ? (
                <Alert variant={"danger"}> {errors.firstName} </Alert>
              ) : null}
              <Field
                name="lastName"
                className="form-control mb-3"
                placeholder="Lastname..."
              />
              {errors.lastName && touched.lastName ? (
                <Alert variant={"danger"}> {errors.lastName} </Alert>
              ) : null}
              <Field
                name="city"
                className="form-control mb-3"
                placeholder="City..."
              />
              {errors.city && touched.city ? (
                <Alert variant={"danger"}> {errors.city} </Alert>
              ) : null}
              <Field
                name="age"
                type="numnber"
                className="form-control mb-3"
                placeholder="Age..."
              />
              {errors.age && touched.age ? (
                <Alert variant={"danger"}> {errors.age} </Alert>
              ) : null}
              <Field
                name="email"
                type="email"
                className="form-control mb-3"
                placeholder="Email..."
              />
              {errors.email && touched.email ? (
                <Alert variant={"danger"}> {errors.email} </Alert>
              ) : null}
              <Field
                name="password"
                type="password"
                className="form-control mb-3"
                placeholder="Password..."
              />
              {errors.password && touched.password ? (
                <Alert variant={"danger"}> {errors.password} </Alert>
              ) : null}

              <button type="submit" className="form-control mb-3 btn btn-dark">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}
