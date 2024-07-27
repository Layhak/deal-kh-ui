import React from 'react';
import { useField } from 'formik';
import { Input } from '@nextui-org/react';

type CustomInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  type,
  placeholder,
  onChange,
  value,
}) => {
  const [field, meta, helpers] = useField(name);
  const handleClear = () => {
    helpers.setValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e); // Call Formik's onChange
    if (onChange) {
      onChange(e); // Call the custom onChange if provided
    }
  };

  return (
    <Input
      {...field}
      value={value || field.value} // Ensure the value prop is used
      type={type}
      label={label}
      labelPlacement={'outside'}
      size={'md'}
      variant={'bordered'}
      isInvalid={meta.touched && !!meta.error}
      errorMessage={meta.touched && meta.error ? String(meta.error) : ''} // Ensure errorMessage is a string
      color={meta.touched && meta.error ? 'danger' : 'default'}
      placeholder={placeholder}
      classNames={{
        inputWrapper: '!bg-transparent',
        input: 'text-md',
      }}
      isClearable={true}
      onClear={handleClear}
      onChange={handleChange} // Use the custom handleChange
    />
  );
};

export default CustomInput;
