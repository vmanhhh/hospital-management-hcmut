import React from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import FormCheckRadio from '../components/Form/CheckRadio'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import SnackbarAlert from '../components/snackbar'

type LoginForm = {
  login: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const handleSubmit = (formValues: LoginForm) => {
    if (formValues.password === 'bG1sL9eQ1uD2sK3b')
    router.push('/patients')
    else {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      },3000);
    }
  }

  const initialValues: LoginForm = {
    login: 'admin',
    password: 'bG1sL9eQ1uD2sK3b',
    remember: true,
  }

  return (
    <>
    {open && <SnackbarAlert message="Invalid password" severity="error" />}
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <FormField label="Login" help="Please enter your login">
                <Field name="login" />
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField>

              <FormCheckRadio type="checkbox" label="Remember">
                <Field type="checkbox" name="remember" />
              </FormCheckRadio>

              <Divider />

              <Buttons>
                <Button type="submit" label="Login" color="info" />
                <Button href="/patients" label="Home" color="info" outline />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default LoginPage
