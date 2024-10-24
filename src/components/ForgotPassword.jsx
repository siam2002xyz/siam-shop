import React, { useReducer, useState } from "react";
import UserAPI from "../apis/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { delay } from "../util/async";

const ForgotPassword = () => {
  const [input, changeInput] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      console.log(input)
      const result = await UserAPI.vertifyCodePassword(input)
      if (result.statusCode !== 200) {
        throw new Error(result?.message)
      }
      toast.success(result.message)
      await delay(2000)
      navigate("/login")
    } catch (error) {
      console.error(error)
      return toast.error(error.message)
    }
  }
  return (
    <section className="max-padd-container flexCenter flex-col pt-32 bg-primary">
      <div className="w-full max-2-[666px] h-[600px] bg-primary m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{"Vertify Email"}</h3>
        <div className="flex flex-col gap-4 mt-7">
          <input
            onChange={(e) => changeInput(e.target.value)}
            name="email"
            type={"text"}
            placeholder="Your Code"
            className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn-dark rounded-xl my-5 !py-1"
        >
          Countinue
        </button>
        <div className="flexStart mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By countinue, I agree the terms of use & privacy policy!!</p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
