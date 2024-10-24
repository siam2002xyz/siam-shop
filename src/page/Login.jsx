import React, { useEffect, useState } from "react";
import UserAPI from "../apis/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const validateEmail = (e) => {
    const isEmail = String(e.target.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (e.target.value.trim() === "") {
      toast.error("email cannot be empty", {
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    }
    if (!isEmail) {
      toast.error("Not type email, please try again", {
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    }
  };
  
  const changeInput = (event) => {
    setInput(() => {
      return {
        ...input,
        username:
          event.target?.name === "username"
            ? event.target?.value
            : input.username,
        email:
          event.target?.name === "email" ? event.target?.value : input.email,
        password:
          event.target?.name === "password"
            ? event.target?.value
            : input.password,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      if (state === "Login") {
        const response = await UserAPI.login(input);
        if (!response?.statusCode) {
          throw new Error(response?.message);
        }
        // dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("id_user", response.meta[0].id);
        localStorage.setItem("user", JSON.stringify(response.meta[0]));
        alert(response.meta[0].message);
        // props.setLogin(true);
        navigate("/");
        window.location.reload();
      } else {
        const response = await UserAPI.register(input);
        if (!response?.statusCode) {
          throw new Error(response?.message || "");
        }
        alert(response.message);
        setState("Login");
        // window.location.reload();
      }
    } catch (error) {
      // console.log(error)
      toast.error(
        error?.message ||
          (state === "Sign Up" ? "Signup failed" : "Email or password incorrect"),
        {
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        }
      );
    }
  };

  return (
    <section className="max-padd-container flexCenter flex-col pt-32 bg-primary">
      <div className="w-full max-2-[666px] h-[600px] bg-primary m-auto px-14 py-10 rounded-md">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          <div className="flex flex-col gap-4">
            <input
              onChange={(e) => changeInput(e)}
              onBlur={(e) => validateEmail(e)}
              name="email"
              type={"email"}
              placeholder="Your Email"
              className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
            />
          </div>
          {state === "Sign Up" ? (
            <>
              <input
                onChange={(e) => changeInput(e)}
                onBlur={(e) => {
                  e.target.value.trim() === "" &&
                    toast.error("username cannot be empty");
                }}
                name="username"
                type="text"
                placeholder="Your Name"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
              />
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <input
                onChange={(e) => changeInput(e)}
                onBlur={(e) => {
                  e.target.value.trim() === "" &&
                    toast.error("password cannot be empty", {
                      pauseOnFocusLoss: false,
                      pauseOnHover: false,
                    });
                }}
                name="password"
                type={"password"}
                placeholder="Your Pass"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
              />
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="btn-dark rounded-xl my-5 !py-1"
        >
          Countinue
        </button>

        {state === "Sign Up" ? (
          <p className="text-black font-bold">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-secondary underline cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <>
            <p className="text-black pb-2 font-bold">
              Create An Account{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-secondary underline cursor-pointer"
              >
                Click Here!
              </span>
            </p>
            {/* <div className="py-4"> */}
            <p className="text-black pb-2 font-bold">
              Forgot Password{" "}
              <span
                onClick={() =>
                  navigate("/change-password", {
                    state: { id: 7, flag: "Forgot password" },
                  })
                }
                className="text-secondary underline cursor-pointer"
              >
                Click Here!
              </span>
            </p>
            <p className="text-black font-bold">
              Change new password{" "}
              <span
                onClick={() => navigate("/change-password")}
                className="text-secondary underline cursor-pointer"
              >
                Click Here!
              </span>
            </p>
            {/* </div> */}
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

export default Login;
