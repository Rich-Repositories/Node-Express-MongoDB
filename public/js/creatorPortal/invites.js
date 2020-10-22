var searchField = document.getElementById("search")
var searchButton = document.getElementById("searchButton")

var params = new URLSearchParams(window.location.search)
var searchParam = params.get('search')

var isChangedSearch = false

if (searchParam !== null) {
  searchField.focus()
}

function getUrl() {
  var url = '/creator/invites?'

  var search = params.get('search')

  if (search) {
    url = `${url}search=${search}`
  }

  return url
}

searchField.value = searchParam || ''

searchButton.onclick = function () {
  if (searchField.value !== '') {
    params.set('search', searchField.value)
    isChangedSearch = true
  }
  if (searchField.value == '' && searchParam !== null) {
    params.delete('search')
    isChangedSearch = true
  }

  if (isChangedSearch) window.location.href = getUrl()
}

searchField.onsearch = function (){
  if (searchField.value == '' && searchParam !== null) {
    params.delete('search')
    isChangedSearch = true
  }

  if (isChangedSearch) window.location.href = getUrl()
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    if (searchField.value !== '') {
      params.set('search', searchField.value)
      isChangedSearch = true
    }
    if (searchField.value == '' && searchParam !== null) {
      params.delete('search')
      isChangedSearch = true
    }

    if (isChangedSearch) window.location.href = getUrl()
  }
});