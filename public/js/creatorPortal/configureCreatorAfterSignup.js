var uploadField = document.getElementById("customFile")

uploadField.onchange = function() {
    if(this.files[0].size > 1000000) {
       this.value = "";
       alert("File too big. It must be less than 1MB")
    }
};

$("#inputAge").keydown(function(event){
	var value = $("#inputAge").val()
	if (value.length + 1 > 3) {
		event.preventDefault()
	}
});
