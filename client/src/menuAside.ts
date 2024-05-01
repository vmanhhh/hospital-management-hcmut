import {
  mdiDoctor,
  mdiAccountInjury,
  mdiCellphoneLink,
  mdiPill,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/patients',
    label: 'Bệnh nhân',
    icon: mdiAccountInjury,
  },
  {
    href: '/doctors',
    label: 'Bác sĩ',
    icon: mdiDoctor,
  },
  {
    href: '/equipments',
    label: 'Thiết bị',
    icon: mdiCellphoneLink,
  },
  {
    href: '/medicines',
    label: 'Thuốc',
    icon: mdiPill,
  },
]

export default menuAside
