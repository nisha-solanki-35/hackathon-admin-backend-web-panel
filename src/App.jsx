import React from 'react'
// routes
import Router from './Routes/routes'
// theme
import ThemeProvider from './theme'
// components
import ScrollToTop from './components/ScrollToTop'

// ----------------------------------------------------------------------

export default function App () {
  return (
    <ThemeProvider >
      <ScrollToTop />
      {/* <BaseOptionChartStyle /> */}
      <Router />
    </ThemeProvider>
  )
}
