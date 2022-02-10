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

type Document =
  | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export const documentToRestTime = (document: Document): RestTime =>
  ({
    id: document.id,
    start: document.get('start'),
    end: document.get('end'),
    // // FIXME: RestTime type
    // updatedAt: document.get('updatedAt'),
    // createdAt: document.get('createdAt'),
  } as RestTime);

export const restTimeToDocumentData = (
  { id, start, end }: RestTime,
  { uid, index }: { uid: string; index: number },
) => ({
  order: index + 1,
  start: formatTimeToQuery(start),
  end: formatTimeToQuery(end),
  ...createAdditionalProps(uid, !!id),
});

export const documentToInHouseWork = (document: Document): InHouseWork =>
  ({
    id: document.id,
    start: document.get('start'),
    end: document.get('end'),
    remarks: document.get('remarks'),
    // // FIXME: InHouseWork type
    // updatedAt: document.get('updatedAt'),
    // createdAt: document.get('createdAt'),
  } as InHouseWork);

export const inHouseWorkToDocumentData = (
  { id, start, end, remarks }: InHouseWork,
  { uid, index }: { uid: string; index: number },
) => ({
  order: index + 1,
  start: formatTimeToQuery(start),
  end: formatTimeToQuery(end),
  remarks,
  ...createAdditionalProps(uid, !!id),
});

export const documentToDailyTimeRecord = (document: Document): DailyTimeRecord =>
  ({
    date: document.id,
    start: document.get('start'),
    end: document.get('end'),
    remarks: document.get('remarks'),
    restTimes: [], // NOTE: fetch sub-collection
    inHouseWorks: [], // NOTE: fetch sub-collection
    // // FIXME: DailyTimeRecords type
    // updatedAt: document.get('updatedAt'),
    // createdAt: document.get('createdAt'),
  } as DailyTimeRecord);

export const dailyTimeRecordToDocumentData = (
  { start, end, remarks }: DailyTimeRecord,
  { uid, isUpdated }: { uid: string; isUpdated: boolean },
) => ({
  start: formatTimeToQuery(start),
  end: formatTimeToQuery(end),
  remarks,
  ...createAdditionalProps(uid, isUpdated),
});

export const documentToTimecardUserPreference = (document: Document) => ({
  workingStart: document.get('workingStart'),
  workingEnd: document.get('workingEnd'),
  roundDownMinute: document.get('roundDownMinute'),
  regularHolidays: document.get('regularHolidays'),
  // FIXME:
  lunchRestTime: document.get('lunchRestTime'),
  restTimes: [], // NOTE: fetch sub-collection
  // FIXME: TimecardUserPreference type
  updatedAt: document.get('updatedAt'),
  createdAt: document.get('createdAt'),
});

export const timecardUserPreferenceToDocumentData = (
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
