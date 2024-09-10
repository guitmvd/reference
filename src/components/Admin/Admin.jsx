import React, { useState, useContext } from "react";
import { ImListNumbered } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Admin = () => {
  const [valueName, setValueName] = useState("");
  const [valuePin, setValuePin] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [editId, setEditId] = useState(null);
  const { userss } = useSelector((s) => s);
  const dispatch = useDispatch();
  const nav = useNavigate();
  console.log(userss, "dfdfd");

  const error = () => {
    toast.error("Такой участник уже существует!", {
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
    toast.success("Участник успешно добавлено!", {
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

  const edit = (item) => {
    setValueName(item.name);
    setValuePin(item.pin);
    setValuePassword(item.pass);
    setEditId(item.id);
  };

const addUserss = () => {
  if (
    valueName.trim() === "" ||
    valuePin.trim() === "" ||
    valuePassword.trim() === ""
  ) {
    warning();
    return;
  }

  if (userss.some((el) => el.pin === valuePin && el.id !== editId)) {
    error();
    return;
  }

  if (editId) {
    // Режим редактирования - обновляем пароль существующего пользователя
    const updatedUsers = userss.map((user) =>
      user.id === editId ? { ...user, pass: valuePassword, name: valueName } : user,
    );
    dispatch({ type: "UPDATE_USERSS", payload: updatedUsers });
    localStorage.setItem("userss", JSON.stringify(updatedUsers));
  } else {
    // Режим добавления нового пользователя
    const newUser = {
      id: userss.length ? userss[userss.length - 1].id + 1 : 1,
      name: valueName,
      pin: valuePin,
      pass: valuePassword,
    };
    dispatch({ type: "ADD_USERSS", payload: newUser });
    localStorage.setItem("userss", JSON.stringify([...userss, newUser]));
  }

  setValueName("");
  setValuePin("");
  setValuePassword("");
  setEditId(null);
  success();
};


  const del = (btnId) => {
    dispatch({ type: "DELETE", payload: btnId.id });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUserss();
    }
  };

  return (
    <section id="admin">
      <div className="container">
        <div className="user-back">
          <button
            onClick={() => nav("/dataSearch")}
            style={{ cursor: "pointer" }}
          >
            <RiArrowGoBackFill />
          </button>
        </div>
        <h1>Пользователи</h1>
        <div className="admin">
          <input
            type="text"
            onChange={(e) => setValueName(e.target.value)}
            placeholder="Имя Фамилия"
            value={valueName}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            onChange={(e) => setValuePin(e.target.value)}
            placeholder="ИНН"
            value={valuePin}
            onKeyDown={handleKeyDown}
            disabled={editId !== null}
          />
          <input
            type="text"
            onChange={(e) => setValuePassword(e.target.value)}
            placeholder="Пароль"
            value={valuePassword}
            onKeyDown={handleKeyDown}
          />
          <button
            style={{
              background: editId ? "red" : "green",
            }}
            onClick={addUserss}
          >
            {editId ? "Обновить" : "Добавить"}
          </button>
        </div>
        <table className="table">
          <thead>
            <tr scope="col">
              <th>
                <ImListNumbered />
              </th>
              <th scope="col">Имя Фамилия</th>
              <th scope="col">ИНН</th>
              <th scope="col">Пароль</th>
              <th scope="col">Actions</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userss.map((el, idx) => (
              <tr
                key={el.id}
                style={{ background: "rgb(87, 111, 184)" }}
              >
                <th scope="row">{idx + 1}</th>
                <td>{el.name}</td>
                <td>{el.pin}</td>
                <td>{el.pass}</td>
                <td>
                  <button
                    style={{ background: "rgb(42, 194, 18)" }}
                    onClick={() => edit(el)}
                  >
                    Изменить
                  </button>
                </td>
                <td>
                  <button
                    style={{ background: "red" }}
                    onClick={() => del(el)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Admin;

