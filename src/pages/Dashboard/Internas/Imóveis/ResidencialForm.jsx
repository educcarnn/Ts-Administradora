import React, { useState } from 'react';
import {
  FormControl,
  Heading,
  Select,
  FormLabel
} from '@chakra-ui/react';
import CaracteresFields from '../../../../components/Imoveis/CaracteresFields';

export default function ResidencialForm() {
  const [buildingType, setBuildingType] = useState('');

  const handleBuildingTypeChange = (event) => {
    setBuildingType(event.target.value);
  };

  return (
    <>
      <FormControl mt={2}>
      <Heading as="h3" size="md">
        Imóvel Residencial
      </Heading>
        <FormLabel>Tipo de Imóvel</FormLabel>
        <Select value={buildingType} onChange={handleBuildingTypeChange}>
          <option value="">Selecione</option>
          <option value="padrao">Casa</option>
          <option value="duplex">Apartamento</option>
          <option value="triplex">Cobertura</option>
          <option value="triplex">Kitnet</option>
        </Select>
      </FormControl>
      <CaracteresFields />
    </>
  );
}
