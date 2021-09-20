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
`;
const StyledDescription = styled.p`
  width: 100%;
  max-width: 480px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.border.dark};
  border-radius: 5px;
  padding: 15px 20px;
  margin: ${({ theme }) => theme.space.middle}px;
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
  margin-top: 10px;
  margin-bottom: 20px;
`;
const StyledPasswordForm = styled(PasswordForm)`
  margin-bottom: 20px;
`;

export default RegistrationPage;
