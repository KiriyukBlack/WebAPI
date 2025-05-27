import React from 'react';
import { Layout, Space } from 'antd';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import DetailArticle from './components/DetailArticle';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header>
          <nav>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/about">About</Link>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </Space>
          </nav>
        </Header>
        <Content>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/a/:aid" element={<DetailArticle />} />
          </Routes>
        </Content>
        <Footer>
          <p>VT6003CEM Demo</p>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;