import React, { useState, useContext } from "react";
import { Heading, List, Button } from "arwes";
import { Context } from "../Context";
import Dropdown from "./Dropdown";

const Sidebar2 = () => {
  const [catDrop, setCatDrop] = useState(false);
  const [manDrop, setManDrop] = useState(false);
  const [crewDrop, setCrewDrop] = useState(false);
  const [sizeDrop, setSizeDrop] = useState(false);
  const [rangeDrop, setRangeDrop] = useState(false);
  const [priceDrop, setPriceDrop] = useState(false);

  const { filterChips, setFilterChips } = useContext(Context);
  const { filters, setFilters } = useContext(Context);

  const handleClickVal = (e) => {
    const cat = e.target.className;
    const detail = e.target.innerHTML;
    const [key, val] = e.target.id.split(" ");

    let newFilters = { ...filters };
    newFilters[key] = val;
    setFilters(newFilters);

    let newFilterChips = { ...filterChips };
    newFilterChips[key] = [cat, detail];
    setFilterChips(newFilterChips);
  };

  const handleClickRange = (e) => {
    const cat = e.target.className;
    const detail = e.target.innerHTML;
    const [key, begin, end] = e.target.id.split(" ");

    let newFilters = { ...filters };
    newFilters[key] = { begin, end };
    setFilters(newFilters);

    let newFilterChips = { ...filterChips };
    newFilterChips[key] = [cat, detail];
    setFilterChips(newFilterChips);
  };

  const handleChipClick = (e) => {
    const key = e.target.id;
    let newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);

    let newFilterChips = { ...filterChips };
    delete newFilterChips[key];
    setFilterChips(newFilterChips);
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <Dropdown options={["alpha", "beta", "gamma", "omega", "epsilon"]} title="Craft Type" />
      <Dropdown options={["a", "b"]} title="Manufacturer" />
    </div>
  );
};

export default Sidebar2;
