import {
  mdiAccountCircle,
  mdiLock,
  mdiAlertCircle,
  mdiTelevisionGuide,
  mdiPalette,
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
  {
    href: '/ui',
    label: 'UI',
    icon: mdiTelevisionGuide,
  },
  {
    href: '/',
    label: 'Styles',
    icon: mdiPalette,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: '/login',
    label: 'Login',
    icon: mdiLock,
  },
  {
    href: '/error',
    label: 'Error',
    icon: mdiAlertCircle,
  },
]

export default menuAside
