import { useLoginRedirection } from 'hooks/useAuthentication';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { TimecardPreferenceView } from './TimecardPreferenceView';

const UserSettingPage = () => {
  useLoginRedirection();

  return (
    <WithHeaderLayout>
      <TimecardPreferenceView readOnly={false} inline={true} />
    </WithHeaderLayout>
  );
};

export default UserSettingPage;
