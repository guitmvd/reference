import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import spinnerLoadImg from "../../assets/img/spinner.svg";
import backImg from "../../assets/img/backround8.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const DataSearch = () => {
  const [inputValuePin, setInputValuePin] = useState("");
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueLastName, setInputValueLastName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  const { people } = useSelector((s) => s);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const adminPassword = "123";
  console.log(people, "peo");

  const warning = () => {
    toast.warning("Заполните пустые ячейки!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const error = () => {
    toast.error("Неправильный пароль!", {
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

  const exit = () => {
    setTimeout(() => {
      nav("/");
    }, 1500);
    setSpinnerLoad(true);
    setModal(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchByPin();
    }
  };

  const handleKeyDownAdmin = (e) => {
    if (e.key === "Enter") {
      goLoad();
    }
  };

  const btn = () => {
    if (inputValueName === "" || inputValueLastName === "") {
      warning();
    } else {
      setLoading(true);
      setInputValueLastName("");
      setInputValueName("");
      setTimeout(() => {
        nav(`/search/${inputValueLastName.trim()}/${inputValueName.trim()}`);
        setLoading(false);
      }, 2000);
    }
  };

  const searchByPin = () => {
    if (inputValuePin === "") {
      warning();
    } else {
      getApi();
      setLoading(true);
      setTimeout(() => {
        nav(`/user/pin/${inputValuePin}`);
        setInputValuePin("");
        setLoading(false);
      }, 1500);
    }
  };

  function goLoad() {
    if (adminPassword === pass) {
      setLoad(true);
      setTimeout(() => {
        nav("/admin");
      }, 2000);
      setLoad(true);
    } else if (pass === "") {
      warning();
    } else {
      error();
    }
  }

  const getApi = async () => {
    let res = await axios(
      // `https://api.openweathermap.org/data/2.5/weather?q=Dubai&units=metric&appid=6b4c292e3e049dbf64d6c2441cc77864&lang=ru`
      // `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=6b4c292e3e049dbf64d6c2441cc77864&lang=ru`
      // `https://jsonplaceholder.typicode.com/users`
      // `http://16.171.146.76/search/id/?q=3`
      `http://16.171.146.76/search/id/?q=${inputValuePin}`
    );
    let { data } = await res;
    console.log(res);
    dispatch({ type: "GET", payload: data.results.users });
  };

  useEffect(() => {
    getApi();
  }, []);
  return (
    <div
      style={{
        background: `url(${backImg}) no-repeat center/cover`,
      }}
      id="dataSearch"
    >
      <div className="container">
        <div className="dataSearch">
          <div className="dateInput">
            <label>ПИН</label>
            <input
              onChange={(e) => setInputValuePin(e.target.value)}
              type="text"
              value={inputValuePin}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="dateInput">
            <label>Фамилия</label>
            <input
              onChange={(e) => setInputValueLastName(e.target.value)}
              type="text"
              value={inputValueLastName}
            />
          </div>
          <div className="dateInput">
            <label>Имя</label>
            <input
              onChange={(e) => setInputValueName(e.target.value)}
              type="text"
              value={inputValueName}
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {inputValuePin ? (
              <button onClick={searchByPin}>
                <MdPersonSearch />
              </button>
            ) : (
              <button onClick={btn}>
                <MdPersonSearch />
              </button>
            )}
          </div>
        </div>
      </div>
      {adminModal ? (
        <div className="data-admin-all">
          <div className="data-admin">
            <TiDelete onClick={() => setAdminModal(false)} className="rem" />
            <input
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="Пароль..."
              onKeyDown={handleKeyDownAdmin}
            />

            <button onClick={() => goLoad()}>Войти</button>
            <img
              src={spinnerLoadImg}
              alt="img"
              style={{
                border: "50%",
                position: "absolute",
                top: "100px",
                display: load ? "block" : "none",
                zIndex: "499",
              }}
            />
          </div>
        </div>
      ) : null}
      <div className="exit">
        <button onClick={() => setModal(!modal)} className="btn-exit">
          <ImExit />
        </button>
        <button onClick={() => setAdminModal(true)} className="btn-admin">
          <RiAdminFill />
        </button>
      </div>
      {modal ? (
        <div className="modal">
          <h2>Вы уверены что хотите выйти?</h2>
          <div className="modal-btn">
            <button onClick={() => setModal(false)}>Нет</button>
            <button onClick={() => exit()}>Да</button>
          </div>
        </div>
      ) : null}
      <img
        src={spinnerLoadImg}
        alt="img"
        style={{
          border: "50%",
          position: "absolute",
          top: "220px",
          left: "44%",
          display: spinnerLoad ? "block" : "none",
          zIndex: "499",
          margin: "0 auto",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className=""
      >
        <img
          src={spinnerLoadImg}
          alt="img"
          style={{
            border: "50%",
            position: "absolute",
            top: "160px",
            display: loading ? "block" : "none",
            zIndex: "499",
          }}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default DataSearch;
