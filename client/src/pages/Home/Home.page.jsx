import React from 'react';
import Navbar from "../../ui/Menu/Navbar/Navbar.component";

function Home() {
    return (
        <div>
            <Navbar openSidebar={()=>{}} isShownSidebarIcon={true}></Navbar>
            Home
        </div>
    );
}

export default Home;