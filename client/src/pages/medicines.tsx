import { mdiPlusBox, mdiPill } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableMedicines from '../components/Table/Medicine'
import { getPageTitle } from '../config'

const TablesPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Danh sách Thuốc')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiPill} title="Danh sách Thuốc" main>
        <Button
            color="info"
            label="Thêm Thuốc"
            icon={mdiPlusBox}
            roundedFull
            href="/forms/medicines"
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableMedicines />
        </CardBox>

      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
