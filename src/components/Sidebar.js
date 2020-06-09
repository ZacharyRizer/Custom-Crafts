import React, { useState, useEffect } from 'react';
import { Heading, List, Link, Highlight, Button } from "arwes";



const Sidebar = () => {

    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        const options = document.querySelector(".sidebar-options");
        if (dropdown) {
            options.classList.toggle("sidebar-options")
        } 
    
    });

    return (
        <div className="sidebar">
            <Button onClick={() => setDropdown(!dropdown)}>
              <Heading node='h3'>Manufacturer</Heading>
            </Button>
            <div className="sidebar-options">
                <List node='ul'>
                    <li><Link><Highlight>Enterprise</Highlight></Link></li>
                    <li><Link><Highlight>Monaco</Highlight></Link></li>
                    <li><Link><Highlight>Rocket Rockers</Highlight></Link></li>
                </List>
            </div>
            <Button onClick={() => setDropdown(!dropdown)}>
              <Heading node='h3'>Craft Type</Heading>
            </Button>
            <div className="sidebar-optionsr">
                <List node='ul'>
                    <li><Link><Highlight>Luxury</Highlight></Link></li>
                    <li><Link><Highlight>Racing</Highlight></Link></li>
                    <li><Link><Highlight>Combat</Highlight></Link></li>
                </List>
            </div>
        </div>
    )
};


export default Sidebar;