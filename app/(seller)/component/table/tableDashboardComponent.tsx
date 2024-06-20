"use client"
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
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Image,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/app/(seller)/component/table/VerticalDotsIcon";
import { SearchIcon } from "@/app/(seller)/component/table/SearchIcon";
import { columns, products as initialProducts } from "@/app/(seller)/component/table/dataProduct"; 
import { FiEye } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import CreateProduct from "@/app/(seller)/component/popup/product/createProduct";
import ViewProductModal from "@/app/(seller)/component/popup/product/viewProduct";
import DeleteProductModal from "@/app/(seller)/component/popup/product/deleteProduct";
import { CiEdit } from "react-icons/ci";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "image",
  "name",
  "description",
  "price",
  "category",
  "discount",
  "created",
  "actions",
];

type User = typeof initialProducts[0];

export default function TableDashboardComponent() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const [products, setProducts] = useState(initialProducts); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<User | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<User | null>(null);

  const openModal = (product: User) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (product: User) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null); 
  };

  const handleDelete = () => {
    if (productToDelete) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productToDelete.id));
      closeDeleteModal();
    }
  };

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
    let filteredUsers = [...products];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [products, filterValue, statusFilter]);

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
          <Image
            src={user.avatar}
            alt={user.name}
            style={{ width: "50px", height: "50px", borderRadius: "5px" }}
          />
        );
      case "name":
      case "description":
      case "price":
      case "category":
      case "discount":
        return <div>{String(cellValue)}</div>;
      case "created":
        const createdDate = new Date(cellValue);
        return <div>{createdDate.toDateString()}</div>;
      case "actions":
        return (
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => openModal(user)}>
                  <div className="flex gap-3 ">
                    <FiEye className="w-5 h-5 text-gray-600 font-semibold dark:text-gray-200" />
                    <span className="dark:text-gray-200 font-semibold">View</span>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="flex gap-3">
                    <CiEdit className="w-5 h-5 text-gray-600 font-semibold dark:text-gray-200" />
                    <span className="dark:text-gray-200 font-semibold">Edit</span>
                  </div>
                </DropdownItem>
                <DropdownItem onClick={() => openDeleteModal(user)}>
                  <div className="flex gap-3">
                    <RiDeleteBinLine className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                    <span className="dark:text-gray-200 font-semibold">Delete</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return <div>{String(cellValue)}</div>;
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
      <div className="z-10">
        <h1 className="font-semibold text-2xl mb-8 dark:text-gray-200 text-black">List All Products</h1>
        <div className="flex justify-between z-10">
          <CreateProduct />
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
  }, [filterValue, visibleColumns, onSearchChange, products.length, hasSearchFilter]);

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
          table: "max-h-[450px] z-0",
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
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id} className=" dark:text-white">
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {modalProduct && (
        <ViewProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          productDetails={{
            imageUrl: modalProduct.avatar,
            name: modalProduct.name,
            description: modalProduct.description,
            price: modalProduct.price,
            category: modalProduct.category,
            discount: modalProduct.discount,
            created: modalProduct.created.toISOString(),
          }}
        />
      )}
      {productToDelete && (
        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDelete} 
          productName={productToDelete.name} 
        />
      )}
    </div>
  );
}
