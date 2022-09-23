import React from 'react'
// component
import Iconify from '../../components/Iconify'

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: getIcon('ic:outline-space-dashboard')
  },
  {
    title: 'Vendor',
    path: '/vendor-management',
    icon: getIcon('arcticons:vendora')
  },
  {
    title: 'Advertisement',
    path: '/advertisement-management',
    icon: getIcon('mdi:advertisements')
  },
  {
    title: 'Screen',
    path: '/screen-management',
    icon: getIcon('el:screen')
  },
  {
    title: 'Label',
    path: '/label-management',
    icon: getIcon('emojione-monotone:label')
  }
]

export default navConfig
