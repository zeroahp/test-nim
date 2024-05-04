import { Outlet} from "react-router-dom";
import './layout.scss'
function Layout() {
    return (
        <>
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