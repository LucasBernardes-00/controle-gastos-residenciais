import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './pages/Layout/Layout';
import { routesConfig } from './pages/routes';
import { ErrorProvider } from './common/components/error.component';

function App() {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routesConfig.map((route, index) => (
              <Route
                key={index}
                index={route.index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorProvider>
  );
}

export default App;