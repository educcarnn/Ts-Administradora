import { Typography, Input } from "@material-ui/core";

export default function InfoEmpresa({ isEditing, empresaData, handleEmpresaEdit }) {
  return (
    <div>
      {!isEditing ? (
        <>
          <Typography>
            <strong>Nome:</strong> {empresaData?.nome}
          </Typography>
          <Typography>
            <strong>Endereço:</strong> {empresaData?.endereco}
          </Typography>
          <Typography>
            <strong>Telefone:</strong> {empresaData?.telefone}
          </Typography>
        </>
      ) : (
        <>
          <Typography>
            <strong>Nome:</strong>
          </Typography>
          <Input
            fullWidth
            value={empresaData.nome || ""}
            onChange={(e) => handleEmpresaEdit("nome", e.target.value)}
          />
          <Typography>
            <strong>Endereço:</strong>
          </Typography>
          <Input
            fullWidth
            value={empresaData.endereco || ""}
            onChange={(e) => handleEmpresaEdit("endereco", e.target.value)}
          />
          <Typography>
            <strong>Telefone:</strong>
          </Typography>
          <Input
            fullWidth
            value={empresaData.telefone || ""}
            onChange={(e) => handleEmpresaEdit("telefone", e.target.value)}
          />
        </>
      )}
    </div>
  );
}
