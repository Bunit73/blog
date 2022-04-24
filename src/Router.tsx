import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BaseFunctionComponent } from './common/BaseComponent';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { Login } from './pages/Login';
import { AddArticle } from './pages/AddArticle';
import { Post } from './pages/Post';

const MainRouter: BaseFunctionComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/add" element={<AddArticle />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
};

export { MainRouter };
