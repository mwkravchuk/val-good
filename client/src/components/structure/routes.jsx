import LandingPage from "../pages/LandingPage";
import StatsPage from "../pages/StatsPage"

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/stats", element: <StatsPage />}
];

export default routes;