import { mdiAccount, mdiBallotOutline, mdiMail } from '@mdi/js'
import { Field, FieldArray, Form, Formik } from 'formik'
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
import ComboBox from '../../components/Form/DoctorSelector'
import ComboBoxMed from '../../components/Form/MedicineSelector'

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
        <title>{getPageTitle('Điều trị')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title={`Phác đồ điều trị bệnh nhân ${data.firstName}`} main>
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              patientId: id,
              doctorId: "",
              lastName: data.lastName,
              firstName: data.firstName,
              date: getCurrentDateTime(),
              symptoms: "",
              diagnosis: "",
              medicine: [],
              description: "",
            }}
            onSubmit={(values) => {
              console.log(JSON.stringify(values, null, 2));
              axios.post(`${SERVER_URI}/treatments`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/treatments`)
                  setIsSubmitted(true);
                  setAlertMessage("Thêm thành công!");
                  setAlertSeverity("success");
                  setTimeout(() => {
                    setIsSubmitted(false);
                  }, 3000);

                  // Substract quantity of medicine from stock
                  values.medicine.forEach(med => {
                    axios.patch(`${SERVER_URI}/medicines/${med.medicineId}`, { stock: -med.quantity })
                      .then(response => {
                        console.log(response);
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  });

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
            {({ values }) => (
              <Form>
                <FormField label="Họ và tên bệnh nhân" icons={[mdiAccount, mdiMail]}>
                  <Field name="lastName" placeholder="Họ" disabled />
                  <Field name="firstName" placeholder="Tên" disabled />
                </FormField>

                <FormField label="Ngày kiểm tra" labelFor="date">
                  <Field name="date" id="date" type="datetime-local" required/>
                </FormField>
                <FormField label="Triệu chứng" labelFor="symptoms">
                  <Field name="symptoms" id="symptoms" required/>
                </FormField>
                <FormField label="Chẩn đoán" labelFor="diagnosis">
                  <Field name="diagnosis" id="diagnosis" required/>
                </FormField>
                <FormField label="Bác sĩ chẩn đoán" labelFor="doctor">
                  <ComboBox />
                </FormField>
                <FormField label="Thuốc" labelFor="medicine">
                  <FieldArray name="medicine">
                    {({ remove, push }) => (
                      <div>
                        {values.medicine.length > 0 &&
                          values.medicine.map((_medicine, index) => (
                            <div className="row" key={index}>
                              <FormField label={`Thuốc ${index + 1}`}>
                                <FormField label={`Tên thuốc`}>
                                  <ComboBoxMed index={index} />
                                </FormField>
                                <FormField label={`Số lượng`}>
                                  <Field
                                    name={`medicine.${index}.quantity`}
                                  />
                                </FormField>
                              </FormField>
                              <Button
                                label="Xóa thuốc"
                                onClick={() => remove(index)}
                              />
                            </div>
                          ))}
                        <Button
                          label="Thêm thuốc"
                          onClick={() => push({ medicineId: '', quantity: '' })}
                        />
                      </div>
                    )}
                  </FieldArray>
                </FormField>
                <FormField label="Mô tả" labelFor="description">
                  <Field name="description" id="description" />
                </FormField>
                <Divider />

                <Buttons>
                  <Button type="submit" color="info" label="Submit" />
                  <Button type="reset" color="info" outline label="Reset" />
                </Buttons>
              </Form>)}
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
