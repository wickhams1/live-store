import { useState, useContext } from 'react';
import { UserContext } from '../../contexts';
import { LoginFormWrapper, LoginFormInputWrapper, LoginFormButtonWrapper, LoginFormSpinnerWrapper } from './styles';
import { Button, Input, Spinner } from '../';

const LoginForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const { loading, loginUser } = useContext(UserContext);

  return (
    <LoginFormWrapper>
      {loading ? (
        <LoginFormSpinnerWrapper>
          <Spinner />
        </LoginFormSpinnerWrapper>
      ) : (
        <>
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
            <Button disabled={!emailAddress.length} onClick={() => loginUser(emailAddress)}>
              Login
            </Button>
          </LoginFormButtonWrapper>
        </>
      )}
    </LoginFormWrapper>
  );
};

export default LoginForm;
