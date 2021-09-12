import { MonthSelector } from './MonthSelector';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(MonthSelector, {
  title: 'pages/TimecardDetailPage/MonthSelector',
});

const Template = createStoryTemplate(MonthSelector);

export const Docs = Template;
Docs.args = {
  selectedMonth: '2021-01',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeMonth: () => {},
};
