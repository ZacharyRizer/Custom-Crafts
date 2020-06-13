import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { apiBaseUrl } from '../config';
import { useAuth0 } from '../react-auth0-spa';
import {
  Frame,
  Heading,
  Line,
  Table,
  Button,
  Image,
  Header,
  Appear,
  Row,
  Col,
  Content,
} from 'arwes';

const Admin = () => {
  return <Frame>Checkout all these sweet admin things!</Frame>;
};

export default Admin;
