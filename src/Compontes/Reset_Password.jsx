import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../../utils/Api.Service";


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

const Reset_Password = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        OTP: "",
        password:"",
        confirmPassword:"",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const vaildationSchema = Yup.object({
        OTP: Yup.string().required("OTP is required"),
        password: Yup.string()
        .required("password Required")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/, "Make Strong password"),
        confirmPassword: Yup.string()
        .required("ConfirmPassword Required")
        .oneOf([Yup.ref("password")], "Password must match"),
    })

    const handleInputChange = (event) => {
         setFormData({
            ...formData,
            [event.target.name]: event.target.value
         })
    }

    const handleResetPassword = async (values) => {
        try {
            setLoading(true);

            if (values.password !== values.confirmPassword) {
              console.error("Passwords do not match");
              toast.error("Passwords do not match", {
                position: toast.POSITION.TOP_CENTER,
              });
              return;
            }
            const response = await AxiosService.post("/api/user/reset-password", values);
            console.log(response.data);

            if(response.data.message) {
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            }
             
             navigate("/sign-in");
        } catch (error) {
            console.error(error.response.data);

            if (error.response.data.message) {
              toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            } else {
              toast.error("Failed to reset password. please try again.", {
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
        <Formik
         initialValues={formData}
         validationSchema={vaildationSchema}
         onSubmit={handleResetPassword}
        >
            {() => (
                <Form>
                    <Box 
                      component="div"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh',
                         "& .MuiTextField-root": {
                            m: 1,
                            width: "25ch",
                            marginBottom: "20px",
                         },
                         "& .required": {
                            color: "red",
                         },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                        <h2 style={{marginBottom: "20px"}}>Reset Password</h2>
                        <p>Enter the OTP and set a new password. </p>
                        <div>
                            <Field
                             name="OTP"
                             type="text"
                             as={TextField}
                             label="OTP"
                             variant="outlined"
                             className='required'
                            />
                            <ErrorMessage name="OTP" component='div' className='required' />
                        </div>
                        <div>
                            <Field
                             name="password"
                             type={showPassword ? "text" : "password"}
                             as={TextField}
                             label="Password"
                             variant="outlined"
                             className="required"
                             InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                         onClick={() => setShowPassword(!showPassword)}
                                         edge='end'
                                         >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                         </IconButton>
                                    </InputAdornment>
                                ),
                             }}
                            />
                            <ErrorMessage name="password" component='div' className='required' />
                        </div>
                        <div>
                            <Field
                              name="ConfirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              as={TextField}
                              label="Password"
                              variant="outlined"
                              className="required"
                              InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton 
                                         onClick={() => setShowConfirmPassword(!showConfirmPassword)

                                         }
                                         edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            
                                            ) : (
                                                <Visibility />
                                            )
                                        }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                              }}
                            />
                            <ErrorMessage name="ConfirmPassword" component='div' className='required' />
                        </div>
                        <Button 
                          color='success'
                          variant='contained'
                          type='submit'
                          style={{ marginTop: '20px' }}
                          disabled={loading}
                          >
                            {loading ? <CircularProgress size={24} /> : 'Submit'}
                          </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    </ThemeProvider>
    </>
  );
};

export default Reset_Password