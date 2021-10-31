import { useLoginRedirection } from 'hooks/useAuthentication';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { UserSettingForm } from './components/UserSettingForm';

const UserSettingPage = () => {
  useLoginRedirection();

  return (
    <WithHeaderLayout>
      <UserSettingForm readOnly={false} inline={true} />
    </WithHeaderLayout>
  );
};

export default UserSettingPage;
