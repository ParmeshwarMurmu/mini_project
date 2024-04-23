import React, { memo, useEffect, useState } from "react";
import style from "../CSS/Main.module.css";
import { MdDelete } from "react-icons/md";


export const Main = memo(({ userData, deleteHandler }) => {

  
  return (
    <div className={style.user}>
      <table className={style.table}>
        <thead className={style.tableHead}>
          <tr className={style.tableRow}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className={style.tableBody}>
          {userData.length > 0 &&
            userData.map((item, index) => (
              <tr key={index}>
                <td className={style.tableData}>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>
                  <button
                  onClick={()=>{deleteHandler(index)}}
                  disabled={userData.length === 1}
                  >
                  <MdDelete  className={style.deleteBtn} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
});
