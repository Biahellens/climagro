/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMobile } from "@contexts/MobileContext";
import { Command, Device } from "@models/Device";
import { Button, IconButton, Modal, OutlinedInput, Stack, Typography } from "@mui/material";
import { DeviceService } from "@services/deviceService";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const ModalNewCommands = ({
  openModal,
  handleCloseModal,
  selectedDevice,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
  selectedDevice: string
}) => {
  const { isMobile } = UseMobile();

  const [newDevice, setNewDevice] = useState({
    id: "",
    name: "",
    listCommands: [],
  });

  const getDevice = async () => {
    if(openModal === true && selectedDevice.length > 1){
      const result = await DeviceService.GetById(selectedDevice)

      if(result){
        setNewDevice(result)
      }
    }
  }

  useEffect(() => {
    if(openModal === true && selectedDevice.length > 1){
      getDevice()
    }
  }, [openModal, selectedDevice]);

  const [formDataCommands, setFormDataCommands] = useState<Command[]>([]);

  const handleAddCommand = () => {
    const newCommand = {
      id: "",
      name: "",
      url: "",
    };
    setFormDataCommands([...formDataCommands, newCommand]);
  };

  const handleUpdateCommand = (
    index: number,
    field: keyof Command,
    value: any
  ) => {

    const updatedCommands = [...formDataCommands];
    updatedCommands[index] = {
      ...updatedCommands[index],
      [field]: value,
    };
    setFormDataCommands(updatedCommands);
  };

  const handleRemoveCommand = (index: number) => {
    const updatedCommands = [...formDataCommands];
    updatedCommands.splice(index, 1);
    setFormDataCommands(updatedCommands);
  };

  const createCommands = async () => {

    const deviceBody: Device = {
      id: newDevice.id,
      name: newDevice.name,
      listCommands: formDataCommands,
    };

    try {
      console.log(deviceBody)
      await DeviceService.AddCommand(selectedDevice, deviceBody)

      toast.success("Comandos criados com sucesso!", {
        style: {
          backgroundColor: "#55B938",
          color: "white",
        },
        theme: "colored",
      });

      setTimeout(() => {
        handleCloseModal()
      }, 1500);

      setNewDevice({
        id: "",
        name: "",
        listCommands: [],
      });
    } catch (error) {
      toast.warn("Ocorreu um erro ao criar comandos.");
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "100%" : "50%",
            bgcolor: "#fff",
            p: isMobile ? "0.5rem" : "2rem",
            borderRadius: "8px",
            height: isMobile ? "100%" : "35rem",
            paddingTop: isMobile ? "2rem" : "2rem",
            border: "none",
            overflowY: "scroll",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              Dispositivo: {selectedDevice}
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 400,
                }}
              >
                Ao salvar você adicionará esse dispositivo a sua lista pessoal
              </Typography>
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Stack marginTop="3rem" height="auto">
            <Stack>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                }}
              >
                Adicionar comandos
              </Typography>
            </Stack>
            <Stack>
              {formDataCommands.map((command, index) => (
                <>
                  <Stack key={index} mt="2rem" width="100%">
                    <Typography>Comando nº {index + 1}</Typography>
                  </Stack>
                  <Stack
                    key={index}
                    width="100%"
                    flexDirection={isMobile ? "column" : "row"}
                    mt="0.5rem"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Stack width={isMobile ? "100%" : "45%"}>
                      <OutlinedInput
                        placeholder="Digite o nome do comando"
                        value={command.name}
                        onChange={(e) =>
                          handleUpdateCommand(index, "name", e.target.value)
                        }
                      />
                    </Stack>
                    <Stack
                      width={isMobile ? "100%" : "45%"}
                      mt={isMobile ? "1.5rem" : 0}
                    >
                      <OutlinedInput
                        placeholder="Digite a URL"
                        value={command.url}
                        onChange={(e) =>
                          handleUpdateCommand(index, "url", e.target.value)
                        }
                      />
                    </Stack>
                    <Stack
                      width={isMobile ? "100%" : "5%"}
                      mt={isMobile ? "1rem" : 0}
                      alignItems={isMobile ? "end" : "center"}
                      justifyContent={isMobile ? "end" : "center"}
                      flexDirection={"row"}
                    >
                      <IconButton onClick={() => handleRemoveCommand(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </>
              ))}
            </Stack>
            <Stack width="100%" alignItems="end" mt="2rem">
              <Button
                onClick={handleAddCommand}
                sx={{
                  width: "15rem",
                  background: "#808080	",
                  color: "#FFFFFF",
                  "&:hover": {
                    background: "#FFFFFF",
                    color: "#808080	",
                    border: "1px solid #556B2F",
                  },
                }}
              >
                <AddIcon fontSize="medium" /> Novo comando
              </Button>
            </Stack>
          </Stack>
          <Stack
            flexDirection={isMobile ? "column" : "row"}
            justifyContent={isMobile ? "center" : "space-between"}
            alignItems={"center"}
            mt={"2rem"}
          >
            <Button
              sx={{
                width: isMobile ? "80%" : "13rem",
                background: "#8B0000",
                color: "#FFFFFF",
                "&:hover": {
                  background: "#FFFFFF",
                  color: "#8B0000",
                  border: "1px solid #8B0000",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => createCommands()}
              sx={{
                marginTop: isMobile ? "1rem" : 0,
                width: isMobile ? "80%" : "13rem",
                background: "#6B8E23",
                color: "#FFFFFF",
                "&:hover": {
                  background: "#FFFFFF",
                  color: "#6B8E23",
                  border: "1px solid #6B8E23",
                },
              }}
            >
              Salvar
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <ToastContainer />
    </>
  );
};
