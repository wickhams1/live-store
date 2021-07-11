import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useApolloClient, ApolloError, useSubscription } from '@apollo/client';
import { FIND_USER_BY_EMAIL_ADDRESS, CREATE_USER } from '../graphql/queries';
import { Query, Mutation, User, UserInput } from '../graphql/generated';
import { GraphQLError } from 'graphql';
import { USER_UPDATED } from '../graphql/subscriptions';

interface ContextState {
  initialised: boolean;
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
  initialised: false,
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
  const [initialised, setInitialised] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<ApolloError | readonly GraphQLError[]>();
  const client = useApolloClient();

  useSubscription(USER_UPDATED, { skip: !loggedIn });

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user') || '{}');

    if (Object.keys(storedUser).length) {
      setUser(storedUser);
    }
    setLoading(false);
    setInitialised(true);
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
      value={{ ...defaultValue, user, initialised, loading, error, loggedIn, loginUser, logoutUser, createAccount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
