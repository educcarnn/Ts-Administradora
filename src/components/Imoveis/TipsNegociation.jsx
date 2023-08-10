import { useState } from "react"
import { Box, Heading, FormControl, FormLabel, Select } from '@chakra-ui/react';

import styled from "styled-components"
export default function TipsNegociation(){
    const [saleType, setSaleType] = useState('');
    const TitleText = styled.div`
        color: white;
    `


    return(
        <div>
        <FormControl mt={3}>
        <TitleText>Tipo de Negociação</TitleText>
        <Select
          id="saleType"
          value={saleType}
          onChange={(e) => setSaleType(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="venda">Venda</option>
          <option value="aluguel">Aluguel</option>
          <option value="venda_aluguel">Venda ou Aluguel</option>
        </Select>
        </FormControl>
        </div>
    )
}