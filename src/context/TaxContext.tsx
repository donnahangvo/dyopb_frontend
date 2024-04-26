import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface TaxContextProviderProps {
  children: ReactNode;
}
// Define type for state
interface TaxState {
  taxAmount: number;
}

// Define type for actions
type Action = { type: 'UPDATE_TAX'; payload: number };

// Define initial state
const initialState: TaxState = {
  taxAmount: 0,
};

// Define reducer function
const reducer = (state: TaxState, action: Action): TaxState => {
  switch (action.type) {
    case 'UPDATE_TAX':
      return {
        ...state,
        taxAmount: action.payload,
      };
    default:
      return state;
  }
};

// Create context
export const TaxContext = createContext<{
  state: TaxState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

// Custom hook for consuming context
export const useTaxContext = () => useContext(TaxContext);

// Context provider component
export const TaxContextProvider: React.FC<TaxContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaxContext.Provider value={{ state, dispatch }}>
      {children}
    </TaxContext.Provider>
  );
};
