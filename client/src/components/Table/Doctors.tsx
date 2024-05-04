import { mdiEye, mdiTrashCan, mdiAccount, mdiMail  } from '@mdi/js'
import React, { useState, useEffect } from 'react'
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
import CardBox from '../../components/CardBox'
import Divider from '../../components/Divider'
import SnackbarAlert from '../../components/snackbar'

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
  const [doctors, setPatients] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/doctors`);
      console.log("Fetch");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const doctorsPaginated = doctors.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(doctors.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [doctorTemp, setDoctor] = useState(null)
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    fetchDoctors()
  }
  const handleDeleteModalAction = async () => {
    try {
      await axios.delete(`${SERVER_URI}/doctors/${doctorTemp._id}`)
      fetchDoctors();

      setIsModalTrashActive(false)
      console.log('Deleted')

    } catch (error) {
      console.log(error)
    }
  }


  const handleEditModalAction = async () => {
    try {
      await axios.post(`${SERVER_URI}/doctors/${doctorTemp._id}`, doctorTemp)
      console.log(doctorTemp);
      fetchDoctors();
      setIsSubmitted(true);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isSubmitted && <SnackbarAlert message={alertMessage} severity={alertSeverity} />}
      <CardBoxModal
        title="Thông tin Bác sĩ"
        buttonColor="info"
        buttonLabel="Done"
        style={{ display: 'none' }}
        isActive={isModalInfoActive}
        onConfirm={handleEditModalAction}
        onCancel={handleModalAction}
      >


        <CardBox>
          {doctorTemp && (<Formik
            initialValues={{
              lastName: doctorTemp.lastName,
              firstName: doctorTemp.firstName,
              department: doctorTemp.department,
              role: doctorTemp.role,
              dob: new Date(doctorTemp.dob).toISOString().split('T')[0],
              gender: doctorTemp.gender,
              address: {
                ward: doctorTemp.address.ward,
                district: doctorTemp.address.district,
                province: doctorTemp.address.province,
              },
              contactInfo: {
                phone: doctorTemp.contactInfo.phone,
                email: doctorTemp.contactInfo.email,
              },
              emergencyContact: {
                lastName: doctorTemp.emergencyContact.lastName,
                firstName: doctorTemp.emergencyContact.firstName,
                relationship: doctorTemp.emergencyContact.relationship,
                phone: doctorTemp.emergencyContact.phone,
              }

            }}
            onSubmit={(values) => {

              console.log(JSON.stringify(values, null, 2));

              console.log(doctorTemp)
              axios.post(`${SERVER_URI}/doctors/${doctorTemp._id}`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/doctors/${doctorTemp._id}`)
                  setIsSubmitted(true);
                  fetchDoctors();
                  setAlertMessage("Cập nhật thành công!");
                  setAlertSeverity("success");
                })
                .catch(error => {
                  console.error(error);
                  setIsSubmitted(true);
                  setAlertMessage("Cập nhật thất bại!");
                  setAlertSeverity("error");
                });
            }}
          >

            {({ handleSubmit }) => <Form onSubmit={handleSubmit}>
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
                <LocationSelect initialData={{}}/>
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
          )}
        </CardBox>
      </CardBoxModal >

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
        <p>Chọn &quot;Xác nhận&quot; nếu có</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Họ</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Chức vụ</th>
            <th>Khoa</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {doctorsPaginated.map((doctor: Doctor) => (
            <tr key={doctor._id}>
              <td data-label="Họ">{doctor.lastName}</td>
              <td data-label="Tên">{doctor.firstName}</td>
              <td data-label="Giới tính">{doctor.gender === 'male' ? 'Nam' : (doctor.gender === 'female' ? 'Nữ' : 'Khác')}</td>
              <td data-label="Chức vụ">{doctor.role === 'Doctor' ? 'Bác sĩ' : (doctor.role === 'Nurse' ? 'Y tá' : 'Nhân viên')}</td>
              <td data-label="Khoa">{departmentLabels[doctor.department]}</td>
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
