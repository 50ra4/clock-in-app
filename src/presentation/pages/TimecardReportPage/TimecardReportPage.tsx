import { useLoginRedirection } from 'hooks/useLoginRedirection';
import { WithHeaderLayout } from 'presentation/layouts/WithHeaderLayout/WithHeaderLayout';

const TimecardReportPage = () => {
  useLoginRedirection();

  return <WithHeaderLayout>TimecardReportPage</WithHeaderLayout>;
};

export default TimecardReportPage;
