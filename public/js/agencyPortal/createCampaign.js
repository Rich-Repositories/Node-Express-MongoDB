dueDateInput = document.getElementById("dueDate");
dueDatePicker = new TheDatepicker.Datepicker(dueDateInput)
dueDatePicker.render()
dueDatePicker.options.setInputFormat("n/j/Y");

batchDueDateInput = document.getElementById("batchDueDate");
batchDueDatePicker = new TheDatepicker.Datepicker(batchDueDateInput)
batchDueDatePicker.render()
batchDueDatePicker.options.setInputFormat("n/j/Y");

document.getElementById('files').addEventListener('change', function (e) {
  e.preventDefault()
  setTimeout(() => {
    let count = e.target.files.length
    var nextSibling = e.target.nextElementSibling
    nextSibling.innerText = count > 1 ? `${count} files` : `${count} file`
  }, 0)
})

$("#createButton").click(function() {
	$("#createButton").css({
		display: "none"
	})
})
