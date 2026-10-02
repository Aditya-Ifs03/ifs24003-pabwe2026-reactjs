import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './features/auth/states/authSlice';
import userReducer from './features/users/states/userSlice';
import lostFoundReducer from './features/lost-founds/states/lostFoundSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        auth: authReducer,
        users: userReducer,
        lostFound: lostFoundReducer,
      },
      preloadedState,
    }),
    route = '/',
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}