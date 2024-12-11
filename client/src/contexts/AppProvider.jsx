import { GlobalDataProvider } from './GlobalDataProvider';

const AppProvider = ({ children }) => {
  return (
    <GlobalDataProvider>
      { children }
    </GlobalDataProvider>
  );
};

export default AppProvider;