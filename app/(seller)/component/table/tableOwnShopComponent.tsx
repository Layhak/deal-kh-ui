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
  SortDescriptor,
  Tooltip
} from "@nextui-org/react";
import {PlusIcon} from "./PlusIcon";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {SearchIcon} from "./SearchIcon";
import { FiEye } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import {columns, shops, statusOptions} from "./dataOwnShop";
import CreateShopModal from "../popup/Shop/createShop";
import ViewShopModal from "../popup/Shop/viewShop";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";


const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["image", "name", "owner", "description", "address","contact", "created", "actions"];

type User = typeof shops[0];

export default function TableOwnShopComponent() {
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
    let filteredUsers = [...shops];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [shops, filterValue, statusFilter]);

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

        case "owner":
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

        case "address":
            return (
                <div>
                    {cellValue}
                </div>
            );

        case "contact":
            return (
                <div>
                    {cellValue}
                </div>
            );

        case "created":
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
                        <DropdownItem onClick={openModal}>
                          <div className="flex gap-3">
                            <FiEye className="w-5 h-5 text-gray-600" />
                            <span>View</span>
                          </div>
                        </DropdownItem>
                        {/* Modal component */}
                        {/* <ViewShopModal isOpen={isModalOpen} onClose={closeModal} /> */}
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

        // case "actions":
        // return (
        //   <div className="relative flex items-center gap-2">
        //     <Tooltip  content="View">
        //       <span className="text-lg text- cursor-pointer active:opacity-50">
        //         <EyeIcon />
        //       </span>
        //     </Tooltip>
        //     <Tooltip content="Edit">
        //       <span className="text-lg text-warning cursor-pointer active:opacity-50">
        //         <EditIcon />
        //       </span>
        //     </Tooltip>
        //     <Tooltip color="danger" content="Delete">
        //       <span className="text-lg text-danger cursor-pointer active:opacity-50">
        //         <DeleteIcon />
        //       </span>
        //     </Tooltip>
        //   </div>
        // );

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
        <h1 className="font-semibold text-2xl mb-8 text-black dark:text-gray-200">List All Shopkeeper</h1>
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
          <Button 
            className="w-full md:w-auto border font-semibold dark:bg-zinc-800 dark:text-gray-200 text-gray-100 text-lg border-stone-200 bg-slate-100 rounded-md" 
            onClick={openModal}
          >
            <PlusIcon /> Create Shop
            <Chip color="warning" variant="faded">Faded</Chip>
          </Button>
          <Input
            isClearable
            classNames={{
              base: "w-full md:w-auto sm:max-w-[300px] h-10",
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
    shops.length,
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
        table: "max-h-[450px] rounded-none no-shadow-table",
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
            style={{ fontWeight: "medium", fontSize: "13px", }}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No shops found"} items={sortedItems}>
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


