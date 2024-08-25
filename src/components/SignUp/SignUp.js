import axios from 'axios';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  :root {
    --bg: #F0F4F3;
    --theme: #3AB19B;
    --theme-two: #FFFFFF;
    --text: #697a79;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8 0.8) translate(5 5)"><circle cx="50" cy="50" r="50" fill="%23FBCD44"/></g></svg>'), url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8 0.8) translate(5 5)"><path d="M 0 80 l 100 -80 v 100 z" fill="%23E35E6A"/></g></svg>'), var(--bg);
    background-repeat: no-repeat;
    background-position: bottom -150px left -70px, top -120px right -100px;
    background-size: 300px, 380px, 100%;
    font-family: 'Montserrat', sans-serif;
    color: var(--text);
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  }

  body:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8 0.8) translate(5 5)"><circle cx="50" cy="50" r="50" fill="%23ffffff22"/></g></svg>'), url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8 0.8) translate(5 5)"><path d="M 0 80 l 100 -80 v 100 z" fill="%23ffffff22"/></g></svg>');
    background-repeat: no-repeat;
    background-position: bottom -150px left -70px, top -120px right -100px;
    background-size: 300px, 380px;
  }
`;

// Styled components 정의
const AppContainer = styled.div`
  max-width: 1000px;
  width: 90vw;
  min-height: 600px;
  background: var(--theme-two);
  border-radius: 20px;
  box-shadow: 0 2px 5px -6px var(--text), 0 0 30px -50px var(--text);
  display: flex;
  @media (max-width: 650px) {
    flex-direction: column;
    border-radius: 0;
    width: 100vw;
    height: 100%;
    margin: 0;
    box-shadow: none;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 2;
  position: relative;
  overflow-x: hidden;
  padding: 1rem;
  height: 100vh; /* 고정된 높이 설정 */
  box-sizing: border-box; /* 패딩이 높이에 포함되도록 설정 */
`;

const ActionPanelContainer = styled(Panel)`
  background: var(--theme);
  color: var(--theme-two);
  flex-grow: 1;W
  border-radius: inherit;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: opacity 0.4s ease, transform 0.4s ease; // 애니메이션 추가
  opacity: ${({ transition }) => (transition ? 0 : 1)}; // 불투명도 조정
  transform: ${({ transition }) => (transition ? 'translateX(20px)' : 'translateX(0)')}; // 슬라이드 효과

  @media (max-width: 650px) {
    border-radius: 0;
  }
`;

const FormPanelContainer = styled(Panel)`
  flex-grow: 2;
  border-radius: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: opacity 0.4s ease, transform 0.4s ease; // 애니메이션 추가
  opacity: ${({ transition }) => (transition ? 0 : 1)}; // 불투명도 조정
  transform: ${({ transition }) => (transition ? 'translateX(-20px)' : 'translateX(0)')}; // 슬라이드 효과

  @media (max-width: 650px) {
    border-radius: 0;
  }
`;

const Heading = styled.h2`
  font-size: 1.9rem;
  text-transform: capitalize;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  margin: 1rem 0;
  max-width: 25ch;
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 300;
  text-align: center;
`;

const Button = styled.button`
  background: ${props => (props.primary ? 'var(--theme)' : 'none')};
  color: ${props => (props.primary ? 'var(--theme-two)' : 'inherit')};
  border: 1px solid currentColor;
  border-radius: 50px;
  padding: 0.85rem 2.75rem;
  margin: 2rem 0;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SocialLink = styled.a`
  display: inline-block;
  font-weight: 900;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  border: 1px solid currentColor;
  margin: 0 0.5rem;
  &:hover,
  &:focus {
    background: var(--text);
    color: var(--theme-two);
  }
`;

const Input = styled.input`
  margin: 0.5rem 1px;
  width: 200px;
  padding: 1rem 0.75rem;
  background: var(--bg);
  border: none;
  color: inherit;
  font-family: inherit;
  &::placeholder {
    opacity: 0.8;
  }
`;

// Input을 감싸는 부모 컨테이너 스타일 정의
const InputContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
`;

const Link = styled.a`
  text-decoration: none;
  margin: 1rem 0;
  color: inherit;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    border-bottom: 1px dashed currentColor;
    opacity: 0.4;
  }
