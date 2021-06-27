import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_USER_BY_EMAIL_ADDRESS } from '../graphql/queries';
import { Query } from '../graphql/generated';
import { User, MutationCreateUserArgs } from '../graphql/generated';

interface ContextState {
  loading: boolean;
  error: any;
  user?: User | null;
  loggedIn: boolean;
  createAccount: (args: MutationCreateUserArgs) => void;
  loginUser: (emailAddress: string) => void;
  logoutUser: () => void;
  clearError: () => void;
}

const defaultValue: ContextState = {
  loading: false,
  error: '',
  user: null,
  loggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
  clearError: () => {},
  createAccount: () => {},
};

export const UserContext = createContext(defaultValue as ContextState);

const Provider = ({ children }: PropsWithChildren<{}>) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const { loading, data, error } = useQuery<Query>(FIND_USER_BY_EMAIL_ADDRESS, {
    variables: { emailAddress },
    skip: !emailAddress,
  });
  const user = data?.findUserByEmailAddress?.user;

  const loginUser = (emailAddress: string) => {
    setEmailAddress(emailAddress);
  };

  console.log({ loading, data, error, emailAddress: !!emailAddress });

  useEffect(() => setLoggedIn(!!user), [user]);

  return (
    <UserContext.Provider value={{ ...defaultValue, user, loading, error, loggedIn, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
