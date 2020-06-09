import React from 'react';
import { Heading, List, Link, Highlight, Button } from "arwes";



const Sidebar = () => {
    return (
        <div>
              <Heading node='h3'>Manufacturer</Heading>
                <List node='ul'>
                    <li><Link><Highlight>Enterprise</Highlight></Link></li>
                    <li><Link><Highlight>Monaco</Highlight></Link></li>
                    <li><Link><Highlight>Rocket Rockers</Highlight></Link></li>
                </List>
              <Heading node='h3'>Craft Type</Heading>
                <List node='ul'>
                    <li><Link><Highlight>Luxury</Highlight></Link></li>
                    <li><Link><Highlight>Racing</Highlight></Link></li>
                    <li><Link><Highlight>Combat</Highlight></Link></li>
                </List> 
        </div>
    )
};


export default Sidebar;