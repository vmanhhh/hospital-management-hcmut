import { mdiAccountInjury } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TablePatients from '../components/Table/Patients'
import { getPageTitle } from '../config'
const TablesPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Danh sách bệnh nhân')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccountInjury} title="Danh sách bệnh nhân" main>
        <Button
            color="info"
            label="Thêm bệnh nhân"
            icon={mdiAccountInjury}
            roundedFull
            href="/forms/patient"
          />
        </SectionTitleLineWithButton>


        <CardBox className="mb-6" hasTable>
          <TablePatients />
        </CardBox>

      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
