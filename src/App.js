import React, { useEffect, useState } from "react";
import "./App.css";
import { Sys_data } from "./sys csv";

const App = () => {
  let storedItem = JSON.parse(localStorage.getItem("key"));
  const [inp_sys, Setinp_sys] = useState("");
  const [inp_headen, Setinp_headen] = useState("");
  const [final_arr, setFinal_array] = useState([]);
  const [sys_err, setSys_err] = useState(false);
  const [head_err, setHead_err] = useState(false);
  const [sysblocker, setsysblocker] = useState(false);
  const [headblocker, setheadblocker] = useState(false);

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(final_arr));
  }, [final_arr]);

  const key = (e) => {
    if (e.key === "Enter") {
      display_table();
    }
  };

  const display_table = () => {
    if (inp_headen) {
      let obj = Sys_data.filter(
        (fil) => fil.Headend == inp_headen.toUpperCase()
      );
      let o = [...final_arr, ...obj];
      setFinal_array(o);
      if (obj.length > 0) {
        setHead_err(false);
      } else {
        setHead_err(true);
        document.getElementById("headen").focus();
      }
    }
    if (inp_sys) {
      let objs = Sys_data.filter((fil) => fil.Syscode == inp_sys);
      setFinal_array([...final_arr, ...objs]);
      if (objs.length > 0) {
        setSys_err(false);
      } else {
        setSys_err(true);
        document.getElementById("sys").focus();
      }
    }
  };

  const clear_table = () => {
    setFinal_array([]);
  };

  return (
    <div className="App">
      <h1>
        <span>Syscodes Search</span> - Effectv
      </h1>
      <div className="inp">
        <div className="input-class">
          <div className="inp_headen">
            <label htmlFor="headen">Headend</label>
            <input
              value={inp_headen}
              type="text"
              name="headen"
              id="headen"
              onChange={(e) => {
                Setinp_headen(e.target.value);
                Setinp_sys("");
              }}
              onKeyDown={key}
              className={head_err ? "err" : ""}
            />
          </div>
          <div className="inp_headen">
            <label htmlFor="sys">Syscodes</label>
            <input
              value={inp_sys}
              type="text"
              name="sys"
              id="sys"
              onChange={(e) => {
                Setinp_sys(e.target.value);
                Setinp_headen("");
              }}
              onKeyDown={key}
              className={sys_err ? "err" : ""}
            />
          </div>
          <button className="search-button" onClick={display_table}>
            Search
          </button>
          <button className="delete-button" onClick={clear_table}>
            Clear
          </button>
        </div>
      </div>
      <div>
        <table>
          {final_arr.length > 0 && (
            <tr>
              <th>Market Abbreviation</th>
              <th>Headend</th>
              <th>Syscode</th>
              <th>Zone</th>
              <th>XG Database</th>
              <th>Time Zone</th>
              <th>Retail Zones Per IC</th>
            </tr>
          )}
          {final_arr.map((f, i) => {
            return (
              <tr key={i}>
                <td>{f["Market Abbreviation"]}</td>
                <td>{f.Headend}</td>
                <td>{f.Syscode}</td>
                <td>{f.Zone}</td>
                <td>{f["XG Database"]}</td>
                <td>{f["TIME ZONE"]}</td>
                <td>{f["Retail Zones Per IC"]}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="comcast-strip"></div>
    </div>
  );
};

export default App;
