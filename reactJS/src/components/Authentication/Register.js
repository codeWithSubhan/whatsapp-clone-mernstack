import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../constants/data";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const data1 = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      confirmPassword: data.get("confirmPassword"),
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/signup`, data1);

      if (res.data.status === "success")
        toast.success("Successully logged in!");
      return navigate("/login");
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
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="confirmPassword"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
              variant="body2"
            >
              Go To Back
            </Link>
          </Grid>
          <Grid item>
            <Link
              variant="body2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              {"Already Sign Up? Login"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
