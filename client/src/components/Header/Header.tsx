import { UseMobile } from "@contexts/MobileContext";
import { Stack } from "@mui/material";

// Icons
import icon_climagro from "@assets/icon_climagro.svg";

export default function Header() {
  const { isMobile } = UseMobile();

  return (
    <Stack width="100vw" height='5rem' sx={{
      background: '#6B8E23',
      padding: '2rem',
      top: 0,
      position: 'fixed',
      justifyContent: 'center',
      display: 'flex',
      alignItems: isMobile ? 'center' : 'end'
    }}>
      <img src={icon_climagro} width="260px" />
    </Stack>
  );
}
