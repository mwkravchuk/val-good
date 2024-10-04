import { Route, Routes } from "react-router-dom";
import routes from "./routes";

const RenderRoutes = () => {
  return (
    <div>
      <Routes>
        {routes.map((route, i) => {
          return <Route key={i} path={route.path} element={route.element}/>
        })}
      </Routes>
    </div>
  );
};

export default RenderRoutes;