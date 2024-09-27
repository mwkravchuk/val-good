import App from "./App";
import StatsPage from "./pages/StatsPage"

const routes = [
  { path: "/", element: <App /> },
  { path: "/stats", element: <StatsPage />}
];

export default routes;