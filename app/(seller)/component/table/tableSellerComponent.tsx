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
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import {PlusIcon} from "@/app/(seller)/component/table/PlusIcon";
import { VerticalDotsIcon } from "@/app/(seller)/component/table/VerticalDotsIcon";
import { SearchIcon } from "@/app/(seller)/component/table/SearchIcon";
import { FiEye } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { columns, sellers, statusOptions } from "@/app/(seller)/component/table/dataSeller";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["image", "name", "email", "gender", "address","phone_number", "date_of_birth","created_at", "actions"];

type User = typeof sellers[0];

export default function TableSellerComponent() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...sellers];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [sellers, filterValue, statusFilter]);

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
      case "image":
            return (
                <img
                    src={user.image}
                    alt={user.name}
                    style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                />
            );
      case "name":
        return (
            <div>
                {cellValue}
            </div>
        );

        case "email":
            return (
                <div>
                    {cellValue}
                </div>
            );
            case "gender":
                return (
                    <div>
                        {cellValue}
                    </div>
                );

        case "phone_number":
            return (
                <div>
                    {cellValue}
                </div>
            );
        
            case "date_of_birth":
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

        case "actions":
            return (
                <div className="relative flex justify-start items-center gap-2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-300" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem>
                                <div className="flex gap-3">
                                    <FiEye className="w-5 h-5 text-gray-600" />
                                    <span>View</span>
                                </div>
                            </DropdownItem>
                            <DropdownItem>
                                <div className="flex gap-3">
                                    <CiEdit className="w-5 h-5 text-gray-600" />
                                    <span>Edit</span>
                                </div>
                            </DropdownItem>
                            <DropdownItem>
                                <div className="flex gap-3">
                                    <RiDeleteBinLine className="w-5 h-5 text-gray-600" />
                                    <span>Delete</span>
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div>
        <h1 className="font-semibold text-2xl mb-8 dark:text-gray-200 text-black">List All Sellers</h1>
        <div className="flex justify-between ">
          {/* <CreateShopModal isOpen={isModalOpen} onClose={closeModal} /> */}
          <Button className="border font-semibold dark:bg-zinc-800 dark:text-gray-200 text-gray-600 text-lg border-stone-200 bg-slate-50  rounded-md" onClick={openModal}>
            <PlusIcon /> Create Seller
          </Button>
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[300px] h-10",
              inputWrapper: "border-1 border-gray-300 bg-slate-50 dark:bg-zinc-800 rounded-md transition-colors duration-200",
              input: "h-full text-lg dark:text-gray-200 placeholder:text-lg focus:outline-none",
              clearButton: "text-gray-500 dark:text-gray-200",
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
    sellers.length,
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
            style={{ fontWeight: "medium", fontSize: "13px"}}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id} className=" dark:text-white">
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  );
}
