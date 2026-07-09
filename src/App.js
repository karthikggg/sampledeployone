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
  const [multi_sys, setMulti_sys] = useState("");

 function extractNumberCodes(text) {
  const matches = text.match(/\b\d{3,6}[a-zA-Z]?/g) || [];
  return matches.map(m => m.replace(/[a-zA-Z]/g, ''));
}

  //hi
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
        (fil) => fil.Headend == inp_headen.toUpperCase().trim(),
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
      let objs = Sys_data.filter((fil) => fil.Syscode == inp_sys.trim());
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
        </div>
        <button onClick={display_table}>submit</button>
        <button onClick={clear_table}>clear</button>
      </div>

      {/* <div className="multi-sys">
        <label htmlFor="multi-sys">Multi sys</label>
        <input
          value={multi_sys} 
          type="text"
          name="multi-sys"
          id="multi-sys"
          onChange={(e) => {
            setMulti_sys(e.target.value);
          }}
        />
        <button onClick={() => {
          let arr = extractNumberCodes(multi_sys);
          console.log(arr);
          let newObject =  arr.map((sys) => {
            return Sys_data.find((fil) => fil.Syscode == sys.trim());
          })
          newObject.map((obj, index) => {
            if (obj) {
              setFinal_array((prevArray) => [...prevArray, obj]);
            }
          })
          console.log(newObject);
          
          
        }}>
          Submit
        </button>
          </div> */}
        
        <table>
          <tr>
            <th>Market Abbreviation</th>
            <th>Headend</th>
            <th>Syscode</th>
            <th>Zone</th>
            <th>XG Database</th>
            <th>TIME ZONE</th>
            <th>Retail Zones Per IC</th>
          </tr>
          {final_arr.map((f, i) => {
            return (
              <tr key={i}>
                <td>{f["Market Abbreviation"]}</td>
                <td>{f.Headend}</td>
                <td>{f.Syscode}</td>
                <td className={f.Zone.toLowerCase().includes("dish") ? "dish" : "non"}>{f.Zone}</td>
                <td>{f["XG Database"]}</td>
                <td>{f["TIME ZONE"]}</td>
                <td className={f["Retail Zones Per IC"].toLowerCase().includes("dish") ? "dish" : "not-dish"}>{f["Retail Zones Per IC"]}</td>
              </tr>
            );
          })}
        </table>
    </div>
    
  );
};

export default App;
