document.getElementById('submit-btn').onclick = function (e) {
    var params = new URLSearchParams(window.location.search)
    var creatorID = params.get('creatorID')

    var creatorName = document.getElementById('creatorName').value
    var gender = document.getElementById('gender').value
    var region = document.getElementById('region').value
    var age = document.getElementById('age').value
    var email = document.getElementById('email').value
    var phoneNumber = document.getElementById('phoneNumber').value
    var file = document.getElementById("files").files[0]

    var campaignIDS = []
    var shortListsIDS = []

    var campaigns = document.getElementsByClassName('campaign-list-checkbox')
    var shortLists = document.getElementsByClassName('short-list-checkbox')

    for (var campaignIndex = 0; campaignIndex < campaigns.length; campaignIndex++) {
        if (campaigns[campaignIndex].checked) {
            campaignIDS.push(campaigns[campaignIndex].value)
        }
    }

    for (var listIndex = 0; listIndex < shortLists.length; listIndex++) {
        if (shortLists[listIndex].checked) {
            shortListsIDS.push(shortLists[listIndex].value)
        }
    }

    if (creatorName.length < 1 || email.length < 1) {
        return
    } else {
        var formData = new FormData();
        formData.append('name', creatorName);
        formData.append('genderID', gender);
        formData.append('regionID', region);
        formData.append('age', age);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);

        if (file) {
            formData.append('profilePhoto', file);
        }

        for (var i = 0; i < campaignIDS.length; i++) {
            formData.append('campaignIDs', campaignIDS[i]);
        }

        for (var j = 0; j < shortListsIDS.length; j++) {
            formData.append('shortListsIDS', shortListsIDS[j]);
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `/agency/viewCreator?creatorID=${creatorID}`)
        xhr.withCredentials = true

        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                window.location.href = '/agency/creators'
            };
        };

        xhr.send(formData)

    }
}