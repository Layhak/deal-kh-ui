import React from 'react';
import {
  Pagination as NextUIPagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from '@nextui-org/react';
import cn from 'classnames';
import { ChevronIcon } from '@/components/icons';
import { Button } from '@nextui-org/button';

type PaginationProps = {
  total: number;
  page: number;
  onChange: (page: number) => void;
};

const Pagination = ({ total, page, onChange }: PaginationProps) => {
  const GradientPagination = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <Button
          key={key}
          className={cn(className, 'h-8 w-8 min-w-8 bg-default-200/50')}
          onClick={onNext}
          isIconOnly
        >
          <ChevronIcon className="rotate-180" />
        </Button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <Button
          key={key}
          className={cn(className, 'h-8 w-8 min-w-8 bg-default-200/50')}
          onClick={onPrevious}
          isIconOnly
        >
          <ChevronIcon />
        </Button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <Button key={key} className={className}>
          ...
        </Button>
      );
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        key={key}
        className={cn(
          className,
          isActive &&
            'bg-gradient-to-br from-warning-500 to-pink-500 font-bold text-white'
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <NextUIPagination
      loop
      disableCursorAnimation
      showControls
      total={total}
      initialPage={page}
      className="gap-2"
      radius="full"
      renderItem={GradientPagination}
      variant="light"
      onChange={onChange}
    />
  );
};

export default Pagination;
