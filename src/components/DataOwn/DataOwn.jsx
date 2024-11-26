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

  return (
    <div id="dataOwn">
      <div className="container">
        <div className="dataOwn">
          <div className="dateInput">
            <div className="table-container">
              <table className="styled-table-horizontal">
                <thead>
                  <tr>
                    <th>Колдонуучу</th>
                    <th>Маалымат 1</th>
                    <th>Маалымат 2</th>
                    <th>Маалымат 3</th>
                    <th>Маалымат 4</th>
                    <th>Маалымат 5</th>
                    <th>Маалымат 6</th>
                    <th>Маалымат 7</th>
                    <th>Маалымат 8</th>
                    <th>Маалымат 9</th>
                    <th>Маалымат 10</th>
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
                        <th>{el.dataInput10}</th>
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
      <th>Маалымат 1</th>
      <th>Маалымат 2</th>
      <th>Маалымат 3</th>
      <th>Маалымат 4</th>
      <th>Маалымат 5</th>
      <th>Маалымат 6</th>
      <th>Маалымат 7</th>
      <th>Маалымат 8</th>
      <th>Маалымат 9</th>
      <th>Маалымат 10</th>
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
          <th>  
             <input
           className="modalOwnInput"
                name="dataInput10"
                value={formData.dataInput10}
                onChange={handleChange}
              /></th>
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
