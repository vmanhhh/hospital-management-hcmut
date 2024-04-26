import { mdiAlertCircle, mdiCheckCircle, mdiEye, mdiTrashCan } from '@mdi/js'
import Snackbar from '@mui/material/Snackbar';
import React, { useState, useEffect } from 'react'
import { useSampleEquipments } from '../../hooks/sampleData'
import {  Equipment } from '../../interfaces'
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
const TableSampleEquipment = () => {
  const [equipments, setPatients] = useState([]);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/equipments`);
      console.log("Fetch");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

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

  const equipmentsPaginated = equipments.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(equipments.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [EquipTemp, setDoctor] = useState(null)
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    fetchEquipment()
  }
  const handleDeleteModalAction = async () => {
    try {
      await axios.delete(`${SERVER_URI}/equipments/${EquipTemp._id}`)
      fetchEquipment();

      setIsModalTrashActive(false)
      console.log('Deleted')

    } catch (error) {
      console.log(error)
    }
  }


  const handleEditModalAction = async () => {
    try {
      await axios.post(`${SERVER_URI}/equipments/${EquipTemp._id}`, EquipTemp)
      console.log(EquipTemp);
      fetchEquipment();
      setIsSubmitted(true);
    } catch (error) {
      console.log(error)
      addNotification('Cập nhật thiết bị thất bại!', 'error');
    }
  }

  return (
    <>
      {isSubmitted && <SnackbarAlert message={alertMessage} severity={alertSeverity} />}
      <CardBoxModal
        title="Thông tin thiết bị"
        buttonColor="info"
        buttonLabel="Done"
        style={{ display: 'none' }}
        isActive={isModalInfoActive}
        onConfirm={handleEditModalAction}
        onCancel={handleModalAction}
      >


        <CardBox>
          {EquipTemp && (<Formik
            initialValues={{
              name: EquipTemp.name,
              model: EquipTemp.model,
              manufacturer: EquipTemp.manufacturer,
              serialNumber: EquipTemp.serialNumber,
              department: EquipTemp.department,
              availability: {
                type: EquipTemp.availability,
              },
              maintenanceHistory: {
                date: new Date(EquipTemp.date).toISOString().split('T')[0],
                description: EquipTemp.description,
                technician: EquipTemp.technician,
              },

            }}
            onSubmit={(values) => {

              console.log(JSON.stringify(values, null, 2));

              console.log(EquipTemp)
              axios.post(`${SERVER_URI}/equipments/${EquipTemp._id}`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/equipments/${EquipTemp._id}`)
                  setIsSubmitted(true);
                  fetchEquipment();
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
            <FormField label="Tên thiết bị" icons={[mdiAccount, mdiMail]}>
                <Field name="deviceName" placeholder="Tên thiết bị" />
              </FormField>
              <FormField>
                <FormField label="Thương hiệu" labelFor="manufacturer">
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

              <Divider />
              <Button type="submit" active={false} color="info" label="Cập nhật" />
            </Form>
            }

          </Formik>
          )}
        </CardBox>
      </CardBoxModal >

      <CardBoxModal
        title="Xóa thiết bị"
        buttonColor="danger"
        buttonLabel="Xóa"
        style={{}}
        isActive={isModalTrashActive}
        onConfirm={handleDeleteModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Bạn có muốn xóa thiết bị này không?
        </p>
        <p>Chọn "Xác nhận" nếu có</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Tên thiết bị</th>
            <th>Model</th>
            <th>Hãng sản xuất</th>
            <th>Khoa</th>
            <th>Trạng thái</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {equipmentsPaginated.map((equipments:  Equipment) => (
            <tr key={equipments._id}>
              <td data-label="name">{equipments.name}</td>
              <td data-label="model">{equipments.model}</td>
              <td data-label="manufacturer">{equipments.manufacturer}</td>
              <td data-label="department">{departmentLabels[equipments.department]}</td>
              <td data-label="availability">{equipments.availability}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => {
                      setDoctor(equipments)
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setDoctor(equipments)
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

export default TableSampleEquipment
