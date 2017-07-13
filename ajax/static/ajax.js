function ajax (opts) {
  var url = opts.url || '',
      type = opts.type || 'get',
      data = opts.data || {},
      dataType = opts.dataType || 'text',
      async = opts.async || true,
      success = opts.success || function () {},
      error = opts.error || function () {},
      timeout = opts.timeout || 1000,
      defered = {},
      xhr

  if (typeof XMLHttpRequest !== 'undefined') {
    xhr = new XMLHttpRequest() 
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var status = xhr.status
      if ((status >= 200 && status < 300) || status === 304) {
        success(xhr.response)
        defered.resolve(xhr.response)
      } else {
        error()
        defered.reject()
      }
    }
  }

  var dataStr = dataHandler(data)
  xhr.timeout = timeout
  xhr.responseType = dataType

  if (type.toLowerCase() === 'post') {
    xhr.open('post', url, async)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(dataStr)
  } else {
    url = urlHander(url, dataStr)
    xhr.open('get', url, async)
    xhr.send(null)
  }

  return new Promise(function (resolve, reject) {
    console.log(defered)
    defered.resolve = resolve
    defered.reject = reject 
  })
  
}

function dataHandler (data) {
  var params = []
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    }
  }
  return params.join('&')
}

function urlHander (url, dataStr) {
  if (url.indexOf('?') > -1) {
    url = url + '&' + dataStr
  } else {
    url = url + '?' + dataStr
  }
  return url
}