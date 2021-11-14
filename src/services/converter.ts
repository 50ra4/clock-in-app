import { DailyTimeRecord, InHouseWork, RestTime } from 'types';
import { firebase } from './firebase';

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

export const queryToTimecardUserPreference = (query: Query) => ({
  workingStart: query.get('workingStart'),
  workingEnd: query.get('workingEnd'),
  roundDownMinute: query.get('roundDownMinute'),
  regularHolidays: query.get('regularHolidays'),
  lunchRestTime: query.get('lunchRestTime'),
  restTimes: [], // NOTE: fetch sub-collection
  // FIXME: TimecardUserPreference type
  updatedAt: query.get('updatedAt'),
  createdAt: query.get('createdAt'),
});
