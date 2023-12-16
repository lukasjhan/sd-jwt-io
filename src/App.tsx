import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Pages/Home';
import { Library } from './components/Pages/Library';

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
