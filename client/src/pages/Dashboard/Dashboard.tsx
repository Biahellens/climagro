import { UseMobile } from "@contexts/MobileContext";
import { Stack, Typography } from "@mui/material";

export default function Dashboard() {
  const { isMobile } = UseMobile();

  return (
    <Stack width="100vw" height={isMobile ? "100%" : "100vh"}>
      <Typography>Dashboard page</Typography>
    </Stack>
  );
}
