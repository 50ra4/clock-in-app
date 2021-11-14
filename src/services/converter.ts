import { firebase } from './firebase';
import { DailyTimeRecord, InHouseWork, RestTime, Time, TimecardUserPreference } from 'types';
import { omitUndefinedProps } from 'utils/converterUtil';

const createAdditionalProps = (uid: string, isUpdated?: boolean) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  return {
    ...(isUpdated ? {} : { createdAt: timestamp }),
    updatedAt: timestamp,
  };
};

const formatTimeToQuery = (time?: Time) => (!time ? {} : omitUndefinedProps(time));

type Query =
  | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export const queryToRestTime = (query: Query): RestTime =>
  ({
    id: query.id,
    start: query.get('start'),
    end: query.get('end'),
    // FIXME: RestTime type
    updatedAt: query.get('updatedAt'),
    createdAt: query.get('createdAt'),
  } as RestTime);

export const restTimeToDocument = (
  { id, start, end }: RestTime,
  { uid, index }: { isUpdated: boolean; uid: string; index: number },
) => ({
  order: index + 1,
  start: formatTimeToQuery(start),
  end: formatTimeToQuery(end),
  ...createAdditionalProps(uid, !!id),
});

export const queryToInHouseWork = (query: Query): InHouseWork =>
  ({
    id: query.id,
    start: query.get('start'),
    end: query.get('end'),
    remarks: query.get('remarks'),
    // FIXME: InHouseWork type
    updatedAt: query.get('updatedAt'),
    createdAt: query.get('createdAt'),
  } as InHouseWork);

export const inHouseWorkToDocument = (
  { id, start, end, remarks }: InHouseWork,
  { uid, index }: { uid: string; index: number },
) => ({
  order: index + 1,
  start: formatTimeToQuery(start),
  end: formatTimeToQuery(end),
  remarks,
  ...createAdditionalProps(uid, !!id),
});

export const queryToDailyTimeRecord = (query: Query): DailyTimeRecord =>
  ({
    date: query.id,
    start: query.get('start'),
    end: query.get('end'),
    remarks: query.get('remarks'),
    restTimes: [], // NOTE: fetch sub-collection
    inHouseWorks: [], // NOTE: fetch sub-collection
    // FIXME: DailyTimeRecords type
    updatedAt: query.get('updatedAt'),
    createdAt: query.get('createdAt'),
  } as DailyTimeRecord);

export const dailyTimeRecordToDocument = (
  { start, end, remarks }: DailyTimeRecord,
  { uid, isUpdated }: { uid: string; isUpdated: boolean },
) => ({
  start: formatTimeToQuery(start),
  end: formatTimeToQuery(end),
  remarks,
  ...createAdditionalProps(uid, isUpdated),
});

export const queryToTimecardUserPreference = (query: Query) => ({
  workingStart: query.get('workingStart'),
  workingEnd: query.get('workingEnd'),
  roundDownMinute: query.get('roundDownMinute'),
  regularHolidays: query.get('regularHolidays'),
  // FIXME:
  lunchRestTime: query.get('lunchRestTime'),
  restTimes: [], // NOTE: fetch sub-collection
  // FIXME: TimecardUserPreference type
  updatedAt: query.get('updatedAt'),
  createdAt: query.get('createdAt'),
});

export const timecardUserPreferenceToDocument = (
  {
    workingTimes: { start: workingStart, end: workingEnd },
    lunchRestTime: { start: lunchRestTimeStart, end: lunchRestTimeEnd },
    regularHolidays,
    roundDownMinute,
  }: TimecardUserPreference,
  { uid, isUpdated }: { uid: string; isUpdated: boolean },
) => ({
  workingStart: formatTimeToQuery(workingStart),
  workingEnd: formatTimeToQuery(workingEnd),
  // FIXME:
  lunchRestTime: omitUndefinedProps({ lunchRestTimeStart, lunchRestTimeEnd }),
  // lunchRestTimeStart: formatTimeToQuery(lunchRestTimeStart),
  // lunchRestTimeEnd: formatTimeToQuery(lunchRestTimeEnd),
  regularHolidays,
  roundDownMinute,
  ...createAdditionalProps(uid, isUpdated),
});
