import { Link, useNavigate } from "react-router-dom";
import {
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
} from "@mui/material";
import HomeLayout from "../../layout/HomeLayout";
import ScreenLoader from "../../shared/ScreenLoader";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;


    // check if fourm is empty 
    if (data.get("email") === ' ' || data.get("password") === ' ' || !data.get("email") || !data.get("password")) {
      toast.error('Please fill all required fields!');
      setLoading(false);
      return false;
    } else {
      // console.log('test')
      fetch(`${APIURL}/api/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          Cookies.set(process.env.REACT_APP_AUTH_COOKIE || "code_genie_user", data.token)
          navigate("/home");
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };


  }

  return (
    <HomeLayout>
      <div className="loginPage">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/forgot-password">{"Forgot Password ?"}</Link>
                </Grid>
              </Grid>
              <button type="submit" className="btn-own w-100">
                Sign In
              </button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signUp">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <ScreenLoader isVisible={loading} />
      </div>
    </HomeLayout>
  );
};
export default Login;
