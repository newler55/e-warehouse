import axios from 'axios'
import authHeader from './Auth_header'

var auth = authHeader()
let axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api', // Dev
  timeout: 12000,
  crossdomain: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Content-type": "application/json",
    "crossdomain": "true",
    ...auth
  }
})

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

class HttpRequest {
  constructor () {
    this.axios = axios
    this.http = axiosInstance
  }

  // setHeader (header) {
  //   axiosInstance.defaults.headers.common[header.key] = header.value
  //   axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  // }

  fetch (methodName, data) {
    return axiosInstance.get(methodName, {
      params: data
    })
  }

  create (methodName, data) {
    return axiosInstance.post(methodName, data)
  }

  update (methodName, data) {
    return axiosInstance.put(methodName, data)
  }

  delete (methodName, id) {
    return axiosInstance.delete(methodName, { params: {id: id} })
  }

  request (type, url, data) {
    let promise = null
    switch (type) {
      case 'GET': promise = axios.get(url, { params: data }); break
      case 'POST': promise = axios.post(url, data); break
      case 'PUT': promise = axios.put(url, data); break
      case 'DELETE': promise = axios.delete(url, data); break
      default : promise = axios.get(url, { params: data }); break
    }
    return promise
  }
}

export default HttpRequest
