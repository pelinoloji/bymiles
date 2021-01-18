import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

const Signin = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be longer than 3 characters")
        .required(),
      password: Yup.string()
        .min(6, "Password must be longer than 6 characters")
        .required(),
    }),
    onSubmit: (values) => {
      getToken(values);
    },
  });

  async function getToken(values) {
    try {
      const requestConfig = {
        method: "post",
        url: "https://api.bybits.co.uk/auth/token",
        headers: { "Content-Type": "application/json", environment: "mock" },
        data: JSON.stringify({
          values,
        }),
      };
      const response = await axios.request(requestConfig);
      console.log(response, "sending data");
      setToken(response.data.access_token);
      router.push({
        pathname: "/mypolicy",
        state: {
          token,
        },
      });
    } catch (e) {
      alert("Something bad happened!");
    }
  }

  return (
    <div className="container">
      <h3 className="pageTitle">Sign In</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="username">User Name:</label>
            <input
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Username"
              id="username"
              type="text"
              name="username"
            />
            {touched.username && errors.username ? (
              <div className="errorMsg">{errors.username}</div>
            ) : null}
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              id="password"
              type="password"
              name="password"
            />
            {touched.password && errors.password ? (
              <div className="errorMsg">{errors.password}</div>
            ) : null}
          </div>
          <div className="buttonContainer">
            <button type="submit">Sign in</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
