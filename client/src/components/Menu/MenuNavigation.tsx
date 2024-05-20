import { Stack, Typography } from "@mui/material";

// Icons
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from '@mui/icons-material/Logout';

export default function MenuNavigation() {
  return (
    <Stack
      width="19rem"
      height="100vh"
      sx={{
        padding: "1rem",
        justifyContent: "space-between",
        display: "flex",
        alignItems: 'center',
        borderRight: '2px solid #D3D3D3'
      }}
    >
      <Stack sx={{
         width: "100%",
         marginTop: '5rem'
      }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0.5rem",
          cursor: 'pointer'
        }}
      >
        <DashboardIcon />
        <Typography ml={1}>Dashboard</Typography>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0.5rem",
          cursor: 'pointer'
        }}
      >
        <DevicesIcon />
        <Typography ml={1}>Dispositivos</Typography>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0.5rem",
          cursor: 'pointer'
        }}
      >
        <GroupIcon />
        <Typography ml={1}>Usuários</Typography>
      </Stack>
      </Stack>
      <Stack sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
          position: 'fixed',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}>
          <LogoutIcon />
        <Typography>Sair</Typography>
      </Stack>
    </Stack>
  );
}
