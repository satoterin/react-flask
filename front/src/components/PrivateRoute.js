import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import history from '../history'

export default function PrivateRoute({children}) {
  const authedUser = useSelector(state=>state.auth)

  if (authedUser) {
    return children
  }
  else {
    return <Navigate to="/auth/login" state={{from: history.location.pathname }} />
  }
}