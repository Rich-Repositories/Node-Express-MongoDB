var awaitingGetLink = false

function getLinkClicked() {
  if (awaitingGetLink == true) {
    return
  }
  awaitingGetLink = true
  $("#getLinkButtonText").css({
    display: "none"
  })
  $("#getLinkButtonSpinner").css({
    display: "block"
  })
  var url = "/authenticationCode/getNewCode"
  $.ajax(url, {
    success: function (data) {
      if (data.status != 0) {
        alert(data.message)
      } else {
        $("#getLinkButton").addClass("mb-3")
        $("#authenticationLinkCard").css({
          display: "block"
        })
        $("#authenticationCodeLink").html(window.location.origin + "/authentication/creator-signup?authenticationCode=" + data.code)
        $("#authenticationCodeLink").attr({
          href: window.location.origin + "/authentication/creator-signup?authenticationCode=" + data.code
        })
      }
      awaitingGetLink = false
      $("#getLinkButtonText").css({
        display: "block"
      })
      $("#getLinkButtonSpinner").css({
        display: "none"
      })
    }
  })
}

function copyAuthenticationLink() {
  var el = document.createElement("textarea")
  el.value = $("#authenticationCodeLink").html()
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}


$('#region').onsubmit = function(e){
    var value = $('#regionValue').value
    if(!value.length){
        e.preventDefault()
    }
}
function deleteRegion(id) {
  console.log(id)
  $.ajax({
    url: `/agency/region?id=${id}`,
    type: 'DELETE',
    success: function (result) {
      location.reload();
    }
  });
}

function deleteGender(id) {
  $.ajax({
    url: `/agency/gender?id=${id}`,
    type: 'DELETE',
    success: function (result) {
      location.reload();
    }
  });
}