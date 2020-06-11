import React from "react";
import Dropdown from "./Dropdown";
import ClearFilters from "./ClearFilters";

const Sidebar2 = () => {
  return (
    <div style={{ paddingTop: 20, position: "fixed", width: "23.7vw" }}>
      <ClearFilters />
      <Dropdown
        idList={["categoryId 1", "categoryId 2", "categoryId 3", "categoryId 4", "categoryId 5"]}
        options={["Military", "Transport", "Cargo", "Performance", "Luxury"]}
        title="Craft Type"
      />
      <Dropdown
        idList={["manufacturerId 1", "manufacturerId 2", "manufacturerId 3", "manufacturerId 4", "manufacturerId 5"]}
        options={[
          "Imperial Galactic Government",
          "Spacing Guild",
          "Corellian Engineering Corporation",
          "Cybertronian Technologies",
          "Weyland-Yutani Corporation",
        ]}
        title="Manufacturer"
      />
      <Dropdown
        idList={[
          "crewCapRange 0 10",
          "crewCapRange 10 100",
          "crewCapRange 100 500",
          "crewCapRange 500 1000",
          "crewCapRange 1000 10000",
        ]}
        options={["10", "100", "500", "1,000", "1,000 +"]}
        title="Crew Capacity"
      />
      <Dropdown
        idList={[
          "sizeRange 0 100",
          "sizeRange 100 500",
          "sizeRange 500 1000",
          "sizeRange 1000 5000",
          "sizeRange 5000 15000",
        ]}
        options={["< 100", "100 - 500", "500 - 1,000", "1,000 - 5,000", "5,000 +"]}
        title="Ship Size (Meters)"
      />
      <Dropdown
        idList={[
          "travelRangeRange 0 25",
          "travelRangeRange 25 100",
          "travelRangeRange 100 1000",
          "travelRangeRange 1000 10000",
          "travelRangeRange 10000 20000",
        ]}
        options={["< 25", "25 - 100", "100 - 1,000", "1,000 - 10,000", "10,000 +"]}
        title="Range (Parsecs)"
      />
      <Dropdown
        flip
        idList={[
          "priceRange 0 100",
          "priceRange 100 1000",
          "priceRange 1000 10000",
          "priceRange 10000 100000",
          "priceRange 100000 1000000",
        ]}
        options={["< 100", "100 - 1,000", "1,000 - 10,000", "10,000 - 100,000", "100,000 +"]}
        title="Price (Yen)"
      />
    </div>
  );
};

export default Sidebar2;
