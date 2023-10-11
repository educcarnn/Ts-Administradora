import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  IconButton,
  Input,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../../db/Api";
import InfoEmpresa from "./subcomponents/infosempresa";

function EmpresaInfo() {
  const empresaId = localStorage.getItem("empresaId");

  const [empresaData, setEmpresaData] = useState(null);
  const [administradoresData, setAdministradoresData] = useState(null);
  const [showAllAdmins, setShowAllAdmins] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Adicionado o estado isEditing

  const fetchData = async () => {
    try {
      if (!empresaId) {
        console.error("empresaId não encontrado no Local Storage.");
        return;
      }

      const response = await API_URL.get(`/empresa/${empresaId}`);
      setEmpresaData({
        nome: response?.data?.nome,
        endereco: response?.data?.endereco,
        telefone: response?.data?.telefone,
      });

      setAdministradoresData({
        administradores: response?.data?.administradores,
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar informações da empresa:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [empresaId]);

  const toggleAdmins = () => {
    setShowAllAdmins(!showAllAdmins);
  };

  const handleRemoveAdmin = async (id) => {
    try {
   
      const response = await API_URL.delete(`/users`, {
        data: { id },
      });

      if (response.status === 200) {
        toast.success("Administrador removido com sucesso");
        fetchData();
      } else {
        console.error("Erro ao remover administrador:", response);
        toast.error("Erro ao remover administrador");
      }
    } catch (error) {
      console.error("Erro ao remover administrador:", error);
      toast.error("Erro ao remover administrador");
    }
  };

  const handleEmpresaEdit = (campo, newValue) => {
    setEmpresaData((prevState) => ({
      ...prevState,
      [campo]: newValue,
    }));
  };

  const handleSave = async () => {
    const allInfo = {
      ...empresaData,
    };
    console.log(allInfo);

    try {
      const response = await API_URL.patch(
        `/empresa-patch/${empresaId}`,
        allInfo
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Dados atualizados com sucesso");
        setIsEditing(false);
        fetchData();
      } else {
        console.error("Erro ao atualizar dados:", response);
        toast.error("Erro ao atualizar dados");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      toast.error("Erro ao atualizar dados");
    }
  };
  console.log(administradoresData)
  return (
    <div>
      <Paper style={{ padding: 20, maxWidth: 400, margin: "20px auto" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          {loading && <div>Carregando...</div>}
          <Typography variant="h6" gutterBottom>
            Informações da Empresa
          </Typography>
          <InfoEmpresa
            isEditing={isEditing}
            empresaData={empresaData}
            handleEmpresaEdit={handleEmpresaEdit}
          />
          <Typography variant="h6" gutterBottom>
            Administradores:
          </Typography>
          <List>
            {administradoresData?.administradores
    
              .map((admin) => (
                <ListItem key={admin.id}>
                  <ListItemText primary={admin.email} />
                  {isEditing && (
                    <IconButton
                      aria-label="Remover Administrador"
                      color="secondary"
                      onClick={() => handleRemoveAdmin(admin.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </ListItem>
              ))}
          </List>
          {empresaData?.administradores?.length > 2 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleAdmins}
              style={{ marginTop: 10 }}
            >
              {showAllAdmins ? "Mostrar menos" : "Mostrar mais"}
            </Button>
          )}
          {!isEditing ? (
            <Button color="primary" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          ) : (
            <>
              <Button color="secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button color="primary" onClick={handleSave}>
                Salvar
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default EmpresaInfo;
