import { Input, Typography } from "@material-ui/core";

const DadosBancarios = ({ bankerData, handleInfoChange, isEditing }) => {

   
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Forma de pagamento
      </Typography>
      {bankerData &&
        Object.entries(bankerData).map(([key, value]) => {
          if (value) {
            let label;
            switch (key) {
              case "banco":
                label = "Banco";
                break;
              case "conta":
                label = "Conta";
                break;
              case "agencia":
                label = "Agência";
                break;
              case "chavePix":
                label = "Chave Pix";
                break;
              default:
                label = key;
            }
            return (
              <Typography variant="body2" key={key}>
                <div key={key}>
                  <strong>{key}:</strong>
                  {isEditing ? (
                    <Input
                      value={value}
                      onChange={(e) => handleInfoChange(key, e.target.value)}
                    />
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              </Typography>
            );
          }
          return null;
        })}
    </div>
  );
};

export default DadosBancarios;
