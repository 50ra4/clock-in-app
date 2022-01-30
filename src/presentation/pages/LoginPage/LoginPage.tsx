import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { Card } from 'presentation/components/surfaces/Card/Card';
import { TextForm } from 'presentation/components/forms/TextForm/TextForm';
import { PasswordForm } from 'presentation/components/forms/PasswordForm/PasswordForm';
import { Button } from 'presentation/components/inputs/Button/Button';
import { Link } from 'presentation/components/navigation/Link/Link';
import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';

import { PAGE_PATH } from 'constants/path';
import { useAuthentication } from 'hooks/useAuthentication';
import { Head } from 'Head';

const LoginPage = () => {
  const history = useHistory();
  const { isFetching, isLoggedIn, signInWithPassword } = useAuthentication();

  // FIXME: use useCallback
  const handleOnSignIn = async (email: string, password: string) => {
    if (isFetching) {
      return;
    }
    const { result } = await signInWithPassword(email, password);
    if (result) {
      return; // NOTE: Automatically redirected by useEffect
    }
    // TODO: error handling
    window.alert('error');
  };

  useEffect(() => {
    if (isLoggedIn) {
      const from = new URLSearchParams(history.location.search).get('from');
      const path = from ? from : PAGE_PATH.home;
      history.replace(path);
    }
  }, [history, isLoggedIn]);

  return (
    <WithHeaderLayout>
      <Head title="ログイン" />
      <LoadingGuard open={isFetching} />
      <StyledRoot>
        <StyledCard title="ログイン">
          <LoginPageForm onSignIn={handleOnSignIn} />
        </StyledCard>
        <StyledDescription>
          初めての方は<Link to={PAGE_PATH.registration}>新規アカウント登録</Link>
        </StyledDescription>
        {/* TODO: パスワードをお忘れの方 */}
        {/* TODO: その他のログイン方法 */}
      </StyledRoot>
    </WithHeaderLayout>
  );
};

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  padding: ${({ theme }) => `${theme.space.large}px ${theme.space.large * 2}px ${theme.space.large * 2}px`};
  border-radius: ${({ theme }) => theme.space.middle}px;
`;
const StyledDescription = styled.p`
  width: 100%;
  max-width: 480px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.border.dark};
  border-radius: ${({ theme }) => theme.space.middle}px;
  padding: ${({ theme }) => `${theme.space.large * 2}px ${theme.space.large * 3}px`};
  margin: ${({ theme }) => theme.space.large}px;
`;

type FormProps = {
  onSignIn: (email: string, password: string) => void;
};

// TODO: use React.memo
function LoginPageForm({ onSignIn }: FormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      <StyledTextForm
        id="email"
        name="email"
        label="メールアドレス"
        value={email}
        // FIXME: use useCallback
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
      <Button type="submit" color="secondary" fullWidth={true} text="ログイン" />
    </StyledForm>
  );
}

const StyledForm = styled.form``;
const StyledTextForm = styled(TextForm)`
  margin-top: ${({ theme }) => theme.space.large}px;
  margin-bottom: ${({ theme }) => theme.space.large * 2}px;
`;
const StyledPasswordForm = styled(PasswordForm)`
  margin-bottom: ${({ theme }) => theme.space.large * 2}px;
`;

export default LoginPage;
