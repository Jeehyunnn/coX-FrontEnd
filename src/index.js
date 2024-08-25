import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/Utils/ScrollToTop';
import MemberLoad from './components/Utils/SessionStorage';
import SingUp from './views/SignUp/SignUp';


const root = ReactDOM.createRoot(document.getElementById('root'));
//메인화면 진입 시 session 저장
MemberLoad();
root.render(
<BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<SingUp />}></Route>
      {/* <Route path="/header" element={<HeaderLogoutBtn />}></Route>
      <Route path="/footer" element={<Footer />}></Route> */}
    </Routes>
  </BrowserRouter>
);

reportWebVitals();