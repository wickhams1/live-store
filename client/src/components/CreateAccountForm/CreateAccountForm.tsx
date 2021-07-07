import { useState, useContext } from 'react';
import { UserContext } from '../../contexts';
import {
  CreateAccountFormWrapper,
  CreateAccountFormInputWrapper,
  CreateAccountFormButtonWrapper,
  CreateAccountFormSpinnerWrapper,
} from './styles';
import { Button, Input } from '../';
import Spinner from '../Spinner';

const CreateAccountForm = () => {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const { loading, createAccount } = useContext(UserContext);

  return (
    <CreateAccountFormWrapper>
      {loading ? (
        <CreateAccountFormSpinnerWrapper>
          <Spinner />
        </CreateAccountFormSpinnerWrapper>
      ) : (
        <>
          <CreateAccountFormInputWrapper>
            <Input id="name" label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </CreateAccountFormInputWrapper>
          <CreateAccountFormInputWrapper>
            <Input
              id="emailAddress"
              label="Email Address"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </CreateAccountFormInputWrapper>
          <CreateAccountFormButtonWrapper>
            <Button
              disabled={!name.length || !emailAddress.length}
              onClick={() => createAccount({ name, emailAddress })}
            >
              Continue
            </Button>
          </CreateAccountFormButtonWrapper>
        </>
      )}
    </CreateAccountFormWrapper>
  );
};

export default CreateAccountForm;
