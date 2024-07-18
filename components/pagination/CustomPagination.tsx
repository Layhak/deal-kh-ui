import React from 'react';
import { Pagination } from '@nextui-org/react';

type CustomPaginationProps = {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  currentPage,
  onPageChange,
  pageSize,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="mt-4 flex items-center justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="danger"
        total={total}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CustomPagination;
