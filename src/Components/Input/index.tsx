import React from 'react';
import Styled from 'styled-components';

const InputBox = Styled.input`
  flex: 1;
  margin-right: 10px;
  font-size: 16px;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;

interface Props {
  readonly value?: string;
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
}

export const Input = ({ value, placeholder, onChange }: Props) => {
  return (
    <InputBox
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        if (typeof onChange === 'function') {
          onChange(event.target.value);
        }
      }}
    />
  );
};
