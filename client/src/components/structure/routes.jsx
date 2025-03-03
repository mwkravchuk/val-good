import LandingPage from "../pages/LandingPage";
import StatsPage from "../pages/StatsPage"

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/stats", element: <StatsPage />},
  //{ path: "/redirect", element: <RedirectPage />},
  //{ path: "/setup-riot-id", element: <RiotIdSetupPage />}
];

export default routes;