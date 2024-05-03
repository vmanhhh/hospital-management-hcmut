import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiPlus,
  mdiPulse,
  mdiStethoscope,
} from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import Button from '../../components/Button'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { SERVER_URI, getPageTitle } from '../../config'
import { Field, Form, Formik } from 'formik'
import FormField from '../../components/Form/Field'
import LocationSelect from '../../components/Form/LocationSelect'
import Divider from '../../components/Divider'
import axios from 'axios'
import CircularIndeterminate from '../../components/Loading'
import { useRouter } from 'next/router'
import moment from 'moment'
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
type ProgressTracking = {
  _id: string
  date: Date
  weight: number
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  heartRate: number
  temperature: number
  note: string
}
type Treatment = {
  _id: string
  date: Date
  symptoms: string
  diagnosis: string
  doctorId: string
  medicine: {
    medicineId: string
    quantity: number
  }[]
  description: string
}

function formatDateTime(dateTime) {
  return moment(dateTime).format('YYYY-MM-DD hh:mm:ss')
}

const DashboardPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progressTracking, setProgressTracking] = useState<ProgressTracking | null>(null);
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const fetchProgress = async () => {
    try {
      const respond = await axios.get(`${SERVER_URI}/progressTracking/patient/recent/${id}`);
      setProgressTracking(respond.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/patients/${id}`);

      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTreatment = async () => {
    try {
      const respond = await axios.get(`${SERVER_URI}/treatments/patient/recent/${id}`);
      setTreatment(respond.data);
      await fetchDoctor(respond.data.doctorId);

    } catch (error) {
      console.error(error);
    }
  };
  const fetchDoctor = async (doctorId) => {
    try {
      const response = await axios.get(`${SERVER_URI}/doctors/${doctorId}`);
      setDoctor(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () => {
    await fetchPatients();
    await fetchProgress();
    await fetchTreatment();
    setIsLoading(false);
  };

  useEffect(() => {
    if (id)
      fetchData();
  }, [id]);


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
                <Field name="lastName" placeholder="Họ" disabled />
                <Field name="firstName" placeholder="Tên" disabled />
              </FormField>
              <FormField>
                <FormField label="Ngày sinh" labelFor="dob">
                  <Field name="dob" type="date" id="dob" disabled />
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
                <LocationSelect initialData={patients} />
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

        <SectionTitleLineWithButton icon={mdiPulse} title="Tiến triển">
          <Button
            color="info"
            label="Thêm tiến triển"
            icon={mdiPlus}
            roundedFull
            href={`/progressTracking/${id}`}
          />
        </SectionTitleLineWithButton>

        <Formik
          initialValues={{
            date: progressTracking ? formatDateTime(progressTracking.date) : "",
            weight: progressTracking ? progressTracking.weight : 0,
            bloodPressureSystolic: progressTracking ? progressTracking.bloodPressureSystolic : 0,
            bloodPressureDiastolic: progressTracking ? progressTracking.bloodPressureDiastolic : 0,
            heartRate: progressTracking ? progressTracking.heartRate : 0,
            temperature: progressTracking ? progressTracking.temperature : 0,
            note: progressTracking ? progressTracking.note : "No Data",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          <Form>
            <FormField label="Ngày kiểm tra" labelFor="date">
              <Field name="date" type="datetime-local" id="date" disabled />
            </FormField>
            <FormField label="Cân nặng" labelFor="weight">
              <Field name="weight" id="weight" disabled />
            </FormField>
            <FormField>
              <FormField label="Huyết áp tâm thu" labelFor="bloodPressureSystolic">
                <Field name="bloodPressureSystolic" id="bloodPressureSystolic" disabled />
              </FormField>
              <FormField label="Huyết áp tâm trương" labelFor="bloodPressureDiastolic">
                <Field name="bloodPressureDiastolic" id="bloodPressureDiastolic" disabled />
              </FormField>
            </FormField>
            <FormField>
              <FormField label="Nhịp tim" labelFor="heartRate">
                <Field name="heartRate" id="heartRate" disabled />
              </FormField>
              <FormField label="Nhiệt độ" labelFor="temperature">
                <Field name="temperature" id="temperature" disabled />
              </FormField>
            </FormField>
            <FormField label="Ghi chú" labelFor="note">
              <Field name="note" id="note" as="textarea" rows="4" cols="50" disabled />
            </FormField>

            <Divider />

          </Form>
        </Formik>
        <SectionTitleLineWithButton icon={mdiStethoscope} title="Chẩn đoán">
          <Button
            color="info"
            label="Thêm chẩn đoán"
            icon={mdiPlus}
            roundedFull
            href={`/treatment/${id}`}
          />
        </SectionTitleLineWithButton>

        <Formik
          initialValues={{
            doctor: doctor ? `Bác sĩ ${doctor.lastName} ${doctor.firstName} - ${doctor.department}` : "Hello",
            date: treatment ? formatDateTime(treatment.date) : "",
            symptoms: treatment ? treatment.symptoms : "No Data",
            diagnosis: treatment ? treatment.diagnosis : "No Data",
            medicine: treatment ? treatment.medicine : [],
            description: treatment ? treatment.description : "No Data",
          }}
          onSubmit={(values) => {
            console.log(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <FormField label="Ngày kiểm tra" labelFor="date">
              <Field name="date" id="date" type="datetime-local" disabled />
            </FormField>
            <FormField label="Triệu chứng" labelFor="symptoms" >
              <Field name="symptoms" id="symptoms" disabled />
            </FormField>
            <FormField label="Chẩn đoán" labelFor="diagnosis">
              <Field name="diagnosis" id="diagnosis" />
            </FormField>
            <FormField label="Bác sĩ chẩn đoán" labelFor="doctor">
              <Field name="doctor" id="doctor" disabled />
            </FormField>

            <FormField label="Mô tả" labelFor="description">
              <Field name="description" id="description" />
            </FormField>
            <Divider />
          </Form>
        </Formik>
      </SectionMain>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
