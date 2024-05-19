import { UseMobile } from "@contexts/MobileContext";
import { Stack, Typography } from "@mui/material";

export default function Login() {
  const { isMobile } = UseMobile();

  return (
    <Stack width="100vw" height={isMobile ? "100%" : "100vh"}>
      <Typography>Login page</Typography>
    </Stack>
  );
}
