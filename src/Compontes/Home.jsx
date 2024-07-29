import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const navigate = useNavigate();

    const handleLogout = () => {
       sessionStorage.removeItem('userData');
       navigate('/sign-in');
       toast.success('Logout successful', {
        position: toast.POSITION.TOP_CENTER,
       });
    };

        const handleSignIn = () => {
            navigate('/sign-in');
        };

        return(
            <>
              <Container maxWidth='sm'>
                <Box
                  sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: "80vh",
                    color: 'white',
                    padding: "20px",
                    margin: "0",
                    boxSizing: "border-box",
                    textAlign: "center",
                    overflowY: "hidden"
                  }}
                >
                    <Typography variant="h4" component="div" gutterBottom>
                        Welcome to the website
                    </Typography>
                    {userData ? (
                        <>
                        <Typography variant='h5' component='h2' gutterBottom>
                            Welcome, {userData?.firstName}!
                        </Typography>
                          <Typography variant='body1' gutterBottom>
                               Successfully login the Website
                          </Typography>
                          <Button variant='contained' color='primary' onClick={handleLogout}>Logout</Button>
                       </>
                    ) : (
                          <>
                            <Typography variant="h4" component='div' gutterBottom >
                            </Typography>
                            <Typography variant='body1' gutterBottom>
                                To access the website, please Sign in 
                            </Typography>
                            <Button variant='contained' color='success' onClick={handleSignIn}>Sign In</Button>
                          </>
                    )
                }
                </Box>
              </Container>
            </>
        );
};

export default Home;