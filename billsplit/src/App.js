import React, { useState, useEffect } from "react";

import "./App.css";
function App() {
  const [numPeople, setNumPeople] = useState(0);
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [result, setResult] = useState(0);
  const [err, setErr] = useState([
    {
      err: false,
      errMessage: ""
    },
    {
      err: false,
      errMessage: ""
    },
    {
      err: false,
      errMessage: ""
    }
  ]);
  useEffect(() => {
    updateResult();
  });
  function handleKey(e) {
    if (e.key === "Enter") {
      updateResult();
    }
  }
  function updatePeople(e) {
    if (/^\d+$/.test(e.target.value) === false) {
      updateError(true, "Digits Only in Number of People", 0);
    } else {
      setNumPeople(e.target.value);
      updateError(false, "", 0);
    }
    e.preventDefault();
    return;
  }
  function updateBill(e) {
    if (/^[0-9]+(\.[0-9]{1,2})?$/gm.test(e.target.value) === false) {
      updateError(true, "Invalid format in Bills", 1);
    } else {
      setBill(e.target.value);
      updateError(false, "", 1);
    }
    e.preventDefault();
    return;
  }
  function updateTip(e) {
    if (/^[0-9]+(\.[0-9]*)?$/gm.test(e.target.value) === false) {
      updateError(true, "Invalid format in Tips", 2);
    } else {
      setTip(e.target.value);
      updateError(false, "", 2);
    }
    e.preventDefault();
    return;
  }
  function updateError(error, errorMessage, index) {
    const newErr = [...err];
    newErr[index] = { err: error, errMessage: errorMessage };
    setErr(newErr);
    return;
  }
  function updateResult() {
    if (!isNaN(Number(numPeople) && !isNaN(Number(bill) && !isNaN(tip)))) {
      let tipAmount = (Number(tip) / 100.0) * Number(bill);
      setResult((tipAmount + Number(bill)) / Number(numPeople));
    }
    return;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Bill Splitter </p>
        <form>
          <label>
            Number of People:
            <input
              type="text"
              name="Number of People"
              defaultValue={numPeople}
              onChange={e => updatePeople(e)}
              onKeyDown={e => handleKey(e)}
            />
          </label>
          <label>
            Total Bill:$
            <input
              type="text"
              name="Total Bill"
              defaultValue={bill}
              onChange={e => updateBill(e)}
              onKeyDown={e => handleKey(e)}
            />
          </label>
          <label>
            Tip
            <input
              type="text"
              name="% Tip"
              defaultValue={tip}
              onChange={e => updateTip(e)}
              onKeyDown={e => handleKey(e)}
            />
            %
          </label>
        </form>
        <p> Amount per person $ {result}</p>
        <p>
          {err.map(error => (
            <div>{error.errMessage}</div>
          ))}
        </p>
      </header>
    </div>
  );
}

export default App;
