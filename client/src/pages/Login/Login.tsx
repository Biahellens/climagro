import { UseMobile } from "@contexts/MobileContext";
import { useContext, useState } from "react";
import { OutlinedInput, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserShow } from "@models/User";

// Icons
import CircularProgress from "@mui/material/CircularProgress";

// Imgs
import bg_green from "@assets/green_infos.png";
import icon_climagro from "@assets/icon_climagro.svg";
import { UserContext } from "@contexts/userContext/UserContext";


export default function Login() {
  const { isMobile } = UseMobile();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useContext(UserContext);

  const login = async () => {
    if (email === "" || password === "") {
      toast.warn("Favor preencher todos os campos antes de prosseguir");
      return;
    }

    try {
      setLoading(true);
      const user: UserShow | undefined | null = await handleLogin(email, password);
      if (user) {
        console.log("Usuário logado:", user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Erro durante o login:", err);
      toast.error("Usuário ou senha incorreto!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Stack
      width="100vw"
      height={"100vh"}
      sx={{
        flexDirection: "row",
      }}
    >
      <Stack width={isMobile ? "100%" : "50%"} height={"100vh"}>
        <Stack width="100%" height="6.25rem" sx={{ background: "#6B8E23" }} />
        <Stack
          height="100%"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Stack width={isMobile ? '80%' : "25rem"}>
            <Stack
              width="100%"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginBottom: "2rem",
              }}
            >
              <img src={icon_climagro} width="260px" />
            </Stack>
            <OutlinedInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email..."
            />

            <OutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha..."
              sx={{
                marginTop: "1rem",
              }}
            />

            <Stack width="100%" my={4}>
              <LoadingButton
                variant="contained"
                color="primary"
                loading={loading}
                onClick={() => login()}
                loadingIndicator={
                  <CircularProgress sx={{ color: "#6B8E23" }} size={24} />
                }
                sx={{
                  height: "50px",
                  bgcolor: loading ? "#fff" : "#6B8E23",
                  color: "#fff",
                  textTransform: "none",
                  outline: "1px solid #6B8E23",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#6B8E23",
                    backgroundColor: loading ? "#fff" : "transparent",
                  },
                  cursor: "pointer",
                }}
              >
                {!loading && (
                  <>
                    LOGIN
                  </>
                )}
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {!isMobile &&
        <Stack
          width="50%"
          height={"100vh"}
          sx={{
            backgroundImage: `url(${bg_green})`,
            backgroundSize: "cover",
          }}
        />
      }
      <ToastContainer />
    </Stack>
  );
}
