/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMobile } from "@contexts/MobileContext";
import {
  Button,
  IconButton,
  Modal,
  OutlinedInput,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// Table
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

// Icons
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Command } from "@models/Command";
import { ModalNewDevice } from "@pages/NewDevice/NewDevice";
import { DeviceService } from "@services/deviceService";
import { Device } from "@models/Device";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#696969",
    color: "#FFFFFF",
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#DCDCDC",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListDevices() {
  const { isMobile } = UseMobile();

  const [devices, setDevices] = useState<Device[]>([])
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalNewDevice, setOpenModalNewDevice] = useState(false);

  const [formDataCommands, setFormDataCommands] = useState<Command[]>([]);

  const handleAddCommand = () => {
    const newCommand = {
      id: 0,
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

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleDeviceClick = (deviceId: number) => {
    setSelectedDevice(deviceId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDevice(null);
  };

  const handleOpenModalNewDevice = () => {
    setOpenModalNewDevice(true);
  };

  const handleCloseModalNewDevice = () => {
    setOpenModalNewDevice(false);
  };

  const getDevices = async () => {
    const result = await DeviceService.GetAll()

    if(result){
      setDevices(result)
    }
  }

  useEffect(() => {
    getDevices()
  }, []);


  return (
    <Stack
      width="100vw"
      height={isMobile ? "100%" : "100vh"}
      padding={isMobile ? "0.5rem" : "2rem"}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontSize: isMobile ? "1.5rem" : "2.25rem",
            color: "#D2691E",
            fontWeight: "600",
          }}
        >
          Lista de dispositivos
        </Typography>
        <Button
          onClick={() => handleOpenModalNewDevice()}
          sx={{
            width: isMobile ? "10rem" : "13rem",
            height: "3rem",
            background: "#696969",
            color: "#FFFFFF",
            "&:hover": {
              background: "#FFFFFF",
              color: "#696969",
              border: "2px solid #696969",
            },
          }}
        >
          Novo dispositivo
        </Button>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: isMobile ? '2rem' :"10rem",
          marginBottom: isMobile ? "2rem" : 0,
        }}
      >
        {!isMobile && (
          <Stack
            sx={{
              width: "100%",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.2rem",
            }}
          >
            <TableContainer sx={{ width: "100%" }}>
              <Table
                sx={{ minWidth: 500, width: "100%" }}
                aria-label="customized table"
              >
                <TableHead sx={{ backgroundColor: "#666" }}>
                  <TableRow sx={{ backgroundColor: "#666" }}>
                    <StyledTableCell>id</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices.map((row) => (
                    <StyledTableRow
                      sx={{
                        "&:hover": {
                          outline: "2px solid",
                          outlineColor: "#C0C0C0",
                          backgroundColor: "#C0C0C0",
                        },
                      }}
                      onClick={() => handleDeviceClick(row.id)}
                    >
                      <StyledTableCell component="th" scope="row" size="small">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell size="small">{row.name}</StyledTableCell>
                      <StyledTableCell size="small">resposta</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
        {isMobile && (
          <Stack width='100%'>
            {devices.map((row) => (
              <Stack key={row.id} width='100%' height='5rem' sx={{
                border: '2px solid #696969',
                borderRadius: '0.5rem',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                marginTop: '1.5rem'
              }}>
                <Stack width='100%' flexDirection='row'>
                  <Typography mr='0.5rem'>id:</Typography><Typography>{row.id}</Typography>
                </Stack>
                <Stack width='100%' flexDirection='row'>
                <Typography mr='0.5rem'>Dispositivo:</Typography><Typography>{row.name}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
      <Stack
        mt={2}
        sx={{ justifyContent: "center", width: "100%", alignItems: "center" }}
      >
        <Pagination
          count={Math.ceil(devices.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#556B2F !important",
              color: "#fff",
            },
          }}
          size="small"
        />
      </Stack>
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
                  <Stack mt="2rem" width="100%">
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
      <ModalNewDevice
        handleCloseModalNewDevice={handleCloseModalNewDevice}
        openModalNewDevice={openModalNewDevice}
      />
    </Stack>
  );
}
