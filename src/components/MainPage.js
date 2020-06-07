import React from 'react';
import auth0Client from '../Auth';

const MainPage = (props) => {
  let data = 'test';
  const handleClick = async () => {
    let token = auth0Client.getIdToken();
    console.log(token);
    let res = await fetch('http://localhost:5000/api/private', {
      headers: {
        Authorization: `Bearer ${auth0Client.getIdToken()}`,
      },
    });
    data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div>Here's Some Content</div>
      <button onClick={handleClick}>Fetch Data</button>
    </>
  );
};

export default MainPage;
