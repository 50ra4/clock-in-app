import { useParams } from 'react-router';
import { useAuthentication } from 'hooks/useAuthentication';
import { useLoginRedirection } from 'hooks/useLoginRedirection';
import { useUserPreference } from 'hooks/useUserPreference';

import { LoadingGuard } from 'presentation/components/feedback/LoadingGuard/LoadingGuard';
import { ResponsiveLayout } from 'presentation/layouts/ResponsiveLayout/ResponsiveLayout';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { TimecardPreferenceView } from './TimecardPreferenceView';
import { Head } from 'Head';

const UserPreferencePage = (): JSX.Element => {
  useLoginRedirection();

  const { uid } = useParams<{ uid: string }>();
  const { loggedInUid } = useAuthentication();
  const { userPreference, isFetching, saveTimeCardPreference } = useUserPreference(uid);

  const isLoggedInUser = loggedInUid === uid;

  return (
    <WithHeaderLayout>
      <Head title="勤怠設定" />
      <ResponsiveLayout>
        <LoadingGuard open={isFetching} />
        {userPreference && (
          <TimecardPreferenceView
            readOnly={!isLoggedInUser}
            preference={userPreference.timecard}
            onSave={saveTimeCardPreference}
          />
        )}
      </ResponsiveLayout>
    </WithHeaderLayout>
  );
};

export default UserPreferencePage;
