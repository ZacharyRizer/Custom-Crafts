import React, { useState, useEffect, useContext } from 'react';
import { Heading, List, Link, Highlight, Button } from "arwes";
import { Context } from '../Context';



const Sidebar = () => {

    const [catDrop, setCatDrop] = useState(false);
    const [manDrop, setManDrop] = useState(false);
    const [crewDrop, setCrewDrop] = useState(false);
    const [sizeDrop, setSizeDrop] = useState(false);
    const [rangeDrop, setRangeDrop] = useState(false);
    const [priceDrop, setPriceDrop] = useState(false);

    const { filters, setFilters } = useContext(Context)

    const handleClickVal = (e) => {
        const [key, val] = e.target.id.split(' ')
        let newFilters = { ...filters }
        newFilters[key] = val
        setFilters(newFilters)
        console.log(newFilters)
    }

    const handleClickRange = (e) => {
        const [key, begin, end] = e.target.id.split(' ')
        let newFilters = { ...filters }
        newFilters[key] = { begin, end }
        setFilters(newFilters)
        console.log(newFilters)
    }

    return (
        <div className="sidebar">
            <Button className="sidebar-buttons" onClick={() => setCatDrop(!catDrop)}>
                <Heading node='h3'>Craft Type</Heading>
            </Button>
            {catDrop && (
                <div>
                    <List node='ul' onClick={handleClickVal}>
                        <li id='category_id 1'>Military</li>
                        <li id='category_id 2'>Transport</li>
                        <li id='category_id 3'>Cargo</li>
                        <li id='category_id 4'>Performance</li>
                        <li id='category_id 5'>Luxury</li>
                    </List>
                </div>
            )}
            <Button className="sidebar-buttons" onClick={() => setManDrop(!manDrop)}>
                <Heading node='h3'>Manufacturer</Heading>
            </Button>
            {manDrop && (
                <div>
                    <List node='ul' onClick={handleClickVal}>
                        <li id='manufactuer_id 1'>Imperial Galactic Government</li>
                        <li id='manufactuer_id 2'>Spacing Guild</li>
                        <li id='manufactuer_id 3'>Corellian Engineering Corporation</li>
                        <li id='manufactuer_id 4'>Cybertronian Technologies</li>
                        <li id='manufactuer_id 5'>Weyland-Yutani Corporation</li>
                    </List>
                </div>
            )}
            <Button className="sidebar-buttons" onClick={() => setCrewDrop(!crewDrop)}>
                <Heading node='h3'>Crew Capacity</Heading>
            </Button>
            {crewDrop && (
                <div>
                    <List node='ul' onClick={handleClickRange}>
                        <li id='crewCapRange 0 10'>10</li>
                        <li id='crewCapRange 10 100'>100</li>
                        <li id='crewCapRange 100 500'>500</li>
                        <li id='crewCapRange 500 1000'>1,000</li>
                        <li id='crewCapRange 1000 10000'>1,000 + </li>
                    </List>
                </div>
            )}
            <Button className="sidebar-buttons" onClick={() => setSizeDrop(!sizeDrop)}>
                <Heading node='h3'>Ship Size (meters)</Heading>
            </Button>
            {sizeDrop && (
                <div>
                    <List node='ul' onClick={handleClickRange}>
                        <li id='sizeRange 0 100'>less than 100</li>
                        <li id='sizeRange 100 500'>100 - 500</li>
                        <li id='sizeRange 500 1000'>500 - 1,000</li>
                        <li id='sizeRange 1000 5000'>1,000 - 5,000</li>
                        <li id='sizeRange 5000 15000'>5,000+</li>
                    </List>
                </div>
            )}
            <Button className="sidebar-buttons" onClick={() => setRangeDrop(!rangeDrop)}>
                <Heading node='h3'>Range (parsecs)</Heading>
            </Button>
            {rangeDrop && (
                <div>
                    <List node='ul' onClick={handleClickRange}>
                        <li id='travelRangeRange 0 25'>less than 25</li>
                        <li id='travelRangeRange 25 100'>25 - 100</li>
                        <li id='travelRangeRange 100 1000'>100 - 1,000</li>
                        <li id='travelRangeRange 1000 10000'>1,000 - 10,000</li>
                        <li id='travelRangeRange 10000 20000'>10,000+</li>
                    </List>
                </div>
            )}
            <Button className="sidebar-buttons" onClick={() => setPriceDrop(!priceDrop)}>
                <Heading node='h3'>Price (credits)</Heading>
            </Button>
            {priceDrop && (
                <div>
                    <List node='ul' onClick={handleClickRange}>
                        <li id='priceRange 0 10000'>less than 10,000</li>
                        <li id='priceRange 10000 100000'>10,000 - 100,000</li>
                        <li id='priceRange 100000 500000'>100,000 - 500,000</li>
                        <li id='priceRange 500000 1000000'>500,000 - 1,000,000</li>
                        <li id='priceRange 1000000 10000000'>1,000,000+</li>
                    </List>
                </div>
            )}
        </div>
    )
};


export default Sidebar;
