import React from 'react';
import Styled from 'styled-components';
import { Button, Input } from 'Components';

const Container = Styled.div`
  min-height: 100vh;
  display: flexx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Contents = Styled.div`
  display:flex;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
`;

const InputContainer = Styled.div`
  display: flex;
  align-self: center;
  width: 105%;
  justify-content: space-around;
`;

function App() {
  return (
    <Container>
      <Contents>
        <InputContainer>
          <Input placeholder="Enter what to do..." onChange={(text) => console.log(text)} />
          <Button
            label="Add"
            onClick={() => {
              alert('Add!');
            }}
          />
        </InputContainer>
        {/* <Button label="Delete" backgroundColor="#ff1744" hoverColor="#f01440" /> */}
      </Contents>
    </Container>
  );
}

export default App;
