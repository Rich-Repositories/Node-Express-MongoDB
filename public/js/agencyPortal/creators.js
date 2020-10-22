var searchField = document.getElementById("search")
var searchButton = document.getElementById("searchButton")

var params = new URLSearchParams(window.location.search)
var searchParam = params.get('search')

if(searchParam !== null){
  searchField.focus()
}

searchField.value = searchParam || ''

function getUrl() {
  var url = '/agency/creators?'

  var search = params.get('search')

  if(search){
    url = `${url}search=${search}&`
  }

  return url
}

searchButton.onclick = function () {
  if(searchField.value !== ''){
    params.set('search', searchField.value)
  }
  if(searchField.value == ''){
    params.delete('search')
  }

  window.location.href = getUrl()
}