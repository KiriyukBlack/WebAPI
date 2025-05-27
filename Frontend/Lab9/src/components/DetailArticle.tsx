import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import articles from './data/articles.json';

const DetailArticle = () => {
  const { aid } = useParams();
  const navigate = useNavigate();
  for (const article of articles) {
    if (article.id == aid) {
      return (
        <>
          <h1>{article.title}</h1>
          <p>{article.fullText}</p>
          <Button
            type="primary"
            icon={<RollbackOutlined />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </>
      );
    }
  }
  return <p>Article not found</p>;
};

export default DetailArticle;