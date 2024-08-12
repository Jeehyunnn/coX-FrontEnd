import React from 'react';
import ReactDOM from 'react-dom/client';
import Overview from './views/main';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/Utils/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Overview />}></Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();