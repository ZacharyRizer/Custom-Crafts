import React, { useContext } from "react";
import { Button } from "arwes";
import { Context } from "../Context";

const ClearFilters = () => {
  const { filters, setFilters } = useContext(Context);
  const handleClick = () => {
    setFilters({});
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}>
      <Button
        layer="secondary"
        buttonProps={{
          onClick: handleClick,
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default ClearFilters;
