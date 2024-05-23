/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMobile } from "@contexts/MobileContext";
import { User } from "@models/User";
import { Button, Stack, Typography, OutlinedInput } from "@mui/material";
import { UserService } from "@services/userService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewUser() {
  const { isMobile } = UseMobile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createUser = async () => {
    if (!formData?.email || !formData?.password) {
      toast.info("Por favor, preencha todos os campos.");
      return;
    }

    const userBody: User = {
      id: '',
      email: formData.email.toLocaleLowerCase(),
      password: formData.password,
    };

    try {
      await UserService.RegisterUser(userBody);

      toast.success("Usuário criado com sucesso!", {
        style: {
          backgroundColor: "#55B938",
          color: "white",
        },
        theme: "colored",
      });

      setFormData({
        id: '',
        email: "",
        password: "",
      });
    } catch (error) {
      toast.warn("Ocorreu um erro ao criar usuário.");
    }
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
        <Stack width="100%" flexDirection="row" justifyContent="space-between">
          <Stack width="48%">
            <Typography
              sx={{
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              Email
            </Typography>

            <OutlinedInput
              placeholder="Digite seu email..."
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Stack>
          <Stack width="48%">
            <Typography
              sx={{
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              Senha:
            </Typography>
            <OutlinedInput
              placeholder="Digite sua senha..."
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={isMobile ? "center" : "space-between"}
        alignItems={"center"}
        mt={"5rem"}
      >
        <Button
          onClick={() => navigate("/users")}
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
          onClick={() => createUser()}
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
      <ToastContainer />
    </Stack>
  );
}
