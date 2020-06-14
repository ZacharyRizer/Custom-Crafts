import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";
import { useAuth0 } from "../react-auth0-spa";
import { Frame, Heading, Button, Appear } from "arwes";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const { numItems, setNumItems } = useContext(Context);
  const { filters, setFilters } = useContext(Context);
  const { clear, setClear } = useContext(Context);
  const [role, setRole] = useState("customer");
  const history = useHistory();
  const node = useRef();

  const keyChecker = (ev) => {
    if (ev.key === "Enter") {
      const searchFilters = { nameIlike: `%${ev.target.value}%` };

      let newFilters = { ...filters, ...searchFilters };
      // newFilters[]
      // Render search term as a chip?

      // window.location.href = `/shop`;
      setFilters(newFilters);
      history.push("/shop");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("itemNum")) {
      let num = parseInt(localStorage.getItem("itemNum"));
      setNumItems(num);
    }
    if (user) {
      const roleKey = "http://customcraft/roles";
      setRole(user[roleKey]);
    }
  }, [user]);

  useEffect(() => {
    if (clear) {
      node.current.value = "";
      node.current.blur();
      setClear(false);
    }
  }, [clear, setClear]);

  const handleLogout = () => {
    localStorage.removeItem("custom_crafts_userObj");
    localStorage.removeItem("custom_crafts_userTWJ");
    logout();
  };

  return (
    <Frame animate level={1} corners={6} layer="primary" style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ margin: "10px", padding: "15px", flexGrow: 1 }}>
          <Heading style={{ fontSize: "32px", margin: 0, maxWidth: "271px" }} node="h1">
            <Link to="/" style={{ textDecoration: "none", color: "#a1ecfb" }}>
              Custom Crafts
            </Link>
          </Heading>
        </div>
        <Frame style={{ flexGrow: 1 }} corners={0}>
          <Appear style={{ display: "flex", alignItems: "center" }}>
            <input
              ref={node}
              onFocus={(e) => {
                e.currentTarget.setAttribute("onfocus", "this.placeholder = ''");
              }}
              onBlur={(e) => {
                e.currentTarget.setAttribute("onblur", "this.placeholder = 'Search for Ships'");
              }}
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
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          {!isAuthenticated ? (
            <>
              <Button style={{ marginRight: 25 }} onClick={() => loginWithRedirect({})} animate layer="secondary">
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
              {role === "admin" ? (
                <Link to="/admin">
                  <Button animate style={{ marginRight: 25 }} layer="secondary">
                    Admin Page
                  </Button>
                </Link>
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
                </>
              )}
              <Button animate layer="alert" style={{ marginRight: 25 }} onClick={handleLogout}>
                <i className="mdi mdi-exit-run" /> Log-Out
              </Button>
            </>
          )}
        </div>
      </div>
    </Frame>
  );
};

export default NavBar;
