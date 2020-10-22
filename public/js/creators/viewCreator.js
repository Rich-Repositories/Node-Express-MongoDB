document.querySelector('#inputProfilePhoto').addEventListener('change',function(e){
  var fileName = document.getElementById("inputProfilePhoto").files[0].name;
  var nextSibling = e.target.nextElementSibling
  nextSibling.innerText = fileName
})


function redAlertPhoneNumber() {
	$("#activationStatusMessage").empty()
	$("#activationStatusMessage").append("<br><span style=\"color: #dc3545;\"><b>Please update phone number</b></span>")
}

$("#sendActivationCodeButton").click(function() {
	var phoneNumber = $("#phoneNumberValue").html()
	var creatorID = $("#creatorID").html()
	phoneNumber = phoneNumber.replace(/\D/g,''); 
	console.log("PhoneNumber: " + phoneNumber)
	phoneNumber = parseInt(phoneNumber)
	if (isNaN(phoneNumber)) {
		console.log("Phone Number Is NaN")
		redAlertPhoneNumber()
	} else {
		console.log("Phone Number Is Not NaN")
		window.location.replace("/admin/creators/sendActivationCode?creatorID=" + creatorID + "&phoneNumber=" + phoneNumber);
	}
})
