import axios from 'axios'
import { getConfig } from './UserServices'
import { LocationTypes } from '../types'
import { BASE_URI } from '../config/envConfig'

const baseURL = `${BASE_URI}/locations`

export const getLocation = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`)
    return response.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const getLocations = async () => {
  try {
    const response = await axios.get(`${baseURL}`)
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const postLocation = async (newLocation: LocationTypes) => {
  try {
    const response = await axios.post(`${baseURL}`, newLocation, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
  }
}

export const putLocation = async (locationEdited: LocationTypes) => {
  try {
    const response = await axios.put(
      `${baseURL}/edit`,
      locationEdited,
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const postLocationFiles = async (files: FormData) => {
  try {
    const response = await axios.put(`${baseURL}/files`, files, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const deleteLocationFiles = async (
  fileId: string,
  locationId: string,
) => {
  try {
    const response = await axios.put(
      `${baseURL}/files/delete`,
      { fileId, locationId },
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const destroyLocation = async (LocationId: string) => {
  try {
    const response = await axios.delete(`${baseURL}/${LocationId}`, getConfig())
    return response
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
