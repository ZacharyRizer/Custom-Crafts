import React, { useState, useContext } from 'react';
import { Heading, List, Button } from 'arwes';
import { Context } from '../Context';

const Sidebar = () => {
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
    const [key, val] = e.target.id.split(' ');

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
    const [key, begin, end] = e.target.id.split(' ');

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
    <div className="sidebar">
      <div className="filter_container">
        <List node="ul">
          {Object.keys(filterChips).map((key) => (
            <Button key={key}>
              <span id={key} onClick={handleChipClick}>
                {filterChips[key][0]}: {filterChips[key][1]}
              </span>
            </Button>
          ))}
        </List>
      </div>
      <Button className="sidebar-buttons" onClick={() => setCatDrop(!catDrop)}>
        <Heading node="h3">Craft Type</Heading>
      </Button>
      {catDrop && (
        <div>
          <List node="ul" onClick={handleClickVal}>
            <li id="categoryId 1" className="Craft Type">
              Military
            </li>
            <li id="categoryId 2" className="Craft Type">
              Transport
            </li>
            <li id="categoryId 3" className="Craft Type">
              Cargo
            </li>
            <li id="categoryId 4" className="Craft Type">
              Performance
            </li>
            <li id="categoryId 5" className="Craft Type">
              Luxury
            </li>
          </List>
        </div>
      )}
      <Button className="sidebar-buttons" onClick={() => setManDrop(!manDrop)}>
        <Heading node="h3">Manufacturer</Heading>
      </Button>
      {manDrop && (
        <div>
          <List node="ul" onClick={handleClickVal}>
            <li id="manufacturerId 1" className="Manufacturer">
              Imperial Galactic Government
            </li>
            <li id="manufacturerId 2" className="Manufacturer">
              Spacing Guild
            </li>
            <li id="manufacturerId 3" className="Manufacturer">
              Corellian Engineering Corporation
            </li>
            <li id="manufacturerId 4" className="Manufacturer">
              Cybertronian Technologies
            </li>
            <li id="manufacturerId 5" className="Manufacturer">
              Weyland-Yutani Corporation
            </li>
          </List>
        </div>
      )}
      <Button
        className="sidebar-buttons"
        onClick={() => setCrewDrop(!crewDrop)}>
        <Heading node="h3">Crew Capacity</Heading>
      </Button>
      {crewDrop && (
        <div>
          <List node="ul" onClick={handleClickRange}>
            <li className="Crew Capacity" id="crewCapRange 0 10">
              10
            </li>
            <li className="Crew Capacity" id="crewCapRange 10 100">
              100
            </li>
            <li className="Crew Capacity" id="crewCapRange 100 500">
              500
            </li>
            <li className="Crew Capacity" id="crewCapRange 500 1000">
              1,000
            </li>
            <li className="Crew Capacity" id="crewCapRange 1000 10000">
              1,000 +{' '}
            </li>
          </List>
        </div>
      )}
      <Button
        className="sidebar-buttons"
        onClick={() => setSizeDrop(!sizeDrop)}>
        <Heading node="h3">Ship Size (meters)</Heading>
      </Button>
      {sizeDrop && (
        <div>
          <List node="ul" onClick={handleClickRange}>
            <li className="Ship Size" id="sizeRange 0 100">
              less than 100
            </li>
            <li className="Ship Size" id="sizeRange 100 500">
              100 - 500
            </li>
            <li className="Ship Size" id="sizeRange 500 1000">
              500 - 1,000
            </li>
            <li className="Ship Size" id="sizeRange 1000 5000">
              1,000 - 5,000
            </li>
            <li className="Ship Size" id="sizeRange 5000 15000">
              5,000+
            </li>
          </List>
        </div>
      )}
      <Button
        className="sidebar-buttons"
        onClick={() => setRangeDrop(!rangeDrop)}>
        <Heading node="h3">Range (parsecs)</Heading>
      </Button>
      {rangeDrop && (
        <div>
          <List node="ul" onClick={handleClickRange}>
            <li className="Range" id="travelRangeRange 0 25">
              less than 25
            </li>
            <li className="Range" id="travelRangeRange 25 100">
              25 - 100
            </li>
            <li className="Range" id="travelRangeRange 100 1000">
              100 - 1,000
            </li>
            <li className="Range" id="travelRangeRange 1000 10000">
              1,000 - 10,000
            </li>
            <li className="Range" id="travelRangeRange 10000 20000">
              10,000+
            </li>
          </List>
        </div>
      )}
      <Button
        className="sidebar-buttons"
        onClick={() => setPriceDrop(!priceDrop)}>
        <Heading node="h3">Price (credits)</Heading>
      </Button>
      {priceDrop && (
        <div>
          <List node="ul" onClick={handleClickRange}>
            <li className="Price" id="priceRange 0 100">
              less than 100
            </li>
            <li className="Price" id="priceRange 100 1000">
              100 - 1,000
            </li>
            <li className="Price" id="priceRange 1000 10000">
              1,000 - 10,000
            </li>
            <li className="Price" id="priceRange 10000 100000">
              10,000 - 100,000
            </li>
            <li className="Price" id="priceRange 100000 1000000">
              100,000+
            </li>
          </List>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
