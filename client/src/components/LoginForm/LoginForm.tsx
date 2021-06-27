import { useState } from 'react';
import { LoginFormWrapper, LoginFormInputWrapper, LoginFormButtonWrapper } from './styles';
import { Button, Input } from '../';

const LoginForm = () => {
  const [emailAddress, setEmailAddress] = useState('');

  return (
    <LoginFormWrapper>
      <LoginFormInputWrapper>
        <Input
          id="emailAddress"
          label="Email Address"
          placeholder="Email Address"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </LoginFormInputWrapper>
      <LoginFormButtonWrapper>
        <Button>Login</Button>
      </LoginFormButtonWrapper>
    </LoginFormWrapper>
  );
};

export default LoginForm;
