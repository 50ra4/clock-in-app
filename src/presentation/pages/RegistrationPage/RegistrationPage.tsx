import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { PAGE_PATH } from 'constants/path';
import { useAuthentication } from 'hooks/useAuthentication';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { Card } from 'presentation/components/surfaces/Card/Card';
import { TextForm } from 'presentation/components/forms/TextForm/TextForm';
import { PasswordForm } from 'presentation/components/forms/PasswordForm/PasswordForm';
import { Button } from 'presentation/components/inputs/Button/Button';
import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';
import { Link } from 'presentation/components/navigation/Link/Link';
import { authenticationErrorToMessage } from 'utils/authUtil';
import { Head } from 'Head';

const RegistrationPage = () => {
  const history = useHistory();
  const { isFetching, isLoggedIn, signUpWithPassword } = useAuthentication();

  const handleOnSignUp = async (email: string, password: string) => {
    if (isFetching) {
      return;
    }
    const response = await signUpWithPassword(email, password);
    if (response.result) {
      return; // NOTE: Automatically redirected by useEffect
    }

    // TODO: feedback ui
    window.alert(authenticationErrorToMessage(response.error));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.replace(PAGE_PATH.home);
    }
  }, [history, isLoggedIn]);

  return (
    <WithHeaderLayout>
      <Head title="アカウント登録" />
      <LoadingGuard open={isFetching} />
      <StyledRoot>
        <StyledCard title="アカウント登録">
          <RegistrationPageForm onSignUp={handleOnSignUp} />
        </StyledCard>
        <StyledDescription>
          既にアカウントをお持ちの方は<Link to={PAGE_PATH.login}>ログイン</Link>
        </StyledDescription>
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
  onSignUp: (email: string, password: string) => void;
};

function RegistrationPageForm({ onSignUp }: FormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignUp(email, password);
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
      <Button type="submit" color="secondary" fullWidth={true} text="アカウント登録" />
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

export default RegistrationPage;
