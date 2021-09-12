import { MonthlyTimeCardTable } from './MonthlyTimeCardTable';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';
import { getThisMonthDateString } from 'utils/dateUtil';
import { mockTimeCards } from '../mockData';

export default createStoryMeta(MonthlyTimeCardTable, {
  title: 'pages/TimecardDetailPage/MonthlyTimeCardTable',
});

const Template = createStoryTemplate(MonthlyTimeCardTable);

const THIS_MONTH_DATE_STRING = getThisMonthDateString();
const thisMonthData = mockTimeCards.find(({ month }) => month === THIS_MONTH_DATE_STRING) ?? {
  month: THIS_MONTH_DATE_STRING,
  dailyRecords: [],
};

export const Docs = Template;
Docs.args = {
  month: thisMonthData.month,
  dailyRecords: thisMonthData.dailyRecords,
};
