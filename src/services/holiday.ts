import axios from 'axios';
import { HolidayLookups } from 'types';

export const fetchJapaneseHoliday = () =>
  axios({
    url: 'https://50ra4.github.io/mocked-lookups/jp-holiday.json',
    method: 'GET',
  }).then((res) => res.data as HolidayLookups);
