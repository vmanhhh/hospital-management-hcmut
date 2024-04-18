import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import Divider from '../components/Divider'
import CardBox from '../components/CardBox'
import FormCheckRadio from '../components/Form/CheckRadio'
import FormCheckRadioGroup from '../components/Form/CheckRadioGroup'
import FormField from '../components/Form/Field'
import FormFilePicker from '../components/Form/FilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitle from '../components/Section/Title'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import { getPageTitle } from '../config'
import LocationSelect from '../components/Form/LocationSelect'

const FormsPage = () => {
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
            initialValues={{
              lastName: 'Nguyễn Văn',
              firstName: 'A',
              phone: '',
              gender: '',
              textarea: 'Hello',
            }}
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          >
            <Form>
              <FormField label="Họ và tên" icons={[mdiAccount, mdiMail]}>
                <Field name="lastName" placeholder="Họ" />
                <Field name="firstName" placeholder="Tên" />
              </FormField>
              <FormField label="Ngày sinh" labelFor="dob">
                <Field name="dob" type="date" id="dob" />
              </FormField>
              <FormField label="Giới tính" labelFor="gender">
                <Field name="gender" id="gender" component="select">
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </Field>
              </FormField>
              <FormField label="Địa chỉ" labelFor="address">
                <LocationSelect />
              </FormField>
              <Divider />
              <FormField
                label="Thông tin liên hệ"
                labelFor="contact"
              >
                <FormField label="Số điện thoại" labelFor="phone">
                  <Field name="phone" id="phone" />
                </FormField>
                <FormField label="Email" labelFor="email">
                  <Field name="email" id="email" />
                </FormField>
              </FormField>
              <Divider />
            
              <FormField
                label="Thông tin người thân"
                labelFor="emergencyContact"
              >
                <FormField label="Họ" labelFor="emergencyLastName">
                  <Field name="emergencyLastName" id="emergencyLastName" />
                </FormField>
                <FormField label="Tên" labelFor="emergencyFirstName">
                  <Field name="emergencyFirstName" id="emergencyFirstName" />
                </FormField>
              </FormField>
              <FormField label="Quan hệ" labelFor="relationship">
                <Field name="relationship" id="relationship" />
              </FormField>
              <FormField label="Số điện thoại" labelFor="emergencyPhone">
                <Field name="emergencyPhone" id="emergencyPhone" />
              </FormField>

              <Divider />

              <FormField label="Textarea" hasTextareaHeight>
                <Field name="textarea" as="textarea" placeholder="Your text here" />
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

      <SectionTitle>Custom elements</SectionTitle>

      <SectionMain>
        <CardBox>
          <Formik
            initialValues={{ checkboxes: ['lorem'], switches: ['lorem'], radio: 'lorem' }}
            onSubmit={() => null}
          >
            <Form>
              <FormField label="Checkbox">
                <FormCheckRadioGroup>
                  <FormCheckRadio type="checkbox" label="Lorem">
                    <Field type="checkbox" name="checkboxes" value="lorem" />
                  </FormCheckRadio>
                  <FormCheckRadio type="checkbox" label="Ipsum">
                    <Field type="checkbox" name="checkboxes" value="ipsum" />
                  </FormCheckRadio>
                  <FormCheckRadio type="checkbox" label="Dolore">
                    <Field type="checkbox" name="checkboxes" value="dolore" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>

              <Divider />

              <FormField label="Radio">
                <FormCheckRadioGroup>
                  <FormCheckRadio type="radio" label="Lorem">
                    <Field type="radio" name="radio" value="lorem" />
                  </FormCheckRadio>
                  <FormCheckRadio type="radio" label="Ipsum">
                    <Field type="radio" name="radio" value="ipsum" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>

              <Divider />

              <FormField label="Switch">
                <FormCheckRadioGroup>
                  <FormCheckRadio type="switch" label="Lorem">
                    <Field type="checkbox" name="switches" value="lorem" />
                  </FormCheckRadio>
                  <FormCheckRadio type="switch" label="Ipsum">
                    <Field type="checkbox" name="switches" value="ipsum" />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>
            </Form>
          </Formik>
          <Divider />
          <FormField>
            <FormFilePicker label="Upload" color="info" icon={mdiUpload} />
          </FormField>
        </CardBox>
      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
