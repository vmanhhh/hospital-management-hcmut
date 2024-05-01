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
import LocationSelect from '../../components/Form/LocationSelect'
import DepartmentSelect from '../../components/Form/DepartmentSelect'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SERVER_URI } from '../../config'
import SnackbarAlert from '../../components/snackbar'

const FormsPage = ({ id }) => {
  const [data, setData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");

  // ... useEffect for fetching data ..
  useEffect(() => {
    if (id) {
      axios.get(`/doctors/${id}`)
        .then(response => {
          console.log(response.data);
          setData(response.data);

        })
        .catch(error => {
          console.error(error);
          setAlertMessage("Ôi không! Bác sĩ đâu rồi?");
          setAlertSeverity("error");
        });
    }
  }, [id]);
  return (
    <>
      <Head>
        <title>{getPageTitle('Thông tin Bác sỹ')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Thông tin Nhân viên Y tế" main>
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
              axios.post(`${SERVER_URI}/doctors`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/doctors`)
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
                <Field name="lastName" placeholder="Họ" required/>
                <Field name="firstName" placeholder="Tên" required/>
              </FormField>
              <FormField>
                <FormField label="Chức vụ" labelFor="role">
                  <Field name="role" id="role" component="select" required>
                    <option value="">Chọn chức vụ</option>
                    <option value="Doctor">Bác sĩ</option>
                    <option value="Nurse">Y tá</option>
                    <option value="Staff">Nhân viên</option>
                  </Field>
                </FormField>
                <FormField label="Khoa" labelFor="department">
                  <DepartmentSelect />
                </FormField>
              </FormField>
              <FormField label="Ngày sinh" labelFor="dob">
                <Field name="dob" type="date" id="dob" required/>
              </FormField>
              <FormField label="Giới tính" labelFor="gender">
                <Field name="gender" id="gender" component="select" required>
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </Field>
              </FormField>
              <FormField label="Địa chỉ" labelFor="address">
                <LocationSelect initialData={{}} />
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

      </SectionMain >
      {isSubmitted && <SnackbarAlert message={alertMessage} severity={alertSeverity} />}

    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
