import { mdiGithub, mdiDoctor, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import TableDoctors from '../../components/Table/Doctors'
import { getPageTitle } from '../../config'
import { mdiPlusBox } from '@mdi/js'
const TablesPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Danh sách Bác sĩ')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiDoctor} title="Danh sách Bác sĩ" main>
        <Button
            color="info"
            label="Thêm Bác sĩ"
            icon={mdiPlusBox}
            roundedFull
            href="/forms/doctor"
          />
        </SectionTitleLineWithButton>


        <CardBox className="mb-6" hasTable>
          <TableDoctors />
        </CardBox>

      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
