import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { Card } from 'presentation/components/surfaces/Card/Card';
import { TextForm } from 'presentation/components/forms/TextForm/TextForm';
import { PasswordForm } from 'presentation/components/forms/PasswordForm/PasswordForm';
import { Button } from 'presentation/components/inputs/Button/Button';
import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';
import { Link } from 'presentation/components/navigation/Link/Link';

import { signUpUser } from 'thunks/authentication';
import { PAGE_PATH } from 'constants/path';
import { AppState } from 'store/root';

const RegistrationPage = () => {
  const isLoading = useSelector((state: AppState) => state.authentication.fetchStatus === 'FETCHING');

  return (
    <WithHeaderLayout>
      <LoadingGuard open={isLoading} />
      <StyledRoot>
        <StyledCard title="アカウント登録">
          <RegistrationPageForm />
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

type Dispatch = Parameters<ReturnType<typeof signUpUser>>[0];

function RegistrationPageForm() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<Dispatch>();
  const signUp = async () => {
    const result = await dispatch(signUpUser(email, password));
    if (!result) {
      // TODO: error handling
      window.alert('error');
      return;
    }
    history.replace(PAGE_PATH.top);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp();
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
      <Button type="submit" color="secondary" fullWidth={true}>
        アカウント登録
      </Button>
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
