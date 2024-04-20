import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiVuejs,
  mdiDoctor,
  mdiAccountInjury,
  mdiCellphoneLink,
  mdiPill,
  mdiStethoscope,
  mdiPulse,
  mdiInformation,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    label: 'Bệnh nhân',
    icon: mdiAccountInjury,
    menu: [
      {
        href: '/patients',
        label: 'Danh sách',
        icon: mdiInformation,
      },
      {
        href: '/progresstracking',
        label: 'Theo dõi',
        icon: mdiPulse,
      },
      {
        href: '/treatments',
        label: 'Điều trị',
        icon: mdiStethoscope,
      }
    ],
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
