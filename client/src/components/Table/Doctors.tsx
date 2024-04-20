import { mdiEye, mdiTrashCan } from '@mdi/js'
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
import {SERVER_URI} from '../../config'
import { mdiAccount, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import CardBox from '../../components/CardBox'
import Divider from '../../components/Divider'

const TableSampleDoctors = () => {
  const { doctors } = useSampleDoctors()

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
  const handleInfoModalAction = async () => {
    try {
      await axios.get(`/doctors/${doctorTemp._id}`)
      console.log('Info')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <CardBoxModal
        title="Thông tin bệnh nhân"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <CardBox>
          <Formik
            initialValues={{
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
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          >
            <Form>
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

              <FormField label="Textarea" hasTextareaHeight>
                <Field name="textarea" as="textarea" placeholder="Your text here" />
              </FormField>

            </Form>
          </Formik>
        </CardBox>
      </CardBoxModal>

      <CardBoxModal
        title="Xóa bệnh nhân"
        buttonColor="danger"
        buttonLabel="Xóa"
        isActive={isModalTrashActive}
        onConfirm={handleDeleteModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Bạn có muốn xóa bệnh nhân này không?
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
              <td data-label="Gender">{doctor.gender}</td>
              <td data-label="Role">{doctor.role}</td>
              <td data-label="Department">{doctor.department}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
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
