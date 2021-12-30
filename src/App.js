import './App.css';
import Navbar from './components/base/Navbar';
import Footer from './components/base/Footer';
import { Routes, Route } from 'react-router-dom';
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {
          routes.map((item) => 
            <Route path={item.path} element={<item.element />} />
          )
        }
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
