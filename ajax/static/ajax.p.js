function ajaxPromise() {
  var url = '/json?name=cjs',
      type = 'get',
      defered = {},
      xhr = new XMLHttpRequest()

  
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.response)
        defered.resolve(xhr.response)
      } else {
        defered.reject()
      }
    }
  }
  xhr.responseType = 'json'
  xhr.open('get', url, true)
  xhr.send(null)
  

    

  return new Promise(function (resolve, reject) {
    defered.resolve = resolve
    defered.reject = reject
  })
}