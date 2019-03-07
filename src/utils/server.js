import axios from 'axios'
import qs from 'query-string'

let Http=axios.create({
  baseURL: 'http://localhost:3006/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    return qs.stringify(data)
  }]
})


export default Http;