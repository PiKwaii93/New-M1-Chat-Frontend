import Input from "../../components/Input";
import Button from "../../components/Button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

Form.propTypes = {
  isSignInPage: PropTypes.bool,
};

function Form({ isSignInPage = false }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    ...(!isSignInPage && { full_name: "" }),
    email: "",
    password: "",
  });

  const resetInfos = () => {
    setInfos({ isDisplay: false, success: "", error: "" });
  };

  const [infos, setInfos] = useState({
    isDisplay: false,
    success: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetInfos();
    const res = await axios({
      method: "post",
      url: `http://localhost:4000/api/users/${
        isSignInPage ? "sign-in" : "sign-up"
      }`,
      data,
    }).catch((err) => {
      const data = err.response.data;
      setInfos({
        ...infos,
        isDisplay: true,
        error: data.error || "Oups something went wrong",
      });
    });

    if (res.data && !isSignInPage) {
      setInfos({ ...infos, isDisplay: true, success: res.data.success });
    }

    if (res.data.user) {
      const logginUser = res.data.user;
      localStorage.setItem("token", logginUser.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: logginUser.id,
          full_name: logginUser.full_name,
          email: logginUser.email,
        })
      );
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("data : >>>", data);
  }, [data]);
  return (
    <div className="bg-white w-[600px] h-[700px] shadow-lg rounded-xl flex flex-col justify-center items-center">
      <h2 className="text-4xl font-extrabold">
        Welcome {isSignInPage && "back"}
      </h2>
      <p className="text-xl font-light mb-14">
        {isSignInPage ? "Sign in to get explored" : "Sign up to get started"}
      </p>
      {infos.isDisplay && (
        <p className="text-xl font-light mb-14">
          {infos.success ? infos.success : infos.error}
        </p>
      )}

      <form
        className="flex flex-col items-center min-w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        {!isSignInPage && (
          <Input
            label="Full name"
            name="full_name"
            placeholder="Enter your full name"
            className="mb-8 w-[75%]"
            value={data.full_name}
            onChange={(e) => setData({ ...data, full_name: e.target.value })}
          />
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="mb-8 w-[75%]"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="mb-14 w-[75%]"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          label={isSignInPage ? "Sign in" : "Sign up"}
          type="submit"
          className="mb-4 w-[75%]"
        />
      </form>
      <p>
        {isSignInPage ? "Didn't have an account?" : "Already have an account?"}
        <span
          className="text-primary cursor-pointer underline"
          onClick={() => {
            resetInfos();
            navigate(isSignInPage ? "/sign_up" : "/sign_in");
          }}
        >
          {isSignInPage ? "Sign up" : "Sign in"}
        </span>
      </p>
    </div>
  );
}

export default Form;
