import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { shallowEqual, useSelector, connect, useDispatch } from 'react-redux'
import { LayoutSplashScreen } from '../_metronic/layout'
import { getSessionStorage } from '../helpers/helper'
import { SESSION } from '../helpers/constants'
import { ProfileActions } from '../store/actions/ProfileActions'

function AuthInit (props) {
  const { profileDispatch, profileLoading, profileData } = props
  const didRequest = useRef(false)
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(false)

  const authToken = getSessionStorage(SESSION.AUTH_TOKEN)

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          // const { data: user } = await getUserByToken()
          // dispatch(props.fulfillUser(profileData))
        }
      } catch (error) {
        if (!didRequest.current) {
          dispatch(props.logout())
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (authToken) {
      requestUser()
    } else {
      // dispatch(props.fulfillUser(undefined))
      setShowSplashScreen(false)
    }

    // eslint-disable-next-line
    }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

const mapStateToProps = (state) => {
  const { Profile } = state
  return {
    profileLoading: Profile.profileLoading,
    profileData: Profile.profileData
  }
}

const mapDispatchToProps = (dispatch) => ({
  profileDispatch: (token) => dispatch(ProfileActions.MyProfile(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthInit)
