import './App.module.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { ContentWrapper } from './components/ContentWrapper';
import { GithubOutlined } from '@ant-design/icons';
import Decode from './components/Pages/Decode';
import Issue from './components/Pages/Issue';
import Present from './components/Pages/Present';

const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Content style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Decode />} />
            <Route path="/decode" element={<Decode />} />
            <Route path="/issue" element={<Issue />} />
            <Route path="/present" element={<Present />} />
          </Routes>
        </Content>
        <Footer style={{ background: 'black', color: 'white' }}>
          <ContentWrapper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <a href="https://github.com/lukasjhan/sd-jwt-io" target="_blank" rel="noopener noreferrer">
                <GithubOutlined
                  style={{
                    color: 'white',
                    fontSize: '1.2rem',
                  }}
                />
              </a>
            </div>
          </ContentWrapper>
        </Footer>
      </Router>
    </>
  );
}

export default App;
