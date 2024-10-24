import React, { useEffect, useState } from "react";
import UserAPI from "../apis/user";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [statePassWord, setStatePassWord] = useState(
    state?.flag || "Change New Password"
  );
  const [input, setInput] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  const changeInput = (event) => {
    setInput(() => {
      return {
        ...input,
        email:
          event.target?.name === "email" ? event.target?.value : input.email,
        password:
          event.target?.name === "password"
            ? event.target?.value
            : input.password,
        newPassword:
          event.target?.name === "newPassword"
            ? event.target?.value
            : input.newPassword,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      if (statePassWord === "Change New Password") {
        const { meta } = await UserAPI.login()[0]
        const result = await UserAPI.changePassword(meta.id, input);
        return toast.success(result.message, {pauseOnFocusLoss: false, pauseOnHover: false})
      }
      if (statePassWord === "Forgot password") {
        const result = await UserAPI.resetPassword(input.email);
        if (result?.error) {
          toast.error(result.error)
          return 
        }
        toast.success(result.message, {pauseOnFocusLoss: false, pauseOnHover: false})
        return navigate("/forgot-password")
      }
      // window.location.replace("http://localhost:3001/");
    } catch (error) {
      alert(error.message || "Đăng nhập thất bại");
    }
  };
  return (
    <section className="max-padd-container flexCenter flex-col pt-32 bg-primary">
      <div className="w-full max-2-[666px] h-[600px] bg-primary m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{statePassWord}</h3>
        <div className="flex flex-col gap-4 mt-7">
          <input
            onChange={(e) => changeInput(e)}
            name="email"
            type={"email"}
            placeholder="Your Email"
            className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
          />
          {statePassWord === "Change New Password" ? (
            <>
              <input
                onChange={(e) => changeInput(e)}
                name="password"
                type={"password"}
                placeholder="Your Pass"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
              />
              <input
                onChange={(e) => changeInput(e)}
                name="newPassword"
                type={"newPassword"}
                placeholder="New Pass"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
              />
            </>
          ) : (
            ""
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="btn-dark rounded-xl my-5 !py-1"
        >
          Countinue
        </button>

        {statePassWord === "Forgot Password" ? (
          <>
            <p className="text-black font-bold">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-secondary underline cursor-pointer"
              >
                Login
              </span>
            </p>
            <p className="text-black font-bold">
              Already have an account? Want to improve password?{" "}
              <span
                onClick={() => setStatePassWord("Change New Password")}
                className="text-secondary underline cursor-pointer"
              >
                Change New PassWord
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="text-black pb-2 font-bold">
              Create An Account{" "}
              <span
                onClick={() => setStatePassWord("Sign Up")}
                className="text-secondary underline cursor-pointer"
              >
                Click Here!
              </span>
            </p>
            <p className="text-black pb-2 font-bold">
              Forgot Password{" "}
              <span
                onClick={() => setStatePassWord("Forgot Password")}
                className="text-secondary underline cursor-pointer"
              >
                Click Here!
              </span>
            </p>
          </>
        )}
        <div className="flexStart mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By countinue, I agree the terms of use & privacy policy!!</p>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
