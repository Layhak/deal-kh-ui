'use client';

import React, { useState } from 'react';
import { useField } from 'formik';
import { Button, Input } from '@nextui-org/react';
import { MapIcon } from '@/components/icons';
import RegisterLocationModal from '@/components/RegisterLocationModal';

type LocationInputProps = {
  label: string;
  name: string;
  placeholder?: string;
};

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  name,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLocationSelect = (location: any, address: string) => {
    helpers.setValue(address);
    setModalOpen(false);
  };

  return (
    <>
      <Input
        {...field}
        label={label}
        placeholder={placeholder}
        labelPlacement="outside"
        size="md"
        variant="bordered"
        isInvalid={meta.touched && !!meta.error}
        errorMessage={meta.touched && meta.error ? meta.error : ''}
        color={meta.touched && meta.error ? 'danger' : 'default'}
        disabled={true}
        startContent={
          <Button
            size="sm"
            isIconOnly
            radius="full"
            variant="light"
            onPress={() => setModalOpen(true)}
          >
            <MapIcon size={28} />
          </Button>
        }
        onClick={() => setModalOpen(true)}
        isClearable={true}
        onClear={() => helpers.setValue('')}
      />
      <RegisterLocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
};

export default LocationInput;
