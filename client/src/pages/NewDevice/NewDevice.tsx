/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMobile } from "@contexts/MobileContext";
import { Device } from "@models/Device";
import { Button, Modal, OutlinedInput, Stack, Typography } from "@mui/material";
import { DeviceService } from "@services/deviceService";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalNewDevice = ({
  openModalNewDevice,
  handleCloseModalNewDevice,
}: {
  openModalNewDevice: boolean;
  handleCloseModalNewDevice: () => void;
}) => {
  const { isMobile } = UseMobile();

  const [newDevice, setNewDevice] = useState({
    id: 0,
    name: "",
    listCommands: [],
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewDevice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createDevice = async () => {
    if (!newDevice?.name) {
      toast.info("Por favor, preencha todo nome.");
      return;
    }

    const deviceBody: Device = {
      id: 0,
      name: newDevice.name,
      listCommands: [],
    };

    try {
      await DeviceService.Post(deviceBody)

      toast.success("Dispositivo criado com sucesso!", {
        style: {
          backgroundColor: "#55B938",
          color: "white",
        },
        theme: "colored",
      });

      setTimeout(() => {
        handleCloseModalNewDevice()
      }, 1500);

      setNewDevice({
        id: 0,
        name: "",
        listCommands: [],
      });
    } catch (error) {
      toast.warn("Ocorreu um erro ao criar dispositivo.");
    }
  };

  return (
    <>
      <Modal open={openModalNewDevice} onClose={handleCloseModalNewDevice}>
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
            height: isMobile ? "100%" : "25rem",
            paddingTop: isMobile ? "2rem" : "2rem",
            border: "none",
          }}
        >
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography
              sx={{
                fontSize: isMobile ? "2rem" : "2.25rem",
                color: "#D2691E",
                fontWeight: "600",
              }}
            >
              Criar novo dispositivo
            </Typography>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                fontSize: "1rem",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              Nome do dispositivo
            </Typography>
            <OutlinedInput
              fullWidth
              name="name"
              placeholder="Digite o none do dispositivo"
              onChange={handleChange}
              value={newDevice.name}
            />
          </Stack>
          <Stack
            flexDirection={isMobile ? "column" : "row"}
            justifyContent={isMobile ? "center" : "space-between"}
            alignItems={"center"}
            mt={"5rem"}
          >
            <Button
              onClick={handleCloseModalNewDevice}
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
              onClick={() => createDevice()}
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
