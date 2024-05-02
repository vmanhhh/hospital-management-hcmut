import { mdiAccount, mdiBallotOutline, mdiMail } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Button from '../../components/Button'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import FormField from '../../components/Form/Field'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { SERVER_URI, getPageTitle } from '../../config'
import axios from 'axios'
import SnackbarAlert from '../../components/snackbar'


const FormsPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");

  return (
    <>
      {isSubmitted && <SnackbarAlert message={alertMessage} severity={alertSeverity} />}
      <Head>
        <title>{getPageTitle('Thuốc')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Thông tin thuốc" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
            }}
            onSubmit={(values) => {
              console.log(JSON.stringify(values, null, 2));
              axios.post(`${SERVER_URI}/medicines`, values)
                .then(response => {
                  console.log(response);
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
            }}>
            <Form>
              <FormField label="Tên thuốc" icons={[mdiAccount, mdiMail]}>
                <Field name="name" placeholder="Tên thuốc" required />
              </FormField>
              <FormField label="Thương hiệu" labelFor="brandName">
                <Field name="brandName" placeholder="Thương hiệu" required />
              </FormField>
              <FormField label="Mô tả" labelFor="description">
                <Field name="description" placeholder="Mô tả" />
              </FormField>
              <FormField>
                <FormField label="Liều lượng" labelFor="dosage">
                  <Field name="dosage" placeholder="Liều lượng" />
                </FormField>
                <FormField label="Đơn vị" labelFor="unit">
                  <Field name="unit" placeholder="Liều lượng" />
                </FormField>
                <FormField label="Dạng bào chế" labelFor="dosageForm">
                  <Field name="dosageForm" placeholder="Dạng bào chế" />
                </FormField>
              </FormField>
              <FormField label="Thêm/giảm trữ lưỡng" labelFor="stock">
                <Field name="stock" placeholder="Trữ lượng" />
              </FormField>
              <FormField>
              <FormField label="Ngày nhập" labelFor="dateImported">
                <Field name="dateImported" type="date" />
              </FormField>
              <FormField label="Ngày hết hạn" labelFor="expirationDate">
                <Field name="expirationDate" type="date" />
              </FormField>
              </FormField>
              <Divider />

              <Divider />
              <Button type="submit" active={false} color="info" label="Cập nhật" />
            </Form>
          </Formik>
        </CardBox>
      </SectionMain >

    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
