import React from 'react';
import { useField } from 'formik';
import { Input } from '@nextui-org/react';

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

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
      type={type}
      label={label}
      labelPlacement={'outside'}
      size={'md'}
      variant={'bordered'}
      isInvalid={meta.touched && !!meta.error}
      errorMessage={meta.touched && meta.error ? meta.error : ''}
      color={meta.touched && meta.error ? 'danger' : 'default'}
      placeholder={placeholder}
      isClearable={true}
      onClear={handleClear}
      onChange={handleChange} // Use the custom handleChange
      value={value} // Pass the value prop to Input
    />
  );
};

export default CustomInput;
