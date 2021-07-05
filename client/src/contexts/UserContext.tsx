import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useApolloClient, ApolloError } from '@apollo/client';
import { FIND_USER_BY_EMAIL_ADDRESS, CREATE_USER } from '../graphql/queries';
import { Query, Mutation } from '../graphql/generated';
import { User, UserInput } from '../graphql/generated';
import { GraphQLError } from 'graphql';

interface ContextState {
  loading: boolean;
  error: any;
  user?: User | null;
  loggedIn: boolean;
  createAccount: (args: UserInput) => void;
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<ApolloError | readonly GraphQLError[]>();
  const client = useApolloClient();

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user') || '{}');

    if (Object.keys(storedUser).length) {
      setUser(storedUser);
    }
  }, []);

  const loginUser = (emailAddress: string) => {
    if (loggedIn) return;

    client
      .query<Query>({ query: FIND_USER_BY_EMAIL_ADDRESS, variables: { emailAddress } })
      .then(({ data, error, errors }) => {
        setLoading(false);
        const user = data?.findUserByEmailAddress?.user;
        setUser(user || null);
        setError(error || errors);

        window.localStorage.setItem('user', JSON.stringify(user || {}));
      });
    setLoading(true);
  };

  const logoutUser = () => {
    window.localStorage.setItem('user', JSON.stringify({}));
    setUser(null);
  };

  const createAccount = ({ name, emailAddress }: UserInput) => {
    if (loggedIn) return;

    client
      .mutate<Mutation>({ mutation: CREATE_USER, variables: { user: { name, emailAddress } } })
      .then(({ data, errors }) => {
        setLoading(false);
        const user = data?.createUser?.user;
        setUser(user || null);
        setError(errors);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    setLoading(true);
  };

  useEffect(() => setLoggedIn(!!user), [user]);

  return (
    <UserContext.Provider
      value={{ ...defaultValue, user, loading, error, loggedIn, loginUser, logoutUser, createAccount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
