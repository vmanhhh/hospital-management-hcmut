import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useSamplePatients } from '../../hooks/sampleData'
import { Patient } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'

const TableSamplePatients = () => {
  const { patients } = useSamplePatients()

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

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
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
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Xóa bệnh nhân"
        buttonColor="danger"
        buttonLabel="Xóa"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
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
            <th>Ngày sinh</th>
            <th>Tỉnh/Thành</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {patientsPaginated.map((patient: Patient) => (
            <tr key={patient._id}>
              <td data-label="Last Name">{patient.lastName}</td>
              <td data-label="First Name">{patient.firstName}</td>
              <td data-label="Gender">{patient.gender}</td>
              <td data-label="Date of Birth">{new Date(patient.dob).toLocaleDateString()}</td>
              <td data-label="Province">{patient.address.province}</td>
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
                    onClick={() => setIsModalTrashActive(true)}
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
