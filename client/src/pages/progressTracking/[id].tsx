import { mdiAccount, mdiBallotOutline, mdiMail } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import FormField from '../../components/Form/Field'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SERVER_URI } from '../../config'
import SnackbarAlert from '../../components/snackbar'
import { useRouter } from 'next/router'
import CircularIndeterminate from '../../components/Loading'

const FormsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  // ... useEffect for fetching data ..
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios.get(`${SERVER_URI}/patients/${id}?_=${Date.now()}`)
        .then(response => {
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);

        })
        .catch(error => {
          console.error(error);
          setAlertMessage("Ôi không! Data đâu rồi?");
          setAlertSeverity("error");
          setIsLoading(false);
        });
    }
  }, [id]);
  if (isLoading) {
    return <CircularIndeterminate />
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Cập nhật Tiến triển')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title={`Cập nhật tiến triển bệnh nhân ${data.firstName}`} main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              patientId: id,
              lastName: data.lastName,
              firstName: data.firstName,
              date: getCurrentDateTime(),
              weight: 0,
              height: 0,
              bloodPressureSystolic: 0,
              bloodPressureDiastolic: 0,
              heartRate: 0,
              temperature: 0,
              note: "",
            }}
            onSubmit={(values) => {
              console.log(JSON.stringify(values, null, 2));
              axios.post(`${SERVER_URI}/progressTracking`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/progressTracking`)
                  setIsSubmitted(true);
                  setAlertMessage("Thêm thành công!");
                  setAlertSeverity("success");
                  setTimeout(() => {
                    setIsSubmitted(false);
                  }, 3000);

                })
                .catch(error => {
                  console.error(error);
                  setIsSubmitted(true);
                  setAlertMessage("Thêm thất bại!");
                  setAlertSeverity("error");
                  setTimeout(() => {
                    setIsSubmitted(false);
                  }, 3000);
                });
            }}
          >
            <Form>
              <FormField label="Họ và tên" icons={[mdiAccount, mdiMail]}>
                <Field name="lastName" placeholder="Họ" disabled />
                <Field name="firstName" placeholder="Tên" disabled />
              </FormField>

              <FormField label="Ngày kiểm tra" labelFor="dob">
                <Field name="date" id="date" type="datetime-local" />
              </FormField>
              <FormField>
                <FormField label="Cân nặng" labelFor="weight">
                  <Field name="weight" id="weight" />
                </FormField>
                <FormField label="Nhiệt độ" labelFor="temperature">
                  <Field name="temperature" id="temperature" />
                </FormField>
              </FormField>
              <FormField>
                <FormField label="Huyết áp tâm thu" labelFor="bloodPressureSystolic">
                  <Field name="bloodPressureSystolic" id="bloodPressureSystolic" />
                </FormField>
                <FormField label="Huyết áp tâm trương" labelFor="bloodPressureDiastolic">
                  <Field name="bloodPressureDiastolic" id="bloodPressureDiastolic" />
                </FormField>
              </FormField>
              <FormField label="Nhịp tim" labelFor="heartRate">
                <Field name="heartRate" id="heartRate" />
              </FormField>
              <FormField label="Ghi chú" labelFor="note">
                <Field name="note" id="note" as="textarea" rows="4" cols="50" />
              </FormField>
              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                <Button type="reset" color="info" outline label="Reset" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>

      </SectionMain >
      {isSubmitted && <SnackbarAlert message={alertMessage} severity={alertSeverity} />}

    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
