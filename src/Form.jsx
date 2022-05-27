import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitFn = (val) => console.log(val);

  return (
    <>
      <h1>My React Form</h1>
      <form onSubmit={handleSubmit(submitFn)}>
        <div className="myForm">
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

          <input type="text" id="age" placeholder="age" {...register("age")} />
          <label htmlFor="age">{errors.age?.message}</label>

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
        </div>
      </form>
    </>
  );
}

export default Form;
