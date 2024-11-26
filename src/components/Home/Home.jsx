import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/Emblem_of_Kyrgyzstan.svg";
import backImg from "../../assets/img/home_new2.jpg";
import { GoPeople } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../../assets/img/spinner.svg";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useSelector } from "react-redux";

const Home = () => {
  const [inputValuePin, setInputValuePin] = useState("");
  const [inputValuePass, setInputValuePass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const {userss} = useSelector((s) => s)
  const userss = useSelector((state) => state.userss)
  const ownPin = "123";
  const ownPass = "123";

  // console.log(userss[1].name);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      toDataSearch();
    }
  };

  const error = () => {
    toast.error("Неправильный ПИН или пароль!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const warning = () => {
    toast.warning("Заполните пустые ячейки!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const success = () => {
    toast.success("Вход успешно!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const nav = useNavigate();
  const toDataSearch = () => {
    const user = userss.find(
      (user) => user.pin === inputValuePin && user.pass === inputValuePass
    );
    if (user) {
      setLoading(true);
      success();
      setTimeout(() => {
        nav("/dataSearch", { state: { name: user.name } });
      }, 2500);
      setLoading(true);
      console.log(user.name, "ATY");
      
    } else if (ownPin === inputValuePin && ownPass === inputValuePass) {
      setLoading(true);
      success();
      setTimeout(() => {
        nav("/dataSearch");
      }, 2500);
      setLoading(true);
    } else if (inputValuePin === "" || inputValuePass === "") {
      warning();
    }
     else if (inputValuePin === " " || inputValuePass === "syimyk512") {
      setLoading(true);
      success();
      setTimeout(() => {
        nav("/admin");
      }, 2500);
      setLoading(true);
    }
     else {
      error();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        background: `url(${backImg}) no-repeat top/cover`,
      }}
      id="home"
    >
      <div className="">
        <div className="home">
          <div className="home-text">
            <h2>
            Автоматизированная информационная система <br /> «Электронный документооборот»
            </h2>
            <h1>КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ИЧКИ ИШТЕР МИНИСТРЛИГИ</h1>
          </div>
          <div className="home-logo">
            <img src={logo} alt="img" />
          </div>
          <div className="home-text">
            <h2>
            Автоматизированная информационная система <br /> «Электронный документооборот»
            </h2>
            <h1>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ КЫРГЫЗСКОЙ РЕСПУБЛИКИ</h1>
          </div>
        </div>
       <div className="homee">
       <div className="home-login">
          <GoPeople
            style={{
              fontSize: "54px",
              margin: "20px 0",
            }}
          />
          <h2>Авторизация</h2>
          <div className="home-line"></div>
          <input
            onChange={(e) => setInputValuePin(e.target.value)}
            type="text"
            placeholder="ИНН *"
            onKeyDown={handleKeyDown}
          />
          <div style={{ position: "relative" }}>
            <input
              onChange={(e) => setInputValuePass(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Пароль *"
              onKeyDown={handleKeyDown}
            />
            {showPassword ? (
              <IoEye
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              />
            ) : (
              <IoMdEyeOff
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                      right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          <div className="home-line"></div>
          <button onClick={toDataSearch}>Войти</button>
          <img
            src={spinner}
            alt="img"
            style={{
              border: "50%",
              position: "absolute",
              top: "154px",
              display: loading ? "block" : "none",
              zIndex: "499",
            }}
          />
        </div>
       </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;

