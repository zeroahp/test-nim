import { useRoutes } from "react-router-dom";
import { routes } from "../../routes/index.js";

function AllRoute(){
    const elements = useRoutes(routes);
    return elements;
}

export default AllRoute;