import React from 'react';
import { Input } from 'antd';
import Articles from './Articles';

const Home = () => {
  return (
    <div>
      <h1>Blog Home</h1>
      <Input.Search placeholder="Search articles..." style={{ marginBottom: 20 }} />
      <Articles />
    </div>
  );
};

export default Home;