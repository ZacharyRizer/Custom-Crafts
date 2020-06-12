import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import { useAuth0 } from "../react-auth0-spa";
import { Frame, Heading, Button, Appear } from "arwes";

function keyChecker(e) {
  if (e.key === "Enter") {
    // set filter for iLike?
    // Render search term as a chip?

    window.location.href = `/shop`;
  }
}

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { numItems, setNumItems } = useContext(Context);
  const { filters, setFilters } = useContext(Context);

  const keyChecker = (ev) => {
    if (ev.key === "Enter") {
      const searchFilters = { nameIlike: ev.target.value };

      let newFilters = { ...filters };
      // newFilters[]
      // Render search term as a chip?

      window.location.href = `/shop`;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("itemNum")) {
      let num = parseInt(localStorage.getItem("itemNum"));
      setNumItems(num);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("custom_crafts_userObj");
    localStorage.removeItem("custom_crafts_userTWJ");
    logout();
  };

  return (
    <Frame
      animate
      level={1}
      corners={6}
      layer="primary"
      style={{ marginBottom: 20 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ margin: "10px", padding: "15px", flexGrow: 1 }}>
          <Heading
            style={{ fontSize: "32px", margin: 0, maxWidth: "265px" }}
            node="h1"
          >
            <Link to="/" style={{ textDecoration: "none", color: "#a1ecfb" }}>
              Custom Crafts
            </Link>
          </Heading>
        </div>
        <Frame style={{ flexGrow: 1 }} corners={0}>
          <Appear style={{ display: "flex", alignItems: "center" }}>
            <input
              style={{
                position: "relative",
                padding: 10,
                paddingLeft: 40,
                backgroundColor: "transparent",
                outline: "none",
                border: "none",
                color: "#26dafd",
                zIndex: 1,
                width: "100%",
              }}
              type="text"
              placeholder="Search for Ships"
              onKeyDown={keyChecker}
            ></input>
            <i
              style={{
                position: "absolute",
                paddingLeft: 10,
                cursor: "text",
                zIndex: 0,
              }}
              className="mdi mdi-magnify"
            ></i>
          </Appear>
        </Frame>
        <div
          style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
        >
          {!isAuthenticated ? (
            <>
              <Button
                style={{ marginRight: 25 }}
                onClick={() => loginWithRedirect({})}
                animate
                layer="secondary"
              >
                Login
              </Button>
              <Link to="/cart">
                <Button style={{ marginRight: 25 }} animate>
                  <i className="mdi mdi-cart" />: {numItems}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <Button animate style={{ marginRight: 25 }} layer="secondary">
                  <i className="mdi mdi-account-circle" /> Profile
                </Button>
              </Link>
              <Link to="/cart">
                <Button animate style={{ marginRight: 25 }}>
                  <i className="mdi mdi-cart"> </i>
                  {numItems}
                </Button>
              </Link>
              <Button
                animate
                layer="alert"
                style={{ marginRight: 25 }}
                onClick={handleLogout}
              >
                Log-out <i className="mdi mdi-exit-run" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Frame>
  );
};

export default NavBar;
