var filter = document.getElementById("campaignsFilter")
var searchField = document.getElementById("search")
var searchButton = document.getElementById("searchButton")

var params = new URLSearchParams(window.location.search)
var filterParam = params.get('filter')
var searchParam = params.get('search')

var isChangedSearch = false

if (searchParam !== null) {
  searchField.focus()
}

function getUrl() {
  var url = '/creator/campaigns?'

  var filter = params.get('filter')
  var search = params.get('search')

  if (filter) {
    url = `${url}filter=${filter}&`
  }
  if (search) {
    url = `${url}search=${search}&`
  }

  return url
}

filter.onchange = function () {
  if (this.value !== 'all') {
    params.set('filter', this.value)
    isChangedSearch = true
  }
  else {
    params.delete('filter')
    isChangedSearch = true
  }

  if (isChangedSearch) window.location.href = getUrl()
};

filter.value = filterParam || 'all'
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
