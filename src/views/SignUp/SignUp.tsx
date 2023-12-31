import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import e from 'express';
import axios from 'axios';
import { useNavigate } from 'react-router';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}







// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {


    let navigate = useNavigate()

    const [gender, setGender] = React.useState('Not to Say');
    const [birthday, setBirthday] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    const handleChange = (event: SelectChangeEvent) => {
        setGender(event.target.value);

    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // data.append('birthday',birthday?.toDate()))

        let bir = birthday?.toISOString();
        console.log(bir);
        data.append('birthday', bir!)

        let check = checkNull(data.get('username') as string,data.get('password') as string)

       if(check === 'yes'){ 
        console.log({
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            gender: data.get('gender'),
            birthday: data.get('birthday')
        });
        
        axios.post('http://localhost:5124/api/SignUp',{
            
                "userName": data.get('username'),
                "password": data.get('password'),
                "gender": data.get('gender'),
                "birthday": data.get('birthday'),
                "email": data.get('email')
              
        }).then((res)=>{
                console.log(res.data)
                navigate('/')
        })
    
    }else{

            console.log('null')
    }



    };

    const [checkUsername, setCheckUserame] = React.useState<boolean>(true)
    const [checkPwd, setCheckPwd] = React.useState<boolean>(true)

    const checkNull = (username: string, pwd: string) => {
        if (username === '' || pwd === '') {
            setCheckUserame(false)
            setCheckPwd(false)

            return 'no';
        }else{
            setCheckUserame(true)
            setCheckPwd(true)

            return 'yes';

        }


    }



    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!checkUsername}
                                    helperText={!checkUsername ? "Username cannot be null." : ""}
                                    id="username"
                                    label="User Name"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!checkPwd}
                                    helperText={!checkPwd ? "Password cannot be null." : ""}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth

                                >
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        name='gender'
                                        label="Gender"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                        <MenuItem value={'Not so Say'}>Not so Say</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker

                                            label="Birthday"
                                            value={birthday}
                                            //   name="birthday"
                                            onChange={(birthday) => setBirthday(birthday)}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}