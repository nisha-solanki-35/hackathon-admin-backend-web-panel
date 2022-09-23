import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import DashboardIndex from 'src/views/Dashboard'
import VendorDetailsIndex from 'src/views/VendorManagement/VendorDetails'
import LogoOnlyLayout from '../layouts/LogoOnlyLayout'
import NotFound from '../pages/Page404'
import AdvertisementIndex from '../views/AdvertisementManagement'
import ForgotPasswordIndex from '../views/Auth/ForgotPassword'
import LoginIndex from '../views/Auth/Login'
import ResetPasswordIndex from '../views/Auth/ResetPassword'
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
    { path: 'dashboard', element: <PrivateRoute element={<DashboardIndex/>} /> },
    { path: 'subadmin-management', element: <PrivateRoute element={<SubadminIndex />} /> },
    {
      path: '/vendor-management',
      children: [
        { path: '', element: <PrivateRoute element={<VendorIndex />} /> },
        { path: 'create-vendor', element: <PrivateRoute element={<VendorDetailsIndex />} /> },
        { path: 'update-vendor/:vendorId', element: <PrivateRoute element={<VendorDetailsIndex />} /> }
      ]
    },

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
