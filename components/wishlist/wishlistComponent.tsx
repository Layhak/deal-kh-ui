'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import DeleteWishListConfirmationModal from './DeleteWishlistConfirmationModal';
import Loading from '../../app/(user)/loading';
import { SearchIcon } from '../icons';
import { WishListItem } from '../../types/wishList';
import { useGetAllUserWishListQuery } from '../../redux/service/wishList';
import { useGetProfileQuery } from '../../redux/service/user';

const INITIAL_VISIBLE_COLUMNS = [
  'productName',
  'description',
  'discountPercentage',
  'isGranted',
  'actions',
];

const columns = [
  { uid: 'productName', name: 'Product Name' },
  { uid: 'description', name: 'Description' },
  { uid: 'discountPercentage', name: 'Discount Percentage' },
  { uid: 'isGranted', name: 'Is Granted' },
  { uid: 'actions', name: 'Actions' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'REQUESTING':
      return 'warning';
    case 'DENIED':
      return 'danger';
    default:
      return 'success';
  }
};

const WishListTableComponent: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>('');
  const [selectedKeys, setSelectedKeys] = useState<any>();
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWishlistItemUuid, setSelectedWishlistItemUuid] = useState<
    string | null
  >(null);

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetProfileQuery();

  const { data, isLoading, isError, error, refetch } =
    useGetAllUserWishListQuery(
      { page: page, size: rowsPerPage },
      {
        skip: !userProfile,
      }
    );

  const headerColumns = useMemo(() => {
    if (visibleColumns.size === columns.length) return columns;

    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const allItems = useMemo(() => {
    if (data && data.payload) {
      return data.payload.list.filter((item: WishListItem) =>
        item.productName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return [];
  }, [data, filterValue]);

  const totalPages = data?.payload?.pagination?.totalPages || 0;

  const renderCell = useCallback((item: WishListItem, columnKey: string) => {
    const cellValue = item[columnKey as keyof WishListItem];

    switch (columnKey) {
      case 'productName':
        return <div>{item.productName}</div>;
      case 'discountPercentage':
        return `${cellValue}%`;
      case 'isGranted':
        return (
          <Chip
            className="capitalize"
            color={getStatusColor(item.isGranted)}
            size="sm"
            variant="flat"
          >
            {item.isGranted}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Button
              onClick={() => {
                setSelectedWishlistItemUuid(item.uuid);
                setIsModalOpen(true);
              }}
              isIconOnly
              size="lg"
              color={'danger'}
              variant="light"
              radius={'full'}
            >
              <Icon icon={'bi:trash'} width={24} />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by product name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {allItems.length} items
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, allItems]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys && selectedKeys.size === allItems.length
            ? 'All items selected'
            : `${selectedKeys ? selectedKeys.size : 0} of ${allItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={page === totalPages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, page, totalPages, allItems]);

  if (isProfileLoading || isLoading) {
    return <Loading />;
  }

  if (isProfileError || isError) {
    console.log(error);
    return <div>Error loading wishlist</div>;
  }

  return (
    <div className={'flex h-full items-center justify-center'}>
      <Table
        aria-label="Wishlist table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{ wrapper: 'max-h-[400px]' }}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No wishlist items found'} items={allItems}>
          {(item: any) => (
            <TableRow key={item.uuid}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteWishListConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        wishlistItemUuid={selectedWishlistItemUuid || ''}
        refetchWishList={refetch}
      />
    </div>
  );
};

export default WishListTableComponent;
