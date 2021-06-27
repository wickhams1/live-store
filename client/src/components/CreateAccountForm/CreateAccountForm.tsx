import { useState } from 'react';
import { CreateAccountFormWrapper, CreateAccountFormInputWrapper, CreateAccountFormButtonWrapper } from './styles';
import { Button, Input } from '../';

const CreateAccountForm = () => {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  return (
    <CreateAccountFormWrapper>
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
        <Button>Continue</Button>
      </CreateAccountFormButtonWrapper>
    </CreateAccountFormWrapper>
  );
};

export default CreateAccountForm;
