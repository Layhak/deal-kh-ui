"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Tooltip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import { SearchIcon } from "@/app/(seller)/component/table/SearchIcon";
import { columns, wishlists, statusOptions } from "@/app/(seller)/component/table/dataWishlist";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";


const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "description", "price", "image", "category", "discount","created_at","created_by", "actions"];

type User = typeof wishlists[0];

export default function TableWishlistComponent() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });


  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...wishlists];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [wishlists, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) { 
        case "name":
            return (
                <div>
                    {cellValue}
                </div>
            );

        case "description":
            return (
                <div>
                    {cellValue}
                </div>
            );

        case "discount":
            return (
                <div>
                    {cellValue}
                </div>
            );

        case "created_at":
            return (
                <div>
                    {cellValue}
                </div>
            );
            case "created_by":
              return (
                  <div>
                      {cellValue}
                  </div>
              );
        case "actions":
            return (
              <div className="relative flex items-center gap-4">
              <Tooltip content="Ckeck">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-60">
                <FaCheck className="w-5 h-5"/>
                </span>
              </Tooltip>
              <Tooltip content="Un Ckeck">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-60">
                  <RxCross2 className="w-6 h-6" />
                </span>
              </Tooltip>
            </div>
            );

        default:
            return <div>{cellValue}</div>;
    }
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="z-30">
        <h1 className="font-semibold text-2xl mb-8 dark:text-gray-200 text-black">List All Wishlists</h1>
        <div className="flex justify-between z-30">
          <Input
            isClearable
            classNames={{
                base: "w-full sm:max-w-full h-10",
                inputWrapper: "border-1 border-gray-300 dark:bg-zinc-800 bg-slate-50 rounded-md transition-colors duration-200", 
                input: "h-full text-lg dark:text-gray-200 placeholder:text-base focus:outline-none",
                clearButton: "text-gray-500", 
            }}
            placeholder="Search..."
            size="md"
            startContent={<SearchIcon className="text-gray-800 dark:text-gray-200 mr-2 text-lg" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
        />
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    wishlists.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center ">
        <Pagination
          isCompact
          showControls
          showShadow
          color="warning"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        table: "max-h-[450px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
            style={{ fontWeight: "medium", fontSize: "13px" }}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No wishlist found"} items={sortedItems}>
        {(item) => (
          <TableRow 
          key={item.id} 
          style={{ height: "60px" }}
          className=" dark:text-white"
          >
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  );
}
