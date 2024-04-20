import useSWR from 'swr'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {SERVER_URI } from '../config'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useSamplePatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get(`${SERVER_URI}/patients`)
      .then(response => setPatients(response.data))
      .catch(error => console.error(error));
  }, []);

  return { patients };
};


export const useSampleDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`${SERVER_URI}/doctors`)
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);

  return { doctors };
};

export const useSampleEquipments = () => {
  const { data, error } = useSWR('/data-sources/equipments.json', fetcher)

  return {
    equipments: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleMedicines = () => {
  const { data, error } = useSWR('/data-sources/medicines.json', fetcher)

  return {
    medicines: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/data-sources/history.json', fetcher)

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

/*
import { useEffect, useState } from 'react'
import axios from 'axios'

export const useSampleClients = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    axios.get('https://api.example.com/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error(error))
  }, [])

  return { clients }
}

*/
