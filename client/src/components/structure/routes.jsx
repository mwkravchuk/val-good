import LandingPage from "../pages/LandingPage";
import StatsPage from "../pages/StatsPage"
import RedirectPage from "../pages/RedirectPage";
import RiotIdSetupPage from "../pages/RiotIdSetupPage";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/stats", element: <StatsPage />},
  { path: "/redirect", element: <RedirectPage />},
  { path: "/setup-riot-id", element: <RiotIdSetupPage />}
];

export default routes;