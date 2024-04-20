import { mdiAlertCircle, mdiCheckCircle, mdiEye, mdiTrashCan } from '@mdi/js'
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react'
import { useSamplePatients } from '../../hooks/sampleData'
import { Patient } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import FormField from '../Form/Field'
import DepartmentSelect from '../Form/DepartmentSelect'
import LocationSelect from '../Form/LocationSelect'
import { SERVER_URI } from '../../config'
import { mdiAccount, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import CardBox from '../../components/CardBox'
import Divider from '../../components/Divider'
import NotificationBar from '../../components/NotificationBar'
import { useFormikContext } from 'formik'
const TableSamplePatients = () => {
  const { patients } = useSamplePatients()

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notifications, setNotifications] = useState([]);
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
  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const patientsPaginated = patients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = patients.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [patientTemp, setPatient] = useState(null)
  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }
  const handleDeleteModalAction = async () => {
    try {
      await axios.delete(`${SERVER_URI}/patients/${patientTemp._id}`)
      window.location.reload()
      console.log('Deleted')
    } catch (error) {
      console.log(error)
    }
  }


  const handleEditModalAction = async () => {
    try {
      await axios.post(`${SERVER_URI}/patients/${patientTemp._id}`, patientTemp)
      console.log(patientTemp)
      setIsSubmitted(true);
      addNotification('Cập nhật bác sĩ thành công!');
    } catch (error) {
      console.log(error)
      addNotification('Cập nhật bác sĩ thất bại!', 'error');
    }
  }

  return (
    <>
      <CardBoxModal
        title="Thông tin Bác sĩ"
        buttonColor="info"
        buttonLabel="Done"
        style={{ display: 'none' }}
        isActive={isModalInfoActive}
        onConfirm={handleEditModalAction}
        onCancel={handleModalAction}
      >
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
        <CardBox>
        <Formik
            initialValues={patientTemp || {
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
      </CardBoxModal>

      <CardBoxModal
        title="Xóa bác sĩ"
        buttonColor="danger"
        buttonLabel="Xóa"
        style={{}}
        isActive={isModalTrashActive}
        onConfirm={handleDeleteModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Bạn có muốn xóa bác sĩ này không?
        </p>
        <p>Chọn "Xác nhận" nếu có</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Họ</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Tỉnh/thành</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {patientsPaginated.map((patient: Patient) => (
            <tr key={patient._id}>
              <td data-label="Last Name">{patient.lastName}</td>
              <td data-label="First Name">{patient.firstName}</td>
              <td data-label="Gender">{patient.gender === 'male' ? 'Nam' : (patient.gender === 'female' ? 'Nữ' : 'Khác')}</td>
              <td data-label="Date of Birth">{new Date(patient.dob).toLocaleDateString()}</td>
              <td data-label="Province">{patient.address.province}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => {
                      setPatient(patient)
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setPatient(patient)
                      setIsModalTrashActive(true)
                    }}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSamplePatients
