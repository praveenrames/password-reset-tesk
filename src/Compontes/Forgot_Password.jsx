import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AxiosService from "../../utils/Api.Service";

const Forgot_Password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(' ');
    const [loading, setLoading] = useState(false);
    
    const darkTheme = createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#f48fb1",
          },
          error: {
            main: "#f44336",
          },
        },
      });

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForgotPassword = async () => {

        try {
            setLoading(true);

            const response = await AxiosService.post("/api/user/forgot-password", {
              email,
            });
            console.log(response.data);

            if(response.data.message) {
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            }

           navigate("/reset-Password")
        } catch (error) {
            console.error(error.response.data);

              if(error.response.data.message) {
                toast.error(error.response.data.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              } else {
                toast.error("Failed to send password reset email. please try again.", {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
        } finally {
          setLoading(false);
        }
    };
  return (
    <>
     <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <Box 
           component='form'
           sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            "& .MuiTextField-root" : {
                m: 1,
                width: '30ch',
                marginBottom: '20px',
            },
           }}
           noValidate
           autoComplete='off'
        >
            <h2 style={{ marginBottom: "20px" }}>Forgot PassWord</h2>
            <p style={{ textAlign: "center" }}>
                Enter your email address to receive a OTP
            </p>
            <div>
                <TextField 
                  label='Email'
                  variant='outlined'
                  name='email'
                  onChange={handleEmailChange}
                />
            </div>
            <Button
             color='success'
             variant="contained"
             style={{ marginTop:"20px" }}
             onClick={handleForgotPassword}
             disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>

            <p style={{ marginTop: "20px" }}>
                Remember your password? <Link to='/sign-in'>Sign in</Link>
            </p>
            <p>
                Don't have an account ? <Link to='/sign-up'>Sign up</Link>
            </p>
        </Box>
     </ThemeProvider>
    </>
  )
}

export default Forgot_Password