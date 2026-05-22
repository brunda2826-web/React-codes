import React, { useState } from 'react';
import './App.css';

// Program 3: BCSL657B - VTU React Lab
// Counter Application using React with useState hook.
// - Increase / Decrease counter, prevent going below 0 (min value)
// - Reset button, Custom increment/decrement step value

function App() {
  const MIN_VALUE = 0;
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => Math.max(MIN_VALUE, prev - step));
  const reset = () => setCount(0);

  const handleStepChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) setStep(val);
  };

  return (
    <div className="App">
      <h2>VTU BCSL657B - Program 3: Counter Application</h2>

      <div className="counter-card">
        <p className="counter-value">{count}</p>

        <div className="btn-group">
          <button className="btn btn-red" onClick={decrement}>
            − Decrement
          </button>
          <button className="btn btn-gray" onClick={reset}>
            ↺ Reset
          </button>
          <button className="btn btn-green" onClick={increment}>
            + Increment
          </button>
        </div>

        <div className="step-control">
          <label htmlFor="step">Step Value: </label>
          <input
            id="step"
            type="number"
            min="1"
            value={step}
            onChange={handleStepChange}
            className="step-input"
          />
        </div>

        <p className="info">Minimum value is {MIN_VALUE}. Current step: {step}</p>
      </div>
    </div>
  );
}

export default App;
