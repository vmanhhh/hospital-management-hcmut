import { mdiAlertCircle, mdiCheckCircle, mdiEye, mdiTrashCan } from '@mdi/js'
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react'
import { useSampleDoctors } from '../../hooks/sampleData'
import { Doctor } from '../../interfaces'
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
const departmentLabels = {
  'Neural': 'Thần kinh',
  'Cardiology': 'Tim mạch',
  'Orthopedic': 'Chấn thương chỉnh hình',
  'Oncology': 'Ung thư',
  'Gynecology': 'Phụ khoa',
  'Pediatric': 'Nhi',
  'Psychiatry': 'Tâm thần',
  'Dermatology': 'Da liễu',
  'Ophthalmology': 'Mắt',
  'ENT': 'Tai mũi họng',
  'Dental': 'Nha khoa',
};
const TableSampleDoctors = () => {
  const { doctors } = useSampleDoctors()

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

  const doctorsPaginated = doctors.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = doctors.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [doctorTemp, setDoctor] = useState(null)
  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }
  const handleDeleteModalAction = async () => {
    try {
      await axios.delete(`${SERVER_URI}/doctors/${doctorTemp._id}`)
      window.location.reload()
      console.log('Deleted')
    } catch (error) {
      console.log(error)
    }
  }


  const handleEditModalAction = async () => {
    try {
      await axios.post(`${SERVER_URI}/doctors/${doctorTemp._id}`, doctorTemp)
      console.log(doctorTemp)
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
            initialValues={doctorTemp || {
              lastName: '',
              firstName: '',
              department: '',
              dob: '1990-01-01',
              gender: '',
              address: '',
              phone: '',
              email: '',
              emergencyLastName: '',
              emergencyFirstName: '',
              relationship: '',
              emergencyPhone: '',
            }}
            
            onSubmit={(values) => {
          
              console.log(JSON.stringify(values, null, 2));
              axios.post(`${SERVER_URI}/doctors/${doctorTemp._id}`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/doctors/${doctorTemp._id}`)
                  setIsSubmitted(true);
                  addNotification('Cập nhật bác sĩ thành công!');
                })
                .catch(error => {
                  console.error(error);
                  addNotification('Cập nhật bác sĩ thất bại!', 'error');
                });
            }}
          >
            {({ handleSubmit })=><Form onSubmit={handleSubmit}>
              <FormField label="Họ và tên" icons={[mdiAccount, mdiMail]}>
                <Field name="lastName" placeholder="Họ" />
                <Field name="firstName" placeholder="Tên" />
              </FormField>
              <FormField>
                <FormField label="Chức vụ" labelFor="role">
                  <Field name="role" id="role" component="select">
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
              <Button type="submit" active={false} color="info" label="Cập nhật" />
            </Form>
}
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
            <th>Chức vụ</th>
            <th>Khoa</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {doctorsPaginated.map((doctor: Doctor) => (
            <tr key={doctor._id}>
              <td data-label="Last Name">{doctor.lastName}</td>
              <td data-label="First Name">{doctor.firstName}</td>
              <td data-label="Gender">{doctor.gender === 'male' ? 'Nam' : (doctor.gender === 'female' ? 'Nữ' : 'Khác')}</td>
              <td data-label="Role">{doctor.role === 'Doctor' ? 'Bác sĩ' : (doctor.role === 'Nurse' ? 'Y tá' : 'Nhân viên')}</td>
              <td data-label="Department">{departmentLabels[doctor.department]}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => {
                      setDoctor(doctor)
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setDoctor(doctor)
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

export default TableSampleDoctors
