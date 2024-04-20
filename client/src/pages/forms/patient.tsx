import { mdiAccount, mdiAlertCircle, mdiBallotOutline, mdiCheckCircle, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import FormCheckRadio from '../../components/Form/CheckRadio'
import FormCheckRadioGroup from '../../components/Form/CheckRadioGroup'
import FormField from '../../components/Form/Field'
import FormFilePicker from '../../components/Form/FilePicker'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitle from '../../components/Section/Title'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import LocationSelect from '../../components/Form/LocationSelect'
import DepartmentSelect from '../../components/Form/DepartmentSelect'
import axios from 'axios'
import { useEffect, useState } from 'react'
import NotificationBar from '../../components/NotificationBar'
import { SERVER_URI } from '../../config'

const FormsPage = ({ id }) => {
  const [data, setData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // ... useEffect for fetching data ...

  const addNotification = (message, type = 'success') => {
    setNotifications(prevNotifications => [
      ...prevNotifications,
      {
        id: Date.now(), // unique id for key
        message,
        type
      }
    ]);
  };
  useEffect(() => {
    if (id) {
      axios.get(`/patients/${id}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);
  useEffect(() => {
    if (isSubmitted) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);
  return (
    <>
      <Head>
        <title>{getPageTitle('Thông tin Bệnh nhân')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Thông tin Bệnh nhân" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={data || {
              lastName: '',
              firstName: '',
              role: '',
              department: '',
              dob: '1990-01-01',
              address: {
                ward: '',
                district: '',
                province: '',
              },
              gender: '',
              contactInfo: {
                phone: '',
                email: '',
              },
              emergencyContact: {
                lastName: '',
                firstName: '',
                relationship: '',
                phone: '',
              }
            }}
            onSubmit={(values) => {
              console.log(JSON.stringify(values, null, 2));
              axios.post(`${SERVER_URI}/patients`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/patients`)
                  setIsSubmitted(true);
                  addNotification('Thêm bệnh nhân thành công!');
                })
                .catch(error => {
                  console.error(error);
                  addNotification('Thêm bệnh nhân thất bại!', 'error');
                });
            }}
          >
            <Form>
              <FormField label="Họ và tên" icons={[mdiAccount, mdiMail]}>
                <Field name="lastName" placeholder="Họ" />
                <Field name="firstName" placeholder="Tên" />
              </FormField>
              <FormField>
                <FormField label="Ngày sinh" labelFor="dob">
                  <Field name="dob" type="date" id="dob" />
                </FormField>
                <FormField label="Giới tính" labelFor="gender">
                  <Field name="gender" id="gender" component="select">
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </Field>
                </FormField>
              </FormField>
              
              <FormField label="Địa chỉ" labelFor="address">
                <LocationSelect />
              </FormField>
              <Divider />
              <FormField
                label="Thông tin liên hệ"
                labelFor="contactInfo"
              >
                <FormField label="Số điện thoại" labelFor="contactInfo.phone">
                  <Field name="contactInfo.phone" id="contactInfo.phone" />
                </FormField>
                <FormField label="Email" labelFor="contactInfo.email">
                  <Field name="contactInfo.email" id="contactInfo.email" />
                </FormField>
              </FormField>
              <Divider />

              <FormField
                label="Thông tin người thân"
                labelFor="emergencyContact"
              >
                <FormField label="Họ" labelFor="emergencyContact.lastName">
                  <Field name="emergencyContact.lastName" id="emergencyContact.lastName" />
                </FormField>
                <FormField label="Tên" labelFor="emergencyContact.firstName">
                  <Field name="emergencyContact.firstName" id="emergencyContact.firstName" />
                </FormField>
                <FormField label="Quan hệ" labelFor="emergencyContact.relationship">
                  <Field name="emergencyContact.relationship" id="emergencyContact.relationship" />
                </FormField>
                <FormField label="Số điện thoại" labelFor="emergencyContact.phone">
                  <Field name="emergencyContact.phone" id="emergencyContact.phone" />
                </FormField>
              </FormField>

              <Divider />

              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                <Button type="reset" color="info" outline label="Reset" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
        {notifications.map(notification => (
          <NotificationBar
            key={notification.id}
            color={notification.type === 'error' ? 'danger' : 'success'}
            icon={notification.type === 'error' ? mdiAlertCircle : mdiCheckCircle}
            autoDismiss={true}
          >
            {notification.message}
          </NotificationBar>
        ))}
      </SectionMain >

    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
