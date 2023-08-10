import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
} from '@chakra-ui/react';

const ResidencialForm = () => {
  // Estados para as características do imóvel residencial
  const [propertyType, setPropertyType] = useState('');
  const [floors, setFloors] = useState('');

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleFloorsChange = (event) => {
    setFloors(event.target.value);
  };

  return (
    <Box mt={4}>
      <h3>Imóvel Residencial</h3>
      <FormControl>
        <FormLabel>Tipo de Imóvel</FormLabel>
        <Select value={propertyType} onChange={handlePropertyTypeChange}>
          <option value="">Selecione</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="cobertura">Cobertura</option>
          <option value="kitnet">Kitnet</option>
        </Select>
      </FormControl>
      {propertyType && (
        <FormControl mt={2}>
          <FormLabel>Andares</FormLabel>
          <Input type="text" value={floors} onChange={handleFloorsChange} />
        </FormControl>
      )}
    </Box>
  );
};

export default ResidencialForm;