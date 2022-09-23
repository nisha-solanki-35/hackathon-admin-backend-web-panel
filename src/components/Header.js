import React from 'react'
import PropTypes from 'prop-types'
import { alpha, Button, styled } from '@mui/material'
import Iconify from './Iconify'
import { useNavigate } from 'react-router-dom'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '1px solid grey',
  borderRadius: '5px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '80%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '15%',
    marginBottom: theme.spacing(3)
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '30%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

function Header (props) {
  const { title, addLink, handleOnChange } = props
  const navigate = useNavigate()

  return (
    addLink
      ? <>
      <div style={{ padding: '30px 0 50px', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ textAlign: 'left' }}>{title}</h1>
        <Button onClick={() => navigate(addLink)} style={{ textAlign: 'right', fontSize: '25px' }}><Iconify icon="gridicons:create" /></Button>
      </div>
      <Search onChange={handleOnChange}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      </>
      : <h1 style={{ textAlign: 'center', padding: '30px 0 50px' }}>{title}</h1>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  addLink: PropTypes.string,
  handleOnChange: PropTypes.func
}

export default Header
