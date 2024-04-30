import { mdiAlertCircle, mdiCheckCircle, mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import { Medicine } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import FormField from '../Form/Field'
import { SERVER_URI } from '../../config'
import { mdiAccount, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import CardBox from '../CardBox'
import Divider from '../Divider'
import SnackbarAlert from '../snackbar'

const TableSampleMedicine = () => {
  const [medicines, setMedicines] = useState([]);

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/medicines`);
      console.log("Fetch");
      setMedicines(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMedicine();
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

  const medicinesPaginated = medicines.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(medicines.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [MedTemp, setMedicine] = useState(null)
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    fetchMedicine()
  }
  const handleDeleteModalAction = async () => {
    try {
      await axios.delete(`${SERVER_URI}/medicines/${MedTemp._id}`)
      fetchMedicine();

      setIsModalTrashActive(false)
      console.log('Deleted')

    } catch (error) {
      console.log(error)
    }
  }


  const handleEditModalAction = async () => {
    try {
      await axios.post(`${SERVER_URI}/medicines/${MedTemp._id}`, MedTemp)
      console.log(MedTemp);
      fetchMedicine();
      setIsSubmitted(true);
    } catch (error) {
      console.log(error)
      addNotification('Cập nhật thuốc thất bại!', 'error');
    }
  }

  return (
    <>
      <CardBoxModal
        title="Thông tin thuốc"
        buttonColor="info"
        buttonLabel="Done"
        style={{ display: 'none' }}
        isActive={isModalInfoActive}
        onConfirm={handleEditModalAction}
        onCancel={handleModalAction}
      >


        <CardBox>
          {MedTemp && (<Formik
            initialValues={{
              name: MedTemp.name,
              brandName: MedTemp.brandName,
              description: MedTemp.description,
              dosage: MedTemp.dosage,
              unit: MedTemp.unit,
              dosageForm: MedTemp.dosageForm,
              stock: MedTemp.stock,
              dateImported: new Date(MedTemp.dateImported).toISOString().split('T')[0],
              expirationDate: new Date(MedTemp.expirationDate).toISOString().split('T')[0],

            }}
            onSubmit={(values) => {

              console.log(JSON.stringify(values, null, 2));

              console.log(MedTemp)
              axios.patch(`${SERVER_URI}/medicines/${MedTemp._id}`, values)
                .then(response => {
                  console.log(response);
                  console.log(`${SERVER_URI}/medicines/${MedTemp._id}`)
                  setIsSubmitted(true);
                  fetchMedicine();
                  setAlertMessage("Cập nhật thành công!");
                  setAlertSeverity("success");
                  setTimeout(() => {
                    setIsSubmitted(false);
                  }, 3000);
                })
                .catch(error => {
                  console.error(error);
                  setIsSubmitted(true);
                  setAlertMessage("Cập nhật thất bại!");
                  setAlertSeverity("error");
                  setTimeout(() => {
                    setIsSubmitted(false);
                  }, 3000);
                });
            }}
          >

            {({ handleSubmit }) => <Form onSubmit={handleSubmit}>
            <FormField label="Tên thuốc" icons={[mdiAccount, mdiMail]}>
              <Field name="name" placeholder="Tên thuốc" />
            </FormField>
            <FormField label="Thương hiệu" labelFor="brandName">
              <Field name="brandName" placeholder="Thương hiệu" />
            </FormField>
            <FormField label="Mô tả" labelFor="description">
              <Field name="description" placeholder="Mô tả" />
            </FormField>
            <FormField label="Liều lượng" labelFor="dosage">
              <Field name="dosage" placeholder="Liều lượng" />
            </FormField>
            <FormField label="Đơn vị" labelFor="unit">
              <Field name="unit" placeholder="Liều lượng" />
            </FormField>
            <FormField label="Dạng bào chế" labelFor="dosageForm">
              <Field name="dosageForm" placeholder="Dạng bào chế" />
            </FormField>
            <FormField label="Trữ lượng" labelFor="stock">
              <Field name="stock" placeholder="Trữ lượng" />
            </FormField>
            <FormField label="Ngày nhập" labelFor="dateImported">
              <Field name="dateImported" type="date" />
            </FormField>
            <FormField label="Ngày hết hạn" labelFor="expirationDate">
              <Field name="expirationDate" type="date" />
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
        title="Xóa thuốc"
        buttonColor="danger"
        buttonLabel="Xóa"
        style={{}}
        isActive={isModalTrashActive}
        onConfirm={handleDeleteModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Bạn có muốn xóa thuốc này không?
        </p>
        <p>Chọn "Xác nhận" nếu có</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Tên thuốc</th>
            <th>Liều lượng</th>
            <th>Đơn vị</th>
            <th>Dạng bào chế</th>
            <th>Trữ lượng</th>
            <th>Ngày hết hạn</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {medicinesPaginated.map((medicines:  Medicine) => (
            <tr key={medicines._id}>
              <td data-label="name">{medicines.name}</td>
              <td data-label="dosage">{medicines.dosage}</td>
              <td data-label="unit">{medicines.unit}</td>
              <td data-label="dosageForm">{medicines.dosageForm}</td>
              <td data-label="stock">{medicines.stock}</td>
              <td data-label="expirationDate">{new Date(medicines.expirationDate).toISOString().split('T')[0]}</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => {
                      setMedicine(medicines)
                      setIsModalInfoActive(true)
                    }}
                    small
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setMedicine(medicines)
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
      {isSubmitted && <SnackbarAlert message={alertMessage} severity={alertSeverity} />}
    </>

  )
}

export default TableSampleMedicine
