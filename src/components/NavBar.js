import React, { useContext } from "react";
import { Context } from "../Context";
import { useAuth0 } from "../react-auth0-spa";
import { Frame, Heading, Button, Link, Appear } from "arwes";

function keyChecker(e) {
  if (e.key === "Enter") {
    window.location.href = `/shop`;
  }
}

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { numItems } = useContext(Context);

  return (
    <Frame animate level={1} corners={6} layer="primary" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ margin: "10px", padding: "15px", flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Heading style={{ fontSize: "32px", margin: 0 }} node="h1">
              Custom Crafts
            </Heading>
          </Link>
        </div>
        <Frame style={{ flexGrow: 1 }} buttonProps={{ style: { cursor: "text" } }} corners={0}>
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
            <i style={{ position: "absolute", paddingLeft: 10, cursor: "text", zIndex: 0 }} class="mdi mdi-magnify"></i>
          </Appear>
        </Frame>
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          {!isAuthenticated ? (
            <>
              <Button style={{ marginRight: 25 }} onClick={() => loginWithRedirect({})} animate layer="secondary">
                Login
              </Button>
              <Link href="/cart">
                <Button style={{ marginRight: 25 }} animate>
                  <i class="mdi mdi-cart" />: {numItems}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <Button animate style={{ marginRight: 25 }} layer="secondary">
                  Profile
                </Button>
              </Link>
              <Link href="/cart">
                <Button animate style={{ marginRight: 25 }}>
                  <i class="mdi mdi-cart"> </i>
                  {numItems}
                </Button>
              </Link>
              <Button animate layer="alert" style={{ marginRight: 25 }} onClick={() => logout()}>
                Log-out
              </Button>
            </>
          )}
        </div>
      </div>
    </Frame>
  );
};

export default NavBar;
