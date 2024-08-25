import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/Utils/ScrollToTop';
import MemberLoad from './components/Utils/SessionStorage';
import SingUp from './views/SignUp/SignUp';
import Overview from './views/Main/Main';


const root = ReactDOM.createRoot(document.getElementById('root'));
//메인화면 진입 시 session 저장
MemberLoad();
root.render(
<BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<SingUp />}></Route>
      <Route path="/overview" element={<Overview />} /> {/* Overview 컴포넌트 연결 */}
    </Routes>
  </BrowserRouter>
);

reportWebVitals();