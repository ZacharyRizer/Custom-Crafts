import React, { useEffect, useState, useRef } from "react";
import { Button } from "arwes";

const Dropdown = (props) => {
  const node = useRef(null);

  const [open, setOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    setOpen(false);
  };

  const handleChange = (selectedValue) => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={node} style={{ display: "flex", flexDirection: "column", position: "absolute" }}>
      <Button onClick={() => setOpen(!open)} buttonProps={props.buttonProps}>
        {props.title}
        {!open ? <i className="mdi mdi-chevron-down" /> : <i className="mdi mdi-chevron-up" />}
      </Button>
      {open && (
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          {props.options.map((option) => (
            <Button layer="primary">{option}</Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
