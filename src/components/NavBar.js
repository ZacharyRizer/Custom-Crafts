import React, { useContext } from "react";
import { Context } from "../Context";
import { useAuth0 } from "../react-auth0-spa";
import { Frame, Heading, Button, Link, Appear } from "arwes";

function keyChecker(e) {
  if (e.key === "Enter") {
    window.location.href = `/search/${e.target.value}`;
  }
}

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { numItems } = useContext(Context);

  return (
    <Frame animate level={1} corners={6} layer="primary" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ margin: "10px", padding: "15px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Heading style={{ fontSize: "32px", margin: 0 }} node="h1">
              Custom Crafts
            </Heading>
          </Link>
        </div>
        <Frame buttonProps={{ style: { cursor: "text" } }} corners={0}>
          <Appear>
            <input
              style={{ padding: 10, backgroundColor: "transparent", outline: "none", border: "none", color: "#26dafd" }}
              type="text"
              placeholder="Search for Ships"
              onKeyDown={keyChecker}
              backgroundImage={'element(<i className="mdi mdi-magnify" style={{ paddingLeft: 8, cursor: "text" }} />)'}
            ></input>
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
                  Cart: {numItems}
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
                  Cart: {numItems}
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
