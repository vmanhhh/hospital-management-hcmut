import {
  mdiAccount,
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMail,
  mdiMonitorCellphone,
  mdiReload,
} from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import Button from '../../components/Button'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import CardBoxWidget from '../../components/CardBox/Widget'
import { useSamplePatients, useSampleTransactions } from '../../hooks/sampleData'
import CardBoxTransaction from '../../components/CardBox/Transaction'
import { Client, Transaction } from '../../interfaces'
import CardBoxClient from '../../components/CardBox/Client'
import SectionBannerStarOnGitHub from '../../components/Section/Banner/StarOnGitHub'
import CardBox from '../../components/CardBox'
import { sampleChartData } from '../../components/ChartLineSample/config'
import ChartLineSample from '../../components/ChartLineSample'
import NotificationBar from '../../components/NotificationBar'
import TableSampleClients from '../../components/Table/SampleClients'
import { SERVER_URI, getPageTitle } from '../../config'
import { Field, Form, Formik } from 'formik'
import FormField from '../../components/Form/Field'
import LocationSelect from '../../components/Form/LocationSelect'
import Divider from '../../components/Divider'
import axios from 'axios'
import CircularIndeterminate from '../../components/Loading'
import { useRouter } from 'next/router'
type Patient = {
  _id: string
  lastName: string
  firstName: string
  dob: Date
  address: {
    province: string
    district: string
    ward: string
  }
  gender: string
  contactInfo: {
    phone: string
    email: string
  }
}
const DashboardPage = () => {
  const router = useRouter()
  const {id} = router.query
  const [patients, setPatients] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/patients/${id}`);

      setPatients(response.data);
      setIsLoading(false);
      console.log(patients.dob)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id)
    fetchPatients();
  }, [id]);

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }
  if (isLoading) {
    return <CircularIndeterminate />
  }
  return (
    <>
      <Head>
        <title>{getPageTitle(`Bệnh án ${patients.firstName}`)}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Overview" main>
        </SectionTitleLineWithButton>



        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <Formik
            initialValues={{
              lastName: patients.lastName,
              firstName: patients.firstName,
              dob: new Date(patients.dob).toISOString().split('T')[0],
              address: {
                province: patients.address.province,
                district: patients.address.district,
                ward: patients.address.ward,
              },
              gender: patients.gender,
              contactInfo: {
                phone: patients.contactInfo.phone,
                email: patients.contactInfo.email,
              }
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 400)
            }}
          >
          <Form>
            <FormField label="Họ và tên" icons={[mdiAccount, mdiMail]}>
              <Field name="lastName" placeholder="Họ"  disabled/>
              <Field name="firstName" placeholder="Tên" disabled/>
            </FormField>
            <FormField>
              <FormField label="Ngày sinh" labelFor="dob">
                <Field name="dob" type="date" id="dob" disabled/>
              </FormField>
              <FormField label="Giới tính" labelFor="gender">
                <Field name="gender" id="gender" component="select" disabled>
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </Field>
              </FormField>
            </FormField>

            <FormField label="Địa chỉ" labelFor="address">
              <LocationSelect initialData={patients}/>
            </FormField>
            <Divider />
            <FormField
              label="Thông tin liên hệ"
              labelFor="contactInfo"
            >
              <FormField label="Số điện thoại" labelFor="contactInfo.phone">
                <Field name="contactInfo.phone" id="contactInfo.phone" disabled />
              </FormField>
              <FormField label="Email" labelFor="contactInfo.email">
                <Field name="contactInfo.email" id="contactInfo.email" disabled />
              </FormField>
            </FormField>
            <Divider />

          </Form>
        </Formik>
        </div>


        <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

        <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar>

        <CardBox hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
