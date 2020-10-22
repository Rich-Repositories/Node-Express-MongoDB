dueDateInput = document.getElementById("inputDueDate");
dueDatePicker = new TheDatepicker.Datepicker(dueDateInput)
dueDatePicker.options.setInputFormat("n/j/Y");
dueDatePicker.render()

document.getElementById('files').addEventListener('change',function(e){
  e.preventDefault()
  setTimeout(() => {
    let count = e.target.files.length
    var nextSibling = e.target.nextElementSibling
    nextSibling.innerText = count > 1 ? `${count} files` : `${count} file`
  }, 0)
})
