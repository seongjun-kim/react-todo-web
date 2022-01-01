import React from "react";
import logo from "./logo.svg";
import Styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = Styled.div`
  text-align: center;
`;

const Header = Styled.div`
  background-color: #282c34 !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Image = Styled.img`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    // styled-components에서는 해당 컴포넌트가 직접 애니메이션을 
    // 수행하므로 클래스명을 추가로 명시하지 않아도 된다!
    // .App-logo {
      animation: ${spin} infinite 20s linear;
    // }
  }
`;

const AppLink = Styled.a`
  color: #61dafb
`;

function App() {
  return (
    <Container>
      <Header>
        <Image src={logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
      </Header>
    </Container>
  );
}

export default App;
