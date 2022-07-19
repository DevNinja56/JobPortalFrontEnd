import HomeLayout from "../../layout/HomeLayout";
import ScreenLoader from "../../shared/ScreenLoader";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
    CssBaseline,
    TextField,
    Typography,
    Box,
    Container,
    Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();



    const { tokken }: any = useParams();
    console.log(tokken);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;

        // check if fourm is empty 
        if (data.get("password") === ' ' || data.get("c_password") === ' ' || !data.get("password") || !data.get("c_password")) {
            toast.error('Please fill all required fields!');
            setLoading(false);
            return false;
        } else {
            // console.log('test')
            if (data.get("password") === data.get("c_password")) {
                let password = data?.get("c_password");
                let passwordLength: any = password?.toString().length
                if (passwordLength >= 8) {
                    fetch(`${APIURL}/api/resetPassword`, {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            resetPasswordTokken: tokken,
                            newPassword: data.get("c_password")
                        }),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {

                            if (data?.error) {
                                toast.error(data?.error);
                            }
                            if (data?.message) {
                                toast.success(data?.message);
                                navigate("/login");
                            }
                            console.log(data);
                        })
                        .catch((err) => console.log(err))
                        .finally(() => setLoading(false));
                    setLoading(false);
                } else {
                    toast.error('password must be grather then 8 character')
                    setLoading(false);
                }
            } else {
                toast.error('Please fill Same Password!')
                setLoading(false);
            }
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
                            Reset Your Password!
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="c_password"
                                label="Confirm Password"
                                type="password"
                                id="c_password"
                                autoComplete="current-password"
                            />
                            <button type="submit" className="btn-own w-100">
                                Reset Password
                            </button>
                        </Box>
                    </Box>
                </Container>
                <ScreenLoader isVisible={loading} />
            </div>
        </HomeLayout>
    );
};
export default ResetPassword;
