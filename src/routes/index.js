import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import AboutUs from '../pages/about-us'
import ProjectsPage from '../pages/projects'
import Production from '../pages/production'
import Library from '../pages/library'
import SingleBookPage from '../components/SingleBookPage'
import CreateBook from '../pages/createBook'
import CardDetails from '../pages/CardDetails'
import EmailVerify from '../pages/Auth/EmailVerify'
import ContactUs from '../pages/ContactUs'
import HowItWorks from '../pages/HowItWorks'
import MyAccount from '../pages/MyAccount'
import ProfileSettings from '../pages/ProfileSettings'
import Admin from '../pages/Admin'
import NotFound from '../pages/NotFound'
import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import SignUp from '../pages/Auth/signUp/SignUp'
import SignIn from '../pages/Auth/signIn/SignIn'
import EmailVerification from '../pages/emailVerification'
import Subscription from '../pages/Subscription'
import MyProjects from '../pages/myProjects'
import MyAudioBooks from '../pages/myAudioBooks'
import { useSelector } from 'react-redux'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'

export default () => {
  const { accessToken } = useSelector((store) => store.auth)
  const { userRole } = useSelector((store) => store.user.user)

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about-us" element={<AboutUs />} />
      <Route exact path="/projects" element={<ProjectsPage />} />
      <Route exact path="/production" element={<Production />} />
      <Route exact path="/sign-in" element={<SignIn />} />
      <Route exact path="/sign-up" element={<SignUp />} />
      <Route exact path="/email-verification" element={<EmailVerification />} />
      <Route exact path="/subscription" element={<Subscription />} />
      <Route
        path="/forgot-password"
        element={
          <ProtectedRoute
            redirectPath="/"
            isAllowed={accessToken ? false : true}
          >
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ProtectedRoute
            redirectPath="/"
            isAllowed={accessToken ? false : true}
          >
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/library"
        element={
          <ProtectedRoute
            redirectPath="/sign-in"
            isAllowed={accessToken ? true : false}
          >
            <Library />
          </ProtectedRoute>
        }
      /> */}
      <Route exact path="/single-book-page/:id" element={<SingleBookPage />} />
      <Route exact path="/create-book" element={<CreateBook />} />
      <Route exact path="/card-details" element={<CardDetails />} />
      <Route exact path="/email-verify" element={<EmailVerify />} />
      <Route exact path="/email-verify" element={<EmailVerify />} />
      <Route exact path="/contact-us" element={<ContactUs />} />
      <Route exact path="/library" element={<Library />} />
      <Route exact path="/how-it-works" element={<HowItWorks />} />
      <Route
        path="/my-account"
        element={
          <ProtectedRoute
            redirectPath="/sign-in"
            isAllowed={accessToken ? true : false}
          >
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile-settings"
        element={
          <ProtectedRoute
            redirectPath="/sign-in"
            isAllowed={accessToken ? true : false}
          >
            <ProfileSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-projects"
        element={
          <ProtectedRoute
            redirectPath="/sign-in"
            isAllowed={accessToken ? true : false}
          >
            <MyProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-audiobooks"
        element={
          <ProtectedRoute
            redirectPath="/sign-in"
            isAllowed={accessToken ? true : false}
          >
            <MyAudioBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute
            redirectPath={
              accessToken && userRole !== 'admin' ? '/' : '/sign-in'
            }
            isAllowed={accessToken && userRole === 'admin' ? true : false}
            // isAllowed={!!user && user.roles.includes('admin')}
            isAdmin={true}
          >
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
