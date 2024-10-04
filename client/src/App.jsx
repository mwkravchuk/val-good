import { BrowserRouter } from "react-router-dom";

import Header from "./components/structure/Header";
import RenderRoutes from "./components/structure/RenderRoutes";
import Footer from "./components/structure/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RenderRoutes />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
