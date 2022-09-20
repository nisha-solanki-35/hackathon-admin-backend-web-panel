import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
// layouts
import LogoOnlyLayout from '../layouts/LogoOnlyLayout'
import NotFound from '../pages/Page404'
import AdvertisementIndex from '../views/AdvertisementManagement'
import ForgotPasswordIndex from '../views/Auth/ForgotPassword'
import LoginIndex from '../views/Auth/Login'
import ResetPasswordIndex from '../views/Auth/ResetPassword'
import DashboardApp from '../views/Dashboard/Dashboard'
import ProfileIndex from '../views/MyProfile'
import ScreenIndex from '../views/ScreenManagement'
import SubadminIndex from '../views/SubadminManagement'
import VendorIndex from '../views/VendorManagement'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

// ----------------------------------------------------------------------

export default function Router () {
  return useRoutes([
    { path: '/', element: <PublicRoute element={<LoginIndex />} /> },
    { path: 'login', element: <PublicRoute element={<LoginIndex />} /> },
    { path: 'forgot-password', element: <ForgotPasswordIndex /> },
    { path: 'reset-password', element: <ResetPasswordIndex /> },
    // { path: 'my-profile', element: <MyProfile /> },

    {
      path: '/my-profile',
      element: <PrivateRoute element={<ProfileIndex />} />,
      children: [
        { path: 'change-password', element: <PrivateRoute element={<ResetPasswordIndex />} /> }
      ]
    },
    { path: 'dashboard', element: <PrivateRoute element={<DashboardApp/>} /> },
    { path: 'subadmin-management', element: <PrivateRoute element={<SubadminIndex />} /> },
    { path: 'vendor-management', element: <PrivateRoute element={<VendorIndex />} /> },
    { path: 'advertisement-management', element: <PrivateRoute element={<AdvertisementIndex />} /> },
    { path: 'screen-management', element: <PrivateRoute element={<ScreenIndex />} /> },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ])
}
