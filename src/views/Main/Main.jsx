import React from 'react';
import { Link } from 'react-router-dom';

// 스타일 객체
const dashboardStyle = {
  display: 'flex',
  height: '100vh',
};

const sidebarStyle = {
  width: '250px',
  backgroundColor: '#f4f4f4',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const profileContainerStyle = {
  width: '90%', // 사이드바보다 작은 너비
  height: '35%',
  backgroundColor: '#ffffff', // 배경색
  borderRadius: '5,px', // 모서리 둥글게
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // 그림자 효과
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px', // 사이드바와 메뉴 간격
};

const mainContentStyle = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#ffffff',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const profilePicStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', // 이미지 비율을 유지하며 채우기
  borderRadius: '50%',
  marginBottom: '10px',
};

const profileNameStyle = {
  textAlign: 'center',
  marginTop: '10px', // 이름과 사진 사이의 간격
  fontSize: '16px', // 원하는 글자 크기
  fontWeight: 'bold', // 글자 두께
};

const navLinkStyle = {
  display: 'block',
  margin: '10px 0',
  textDecoration: 'none',
  color: '#333',
};

const navButtonStyle = {
  display: 'block',
  margin: '10px 0',
};


export default function Overview() {
  return (
    <div style={dashboardStyle}>
      <aside style={sidebarStyle}>
        <div style={profileContainerStyle}>
          <img src="profile-pic-url" alt="Profile" style={profilePicStyle} />
          <span style={profileNameStyle}>사용자 이름</span>
        </div>
        <h2>사이드바</h2>
        <nav>
          <Link to="/" style={navLinkStyle}>홈</Link>
          <Link to="/overview" style={navLinkStyle}>개요</Link>
          <button style={navButtonStyle}>메뉴 2</button>
          <button style={navButtonStyle}>메뉴 3</button>
        </nav>
      </aside>
      <main style={mainContentStyle}>
        <header style={headerStyle}>
          <h1>일정 보기</h1>
        </header>
        {/* 일정 내용 */}
      </main>
    </div>
  );
}