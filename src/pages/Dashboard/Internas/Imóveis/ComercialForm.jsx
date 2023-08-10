import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Select } from '@chakra-ui/react';

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
          <option value="casa">Casa</option>
          <option value="escritorio">Escritório</option>
          <option value="lote_terreno">Lote / Terreno</option>
        </Select>
      </FormControl>
     
    </Box>
  );
};

export default ComercialForm;