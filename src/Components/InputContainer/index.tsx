import React from 'react';
import Styled from 'styled-components';

import { Button } from 'Components/Button';
import { Input } from 'Components/Input';

const Container = Styled.div`
    display:flex;
`;

interface Props {
  readonly data?: string;
  readonly handleChange?: (text: string) => void;
  readonly handleAdd?: () => void;
}

export const InputContainer = ({ data, handleChange, handleAdd }: Props) => {
  return (
    <Container>
      <Input placeholder="Enter what to do..." value={data} onChange={handleChange} />
      <Button label="Add" onClick={handleAdd} />
    </Container>
  );
};
