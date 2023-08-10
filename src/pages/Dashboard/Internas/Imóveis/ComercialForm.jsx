import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Select } from '@chakra-ui/react';
import CaracteresFields from '../../../../components/Imoveis/CaracteresFields';

const ComercialForm = () => {

  const [propertyType, setPropertyType] = useState('');
  const [saleType, setSaleType] = useState('');

  return (
    <Box mt={4}>
      <Heading as="h3" size="md">
        Imóvel Comercial
      </Heading>
      <FormControl mt={3}>
        <FormLabel htmlFor="propertyType">Tipo de Imóvel</FormLabel>
        <Select
          id="propertyType"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="casa">Sobrado</option>
          <option value="escritorio">Padrão</option>
          <option value="lote_terreno">Lote / Terreno</option>
        </Select>
      </FormControl>
     <CaracteresFields/>
    </Box>
  );
};

export default ComercialForm;