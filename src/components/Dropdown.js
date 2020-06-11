import React, { useState, useRef } from "react";
import { Button } from "arwes";

const Dropdown = (props) => {
  const [open, setOpen] = useState(true);
  const [optionState, setOptionState] = useState(props.options ? props.options.map(() => false) : [false]);

  const handleOptionClick = (e, option, index) => {
    e.preventDefault();
    let newState = optionState;
    newState[index] = !optionState[index];
    setOptionState(newState);
    if (optionState[index]) {
      e.currentTarget.innerHTML = option + '<i class="mdi mdi-checkbox-blank-circle"/>';
    }
    if (optionState[index] === false) {
      e.currentTarget.innerHTML = option;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        onClick={() => setOpen(!open)}
        buttonProps={{
          style: {
            ...props.buttonProps,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
      >
        {props.title}
        {!open ? <i className="mdi mdi-chevron-down" /> : <i className="mdi mdi-chevron-up" />}
      </Button>
      {open && props.options && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {props.options.map((option, index) => (
            <Button
              key={option}
              corners={0}
              layer="primary"
              buttonProps={{
                key: { option },
                style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" },
                onClick: (e) => handleOptionClick(e, option, index),
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
