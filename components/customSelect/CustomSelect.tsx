// components/CustomSelect.tsx
import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { useField } from 'formik';

interface CustomSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  options,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <Select
        // label={label}
        placeholder={placeholder}
        selectedKeys={[field.value]}
        onSelectionChange={(keys: any) => helpers.setValue([...keys][0])}
        errorMessage={meta.touched && meta.error ? meta.error : ''}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
