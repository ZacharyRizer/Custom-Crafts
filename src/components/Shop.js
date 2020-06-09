import React from 'react';
import { Row, Col, Item } from "arwes";
import Sidebar from './Sidebar'
import ShipList from './ShipList'


const Shop = () => {

    return (
        <div>
            <Sidebar />
            <ShipList />     
        </div>
    )
};

export default Shop;