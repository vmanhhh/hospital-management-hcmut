import { mdiAlertCircle, mdiCheckCircle, mdiEye, mdiTrashCan } from '@mdi/js'
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react'
import { useSampleEquipments } from '../../hooks/sampleData'
import { Equipment } from '../../interfaces'
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

const TableSampleEquipments = () => {
  const { equipments } = useSampleEquipments()

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

  const numPages = equipments.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [equipmentTemp, setEquipment] = useState(null)
  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }
  const handleDeleteModalAction = async () => {
    try {
      await axios.delete(`${SERVER_URI}/equipments/${equipmentTemp._id}`)
      window.location.reload()
      console.log('Deleted')
    } catch (error) {
      console.log(error)
    }
  }


  const handleEditModalAction = async () => {
    try {
      await axios.post(`${SERVER_URI}/equipments/${equipmentTemp._id}`, equipmentTemp)
      console.log(equipmentTemp)
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
            initialValues={equipmentTemp}

            onSubmit={(values) => {

              console.log(JSON.stringify(values, null, 2));
              axios.post(`${SERVER_URI}/equipments/${equipmentTemp._id}`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/equipments/${equipmentTemp._id}`)
                  setIsSubmitted(true);
                  addNotification('Cập nhật bác sĩ thành công!');
                })
                .catch(error => {
                  console.error(error);
                  addNotification('Cập nhật bác sĩ thất bại!', 'error');
                });
            }}
          >
            {({ handleSubmit }) => <Form onSubmit={handleSubmit}>
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
            <th>Tên thiết bị</th>
            <th>Hãng sản xuất</th>
            <th>Model</th>
            <th>Số Serial</th>
            <th>Thuộc khoa</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {equipmentsPaginated.map((equipment: Equipment) => (
            <tr key={equipment._id}>
              <td data-label="Equipment name">{equipment.name}</td>
              <td data-label="Manufacturer">{equipment.manufacturer}</td>
              <td data-label="Model">{equipment.model}</td>
              <td data-label="Serial number">{equipment.serialNumber}</td>
              <td data-label="Department">{equipment.department}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => {
                      setEquipment(equipment)
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setEquipment(equipment)
                      setIsModalTrashActive(true)
                    }}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table >
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

export default TableSampleEquipments
