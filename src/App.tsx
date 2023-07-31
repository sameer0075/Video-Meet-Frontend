import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppFooter from './Partials/footer';
import AppHeader from './Partials/header';
import { PublicRoutes, PrivateRoutes } from './routes';
import { RouteConfig } from './routes/Interface/interface';

function App() {
  const token = sessionStorage.getItem('token');
  return (
    <div className="App">
      {token && <AppHeader />}
      <BrowserRouter>
        <Routes>
            {!token
              ? PublicRoutes.map(({ component, path }: RouteConfig, index: number) => (
                  <Route key={index} path={path} element={component} />
                ))
              : PrivateRoutes.map(({ component, path }: RouteConfig, index: number) => (
                  <Route key={index} path={path} element={component} />
                ))}
        </Routes>
      </BrowserRouter>
      {token && <AppFooter />}
    </div>
  );
}


export default App;
