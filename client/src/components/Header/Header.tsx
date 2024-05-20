import { UseMobile } from "@contexts/MobileContext";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import './style.css'

// Icons
import icon_climagro from "@assets/icon_climagro.svg";
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const { isMobile } = UseMobile();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Stack
        onClick={toggleDrawer(true)}
        width="100vw"
        height="5rem"
        sx={{
          background: "#6B8E23",
          padding: "2rem",
          top: 0,
          position: isMobile ? '' : "fixed",
          justifyContent: "center",
          display: "flex",
          alignItems: isMobile ? "center" : "end",
        }}
      >
        <img src={icon_climagro} width="260px" />
      </Stack>
      {isMobile &&
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box role="presentation" onClick={toggleDrawer(false)}>
            <Stack
              sx={{
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "0.5rem",
                  cursor: "pointer",
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
                  cursor: "pointer",
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
                  cursor: "pointer",
                }}
              >
                <GroupIcon />
                <Typography ml={1}>Usuários</Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                bottom: 0,
                position: "fixed",
                cursor: "pointer",
                marginBottom: "2rem",
              }}
            >
              <LogoutIcon />
              <Typography>Sair</Typography>
            </Stack>
          </Box>
        </Drawer>
      }
    </>
  );
}
