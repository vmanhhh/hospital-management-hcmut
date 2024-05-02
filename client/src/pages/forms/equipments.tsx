import { mdiAccount, mdiBallotOutline, mdiMail } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import FormField from '../../components/Form/Field'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { SERVER_URI, getPageTitle } from '../../config'
import DepartmentSelect from '../../components/Form/DepartmentSelect'
import axios from 'axios'
import SnackbarAlert from '../../components/snackbar'

const FormsPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");

  return (
    <>
      <Head>
        <title>{getPageTitle('Thiết bị')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Thông tin thiết bị" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
            }}
            onSubmit={(values) => {

              console.log(JSON.stringify(values, null, 2));

              console.log(values)
              axios.post(`${SERVER_URI}/equipments`, values)
                .then(response => {
                  console.log(response);
                  setIsSubmitted(true);
                  setAlertMessage("Cập nhật thành công!");
                  setAlertSeverity("success");
                  setTimeout(() => {
                    setIsSubmitted(false);
                  }, 3000);
                })
                .catch(error => {
                  console.error(error);
                  setIsSubmitted(true);
                  setAlertMessage("Cập nhật thất bại!");
                  setAlertSeverity("error");
                  setTimeout(() => {
                    setIsSubmitted(false);
                  }, 3000);
                });
            }}
          >
            <Form>
              <FormField label="Tên thiết bị" icons={[mdiAccount, mdiMail]}>
                <Field name="name" placeholder="Tên thiết bị" required/>
              </FormField>
              <FormField>
                <FormField label="Hãng sản xuất" labelFor="manufacturer">
                  <Field name="manufacturer" placeholder="Hãng sản xuất" id="manufacturer"required />
                </FormField>
                <FormField label="Model" labelFor="deviceModel">
                  <Field name="model" placeholder="Model" required/>
                </FormField>
              </FormField>
              <FormField label="Số seri" labelFor="serialNumber">
                <Field name="serialNumber" placeholder="Số seri" id="serialNumber" />
              </FormField>
              <FormField label="Khoa" labelFor="department">
                <DepartmentSelect />
              </FormField>
              <FormField label="Trạng thái" labelFor="availability">
                <Field name="availability" id="availability" component="select">
                  <option value="">Chọn trạng thái</option>
                  <option value="Available">Sẵn dùng</option>
                  <option value="In Use">Đang sử dụng</option>
                  <option value="Under Maintenance">Đang bảo trì</option>
                  <option value="Reserved">Đã đặt</option>
                </Field>
              </FormField>
              <FormField label="Lịch sử bảo trì" labelFor="maintenanceHistory">
                <Field name="maintenanceHistory.date" type="date" />
                <Field name="maintenanceHistory.description" placeholder="Mô tả" />
                <Field name="maintenanceHistory.technician" placeholder="Người bảo trì" />
              </FormField>


              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                <Button type="reset" color="info" outline label="Reset" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
      {isSubmitted && <SnackbarAlert message={alertMessage} severity={alertSeverity} />}
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
