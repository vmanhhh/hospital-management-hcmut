import React from 'react'
import BkLogo from './logo.svg'

type Props = {
  className?: string
}

export default function BkHospitalLogo({ className = '' }: Props) {
  return (
    <img src={BkLogo} alt="BK Hospital Management System" className={className} />
  )
}
