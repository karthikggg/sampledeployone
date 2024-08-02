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
      let o = [...obj, ...final_arr];
      setFinal_array(o);
      if (obj) {
        setHead_err(false);
      }
      if (obj == "") {
        setHead_err(true);
      }
    }
    if (inp_sys) {
      let objs = Sys_data.filter((fil) => fil.Syscode == inp_sys);
      setFinal_array([...objs, ...final_arr]);
      if (objs) {
        setSys_err(false);
      }
      if (objs == "") {
        setSys_err(true);
      }
    }
  };

  const clear_table = () => {
    setFinal_array([]);
  };

  return (
    <div className="App">
      <div className="inp">
        <div className="input-class">
          <div className="inp_headen">
            <label htmlFor="headen">headends</label>
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
          <div className="inp_sys">
            <label htmlFor="sys">syscode</label>
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
        </div>
        <button onClick={display_table}>submit</button>
        <button onClick={clear_table}>clear</button>
      </div>
      <div>
        <table>
          <tr>
            <th>Data base</th>
            <th>headen</th>
            <th>syscode</th>
            <th>zone</th>
            <th>XG Database</th>
            <th>TIME ZONE</th>
          </tr>
          {final_arr.map((f, i) => {
            return (
              <tr key={i}>
                <td>{f["Market Abbreviation"]}</td>
                <td>{f.Headend}</td>
                <td>{f.Syscode}</td>
                <td>{f.Zone}</td>
                <td>{f["XG Database"]}</td>
                <td>{f["TIME ZONE"]}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default App;
