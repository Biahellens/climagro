/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMobile } from "@contexts/MobileContext";
import {
  Button,
  Stack,
  Typography,
  OutlinedInput
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons


export default function NewUser() {
  const { isMobile } = UseMobile();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
          marginTop: isMobile ? "2rem" : "3rem",
          marginBottom: isMobile ? "2rem" : 0,
        }}
      >
        <Stack width='100%' flexDirection='row' justifyContent='space-between'>
          <Stack width='48%'>
            <Typography sx={{
              fontSize: '1rem',
              marginBottom: '0.5rem'
            }}>Nome:</Typography>
            <OutlinedInput placeholder="Digite seu nome..." name='name' value={formData.name} onChange={handleChange} />
          </Stack>
          <Stack width='48%'>
            <Typography sx={{
              fontSize: '1rem',
              marginBottom: '0.5rem'
            }}>Senha:</Typography>
            <OutlinedInput placeholder="Digite sua senha..." name='password' value={formData.password} onChange={handleChange}/>
          </Stack>
        </Stack>
        <Stack width='100%' mt='2rem'>
        <Typography sx={{
              fontSize: '1rem',
              marginBottom: '0.5rem'
            }}>Email</Typography>

          <OutlinedInput placeholder="Digite seu email..." name='email' value={formData.email} onChange={handleChange} />
        </Stack>
      </Stack>
      <Stack
          flexDirection={isMobile ? "column" : "row"}
          justifyContent={isMobile ? "center" : "space-between"}
          alignItems={"center"}
          mt={"5rem"}
        >
          <Button
            onClick={() => navigate('/users')}
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
  );
}
