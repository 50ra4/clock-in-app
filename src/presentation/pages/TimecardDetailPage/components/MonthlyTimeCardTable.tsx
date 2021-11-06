/* eslint-disable complexity */
import React, { useMemo } from 'react';
import styled from 'styled-components';
import ja from 'date-fns/locale/ja';
import format from 'date-fns/format';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSunday from 'date-fns/isSunday';
import isSaturday from 'date-fns/isSaturday';

import { DailyTimeRecord, DayOfWeekCode, TimecardUserPreference } from 'types';
import { stringDateToDate } from 'utils/dateUtil';
import { DATE_FORMAT } from 'constants/dateFormat';
import { timeToTimeString } from 'utils/timeUtil';
import { EditIcon } from 'presentation/components/display/Icons/EditIcon';
import { IconButton, IconButtonProps } from 'presentation/components/inputs/IconButton/IconButton';
import { InfoIcon } from 'presentation/components/display/Icons/InfoIcon';
import { dailyTimeRecordToRemarks } from 'utils/converterUtil';

type Props = {
  className?: string;
  readOnly: boolean;
  month: string;
  dailyRecords: DailyTimeRecord[];
  preference: TimecardUserPreference;
  onSelectDate: (dateString: string) => void;
};

export const MonthlyTimeCardTable = React.memo(function MonthlyTimeCardTable({
  className,
  readOnly,
  month,
  dailyRecords,
  preference,
  onSelectDate,
}: Props) {
  const days = useMemo(() => {
    const start = stringDateToDate(`${month}-01`, DATE_FORMAT.dateISO);
    const end = endOfMonth(start);
    return eachDayOfInterval({ start, end });
  }, [month]);

  return (
    <StyledRoot className={className}>
      <table>
        <thead>
          <tr>
            <th scope="col">日付</th>
            <th scope="col">{readOnly ? '詳細' : '編集'}</th>
            <th scope="col">出社</th>
            <th scope="col">退社</th>
            <th scope="col">備考</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => {
            const dateString = format(day, DATE_FORMAT.dateISO);
            const record = dailyRecords.find((record) => record.date === dateString);
            const remarks = record ? dailyTimeRecordToRemarks(record, ' ') : '';
            const isHoliday = preference.regularHolidays.includes(day.getDay() as DayOfWeekCode);
            return (
              <RecordRow key={dateString} isSunday={isSunday(day)} isSaturday={isSaturday(day)} isHoliday={isHoliday}>
                <th scope="row">
                  {format(day, DATE_FORMAT.monthDay)}
                  <span>{`（${format(day, DATE_FORMAT.dayOfWeek, { locale: ja })}）`}</span>
                </th>
                <td>
                  <StyledActionButton
                    readOnly={readOnly}
                    day={dateString}
                    onClick={() => {
                      onSelectDate(dateString);
                    }}
                  />
                </td>
                <td>{record?.start ? timeToTimeString(record?.start) : '-'}</td>
                <td>{record?.end ? timeToTimeString(record?.end) : '-'}</td>
                <td>
                  <div>
                    <p>{remarks || ''}</p>
                  </div>
                </td>
              </RecordRow>
            );
          })}
        </tbody>
      </table>
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  width: 100%;
  & > table {
    table-layout: fixed;
    min-width: 100%;

    tbody {
      white-space: nowrap;
    }

    // sticky header
    thead th {
      position: sticky;
      top: 0;
      z-index: ${({ theme }) => theme.zIndex.appBar};
    }

    /* table border style */
    border-spacing: 0;
    th,
    td {
      border: 1px solid #b8b8c5;
      border-top: none;
    }

    // cells style
    tr {
      & > th,
      & > td {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        &:nth-child(1) {
          width: 60px;
          z-index: ${({ theme }) => theme.zIndex.appBar - 1};
        }
        &:nth-child(2) {
          width: 48px;
        }
        &:nth-child(3) {
          width: 60px;
        }
        &:nth-child(4) {
          width: 60px;
        }
        &:nth-child(5) {
          padding: ${({ theme }) => `${theme.space.middle}px`};
          & > div {
            height: 40px;
            display: flex;
            align-items: flex-start;
            & > p {
              text-align: left;
              line-height: calc(40px / 2);
              ${({ theme }) => theme.font.ellipsis.multiple(2)}
            }
          }
        }
      }
    }

    // header style
    & > thead {
      th {
        padding: ${({ theme }) => `${theme.space.middle}px`};
        background-color: ${({ theme }) => theme.color.palette.primary.background};
        color: ${({ theme }) => theme.color.palette.primary.font};
        font-weight: ${({ theme }) => theme.font.weight.bold};
        vertical-align: bottom;

        &:last-child {
          text-align: center;
        }
      }
    }
  }
`;

type DayOfWeekStyledProps = {
  isSunday: boolean;
  isSaturday: boolean;
  isHoliday: boolean;
};

const RecordRow = styled.tr<DayOfWeekStyledProps>`
  background-color: ${({ isHoliday }) => (isHoliday ? '#eafae6' : 'inherit')};

  & > th {
    & > span {
      display: block;
      margin-top: ${({ theme }) => `${theme.space.middle}px`};
      /* TODO: change color style */
      color: ${({ isSunday, isSaturday }) => (isSunday ? 'red' : isSaturday ? 'blue' : '#000')};
    }
  }
`;

const ActionButton = React.memo(function ActionButton({
  ref,
  day,
  readOnly,
  ...otherProps
}: IconButtonProps & { day: string; readOnly: boolean }) {
  return (
    <IconButton aria-label={readOnly ? `${day}の勤怠の詳細を確認する` : `${day}の勤怠を修正する`} {...otherProps}>
      {readOnly ? <InfoIcon color="secondary" /> : <EditIcon color="secondary" />}
    </IconButton>
  );
});
const StyledActionButton = styled(ActionButton)`
  padding: 0;
  & > svg {
    min-height: 24px;
    min-width: 24px;
    margin: 12px;
  }
`;
