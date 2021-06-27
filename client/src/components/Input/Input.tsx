import { InputHTMLAttributes } from 'react';
import { InputWrapper, StyledLabel, StyledInput } from './styles';

interface InputProps<Element = HTMLInputElement> extends InputHTMLAttributes<Element> {
  label?: string;
  id: string;
}

const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput id={id} {...props} />
    </InputWrapper>
  );
};

export default Input;
