import { useLoginRedirection } from 'hooks/useLoginRedirection';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';
import { MobileView } from './MobileView';

const TimecardDetailPage = () => {
  useLoginRedirection();

  return (
    <WithHeaderLayout>
      <MobileView />
    </WithHeaderLayout>
  );
};

export default TimecardDetailPage;
