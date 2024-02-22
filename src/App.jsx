import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import VerticalLayout from './components/layout/VerticalLayout';
import Home from './components/pages/Home';
import Connexion from './components/pages/Connexion';
import ErrorPage from './components/pages/ErrorPage'; 

function App() {
  const [selectedDataSource, setSelectedDataSource] = useState('api');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Connexion
              handleDataSelection={(option) => setSelectedDataSource(option)}
            />
          }
        />
        <Route
          path="/home/:userId"
          element={
            <>
              <Header />
              <div style={{ display: 'flex' }}>
                <VerticalLayout />
                <Home dataSource={selectedDataSource} />
              </div>
            </>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
