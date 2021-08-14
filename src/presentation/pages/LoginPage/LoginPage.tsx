import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { Card } from 'presentation/components/surfaces/Card/Card';
import { TextForm } from 'presentation/components/forms/TextForm/TextForm';
import { PasswordForm } from 'presentation/components/forms/PasswordForm/PasswordForm';
import { Button } from 'presentation/components/inputs/Button/Button';

import { signInUser } from 'thunks/authentication';
import { PAGE_PATH } from 'constants/path';
import { AppState } from 'store/root';
import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';

const LoginPage = () => {
  const isLoading = useSelector((state: AppState) => state.authentication.fetchStatus === 'FETCHING');

  return (
    <WithHeaderLayout>
      <LoadingGuard open={isLoading} />
      <StyledRoot>
        <StyledCard title="ログイン">
          <LoginPageForm />
        </StyledCard>
      </StyledRoot>
    </WithHeaderLayout>
  );
};

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
`;
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 480px;
`;

type Dispatch = Parameters<ReturnType<typeof signInUser>>[0];

const LoginPageForm = React.memo(function LoginPageForm() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<Dispatch>();
  const login = useCallback(async () => {
    const result = await dispatch(signInUser(email, password));
    if (result) {
      history.replace(PAGE_PATH.top);
    }
  }, [dispatch, email, history, password]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      <StyledTextForm
        id="email"
        name="email"
        label="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        onClear={() => setEmail('')}
      />
      <StyledPasswordForm
        id="password"
        name="password"
        label="パスワード"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button type="submit" color="secondary" fullWidth={true} onClick={login}>
        ログイン
      </Button>
    </StyledForm>
  );
});

const StyledForm = styled.form``;
const StyledTextForm = styled(TextForm)`
  margin-top: 10px;
  margin-bottom: 20px;
`;
const StyledPasswordForm = styled(PasswordForm)`
  margin-bottom: 20px;
`;

export default LoginPage;
