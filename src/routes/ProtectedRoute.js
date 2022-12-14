import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default ({ isAllowed, redirectPath = '/', children, isAdmin }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace state={isAdmin && isAdmin} />
  }

  return children ? children : <Outlet />
}
