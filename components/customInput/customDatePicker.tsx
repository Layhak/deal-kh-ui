import React from 'react';
import { useField, useFormikContext } from 'formik';
import { DatePicker, DatePickerProps } from '@nextui-org/react';

interface CustomDatePickerProps extends DatePickerProps {
  name: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <DatePicker
      {...props}
      name={name}
      label="Date of Birth"
      variant={'bordered'}
      isInvalid={meta.touched && !!meta.error}
      errorMessage={meta.touched && meta.error ? meta.error : ''}
      color={meta.touched && meta.error ? 'danger' : 'default'}
      value={field.value || null}
      onChange={(date) => setFieldValue(name, date)}
      className="w-full"
      labelPlacement={'outside'}
    />
  );
};

export default CustomDatePicker;
