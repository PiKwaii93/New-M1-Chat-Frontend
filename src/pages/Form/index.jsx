import Input from "../../components/Input";
import Button from "../../components/Button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import Alert from "../../components/Alert";

Form.propTypes = {
  isSignInPage: PropTypes.bool,
};

function Form({ isSignInPage = false }) {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSocket(io(`${import.meta.env.VITE_URL_SOCKET}`));
  }, []);

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
      url: `${import.meta.env.VITE_URL_API}api/users/${
        isSignInPage ? "sign-in" : "sign-up"
      }`,
      data,
    }).catch((err) => {
      const data = err.response.data;
      setInfos({
        succes: "",
        isDisplay: true,
        error: data.error || "Oups something went wrong",
      });
    });

    if (res.data && !isSignInPage) {
      socket.emit("userCreatedOrUpdate");
      setInfos({ ...infos, isDisplay: true, success: res.data.success });
      setTimeout(() => {
        navigate("/sign_in");
        setInfos({ isDisplay: false, success: "", error: "" });
      }, "1500");
    }

    if (res.data.user) {
      console.log("res.data.user", res.data.user);
      const logginUser = res.data.user;
      localStorage.setItem("token", logginUser.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: logginUser.id,
          full_name: logginUser.full_name,
          email: logginUser.email,
          password: logginUser.password,
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
      <h2 className="text-4xl font-extrabold">Bienvenue</h2>
      <p className="text-xl font-light mb-14">
        {isSignInPage ? "Connectez-vous" : "Inscrivez-vous pour continuer"}
      </p>

      <Alert
        content={infos.success ? infos.success : infos.error}
        type={infos.success && "success"}
        isOpen={infos.isDisplay}
        className="w-[75%] mb-8"
      />

      <form
        className="flex flex-col items-center min-w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        {!isSignInPage && (
          <Input
            label="Nom d'utilisateur"
            name="full_name"
            placeholder="Entrer votre nom d'utilisateur"
            className="mb-8 w-[75%]"
            value={data.full_name}
            onChange={(e) => setData({ ...data, full_name: e.target.value })}
          />
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Entrez votre email"
          className="mb-8 w-[75%]"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          placeholder="Entrez votre mot de passe"
          className="mb-14 w-[75%]"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          label={isSignInPage ? "Se connecter" : "S'inscrire"}
          type="submit"
          className="mb-4 w-[75%]"
        />
      </form>
      <p>
        {isSignInPage ? "Pas de compte? " : "Vous avez déjà un compte? "}
        <span
          className="text-primary cursor-pointer underline"
          onClick={() => {
            resetInfos();
            navigate(isSignInPage ? "/sign_up" : "/sign_in");
          }}
        >
          {isSignInPage ? "S'inscrire" : "Se connecter"}
        </span>
      </p>
    </div>
  );
}

export default Form;
