document.getElementById('submitEditBtn').onclick = function (e) {
    var batchDue = document.getElementById('batchDueDate').value
    var dueDate = document.getElementById('dueDate').value
    var budget = document.getElementById('budget').value
    var briefNotes = document.getElementById('campaignBrief').value
    var name = document.getElementById('campaignName').value
    var regionID = document.getElementById('region').value

    var params = new URLSearchParams(window.location.search)
    var campaignID = params.get('campaignID')

    var data = new FormData();

    data.append('name', name);
    data.append('batchDue', batchDue);
    data.append('regionID', regionID);
    data.append('budget', budget);
    data.append('dueDate', dueDate);
    data.append('briefNotes', briefNotes);
    data.append('campaignID', campaignID)

    var request = new XMLHttpRequest()
    request.open("POST", "/agency/editCampaign")
    request.withCredentials = true
    request.send(data)
}