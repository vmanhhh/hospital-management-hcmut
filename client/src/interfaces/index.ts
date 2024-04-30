export type UserPayloadObject = {
  name: string
  email: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Patient = {
  _id: string,
  lastName: string,
  firstName: string,
  dob: Date,
  gender: string,
  username: string,
  password: string,
  address: {
    province: string,
    district: string,
    ward: string
  },
  contactInfo: {
    phone: string,
    email: string
  },
  emergencyContact: {
    lastName: string,
    firstName: string,
    relationship: string,
    phone: string
  }


}

export type Doctor = {
  _id: string,
  lastName: string,
  firstName: string,
  role: string,
  department: string,
  dob: Date,
  gender: string,
  username: string,
  password: string,
  address: {
    province: string,
    district: string,
    ward: string
  },
  contactInfo: {
    phone: string,
    email: string
  },
  emergencyContact: {
    lastName: string,
    firstName: string,
    relationship: string,
    phone: string
  }
}

export type Equipment = {
  _id: string,
  name: string,
  model: string,
  manufacturer: string,
  serialNumber: string,
  department: string,
  availability: string,
  maintenanceHistory: {
    date: Date,
    description: string,
    technician: string
  }[]
}

export type Medicine = {
  _id: string,
  name: string,
  brandName: string,
  description: string,
  dosage: string,
  unit: string,
  dosageForm: string,
  stock: number,
  dateImported: Date,
  expirationDate: Date
}

export type Client = {
  lastName: string
  id: string
  gender: string
  avatar: string
  login: string
  name: string
  company: string
  province: string
  progress: number
  created: string
  created_mm_dd_yyyy: string
}

export type UserForm = {
  name: string
  email: string
}
