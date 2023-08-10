import React, { useState } from "react";
import { FormControl, FormLabel, Select, Input } from "@chakra-ui/react";

export default function CaracteresFields() {
  const [floors, setFloors] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [suites, setSuites] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState("");
  const [areaUtil, setAreaUtil] = useState("");
  const [areaTotal, setAreaTotal] = useState("");
  const [numFloors, setNumFloors] = useState("");

  const handleFloorsChange = (event) => {
    setFloors(event.target.value);
  };

  const handleBuildingTypeChange = (event) => {
    setBuildingType(event.target.value);
  };

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handleSuitesChange = (event) => {
    setSuites(event.target.value);
  };

  const handleBathroomsChange = (event) => {
    setBathrooms(event.target.value);
  };

  const handleParkingSpacesChange = (event) => {
    setParkingSpaces(event.target.value);
  };

  const handleAreaUtilChange = (event) => {
    setAreaUtil(event.target.value);
  };

  const handleAreaTotalChange = (event) => {
    setAreaTotal(event.target.value);
  };

  const handleNumFloorsChange = (event) => {
    setNumFloors(event.target.value);
  };

  return (
    <>
      <FormControl mt={2}>
        <FormLabel>Tipo de Construção</FormLabel>
        <Select value={buildingType} onChange={handleBuildingTypeChange}>
          <option value="">Selecione</option>
          <option value="padrao">Padrão</option>
          <option value="duplex">Duplex</option>
          <option value="triplex">Triplex</option>
        </Select>
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Andares</FormLabel>
        <Input type="text" value={floors} onChange={handleFloorsChange} />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Número de Quartos</FormLabel>
        <Input type="text" value={bedrooms} onChange={handleBedroomsChange} />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Número de Suítes</FormLabel>
        <Input type="text" value={suites} onChange={handleSuitesChange} />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Número de Banheiros</FormLabel>
        <Input type="text" value={bathrooms} onChange={handleBathroomsChange} />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Número de Vagas</FormLabel>
        <Input
          type="text"
          value={parkingSpaces}
          onChange={handleParkingSpacesChange}
        />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Área Útil (m²)</FormLabel>
        <Input type="text" value={areaUtil} onChange={handleAreaUtilChange} />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Área Total (m²)</FormLabel>
        <Input type="text" value={areaTotal} onChange={handleAreaTotalChange} />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Número de Andares</FormLabel>
        <Input type="text" value={numFloors} onChange={handleNumFloorsChange} />
      </FormControl>
    </>
  );
}
