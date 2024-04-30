import { mdiPlusBox, mdiMonitorCellphone, mdiCellphoneLink, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBox/Component/Empty'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableEquipments from '../components/Table/Equipment'
import { getPageTitle } from '../config'

const TablesPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Danh sách Thiết bị')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiCellphoneLink} title="Danh sách Thiết bị" main>
        <Button
            color="info"
            label="Thêm Thiết bị"
            icon={mdiPlusBox}
            roundedFull
            href="/forms/equipments"
          />
        </SectionTitleLineWithButton>


        <CardBox className="mb-6" hasTable>
          <TableEquipments />
        </CardBox>

      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
