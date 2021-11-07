import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider } from 'presentation/components/display/Divider/Divider';
import { ArrowLeftIcon } from 'presentation/components/display/Icons/ArrowLeftIcon';

type OwnProps = {
  className?: string;
  id: string;
  title: string | React.ReactNode;
  disabled?: boolean;
  defaultExpanded: boolean;
};

type InheritedProps = Omit<JSX.IntrinsicElements['section'], keyof OwnProps>;

export type AccordionProps = OwnProps & InheritedProps;

const AccordionRootClass = 'Accordion';
export const AccordionClassNames = {
  root: AccordionRootClass,
  icon: {
    expanded: `${AccordionRootClass}__icon--expanded`,
    collapsed: `${AccordionRootClass}__icon--collapsed`,
  },
  contents: {
    expanded: `${AccordionRootClass}__contents--expanded`,
    collapsed: `${AccordionRootClass}__contents--collapsed`,
  },
} as const;

export function UnStyledAccordion({ id, title, defaultExpanded, disabled, children, ...otherProps }: AccordionProps) {
  const areaLabel = `accordion-${id}-header`;
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const onClickHandler = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!disabled) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <section {...otherProps}>
      <button
        id={id}
        aria-controls={areaLabel}
        aria-disabled={!isExpanded}
        aria-expanded={isExpanded}
        onClick={onClickHandler}
      >
        <h3>{title}</h3>
        <StyledArrowLeftIcon
          className={isExpanded ? AccordionClassNames.icon.expanded : AccordionClassNames.icon.collapsed}
          color="primary"
        />
      </button>
      <Divider />
      <div
        id={id}
        aria-labelledby={areaLabel}
        className={isExpanded ? AccordionClassNames.contents.expanded : AccordionClassNames.contents.collapsed}
      >
        {children}
      </div>
    </section>
  );
}

const StyledArrowLeftIcon = styled(ArrowLeftIcon)``;
export const Accordion = styled(UnStyledAccordion)`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  opacity: ${({ disabled }) => disabled && 0.5};
  padding: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin: ${({ theme }) => `${theme.space.small}px ${theme.space.middle}px ${theme.space.middle}px`};
  padding: ${({ theme }) => `${theme.space.small}px`};
  background-color: ${({ theme }) => theme.color.palette.main.background};
  & > button {
    height: 32px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: ${({ theme }) => `${theme.space.middle}px`};
    background-color: ${({ theme }) => theme.color.palette.main.background};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    & > h3 {
      display: inline-block;
      line-height: 32px;
      height: 32px;
      vertical-align: middle;
      color: ${({ theme }) => theme.color.palette.main.font};
      font-weight: ${({ theme }) => theme.font.weight.bold};
      font-size: ${({ theme }) => theme.font.size.large}px;
    }
    & > ${StyledArrowLeftIcon} {
      height: 24px;
      width: 24px;
      transition: transform 0.3s linear;
      transform: rotate(270deg);
      &.${AccordionClassNames.icon.expanded} {
        transform: rotate(90deg);
      }
    }
  }
  & > div {
    padding: ${({ theme }) => `${theme.space.small}px ${theme.space.middle}px ${theme.space.middle}px`};
    &.${AccordionClassNames.contents.expanded} {
      transition: height 0.3s, opacity 0.3s linear;
      height: auto;
      opacity: 1;
      padding: 4px;
    }
    &.${AccordionClassNames.contents.collapsed} {
      overflow: hidden;
      height: 0;
      opacity: 0;
    }
  }
`;
