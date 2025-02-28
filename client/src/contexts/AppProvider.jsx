import { GlobalDataProvider } from './GlobalDataProvider';
import { UserProvider } from './UserProvider';

const AppProvider = ({ children }) => {
  return (
    <GlobalDataProvider>
      <UserProvider>
        { children }
      </UserProvider>
    </GlobalDataProvider>
  );
};

export default AppProvider;