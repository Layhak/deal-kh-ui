import React, { useEffect, useRef, useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { useField } from 'formik';

type CustomSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange?: (value: any) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  options,
  placeholder,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={selectRef}>
      <Select
        onChange={onChange}
        selectedKeys={[field.value]}
        onSelectionChange={(keys: any) => {
          helpers.setValue([...keys][0]);
          setIsOpen(false);
        }}
        label={label}
        size={'md'}
        variant="bordered"
        isInvalid={meta.touched && !!meta.error}
        errorMessage={meta.touched && meta.error ? meta.error : ''}
        color={meta.touched && meta.error ? 'danger' : 'default'}
        isOpen={isOpen}
        labelPlacement={'outside'}
        placeholder={placeholder}
        classNames={{
          popoverContent: 'text-foreground border-foreground/20',
        }}
        onClick={handleToggle}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
