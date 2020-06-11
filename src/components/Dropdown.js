import React, { useState, useRef, createRef, useContext } from "react";
import { Button } from "arwes";
import { Context } from "../Context";

const Dropdown = (props) => {
  const [open, setOpen] = useState(true);
  const [optionState, setOptionState] = useState(props.options ? props.options.map(() => false) : [false]);
  const node = useRef([]);
  const { filters, setFilters } = useContext(Context);

  if (node.current.length !== props.options.length) {
    // add or remove refs
    node.current = Array(props.options.length)
      .fill()
      .map((_, i) => node.current[i] || createRef());
  }

  const handleOptionClick = (e, option, index) => {
    e.preventDefault();
    node.current.forEach((item, i) => {
      item.current.innerHTML = props.options[i];
    });
    if (optionState[index]) {
      node.current[index].current.innerHTML = option;
      let newState = optionState.map(() => false);
      setOptionState(newState);
      let newFilters = { ...filters };
      const key = node.current[index].current.id.split(" ")[0];
      delete newFilters[key];
      setFilters(newFilters);
      return;
    }
    let newState = optionState.map(() => false);
    newState[index] = !newState[index];
    setOptionState(newState);
    node.current[index].current.innerHTML = option + '<i class="mdi mdi-square"/>';

    const category = node.current[index].current.id.split(" ");
    if (category.length === 2) {
      const [key, val] = category;

      let newFilters = { ...filters };
      newFilters[key] = val;
      setFilters(newFilters);
    } else {
      const [key, begin, end] = category;

      let newFilters = { ...filters };
      newFilters[key] = { begin, end };
      setFilters(newFilters);
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
        {open ? <i className="mdi mdi-chevron-down" /> : <i className="mdi mdi-chevron-up" />}
      </Button>
      <div style={{ display: !open ? "flex" : "none", flexDirection: "column" }}>
        {props.options &&
          props.options.map((option, index) => (
            <Button
              key={option}
              corners={0}
              layer="primary"
              buttonProps={{
                key: { option },
                style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" },
                onClick: (e) => handleOptionClick(e, option, index),
                ref: node.current[index],
                id: props.idList[index],
              }}
            >
              {option}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
