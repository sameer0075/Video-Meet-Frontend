import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppFooter from './Partials/footer';
import AppHeader from './Partials/header';
import { PublicRoutes, PrivateRoutes } from './routes';
import { RouteConfig } from './routes/Interface/interface';
import { store } from './redux/store';
function App() {
  const token = sessionStorage.getItem('token');
  return (
    <div className="App">
      {token && <AppHeader />}
      <Provider store={store}>
      <ToastContainer />
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
      </Provider>
      {token && <AppFooter />}
    </div>
  );
}


export default App;
