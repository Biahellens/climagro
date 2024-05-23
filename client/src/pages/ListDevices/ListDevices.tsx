/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMobile } from "@contexts/MobileContext";
import {
  Button,
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

import { ModalNewDevice } from "@pages/NewDevice/NewDevice";
import { DeviceService } from "@services/deviceService";
import { Device } from "@models/Device";
import { ModalNewCommands } from "@pages/CreateCommand/CreateCommand";

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

  const [devices, setDevices] = useState<Device[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalNewDevice, setOpenModalNewDevice] = useState(false);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleDeviceClick = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDevice("");
  };

  const handleOpenModalNewDevice = () => {
    setOpenModalNewDevice(true);
  };

  const handleCloseModalNewDevice = () => {
    setOpenModalNewDevice(false);
  };

  const getDevices = async () => {
    const result = await DeviceService.GetAll();
    console.log(result);
    if (result) {
      setDevices(result.devices);
      console.log(devices)
    }
  };

  useEffect(() => {
    getDevices();
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
          marginTop: isMobile ? "2rem" : "10rem",
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
                  {devices.length > 0 ? (
                    <>
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
                          <StyledTableCell
                            component="th"
                            scope="row"
                            size="small"
                          >
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell size="small">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell size="small"></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </>
                  ) : (
                    <StyledTableRow
                      sx={{
                        "&:hover": {
                          outline: "2px solid",
                          outlineColor: "#C0C0C0",
                          backgroundColor: "#C0C0C0",
                        },
                      }}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        size="small"
                      ></StyledTableCell>
                      <StyledTableCell size="small"></StyledTableCell>
                      <StyledTableCell size="small"></StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
        {isMobile && (
          <Stack width="100%">
            {devices.length > 0 && (
              <>
                {devices.map((row) => (
                  <Stack
                    key={row.id}
                    width="100%"
                    height="5rem"
                    sx={{
                      border: "2px solid #696969",
                      borderRadius: "0.5rem",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "1rem",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Stack width="100%" flexDirection="row">
                      <Typography mr="0.5rem">id:</Typography>
                      <Typography>{row.id}</Typography>
                    </Stack>
                    <Stack width="100%" flexDirection="row">
                      <Typography mr="0.5rem">Dispositivo:</Typography>
                      <Typography>{row.name}</Typography>
                      <Typography></Typography>
                    </Stack>
                  </Stack>
                ))}
              </>
            )}
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

      <ModalNewDevice
        handleCloseModalNewDevice={handleCloseModalNewDevice}
        openModalNewDevice={openModalNewDevice}
      />

      <ModalNewCommands
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        selectedDevice={selectedDevice}
      />
    </Stack>
  );
}
