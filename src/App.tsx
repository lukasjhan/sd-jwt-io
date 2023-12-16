import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Pages/Home';
import { Library } from './components/Pages/Library';
import { Layout } from 'antd';
const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Content style={{ marginTop: 64, minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </Content>
        <Footer
          style={{ textAlign: 'center', background: 'black', color: 'white' }}
        >
          {'Footer content'}
        </Footer>
      </Router>
    </>
  );
}

export default App;
