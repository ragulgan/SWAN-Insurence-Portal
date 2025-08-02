import React, { useEffect, useState } from 'react'
import { setLocalStorage, setSessionStorage } from '../../../../helpers/helper'
import { SESSION } from '../../../../helpers/constants'
import { makeStyles, Grid, TextField, Button, CircularProgress } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
// import { LoginActions } from '../../../../store/actions'
import '../assets/style.css'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import swan_logo from '../assets/swan_logo.svg'

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
  const { loginDispatch, authLoading, authData } = props
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control, register } = useForm()
  const classes = useStyles()

  const onSubmit = (values) => {
    if (!isEmpty(values)) {
      setLoading(true)
      // const formData = {
      //     username: values.username,
      //     password: values.password
      // }

      // loginDispatch(formData)
      // setSessionStorage(SESSION.AUTH_TOKEN, JSON.stringify('value'))
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        window.location = '/agent/overview'
      }, 1000)
    }
  }

  useEffect(() => {
  }, authData)

  return (
    <Grid id='kt_login_signin_form'>
      <Grid className={classes.img}>
        <img src={swan_logo} alt='swan_logo' className='max-h-70px' id='AUTH.LOGIN.TITLE' />
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction='row'
          justifyContent='center' alignItems='center'
          spacing={3}
          className={classes.root}
        >
          <Grid item xs={12} sm={7} md={7} xl={7}>
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
          <Grid item xs={12} sm={7} md={7} xl={7}>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label='PASSWORD'
                  variant='outlined'
                  value={value}
                  type='password'
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.f : null}
                />
              )}
              rules={{ required: 'Password is required' }}
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} xl={7} className='txt-center'>
            <Link className='blu-link' to=''>FORGOT PASSWORD</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={6}>
            <Button
              variant='contained' size='medium' color='primary' type='submit' fullWidth
              className={classes.loginBtn}
            >
              {
                    authLoading ? <CircularProgress size={18} style={{ color: '#ffffff' }} /> : 'LOGIN'
                  }
            </Button>
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
    authData: Auth.authData
  }
}

const mapDispatchToProps = (dispatch) => ({
  // loginDispatch: (data) => dispatch(LoginActions.post(data)),
  // clearLogin: () => dispatch(LoginActions.clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
