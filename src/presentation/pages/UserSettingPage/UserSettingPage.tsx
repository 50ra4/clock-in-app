import { useLoginRedirection } from 'hooks/useAuthentication';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';

const UserSettingPage = () => {
  useLoginRedirection();

  return (
    <WithHeaderLayout>
      <UserSettingPageView />
    </WithHeaderLayout>
  );
};

function UserSettingPageView() {
  return null;
}

export default UserSettingPage;
