import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/data";
import axios from "axios";
import toast from "react-hot-toast";
import { AccountContext } from "../../context/AccountProvider";
import { useContext } from "react";

export default function Signin() {
  const navigate = useNavigate();
  const { setIsAuth, setUserData } = useContext(AccountContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const data1 = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/login`, data1);

      if (res.data.status === "success") {
        window.localStorage.setItem(
          "userData",
          JSON.stringify({ ...res.data.data.user, token: res.data.token })
        );
        navigate("/");
        setIsAuth({ ...res.data.data.user, token: res.data.token });
        setUserData({ ...res.data.data.user, token: res.data.token });
        return toast.success("Successully logged in!");
      }
    } catch (err) {
      if (err?.response?.data?.message)
        toast.error(err?.response?.data?.message);
      else toast.error(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="text"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
