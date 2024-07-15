import React, { useState } from 'react';
import { useField } from 'formik';
import { Checkbox, useDisclosure } from '@nextui-org/react';
import cn from 'classnames';
import TermsModal from '@/components/termsModal/TermsModal';

interface CustomCheckboxProps {
  name: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ name }) => {
  const [field, meta] = useField({ name, type: 'checkbox' });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <div>
      <TermsModal isOpen={isOpen} onClose={onOpenChange} />
      <Checkbox
        id={name}
        {...field}
        onChange={() =>
          field.onChange({ target: { name, value: !field.value } })
        }
        classNames={
          field.value
            ? {
                icon: cn('text-gray-50 '),
                wrapper: 'bg-gradient-to-r from-pink-500 to-yellow-500 ',
              }
            : {
                wrapper: 'text-foreground',
              }
        }
      >
        <p className={'pe-1'}>I agree with the </p>
      </Checkbox>
      <span
        onClick={handleOpen}
        className={
          field.value
            ? 'cursor-pointer bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text  text-transparent'
            : 'cursor-pointer text-primary-500  hover:text-blue-600'
        }
      >
        terms & conditions
      </span>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomCheckbox;
