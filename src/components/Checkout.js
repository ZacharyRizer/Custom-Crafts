import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { Frame, Heading, Button, Table, Line } from 'arwes';

import Axios from 'axios';

const Checkout = (props) => {


    return (
        <div id='modal'>
            <div id='modal-content'>
                <Frame style={{ width: 350, height: 350 }}>
                    <Heading node='h4'>ORDER SUMMARY</Heading>
                    <div style={{ padding: 20 }}>
                        <Table headers={['ITEM', 'QTY', 'PRICE']} dataset={[]} />
                        <Line animate layer='success' />
                        <Button animate layer='secondary' buttonProps={{ style: { padding: 5, fontSize: 10 } }}>CHANGE YOUR ORDER</Button>
                        <p style={{ fontSize: 12 }}>Standard Shipping:</p>
                        <p style={{ fontSize: 12 }}>Universe Taxes:</p>
                        <Line animate layer='secondary' />
                        <Heading node='h5'>ORDER TOTAL :</Heading>
                    </div>
                </Frame>
            </div>
        </div>

    )
}

export default Checkout;