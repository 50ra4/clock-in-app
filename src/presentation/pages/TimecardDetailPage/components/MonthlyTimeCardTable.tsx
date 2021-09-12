import React, { useMemo } from 'react';
import styled from 'styled-components';
import ja from 'date-fns/locale/ja';
import format from 'date-fns/format';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSunday from 'date-fns/isSunday';
import isSaturday from 'date-fns/isSaturday';

import { DailyTimeRecord } from 'types';
import { stringDateToDate } from 'utils/dateUtil';
import { DATE_FORMAT } from 'constants/dateFormat';
import { timeToTimeString } from 'utils/timeUtil';

type Props = {
  className?: string;
  month: string;
  dailyRecords: DailyTimeRecord[];
};

export const MonthlyTimeCardTable = React.memo(function MonthlyTimeCardTable({
  className,
  month,
  dailyRecords,
}: Props) {
  const days = useMemo(() => {
    const start = stringDateToDate(`${month}-01`, DATE_FORMAT.dateISO);
    const end = endOfMonth(start);
    return eachDayOfInterval({ start, end });
  }, [month]);

  return (
    <StyledRoot className={className}>
      <StyledTable>
        <thead>
          <tr>
            <th scope="col">日付</th>
            <th scope="col">編集</th>
            <th scope="col">出社</th>
            <th scope="col">退社</th>
            <th scope="col">備考</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => {
            const dateString = format(day, DATE_FORMAT.dateISO);
            const record = dailyRecords.find((record) => record.date === dateString);
            // TODO: add other remarks field
            const remarks = [record?.remarks].filter((v) => v).join('\n');
            return (
              <RecordRow key={dateString} isSunday={isSunday(day)} isSaturday={isSaturday(day)}>
                <th scope="row">
                  <>
                    {format(day, DATE_FORMAT.monthDay)}
                    <span>{format(day, DATE_FORMAT.dayOfWeek, { locale: ja })}</span>
                  </>
                </th>
                <td>TBD</td>
                <td>{record?.start ? timeToTimeString(record?.start) : '-'}</td>
                <td>{record?.end ? timeToTimeString(record?.end) : '-'}</td>
                <td>{remarks || ' '}</td>
              </RecordRow>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledRoot>
  );
});

const StyledRoot = styled.div`
  border-top: 1px solid #b8b8c5;
`;

const StyledTable = styled.table`
  overflow-y: auto;

  tbody {
    white-space: nowrap;
  }

  thead th:last-child {
    text-align: left;
  }

  th,
  td {
    padding: ${({ theme }) => `${theme.space.middle}px`};
  }

  // sticky header
  thead th {
    position: sticky;
    top: 0;
    vertical-align: bottom;
    background-color: #fff;
    z-index: ${({ theme }) => theme.zIndex.appBar};
  }

  /* border */
  border-spacing: 0;
  border: 1px solid #b8b8c5;
  border-top: none;
  th,
  td {
    border: 1px solid #b8b8c5;
    border-top: none;
    border-left: none;
    &:last-child {
      border-right: none;
    }
  }
  tr:last-child {
    &:not(:first-child) {
      th,
      td {
        border-bottom: none;
      }
    }
  }
`;

type DayOfWeekStyledProps = {
  isSunday: boolean;
  isSaturday: boolean;
};

const RecordRow = styled.tr<DayOfWeekStyledProps>`
  & > th {
    z-index: ${({ theme }) => theme.zIndex.appBar - 1};
    width: 80px;
    text-align: right;
    & > span {
      margin-left: ${({ theme }) => `${theme.space.middle}px`};
      /* TODO: change color style */
      color: ${({ isSunday, isSaturday }) => (isSunday ? 'red' : isSaturday ? 'blue' : '#000')};
    }
  }
  & > td {
    text-align: center;
    &:nth-child(2) {
      width: 50px;
    }
    &:nth-child(3) {
      width: 60px;
    }
    &:nth-child(4) {
      width: 60px;
    }
    &:nth-child(5) {
      text-align: left;
      ${({ theme }) => theme.font.ellipsis.single()}
    }
  }
`;
