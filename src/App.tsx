import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Pages/Home';
import { Library } from './components/Pages/Library';
import { Layout } from 'antd';
import { ContentWrapper } from './components/ContentWrapper';
import { GithubOutlined } from '@ant-design/icons';
const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Content style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </Content>
        <Footer style={{ background: 'black', color: 'white' }}>
          <ContentWrapper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {'Missing something? '}
                </span>
                <span
                  className="footer-link"
                  onClick={() => {
                    window.open(
                      'https://github.com/lukasjhan/sd-jwt-io',
                      '_blank'
                    );
                  }}
                >
                  {'Send a Pull Request'}
                </span>
                <span>{' - '}</span>
                <span
                  className="footer-link"
                  onClick={() => {
                    window.open(
                      'https://github.com/lukasjhan/sd-jwt-io/blob/master/LICENSE.md',
                      '_blank'
                    );
                  }}
                >
                  {'License'}
                </span>
              </div>
              <div
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.open(
                    'https://github.com/lukasjhan/sd-jwt-io',
                    '_blank'
                  );
                }}
              >
                <GithubOutlined
                  style={{
                    fontSize: '1.2rem',
                  }}
                />
              </div>
            </div>
          </ContentWrapper>
        </Footer>
      </Router>
    </>
  );
}

export default App;
