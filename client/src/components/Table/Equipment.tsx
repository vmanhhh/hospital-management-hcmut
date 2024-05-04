import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import {  Equipment } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import FormField from '../Form/Field'
import DepartmentSelect from '../Form/DepartmentSelect'
import { SERVER_URI } from '../../config'
import { mdiAccount, mdiMail } from '@mdi/js'
import CardBox from '../../components/CardBox'
import Divider from '../../components/Divider'
import SnackbarAlert from '../../components/snackbar'
import moment from 'moment'

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

function formatDateTime(dateTime: string) {
  return moment(dateTime)?.format('YYYY-MM-DD')
} 

const TableEquipments = () => {
  const [equipments, setEquipments] = useState([]);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/equipments`);
      setEquipments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const equipmentsPaginated = equipments.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(equipments.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [EquipTemp, setEquipment] = useState(null)
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
      setIsModalInfoActive(false);
      setIsModalTrashActive(false);
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
              availability: EquipTemp?.availability,
              dateMaintenance: EquipTemp?.maintenanceHistory?.date ? formatDateTime(EquipTemp?.maintenanceHistory?.date) : null,
              description: EquipTemp?.maintenanceHistory?.description,
              maintenanceBy: EquipTemp?.maintenanceHistory?.technician
            }}
            onSubmit={(values) => {
              const body = {
                maintenanceHistory: {
                  date: values?.dateMaintenance,
                  description: values?.description,
                  technician: values?.maintenanceBy
                },
                name: values?.name,
                model: values?.model,
                manufacturer: values?.manufacturer,
                serialNumber: values?.serialNumber,
                department: values?.department,
                availability: values?.availability,
              }
              return axios.post(`${SERVER_URI}/equipments/${EquipTemp._id}`, body)
                .then(() => {
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
                <Field name="name" placeholder="Tên thiết bị" />
              </FormField>
              <FormField>
                <FormField label="Thương hiệu" labelFor="manufacturer">
                  <Field name="manufacturer" placeholder="Hãng sản xuất" id="manufacturer" />
                </FormField>
                <FormField label="Model" labelFor="model">
                  <Field name="model" placeholder="Model" />
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
        <p>Chọn &quot;Xác nhận&quot; nếu có</p>
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
              <td data-label="Tên thiết bị">{equipments.name}</td>
              <td data-label="Model">{equipments.model}</td>
              <td data-label="Hãng sản xuất">{equipments.manufacturer}</td>
              <td data-label="Khoa">{departmentLabels[equipments.department]}</td>
              <td data-label="Trạng thái">{equipments.availability}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => {
                      console.log('equipments 11111 >>> ', equipments);
                      setEquipment(equipments)
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setEquipment(equipments)
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

export default TableEquipments
