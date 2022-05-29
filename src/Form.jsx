import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

let schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

function Form() {
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitFn = (val) => {
    console.log(val);
    setData(val);
  };

  return (
    <>
      <h1>My React Form</h1>
      <div className="container">
        <form className="myForm" onSubmit={handleSubmit(submitFn)}>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            id="firstName"
            {...register("firstName")}
          />
          <label htmlFor="firstName">{errors.firstName?.message}</label>

          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            id="lastName"
            {...register("lastName")}
          />
          <label htmlFor="lastName">{errors.lastName?.message}</label>

          <input
            type="text"
            id="age"
            placeholder="age"
            name="age"
            {...register("age")}
          />
          <label htmlFor="age">{errors.age && `Age should be a number`}</label>

          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            {...register("email")}
          />
          <label htmlFor="email">{errors.email?.message}</label>

          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            {...register("password")}
          />
          <label htmlFor="password">{errors.password?.message}</label>
          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <label htmlFor="confirmPassword">
            {errors.confirmPassword && "Passwords should match!"}
          </label>

          <button type="submit">Submit form</button>
        </form>

        <div className="formOutput">
          <p>First Name: {data.firstName}</p>
          <p>Last Name: {data.lastName}</p>
          <p>Age: {data.age}</p>
          <p>Email address: {data.email}</p>
        </div>
      </div>
    </>
  );
}

export default Form;
