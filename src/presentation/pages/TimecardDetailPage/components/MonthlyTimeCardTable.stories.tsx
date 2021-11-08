import { MonthlyTimeCardTable } from './MonthlyTimeCardTable';
import { createStoryMeta, createStoryTemplate } from 'utils/storybookUtils';

export default createStoryMeta(MonthlyTimeCardTable, {
  title: 'pages/TimecardDetailPage/MonthlyTimeCardTable',
});

const Template = createStoryTemplate(MonthlyTimeCardTable);

const mockData = {
  month: '2021-07',
  dailyRecords: [
    {
      start: {
        hour: 10,
        minute: 57,
      },
      date: '2021-07-01',
      inHouseWorks: [],
      restTimes: [],
      remarks: 'ああああああああああああああああああああああああああ',
    },
    {
      start: {
        hour: 12,
        minute: 9,
      },
      end: {
        hour: 15,
        minute: 42,
      },
      date: '2021-07-02',
      inHouseWorks: [],
      restTimes: [],
      remarks:
        'ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    },
    {
      start: {
        hour: 13,
        minute: 19,
      },
      end: {
        hour: 19,
        minute: 53,
      },
      date: '2021-07-03',
      inHouseWorks: [],
      restTimes: [],
      remarks: 'ああああああああああああああああああああああああああああああああああああああ',
    },
    {
      start: {
        hour: 11,
        minute: 17,
      },
      end: {
        hour: 20,
        minute: 51,
      },
      date: '2021-07-04',
      inHouseWorks: [],
      restTimes: [],
      remarks:
        'ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    },
    {
      start: {
        hour: 13,
        minute: 5,
      },
      date: '2021-07-05',
      inHouseWorks: [],
      restTimes: [],
      remarks: 'あああああああああああああああああああああああああああああああああああああああ',
    },
    {
      start: {
        hour: 12,
        minute: 25,
      },
      end: {
        hour: 20,
        minute: 54,
      },
      date: '2021-07-06',
      inHouseWorks: [],
      restTimes: [],
      remarks: 'あああああああああああああああああああああああああああああああああああああ',
    },
    {
      start: {
        hour: 14,
        minute: 15,
      },
      end: {
        hour: 20,
        minute: 10,
      },
      date: '2021-07-07',
      inHouseWorks: [],
      restTimes: [],
      remarks: 'あああああああああああああああああああああああああああああ',
    },
    {
      start: {
        hour: 14,
        minute: 57,
      },
      end: {
        hour: 18,
        minute: 37,
      },
      date: '2021-07-08',
      inHouseWorks: [],
      restTimes: [],
      remarks: 'ああああああああああ',
    },
    {
      start: {
        hour: 11,
        minute: 27,
      },
      end: {
        hour: 19,
        minute: 7,
      },
      date: '2021-07-09',
      inHouseWorks: [],
      restTimes: [],
      remarks:
        'あああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    },
    {
      start: {
        hour: 9,
        minute: 4,
      },
      end: {
        hour: 13,
        minute: 9,
      },
      date: '2021-07-10',
      inHouseWorks: [],
      restTimes: [],
      remarks:
        'あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    },
  ],
};

export const Docs = Template;
Docs.args = {
  month: mockData.month,
  dailyRecords: mockData.dailyRecords,
  preference: {
    regularHolidays: [0, 1],
    roundDownMinute: 0,
    lunchRestTime: {},
    otherRestTimes: [],
    workingTimes: {},
  },
};
