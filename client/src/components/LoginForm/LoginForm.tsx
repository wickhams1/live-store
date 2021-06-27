import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts';
import { LoginFormWrapper, LoginFormInputWrapper, LoginFormButtonWrapper } from './styles';
import { Button, Input, Spinner } from '../';

const LoginForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const { loading, loginUser } = useContext(UserContext);

  useEffect(() => {
    setLoginButtonDisabled(emailAddress.length < 1);
  }, [emailAddress]);

  return (
    <LoginFormWrapper>
      {loading ? (
        <Spinner />
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
            <Button disabled={loginButtonDisabled} onClick={() => loginUser(emailAddress)}>
              Login
            </Button>
          </LoginFormButtonWrapper>
        </>
      )}
    </LoginFormWrapper>
  );
};

export default LoginForm;
