import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { HiFolderDownload } from "react-icons/hi";
import { BsFillPrinterFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { Userss } from "../../API";
import { RiArrowGoBackFill } from "react-icons/ri";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";

const User = () => {
  const [modal, setModal] = useState(false);
  const { people } = useSelector((s) => s);
  const { id, pin } = useParams();
  const nav = useNavigate();

  const selectedUser = Userss.find(
    // const selectedUser = people.find(
    // (u) => u.id === parseInt(id) || u.id === parseInt(pin)
    (u) => u.id === parseInt(id) || u.pin === parseInt(pin)
  );

  if (!selectedUser) {
    return (
      <div className="container">
        <div className="user-back">
          <button
            onClick={() => nav("/dataSearch")}
            style={{
              cursor: "pointer",
            }}
          >
            {" "}
            <RiArrowGoBackFill />
          </button>
        </div>
        <div className="no-user">Такой данный не найден... ❌ </div>;
      </div>
    );
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    const imgElement = document.querySelector(".modal-img img");
    const imgData = imgElement.src;
    doc.addImage(imgData, "JPEG", 10, 10, 180, 160);
    doc.save("document.pdf");
  };

  const printImage = () => {
    const imgElement = document.querySelector(".modal-img img");
    const imgData = imgElement.src;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center
              height: 100%;
            }
            img {
              max-width: 100%;
              max-height: 100%;
            }
          </style>
        </head>
        <body>
          <img src="${imgData}" alt="Image to Print" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  useEffect(() => {}, []);

  return (
    <div id="user">
      <div className="container">
        <div className="user-back">
          <button
            onClick={() => nav("/dataSearch")}
            style={{
              cursor: "pointer",
            }}
          >
            {" "}
            <RiArrowGoBackFill />
          </button>
        </div>
        <div className="user">
          <div className="user-text">
            <div className="user-card">
              <span>Имя :</span>
              <h2>{selectedUser.name}</h2>
            </div>
            <div className="user-card">
              <span>Фамилия :</span>
              <h2>{selectedUser.lastName}</h2>
              {/* <h2>{selectedUser.username}</h2> */}
            </div>
            <div className="user-card">
              <span>Адрес :</span>
              <h2>{selectedUser.address}</h2>
              {/* <h2>{selectedUser.email}</h2> */}
            </div>
            <div className="user-card">
              <span>Телефон :</span>
              <h2>{selectedUser.phone}</h2>
            </div> 
            <div className="user-card">
              <span>Ден рождении :</span>
              <h2>{selectedUser.birth}</h2>
              {/* <h2>{selectedUser.website}</h2> */}
            </div>
          </div>
          <img src={selectedUser.img} alt="img" />
        </div>
        <h1 className="title-doc">ДОКУМЕНТЫ</h1>
        <div className="doc">
          <div className="user-doc">
            <button onClick={() => setModal(true)}>
              <FaArrowUpRightFromSquare />
            </button>
            <h2>С. о рождении</h2>
          </div>
          <div className="user-doc">
            <button onClick={() => setModal(true)}>
              <FaArrowUpRightFromSquare />
            </button>
            <h2>С. о работе</h2>
          </div>
          <div className="user-doc">
            <button onClick={() => setModal(true)}>
              <FaArrowUpRightFromSquare />
            </button>
            <h2>С. о место</h2>
          </div>
          <div className="user-doc">
            <button onClick={() => setModal(true)}>
              <FaArrowUpRightFromSquare />
            </button>
            <h2>С. о семья</h2>
          </div>
          <div className="user-doc">
            <button onClick={() => setModal(true)}>
              <FaArrowUpRightFromSquare />
            </button>
            <h2>С. о соц фонд</h2>
          </div>
          <div className="user-doc">
            <button onClick={() => setModal(true)}>
              <FaArrowUpRightFromSquare />
            </button>
            <h2>С. о пенсия</h2>
          </div>
          <div className="user-doc">
            <button onClick={() => setModal(true)}>
              <FaArrowUpRightFromSquare />
            </button>
            <h2>С. о жена</h2>
          </div>
        </div>
      </div>
      <div
        style={{
          display: modal ? "block" : "none",
          position: "fixed",
          zIndex: "1",
          paddingTop: "100px",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        {modal ? (
          <div className="modal-doc">
            <div className="modal-icons">
              <div className="modal-icons-ic">
                <HiFolderDownload onClick={generatePDF} />
                <BsFillPrinterFill onClick={printImage} />
                {/* <MdOutlineSendToMobile /> */}
              </div>
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setModal(false)}
              >
                {" "}
                <TiDelete />
              </span>
            </div>
            <div className="modal-img">
              <img
                // src="https://nimbusweb.me/wp-content/uploads/2023/05/Business-Insurance-Document-1.jpg"
                // src="https://data.kaktus.media/image/big/2024-04-25_10-39-11_545845.jpg"
                // src="https://www-old.knu.kg/ru/images/stories/2023/02_2023/24/pr_68/pr_68_01.jpg"
                src="https://economist.kg/content/images/wp-content/uploads/2022/10/ff928j9x0am3zwy.jpeg.jpg"
                alt="img"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default User;
