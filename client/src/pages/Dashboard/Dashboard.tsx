/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMobile } from "@contexts/MobileContext";
import {
  Button,
  IconButton,
  Modal,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

// Table
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

// Icons
import ClearIcon from "@mui/icons-material/Clear";

type DevicePages = {
  [deviceId: string]: number;
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#696969",
    color: "#FFFFFF",
    fontSize: '1.2rem',
    fontWeight: 500
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1rem',
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

export default function Dashboard() {
  const { isMobile } = UseMobile();

  const [rowsPerPage] = useState(3);
  const [devicePages, setDevicePages] = useState<DevicePages>({});
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChangePage = (deviceId: string, newPage: number) => {
    setDevicePages((prevState: any) => ({
      ...prevState,
      [deviceId]: newPage,
    }));
  };

  const handleCommandClick = (commandId: string) => {
    setSelectedCommand(commandId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCommand(null);
  };

  const devices = [
    {
      id: "1",
      name: "Dispositivo x",
      commands: [
        { id: "1_1", name: "Comando 1", url: "teste" },
        { id: "1_2", name: "Comando 2", url: "teste" },
        { id: "1_3", name: "Comando 3", url: "teste" },
        { id: "1_4", name: "Comando 4", url: "teste" },
      ],
    },
    {
      id: "2",
      name: "Dispositivo y",
      commands: [
        { id: "2_1", name: "Comando 1", url: "teste" },
        { id: "2_2", name: "Comando 2", url: "teste" },
        { id: "2_3", name: "Comando 3", url: "teste" },
        { id: "2_4", name: "Comando 4", url: "teste" },
      ],
    },
    {
      id: "3",
      name: "Dispositivo z",
      commands: [
        { id: "3_1", name: "Comando 1", url: "teste" },
        { id: "3_2", name: "Comando 2", url: "teste" },
        { id: "3_3", name: "Comando 3", url: "teste" },
        { id: "3_4", name: "Comando 4", url: "teste" },
      ],
    },
  ];

  return (
    <Stack width="100vw" height={isMobile ? "100%" : "100vh"} padding="2rem">
      <Stack>
        <Typography
          sx={{
            fontSize: isMobile ? "2rem" : "2.25rem",
            color: "#D2691E",
            fontWeight: "600",
          }}
        >
          Dashboard - meus dispositivos
        </Typography>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(100%, 1fr))" : "repeat(auto-fit, minmax(31.25rem, 1fr))",
          gridGap: "20px",
          marginTop: "5rem",
          marginBottom: isMobile ? '5rem' : 0
        }}
      >
        {devices.map((row) => (
          <Stack
            key={row.id}
            sx={{
              width: isMobile ? "100%" : "31.25rem",
              height: isMobile ? '22rem' : "24rem",
              borderRadius: "20px",
              border: "1px solid #D3D3D3",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "3rem",
                background: "#D3D3D3",
                borderRadius: "20px 20px 0 0",
                padding: "1rem",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight={500} fontSize="1.2rem">
                {row.name}
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                padding: "1rem",
                marginTop: isMobile ? '1rem' : "2rem",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight={500} fontSize="1.2rem">
                Comandos
              </Typography>
              <Stack
                sx={{
                  width: "100%",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "1rem",
                }}
              >
                {row.commands
                  .slice(
                    (devicePages[row.id] || 1) * rowsPerPage - rowsPerPage,
                    (devicePages[row.id] || 1) * rowsPerPage
                  )
                  .map((row) => (
                    <Button
                      onClick={() => handleCommandClick(row.id)}
                      key={row.id}
                      sx={{
                        background: "#808080",
                        width: "80%",
                        color: "#FFFFFF",
                        fontWeight: 400,
                        margin: "0.5rem",
                        "&:hover": {
                          background: "#DCDCDC",
                          color: "#000000",
                          fontWeight: 500,
                        },
                      }}
                    >
                      {row.name}
                    </Button>
                  ))}
              </Stack>
              <Stack
                mt={2}
                sx={{
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Pagination
                  count={Math.ceil(row.commands.length / rowsPerPage)}
                  page={devicePages[row.id] || 1}
                  onChange={(_event, page) => handleChangePage(row.id, page)}
                  sx={{
                    alignItems: "end !important",
                    "& .Mui-selected": {
                      backgroundColor: "#556B2F !important",
                      color: "#fff",
                    },
                  }}
                  size="small"
                />
              </Stack>
            </Stack>
          </Stack>
        ))}
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
            p: isMobile ? '0.5rem' :"2rem",
            borderRadius: "8px",
            height: isMobile ? "100%" : "40rem",
            paddingTop: isMobile ? '2rem' : 0
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
                fontWeight: "600",
              }}
            >
              Resultados do comando {selectedCommand}
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Stack marginTop='3rem'>
            <Stack sx={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: '0.2rem'
            }}>
              <TableContainer sx={{ width: "100%" }}>
                <Table
                  sx={{ minWidth: 500, width: "100%" }}
                  aria-label="customized table"
                >
                  <TableHead sx={{ backgroundColor: "#666" }}>
                    <TableRow sx={{ backgroundColor: "#666" }}>
                      <StyledTableCell>Nome</StyledTableCell>
                      <StyledTableCell>Tipo</StyledTableCell>
                      <StyledTableCell>resposta</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow
                      sx={{
                        "&:hover": {
                          outline: "2px solid",
                          outlineColor: "#C0C0C0",
                          backgroundColor: "#C0C0C0",
                        },
                      }}
                    >
                      <StyledTableCell component="th" scope="row" size="small">
                        name
                      </StyledTableCell>
                      <StyledTableCell size="small">Resultado</StyledTableCell>
                      <StyledTableCell size="small">resposta</StyledTableCell>
                      <StyledTableCell size="small">resposta</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}
