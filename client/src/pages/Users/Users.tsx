/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMobile } from "@contexts/MobileContext";
import {
  Button,
  IconButton,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { UserService } from "@services/userService";
import { UserShow } from "@models/User";

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

export default function Users() {
  const { isMobile } = UseMobile();

  const navigate = useNavigate()

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [users, setUsers] = useState<UserShow[]>([])

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const getUsers = async () => {
    const result = await UserService.GetAll()

    if(result){
      setUsers(result)
    }
  }

  useEffect(() => {
    getUsers()
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
          Usuários
        </Typography>
        <Button
          onClick={() => navigate('/new-user')}
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
          Novo usuário
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
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
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
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell size="small">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell size="medium">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
        {isMobile && (
          <Stack width="100%">
            {users.map((row) => (
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
                  <Typography mr="0.5rem">email:</Typography>
                  <Typography>{row.email}</Typography>
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
          count={Math.ceil(users.length / rowsPerPage)}
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
    </Stack>
  );
}
