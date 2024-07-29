import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AxiosService from '../../utils/Api.Service';


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

const Sign_in = () => {
    const [showPassWord, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initialValue = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
        .required("Email is required"),
        password:Yup.string()
        .required("password Required")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/, "Make Strong password")
    });
     
    const handleSignin = async (values) => {

        try {
            setLoading(true);
            const response = await AxiosService.post("/api/user/signin", values);
            console.log(response.data);

            const { message, token, userData } = response.data;

            if(message) {
                toast.success(message, {
                  position: toast.POSITION.TOP_CENTER,
                });
                sessionStorage.setItem('token', token);
                sessionStorage.setItem("userData", JSON.stringify(userData));
                navigate("/home");
            }
        } catch (error) {
            console.error(error.response.data);

            if(error.response) {
              if(error.response.status === 401) {
                toast.error(error.response.data.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              } else if (error.response.status === 404) {
                toast.error(error.response.data.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              } else {
                toast.error("Something went wrong", {
                  position: toast.POSITION.TOP_CENTER,
                });
               }
              }
            } finally {
              setLoading(false);
            }
        };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Formik 
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSignin}
          >
            <Form>
                <Box 
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    "& .MuiTextField-root" : {
                        m: 1,
                        width: '27ch',
                        marginBottom: '20px',
                    },
                    "& .required" : {
                        color: darkTheme.palette.error.main,
                    },
                  }}
                  noValidate
                  autoComplete='off'
                  > 
                    <h2 style={{ marginBottom: "20px"}}>Sign in</h2>
                    <div>
                        <Field
                         name='email'
                         type='text'
                         as={TextField}
                         label="Email"
                         variant="outlined"
                         className="required"
                        />
                        <ErrorMessage
                          name="email"
                          component='div'
                          className='required'
                          />
                    </div>
                    <div>
                        <Field
                         name="password"
                         type={showPassWord ? "text" : "password"}
                         as={TextField}
                         label='Password'
                         variant='outlined'
                         InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                     onClick={() => setShowPassword(!showPassWord)}
                                     edge='end'
                                     >
                                        { showPassWord ? <VisibilityOff /> : <Visibility /> }
                                     </IconButton>
                                </InputAdornment>
                            ),
                         }}
                         className="required"
                         />
                         <ErrorMessage
                          name="password"
                          component='div'
                          className='required'
                        />
                    </div>
                    <Button
                      color='success'
                      variant='contained'
                      type='submit'
                      style={{ marginTop: "20px" }}
                      disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign in"}
                    </Button>
                    <p style={{ marginTop: "20px" }}>
                   <Link to='/forgot-password'>Forgot Password?</Link>
                    </p>
                    <p style={{ marginTop: "20px" }}>
                        Dont have an account ? <Link to='/sign-up'>sign up</Link>
                    </p>
                  </Box>
            </Form> 
          </Formik>
      </ThemeProvider>
    </>
  )
}

export default Sign_in