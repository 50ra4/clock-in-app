import React, { useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import logo from './logo.svg';
import './App.css';
import { darkTheme } from 'styles/theme';
import { configureStore } from 'store/root';
import { TextInput } from './components/inputs/TextInput/TextInput';
import { PasswordInput } from './components/inputs/PasswordInput/PasswordInput';
import { signInUser, signUpUser } from 'thunks/authentication';
import { Button } from './components/inputs/Button/Button';
import { GlobalStyle } from 'styles/global';

const store = configureStore({});

const useFormInput = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    dispatch(signUpUser(email, password));
  };

  const signIn = () => {
    dispatch(signInUser(email, password));
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    signUp,
    signIn,
  };
};

const TestForm = () => {
  const { email, setEmail, password, setPassword, signIn } = useFormInput();

  return (
    <div>
      <label htmlFor="email">
        email
        <TextInput
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value ?? '')}
        />
      </label>
      <label htmlFor="password">
        password
        <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.currentTarget.value ?? '')} />
      </label>
      <Button onClick={() => signIn()}>Try</Button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle theme={darkTheme} />
          <AppHeader>
            <AppLogo src={logo} alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
            <TestForm />
          </AppHeader>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${({ theme }) => theme.color.palette.main.font};
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    & {
      animation: ${spin} infinite 20s linear;
    }
  }
`;

export default App;
