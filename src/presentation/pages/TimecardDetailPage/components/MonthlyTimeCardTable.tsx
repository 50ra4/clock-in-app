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
import { EditIcon } from 'presentation/components/display/Icons/EditIcon';
import { IconButton, IconButtonProps } from 'presentation/components/inputs/IconButton/IconButton';

type Props = {
  className?: string;
  month: string;
  dailyRecords: DailyTimeRecord[];
  selectEditedRecord: (date: string) => void;
};

export const MonthlyTimeCardTable = React.memo(function MonthlyTimeCardTable({
  className,
  month,
  dailyRecords,
  selectEditedRecord,
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
                <td>
                  <StyledEditButton
                    color="primary"
                    areaLabel={`${dateString}の勤怠を修正する`}
                    onClick={() => {
                      selectEditedRecord(dateString);
                    }}
                  />
                </td>
                <td>{record?.start ? timeToTimeString(record?.start) : '-'}</td>
                <td>{record?.end ? timeToTimeString(record?.end) : '-'}</td>
                <td>{remarks || ' '}</td>
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
    overflow-y: auto;
    table-layout: fixed;
    width: calc(100% - 2px); // for border

    tbody {
      white-space: nowrap;
    }

    th,
    td {
      padding: ${({ theme }) => `${theme.space.middle}px`};
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
    tr > th,
    tr > td {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      &:nth-child(1) {
        width: 80px;
        z-index: ${({ theme }) => theme.zIndex.appBar - 1};
      }
      &:nth-child(2) {
        width: 56px;
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

    // header style
    & > thead {
      th {
        border: none;
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
};

const RecordRow = styled.tr<DayOfWeekStyledProps>`
  & > th {
    & > span {
      margin-left: ${({ theme }) => `${theme.space.middle}px`};
      /* TODO: change color style */
      color: ${({ isSunday, isSaturday }) => (isSunday ? 'red' : isSaturday ? 'blue' : '#000')};
    }
  }
`;

const EditButton = React.memo(function EditButton({
  ref,
  areaLabel,
  ...otherProps
}: IconButtonProps & { areaLabel: string }) {
  return (
    <IconButton aria-label={areaLabel} {...otherProps}>
      <EditIcon color="secondary" />
    </IconButton>
  );
});
const StyledEditButton = styled(EditButton)`
  padding: 0;
  & > svg {
    min-height: 48px;
    min-width: 48px;
  }
`;
