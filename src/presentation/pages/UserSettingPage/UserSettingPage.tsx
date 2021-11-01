import { useLoginRedirection } from 'hooks/useAuthentication';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { TimecardPreferenceView } from './TimecardPreferenceView';

const UserSettingPage = (): JSX.Element => {
  useLoginRedirection();

  return (
    <WithHeaderLayout>
      <ResponsiveLayout>
        <TimecardPreferenceView readOnly={false} inline={true} />
      </ResponsiveLayout>
    </WithHeaderLayout>
  );
};

export default UserSettingPage;
