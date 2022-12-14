import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserInfo from '../UserInfo'
import Search from '../../../Common/Search'
import LangDropDown from '../LangDropDown'
export default function NavbarBurger({ toggleDrawer, state, setState }) {
  // const [open, setOpen] = React.useState()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const auth = useSelector((state1) => state1.auth)
  const auth1 = useSelector((state1) => state1.user)

  const routes = [
    // { path: '/about-us', name: t('header.aboutUs') },
    { path: '/about-us', name: t('header.aboutUs') },
    { path: '/how-it-works', name: t('header.howItWorks') },
    { path: '/projects', name: t('header.projects') },
    { path: '/production', name: t('header.production') },
    { path: '/create-book', name: t('header.startProject') },
    { path: '/subscription', name: t('header.subscription') },
    { path: '/library', name: t('header.library') },
    { path: '/contact-us', name: t('header.contactUs') },
  ]

  const closeMobileMenu = (path, anchor) => {
    // toggleDrawer(anchor, false)
    setState({ ...state, [anchor]: false })
    navigate(path)
  }

  const list = (anchor) => (
    <Box role="presentation">
      {routes.map((item) => {
        return (
          <List
            key={item.path}
            onClick={() => closeMobileMenu(item.path, anchor)}
          >
            <ListItem>
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </List>
        )
      })}
      {auth.accessToken === null && (
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate('/sign-up')}>
              <ListItemText primary={t('common.signUp')} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('sign-in')}>
              <ListItemText primary={t('common.signIn')} />
            </ListItemButton>
          </ListItem>
        </List>
      )}

      <ListItem>
        <Search setState={setState} state={state} />
      </ListItem>
      <ListItem>
        <LangDropDown setState={setState} state={state} />
      </ListItem>
      <ListItem>
        {auth.accessToken && <UserInfo setState={setState} state={state} />}
      </ListItem>
    </Box>
  )

  return (
    <div>
      {['left', 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