`;

// 컴포넌트 정의
const ActionPanel = ({ signIn, slide, transition }) => {
  const heading = signIn ? 'Hello friend!' : 'Welcome back!';
  const paragraph = signIn ? 'Enter your personal details and start your journey with us' : 'To keep connected with us please login with your personal info';
  const button = signIn ? 'Sign up!' : 'Sign in!';

  return (
    <ActionPanelContainer transition={transition}>
      <Heading>{heading}</Heading>
      <Paragraph>{paragraph}</Paragraph>
      <Button onClick={slide}>{button}</Button>
    </ActionPanelContainer>
  );
};

const FormPanel = ({ signIn, transition }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); //폼 데이터 로그 출력
    try {
      let response;

      if (signIn) {
        // 로그인 요청
        const FormPanel = ({ signIn, transition }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); //폼 데이터 로그 출력
    try {
      let response;

      if (signIn) {
        // 로그인 요청
        const FormPanel = ({ signIn, transition }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); //폼 데이터 로그 출력
    try {
      let response;
      const { username, email, password } = formData;

      if (signIn) {
        // 로그인 요청, username을 제외한 email과 password만 전송
        response = await axios.post('/api/auth/login', { email, password });
      } else {
        // 회원가입 요청
        response = await axios.post('/api/auth/register', { username, email, password });
      }

      if (response.data.success) {
        // 세션 토큰 저장
        localStorage.setItem('sessionToken', response.data.token);
        // 메인 페이지로 이동
        window.location.href = '/MainDashboard';
      } else {
        alert(response.data.message || 'Error occurred!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred!');
    }
  };

  const heading = signIn ? 'Sign in' : 'Create account';

  const social = [
    { href: '#', icon: 'f' },
    { href: '#', icon: 't' },
    { href: '#', icon: 'in' }
  ];

  const paragraph = 'Or use your email account';

  const inputs = [
    { type: 'text', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' }
  ];


  if (!signIn) {
    inputs.unshift({ type: 'text', name: 'username', placeholder: 'Name' });
  }

  const link = { href: '#', text: 'Forgot your password?' };
  const button = signIn ? 'Sign in' : 'Sign up';

  return (
    <FormPanelContainer transition={transition}>
      <Heading>{heading}</Heading>
      <SocialContainer>
        {social.map(({ href, icon }) => (
          <SocialLink href={href} key={icon}>{icon}</SocialLink>
        ))}
      </SocialContainer>
      <Paragraph>{paragraph}</Paragraph>
      <form onSubmit={handleSubmit}>
        <InputContainer>
        {inputs.map(({ type, name, placeholder }) => (
          <Input type={type} name={name} key={placeholder} placeholder={placeholder} value={formData[name]} onChange={handleChange} />
        ))}
        </InputContainer>
        <Button primary type="submit">{button}</Button>
      </form>
      <Link href={link.href}>{link.text}</Link>
    </FormPanelContainer>
  );
};
      } else {
        // 회원가입 요청
        response = await axios.post('/api/register', formData);
      }

      if (response.data.success) {
        // 세션 토큰 저장
        localStorage.setItem('sessionToken', response.data.token);
        // 메인 페이지로 이동
        window.location.href = '/MainDashboard';
      } else {
        alert(response.data.message || 'Error occurred!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred!');
    }
  };

  const heading = signIn ? 'Sign in' : 'Create account';

  const social = [
    { href: '#', icon: 'f' },
    { href: '#', icon: 't' },
    { href: '#', icon: 'in' }
  ];

  const paragraph = 'Or use your email account';

  const inputs = [
    { type: 'text', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' }
  ];


  if (!signIn) {
    inputs.unshift({ type: 'text', name: 'username', placeholder: 'Name' });
  }

  const link = { href: '#', text: 'Forgot your password?' };
  const button = signIn ? 'Sign in' : 'Sign up';

  return (
    <FormPanelContainer transition={transition}>
      <Heading>{heading}</Heading>
      <SocialContainer>
        {social.map(({ href, icon }) => (
          <SocialLink href={href} key={icon}>{icon}</SocialLink>
        ))}
      </SocialContainer>
      <Paragraph>{paragraph}</Paragraph>
      <form onSubmit={handleSubmit}>
        <InputContainer>
        {inputs.map(({ type, name, placeholder }) => (
          <Input type={type} name={name} key={placeholder} placeholder={placeholder} value={formData[name]} onChange={handleChange} />
        ))}
        </InputContainer>
        <Button primary type="submit">{button}</Button>
      </form>
      <Link href={link.href}>{link.text}</Link>
    </FormPanelContainer>
  );
};
      } else {
        // 회원가입 요청
        response = await axios.post('/api/register', formData);
      }

      if (response.data.success) {
        // 세션 토큰 저장
        localStorage.setItem('sessionToken', response.data.token);
        // 메인 페이지로 이동
        window.location.href = '/MainDashboard';
      } else {
        alert(response.data.message || 'Error occurred!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred!');
    }
  };

  const heading = signIn ? 'Sign in' : 'Create account';

  const social = [
    { href: '#', icon: 'f' },
    { href: '#', icon: 't' },
    { href: '#', icon: 'in' }
  ];

  const paragraph = 'Or use your email account';

  const inputs = [
    { type: 'text', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' }
  ];


  if (!signIn) {
    inputs.unshift({ type: 'text', name: 'username', placeholder: 'Name' });
  }

  const link = { href: '#', text: 'Forgot your password?' };
  const button = signIn ? 'Sign in' : 'Sign up';

  return (
    <FormPanelContainer transition={transition}>
      <Heading>{heading}</Heading>
      <SocialContainer>
        {social.map(({ href, icon }) => (
          <SocialLink href={href} key={icon}>{icon}</SocialLink>
        ))}
      </SocialContainer>
      <Paragraph>{paragraph}</Paragraph>
      <form onSubmit={handleSubmit}>
        <InputContainer>
        {inputs.map(({ type, name, placeholder }) => (
          <Input type={type} name={name} key={placeholder} placeholder={placeholder} value={formData[name]} onChange={handleChange} />
        ))}
        </InputContainer>
        <Button primary type="submit">{button}</Button>
      </form>
      <Link href={link.href}>{link.text}</Link>
    </FormPanelContainer>
  );
};

const App = () => {
  const [signIn, setSignIn] = useState(true);
  const [transition, setTransition] = useState(false);

  const slide = () => {
    if (transition) {
      return;
    }

    setSignIn(!signIn);
    setTransition(true);

    setTimeout(() => {
      setTransition(false);
    }, 500); // 애니메이션 시간과 일치하도록 조정
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <FormPanel signIn={signIn} transition={transition} />
        <ActionPanel signIn={signIn} slide={slide} transition={transition} />
      </AppContainer>
    </>
  );
};

export default App;