import React from "react";
import "./progressbar.css";

const steps = [
  { label: "Picked up", checked: "✔", notchecked: "" },
  { label: "Washed" },
  { label: "Ironed" },
  { label: "Delivered" },
];

const LaundryProgress = ({ currentStep = 1 }) => {
  return (
    <div className="step-main">
      {steps.map((val, i) => {
        return (
          <div className="step" key={i}>
            {i < currentStep && (
              <>
                <p className="notcheck-circle checkcircle">{steps[0].checked}</p>
                {i < 3 && <p className="label">{steps[i].label}</p>}
                {i === 3 && <p className="lastlabel">{steps[i].label}</p>}
                {i < 3 && <p className="linecheck">________________</p>}
              </>
            )}
            {i === currentStep && (
              <>
                <p className="notcheck-circle checkcircle">{steps[0].checked}</p>
                {i < 3 && <p className="label">{steps[i].label}</p>}
                {i === 3 && <p className="lastlabel">{steps[i].label}</p>}
                {i < 3 && <p>________________</p>}
              </>
            )}
            {i > currentStep && (
              <>
                <p className="notcheck-circle">{steps[0].notchecked}</p>
                {i < 3 && <p className="label">{steps[i].label}</p>}
                {i === 3 && <p className="lastlabel">{steps[i].label}</p>}
                {i < 3 && <p>________________</p>}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LaundryProgress;
