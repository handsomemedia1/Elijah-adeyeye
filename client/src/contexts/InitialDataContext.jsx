import { createContext, useContext } from 'react';

const InitialDataContext = createContext(null);

export function InitialDataProvider({ data, children }) {
  return (
    <InitialDataContext.Provider value={data}>
      {children}
    </InitialDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInitialData() {
  return useContext(InitialDataContext);
}
