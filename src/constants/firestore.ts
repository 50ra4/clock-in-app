const DOCUMENT_BASE_PATH = 'versions/v1';

/**
 * NOTE: Anyone can read it, but only logged-in users can edit it.
 */
export const USER_COLLECTION_PATH = `${DOCUMENT_BASE_PATH}/users` as const;

export const MONTHLY_TIMECARD_DOCUMENT_PATH = `${USER_COLLECTION_PATH}/:uid/timecards/:month` as const;

export const DAILY_RECORDS_COLLECTION_PATH = `${MONTHLY_TIMECARD_DOCUMENT_PATH}/days` as const;

export const DAILY_IN_HOUSE_WORK_COLLECTION_PATH = `${DAILY_RECORDS_COLLECTION_PATH}/:day/in-house-works` as const;

export const DAILY_REST_TIME_COLLECTION_PATH = `${DAILY_RECORDS_COLLECTION_PATH}/:day/rest-times` as const;
