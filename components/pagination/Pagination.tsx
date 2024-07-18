import React from 'react';
import {
  Pagination as NextUIPagination,
} from '@nextui-org/react';

type PaginationProps = {
  total: number;
  page: number;
  onChange: (page: number) => void;
};

const Pagination = ({ total, page, onChange }: PaginationProps) => {
  return (
    <NextUIPagination
      loop
      boundaries={2}
      showControls
      total={total}
      initialPage={page}
      className="gap-2"
      radius="full"
      color='default'
      variant="light"
      onChange={onChange}
    />
  );
};

export default Pagination;
