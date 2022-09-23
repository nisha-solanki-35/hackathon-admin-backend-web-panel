import React from 'react'
import { Navigate, useNavigate, useRoutes } from 'react-router-dom'
import instance from 'src/API/baseURL'
import AdvertisementDetailsIndex from 'src/views/AdvertisementManagement/AdvertisementDetails'
import DashboardIndex from 'src/views/Dashboard'
import ScreenDetailsIndex from 'src/views/ScreenManagement/ScreenDetails'
import TagIndex from 'src/views/TagManagement'
import TagDetailsIndex from 'src/views/TagManagement/TagDetails'
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
  const navigate = useNavigate()
  instance.interceptors.response.use(response => response, (error) => {
    if ((error.response && error.response.status === 401) && (error?.response?.data?.message === 'Authentication failed. Please login again!')) {
      localStorage.removeItem('token')
      navigate('/login')
    }
    return Promise.reject(error)
  })

  return useRoutes([
    { path: '/', element: <PublicRoute element={<LoginIndex />} /> },
    { path: 'login', element: <PublicRoute element={<LoginIndex />} /> },
    { path: 'forgot-password', element: <ForgotPasswordIndex /> },
    { path: 'reset-password', element: <ResetPasswordIndex /> },
    // { path: 'my-profile', element: <MyProfile /> },

    {
      path: '/my-profile',
      children: [
        { path: '', element: <PrivateRoute element={<ProfileIndex />} /> },
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
    {
      path: '/advertisement-management',
      children: [
        { path: '', element: <PrivateRoute element={<AdvertisementIndex />} /> },
        { path: 'create-advertisement', element: <PrivateRoute element={<AdvertisementDetailsIndex />} /> },
        { path: 'update-advertisement/:advertisementId', element: <PrivateRoute element={<AdvertisementDetailsIndex />} /> }
      ]
    },
    {
      path: '/screen-management',
      children: [
        { path: '', element: <PrivateRoute element={<ScreenIndex />} /> },
        { path: 'create-screen', element: <PrivateRoute element={<ScreenDetailsIndex />} /> },
        { path: 'update-screen/:screenId', element: <PrivateRoute element={<ScreenDetailsIndex />} /> }
      ]
    },
    {
      path: '/tag-management',
      children: [
        { path: '', element: <PrivateRoute element={<TagIndex />} /> },
        { path: 'create-tag', element: <PrivateRoute element={<TagDetailsIndex />} /> },
        { path: 'update-tag/:tagId', element: <PrivateRoute element={<TagDetailsIndex />} /> }
      ]
    },
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
