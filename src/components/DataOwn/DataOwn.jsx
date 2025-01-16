import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../redux/actions";
import { useLocation } from "react-router-dom";

const DataOwn = () => {
    const [editItem, setEditItem] = useState(null);
    const [formData, setFormData] = useState({});
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const location = useLocation();
    const userName = location.state?.name || "Белгисиз"; // Маалыматты алуу
    console.log(userName, "UsNAaty OWN");

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData(item);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateData(editItem.id, formData));
    setEditItem(null); // Модалды жаап коюу
  };

  const totalM1 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput1);
  }, 0);
  const totalM2 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput2);
  }, 0);
  const totalM3 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput3);
  }, 0);
  const totalM4 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput4);
  }, 0);
  const totalM5 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput5);
  }, 0);
  const totalM6 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput6);
  }, 0);
  const totalM7 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput7);
  }, 0);
  const totalM8 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput8);
  }, 0);
  const totalM9 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
    return (acc += +el.dataInput9);
  }, 0);
  // const totalM10 = data.filter((el) => el.dataInputName === userName).reduce((acc, el) => {
  //   return (acc += +el.dataInput10);
  // }, 0);

  return (
    <div id="dataOwn">
      <div className="container">
        <div className="dataOwn">
          <div className="dateInput">
            <div className="table-container">
              <table className="styled-table-horizontal">
                <thead>
                  <tr>
                  <th>Кызматкер</th>
          <th>Справки</th>
          <th>Пост ЦПГУ      </th>
          <th>Треб Мил</th>
          <th>Влитие Карт</th>
          <th>Актуал</th>
          <th>АКТ СУД РЕЕСТ</th>
          <th>Пост ПРЕКР</th>
          <th>Пост Объявление</th>
          <th>Истребование</th>
                    {/* <th>Маалымат 10</th> */}
                    <th>Убакыт</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.filter((el) => el.dataInputName === userName).map((el, idx) => (
                      <tr key={idx}>
                        {/* <th>{el.dataInputName}</th> */}
                        <th>{el.dataInputName}</th>
                        <th>{el.dataInput1}</th>
                        <th>{el.dataInput2}</th>
                        <th>{el.dataInput3}</th>
                        <th>{el.dataInput4}</th>
                        <th>{el.dataInput5}</th>
                        <th>{el.dataInput6}</th>
                        <th>{el.dataInput7}</th>
                        <th>{el.dataInput8}</th>
                        <th>{el.dataInput9}</th>
                        {/* <th>{el.dataInput10}</th> */}
                        <th>
                          <h4>{el.timestamp}</h4>
                        </th>
                        <th>
                          <button
                            className="btn-own-update"
                            onClick={() => handleEdit(el)}
                          >
                            Изменить
                          </button>
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">Маалымат табылган жок</td>
                    </tr>
                  )}
                </tbody>
                <tbody>
                <tr style={{
                  background: "#19556d",
                  color: "white"
                }}>
                        <th>
                          <h2>Баары</h2>
                        </th>
                        <th>
                          <h2>{totalM1}</h2>
                        </th>
                        <th>
                          <h2>{totalM2}</h2>
                        </th>
                        <th>
                          <h2>{totalM3}</h2>
                        </th>
                        <th>
                          <h2>{totalM4}</h2>
                        </th>
                        <th>
                          <h2>{totalM5}</h2>
                        </th>
                        <th>
                          <h2>{totalM6}</h2>
                        </th>
                        <th>
                          <h2>{totalM7}</h2>
                        </th>
                        <th>
                          <h2>{totalM8}</h2>
                        </th>
                        <th>
                          <h2>{totalM9}</h2>
                        </th>
                        {/* <th>
                          <h2>{totalM10}</h2>
                        </th> */}
                        <th>
                          <h2></h2>
                        </th>
                        <th>
                          <h2></h2>
                        </th>
                      </tr>
                </tbody>
              </table>
            </div>
          </div>
{editItem && (
    <div className="modalOwn">
        <h1>Маалымат өзгөртүү </h1>
        <div className="table-container">
<table className="styled-table-horizontal">
  <thead>
    <tr>
    <th>Справки</th>
          <th>Пост ЦПГУ</th>
          <th>Треб Мил</th>
          <th>Влитие Карт</th>
          <th>Актуал</th>
          <th>АКТ СУД РЕЕСТ</th>
          <th>Пост ПРЕКР</th>
          <th>Пост Объявление</th>
          <th>Истребование</th>
      {/* <th>Маалымат 10</th> */}
    </tr>
  </thead>
  <tbody>
        <tr>
          <th><input
          className="modalOwnInput"
                name="dataInput1"
                value={formData.dataInput1}
                onChange={handleChange}
              />
          </th>
          <th><input
           className="modalOwnInput"
                name="dataInput2"
                value={formData.dataInput2}
                onChange={handleChange}
              /></th>
          <th> <input
           className="modalOwnInput"
                name="dataInput3"
                value={formData.dataInput3}
                onChange={handleChange}
              /></th>
          <th> <input
           className="modalOwnInput"
                name="dataInput4"
                value={formData.dataInput4}
                onChange={handleChange}
              /></th>
          <th> <input
           className="modalOwnInput"
                name="dataInput5"
                value={formData.dataInput5}
                onChange={handleChange}
              /></th>
          <th> <input
           className="modalOwnInput"
                name="dataInput6"
                value={formData.dataInput6}
                onChange={handleChange}
              /></th>
          <th><input
           className="modalOwnInput"
                name="dataInput7"
                value={formData.dataInput7}
                onChange={handleChange}
              /></th>
          <th><input
           className="modalOwnInput"
                name="dataInput8"
                value={formData.dataInput8}
                onChange={handleChange}
              /></th>
          <th>  <input
           className="modalOwnInput"
                name="dataInput9"
                value={formData.dataInput9}
                onChange={handleChange}
              /></th>
          {/* <th>  
             <input
           className="modalOwnInput"
                name="dataInput10"
                value={formData.dataInput10}
                onChange={handleChange}
              /></th> */}
        </tr>
  </tbody>
</table>
</div>
<div className="modalBtns">
<button className="btn-own-save" onClick={handleSave}>Сактоо</button>
<button className="btn-own-close" onClick={() => setEditItem(null)}>Жабуу</button>
</div>
</div>
)}
        </div>
      </div>
    </div>
  );
};
export default DataOwn;
