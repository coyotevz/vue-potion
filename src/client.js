/**
 * XMLHttp client, based on vue-resource/http/client/xhr
 */

import { each, trim } from '../util'

/* global XMLHttpRequest */
export default function(request) {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest()

    let handler = (event) => {
      let response = request.respondWith(
        'response' in xhr ? xhr.response : xhr.responseText, {
          status: xhr.status === 1223 ? 204 : xhr.status,
          statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
        }
      )
      each(trim(xhr.getAllResponseHeaders()).split('\n'), (row) => {
        response.headers.append(row.slice(0, row.indexOf(':')),
                                row.slice(row.indexOf(':') + 1))
      })

      resolve(response)
    }

    request.abort = () => xhr.abort()

    if (request.progress) {
      if (request.method === 'GET') {
        xhr.addEventListener('progress', request.progress)
      } else if (/^(POST|PUT)$/i.test(request.method)) {
        xhr.upload.addEventListener('progress', request.progress)
      }
    }

    xhr.open(request.method, request.getUrl(), true)

    if ('responseType' in xhr) {
      xhr.responseType = 'blob'
    }

    if (request.credentials === true) {
      xhr.withCredentials = true
    }

    request.headers.forEach((value, name) => {
      xhr.setRequestHeader(name, value)
    })

    xhr.timeout = 0
    xhr.onload = handler
    xhr.onerror = handler
    xhr.send(request.getBody())
  })
}
