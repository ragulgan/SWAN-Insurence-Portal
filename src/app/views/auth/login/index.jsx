import React, { useEffect, useState, Fragment } from 'react'
import { logo_dark } from '../../../../helpers/assets'
import { makeStyles, Grid, TextField, Button, CircularProgress, InputAdornment, IconButton } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Link, useHistory } from 'react-router-dom'
import { AuthActions } from '../../../../store/actions/AuthActions'
import { usePageTitle } from '../../../../hooks/usePageTitle'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import toast from 'react-hot-toast'
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormHelperText-root.Mui-error': {
      color: '#ff0d1e',
      fontSize: 'inherit'
    }
  },
  img: {
    marginBottom: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBtn: {
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 14
  }
}))

function Login (props) {
  const { loginDispatch, saveDummyDispatch, authLoading, authToken, authRole, authMessage, clearDispatch, authStatus } = props
  const history = useHistory()
  const [pagetitle, setPagetitle] = usePageTitle('Swan - Login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertOpen, setAlertOpen] = useState(true)
  const { handleSubmit, control, register, setError, formState: { errors }, clearErrors } = useForm({
    defaultValues: {
      // username: 'asluximon@citybrokers',
      username: '',
      password: ''
      // username: 'ITMTQUOTES',
      // password: 'rH8ZY45K'
    }
  })
  const classes = useStyles()

  const passwordHandler = () => {
    setShowPassword(!showPassword)
  }
  const mouseDownHandler = (event) => {
    event.preventDefault()
  }
  const onSubmit = (values) => {
    if (!isEmpty(values)) {
      setLoading(true)
      const formData = {
        username: values.username,
        password: values.password
      }
      loginDispatch(formData)
    }
  }

  useEffect(() => {
    if (authToken !== null && authToken !== undefined && authStatus === 'success') {
      // window.location.replace(`/${authRole}/overview`);
      history.push(`/${authRole}/overview`)
      clearErrors('username', 'password')
      // clearDispatch()
    }
  }, [])

  useEffect(() => {
    if (authStatus === 'error') {
      toast.error(authMessage, { duration: 3000 })
      setError('username', { type: 'error' }, { shouldFocus: true })
      setError('password', { type: 'error' }, { shouldFocus: true })
    }
  }, [authStatus])
  return (
    <Grid id='kt_login_signin_form'>
      <Grid className={classes.img}>
        <img src={logo_dark} alt='swan_logo' className='max-h-70px' id='AUTH.LOGIN.TITLE' />
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={3}
          className={classes.root}
        >
          <Grid item xs={12} sm={6} md={5} xl={5}>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={3}
            >
              <Grid item xs={12}>
                <Controller
                  name='username'
                  control={control}
                  defaultValue=''
                  render={({
                    field: { onChange, value },
                    fieldState: {
                      error
                    }
                  }) => (
                    <TextField
                      label='USERNAME'
                      variant='outlined'
                      value={value}
                      type='text'
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'User Name is required' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='password'
                  control={control}
                  defaultValue=''
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label='PASSWORD'
                      variant='outlined'
                      value={value}
                      type={showPassword ? 'text' : 'password'}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.f : null}
                      InputProps={{
                        endAdornment: <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={passwordHandler}
                            edge='end'
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }}
                    />
                  )}
                  rules={{ required: 'Password is required' }}
                />
              </Grid>
              <Grid item xs={12} className='txt-center'>
                <Link className='blu-link' to='/auth/forgot-password'>FORGOT PASSWORD</Link>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  size='medium'
                  color='primary'
                  type='submit'
                  fullWidth
                                    // disabled={loading}
                  className={classes.loginBtn}
                >
                  {
                                        authLoading ? <CircularProgress size={18} style={{ color: '#ffffff' }} /> : 'LOGIN'
                                    }
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  const { Auth } = state
  return {
    authLoading: Auth.authLoading,
    authToken: Auth.authToken,
    authRole: Auth.authRole,
    authData: Auth.authData,
    authMessage: Auth.authMessage,
    authStatus: Auth.authStatus,
    authLoading: Auth.authLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (formData) => dispatch(AuthActions.SignIn(formData)),
  clearDispatch: () => dispatch(AuthActions.SignInClear())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
