import {Link, Outlet} from "react-router-dom";
import './layout.scss'
function Layout() {
    return (
        <>
            {/* <header className="header">
                <div className="header_menu">
                    <Link to="/" >Home</Link>
                </div>
                <div className="header_menu">
                    <Link to="/board" >board</Link>
                </div>
                <div className="header_menu">
                    <Link to="/result" >result</Link>
                </div>


            </header> */}

            <div className="main">
                <Outlet />
            </div>

            <footer className="footer">
                Copyright 2024 by anhb2103533
            </footer>
        </>
    )
}

export default Layout;