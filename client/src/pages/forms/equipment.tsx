import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
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
import DepartmentSelect from '../../components/Form/DepartmentSelect'

const FormsPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Forms')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Thông tin thiết bị" main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
            }}
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          >
            <Form>
              <FormField label="Tên thiết bị" icons={[mdiAccount, mdiMail]}>
                <Field name="deviceName" placeholder="Tên thiết bị" />

              </FormField>
              <FormField>
                <FormField label="Hãng sản xuất" labelFor="manufacturer">
                  <Field name="manufacturer" placeholder="Hãng sản xuất" id="manufacturer" />
                </FormField>
                <FormField label="Model" labelFor="deviceModel">
                  <Field name="deviceModel" placeholder="Model" />
                </FormField>
              </FormField>
              <FormField label="Số seri" labelFor="serialNumber">
                <Field name="serialNumber" placeholder="Số seri" id="serialNumber" />
              </FormField>
              <FormField label="Khoa" labelFor="department">
                <DepartmentSelect />
              </FormField>
              <FormField label="Trạng thái" labelFor="status">
                <Field name="status" id="status" component="select">
                  <option value="">Chọn trạng thái</option>
                  <option value="Available">Sẵn dùng</option>
                  <option value="In Use">Đang sử dụng</option>
                  <option value="Under Maintenance">Đang bảo trì</option>
                  <option value="Reserved">Đã đặt</option>
                </Field>
              </FormField>
              <FormField label="Lịch sử bảo trì" labelFor="maintenanceHistory">
                <Field name="dateMaintenance" type="date" id="dateMaintenance" />
                <Field name="description" placeholder="Mô tả" />
                <Field name="maintenanceBy" placeholder="Người bảo trì" />
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

    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
