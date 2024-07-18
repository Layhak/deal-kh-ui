import React from 'react';
import { Pagination as NextUIPagination } from '@nextui-org/react';

type PaginationProps = {
  total: number;
  page: number;
  size: number;
  onChange: (page: number) => void;
};

const Pagination = ({ total, page, onChange }: PaginationProps) => {
  return (
    <NextUIPagination
      loop
      color={'default'}
      showControls
      total={total}
      initialPage={page}
      className="gap-2"
      radius="full"
      boundaries={2}
      variant="light"
      onChange={onChange}
    />
  );
};

export default Pagination;
