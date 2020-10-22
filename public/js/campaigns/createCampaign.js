availableCreators = []
invitedCreators = []
page = 0
invitedCreatorsPage = 0
invitedCreatorsPerPage = 6

triedToSubmitForm = false

startDateInput = document.getElementById("inputStartDate");
startDatePicker = new TheDatepicker.Datepicker(startDateInput)
startDatePicker.options.setInputFormat("n/j/Y");
startDatePicker.render()

startDateInput = document.getElementById("inputEndDate");
startDatePicker = new TheDatepicker.Datepicker(startDateInput)
startDatePicker.options.setInputFormat("n/j/Y");
startDatePicker.render()

document.querySelector('#inputMedia').addEventListener('change', function(e) {
    var fileCount = document.getElementById("inputMedia").files.length
    var nextSibling = e.target.nextElementSibling
    nextSibling.innerText = fileCount + " Items"
})

changeAvailableCreatorsPage()

function changeAvailableCreatorsPage() {
    $.ajax({
        url: "/admin/creators/getAlphabetizedCreators?page=" + page,
        success: function(results) {
            if (results.length == 0) {
                if (page == 0) {
                    $("#availableCreators").empty()
                    $("#availableCreators").append("<div class=\"\" id=\"noCreatorsFoundDiv\" style=\"width: 100%; border-radius: 8px; padding: 8px; margin-top: 8px;\"><h3 style=\"text-align: center; margin-top: 8px;\"><b>No Creators Found</b></h3><a href=\"/admin/creators/addCreator\" class=\"btn btn-primary\" style=\"margin-top: 16px; position: relative; left: 50%; transform: translate(-50%, 0);\">Add Creator</a></div>")
                    return
                }
                page -= 1
                changeAvailableCreatorsPage()
                return
            }
            availableCreators = results
            reloadAvailableCreators()
        }
    })
}

function reloadAvailableCreators() {
    $("#availableCreatorsPageNumber").html(page + 1)
    $("#availableCreators").empty()
    var allAvailableCreatorsInvited = true
    for (creatorIndex = 0; creatorIndex < availableCreators.length; creatorIndex++) {
        existsInInvitedCreators = false
        for (invitedCreatorsIndex = 0; invitedCreatorsIndex < invitedCreators.length; invitedCreatorsIndex++) {
            if (invitedCreators[invitedCreatorsIndex]._id == availableCreators[creatorIndex]._id) {
                existsInInvitedCreators = true
                break
            }
        }
        if (existsInInvitedCreators == true) {
            continue
        }
        allAvailableCreatorsInvited = false
        let profilePath = ""
        if (availableCreators[creatorIndex].profilePhotoURL == "undefined.") {
            profilePath = "/images/emptyProfilePhoto2.png"
        } else {
            profilePath = "/" + availableCreators[creatorIndex].profilePhotoURL
        }
        $("#availableCreators").append("<div class=\"\"style=\"width: 100%; height: 50px; border-radius: 8px; background-color: #cfcfcf; padding: 8px; margin-top: 8px;\"><img src=\"" + profilePath + "\" alt=\"\" style=\"border-radius: 8px; float: left;\" width=\"34\" height=\"34\"><span style=\"font-size: 20px; float: left; margin-left: 8px; line-height: 34px;\"><b>" + availableCreators[creatorIndex].handle + "</b></span><a href=\"javascript:void(0)\" class=\"avilableCreatorAddButton\" onClick=\"addAvailableCreator(this)\" id=\"" + availableCreators[creatorIndex]._id + "\" style=\"background-color: #007bff; border-radius: 8px; float: right; width: 34px; height: 34px;\"><img src=\"/images/whitePlus.png\" alt=\"\" width=\"14\" height=\"14\" style=\"display: block; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);\"></a></div>")
    }
    if (allAvailableCreatorsInvited == true) {
        $("#availableCreators").append("<div style=\"width: 100%;\"><h5 style=\"text-align: center;\"><b>All Creators Invited On This Page</b></h5></div>")
    }
}

function reloadInvitedCreators() {
    $("#invitedCreatorsPageNumber").html(invitedCreatorsPage + 1)
    $("#invitedCreatorsDiv").empty()
    if (invitedCreators.length == 0) {
        $("#invitedCreatorsDiv").append("<div class=\"\"style=\"width: 100%; border-radius: 8px; background-color: #cfcfcf; height: 50px;\"><h3 style=\"text-align: center; line-height: 50px;\"><b>Invite Creators</b></h3></div>")
        return
    }

    var reloadStartPoint = invitedCreatorsPage * invitedCreatorsPerPage
    var reloadInvitedCreatorsRightCompare = invitedCreatorsPage * invitedCreatorsPerPage + invitedCreatorsPerPage
    var addedACreator = false
    for (invitedCreatorsIndex = reloadStartPoint; invitedCreatorsIndex < reloadInvitedCreatorsRightCompare; invitedCreatorsIndex++) {
        if (invitedCreatorsIndex >= invitedCreators.length) {
            break
        }
        addedACreator = true
        let profilePath = ""
        if (invitedCreators[invitedCreatorsIndex].profilePhotoURL == "undefined.") {
            profilePath = "/images/emptyProfilePhoto2.png"
        } else {
            profilePath = "/" + invitedCreators[invitedCreatorsIndex].profilePhotoURL
        }
        $("#invitedCreatorsDiv").append("<div class=\"\" style=\"width: 100%; height: 50px; border-radius: 8px; background-color: #cfcfcf; padding: 8px; margin-top: 8px;\"><img src=\"" + profilePath + "\" alt=\"\" style=\"border-radius: 8px; float: left;\" width=\"34\" height=\"34\"><span style=\"font-size: 20px; float: left; margin-left: 8px; line-height: 34px;\"><b>" + invitedCreators[invitedCreatorsIndex].handle + "</b></span><a href=\"javascript:void(0)\" style=\"background-color: #dc3545; border-radius: 8px; float: right; width: 34px; height: 34px;\" onClick=\"removeInvitedCreator(this)\" id=\"" + invitedCreators[invitedCreatorsIndex]._id + "\"><img src=\"/images/whiteX.png\" alt=\"\" width=\"10\" height=\"10\" style=\"display: block; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);\"></a></div>")
    }
    if (addedACreator == false) {
        if (invitedCreatorsPage - 1 >= 0) {
            invitedCreatorsPage -= 1
            reloadInvitedCreators()
            return
        }
    }
}

$("#availableCreatorsBackPageButton").click(function() {
    if (page == 0) {
        return
    }
    page -= 1
    changeAvailableCreatorsPage()
})

$("#availableCreatorsNextPageButton").click(function() {
    page += 1
    changeAvailableCreatorsPage()
})

$("#invitedCreatorsNextPageButton").click(function() {
    if (invitedCreatorsPage + 1 >= invitedCreators.length / invitedCreatorsPerPage) {
        return
    }
    invitedCreatorsPage += 1
    reloadInvitedCreators()
})

$("#invitedCreatorsBackPageButton").click(function() {
    if (invitedCreatorsPage == 0) {
        return
    }
    invitedCreatorsPage -= 1
    reloadInvitedCreators()
})

function addAvailableCreator(button) {
    for (creatorIndex = 0; creatorIndex < availableCreators.length; creatorIndex++) {
        if (availableCreators[creatorIndex]._id == button.id) {
            invitedCreators.push(availableCreators[creatorIndex])
            break
        }
    }
    reloadAvailableCreators()
    reloadInvitedCreators()
}

function removeInvitedCreator(button) {
    var tempInvitedCreators = []
    for (invitedCreatorsIndex = 0; invitedCreatorsIndex < invitedCreators.length; invitedCreatorsIndex++) {
        if (invitedCreators[invitedCreatorsIndex]._id != button.id) {
            tempInvitedCreators.push(invitedCreators[invitedCreatorsIndex])
        }
    }
    invitedCreators = tempInvitedCreators
    reloadAvailableCreators()
    reloadInvitedCreators()
}

$("#createCampaignForm").submit(function(event) {
    if (triedToSubmitForm == false) {
        event.preventDefault()
        triedToSubmitForm = true
    } else {
        return
    }
    for (invitedCreatorsIndex = 0; invitedCreatorsIndex < invitedCreators.length; invitedCreatorsIndex++) {
        $("#createCampaignForm").append("<input type=\"hidden\" name=\"invitedCreators\" value=\"" + invitedCreators[invitedCreatorsIndex]._id + "\">")
    }

    var startDate = $("#inputStartDate").val()
    var endDate = $("#inputEndDate").val()
    console.log("Start Date Value: %O", startDate)
    console.log("End Date Value: %O", endDate)

    if (startDate != "") {
        startDate = startDate.split("/")
        console.log("Split Start Date: %O", startDate)
        if (startDate.length < 3) {
            console.log("Start Date.length < 3 returning")
            return
        }
        var month = parseInt(startDate[0])
        var day = parseInt(startDate[1])
        var year = parseInt(startDate[2])
        console.log("Start Date Month: %O, day: %O, year: %O", month, day, year)
        if (isNaN(month) || isNaN(day) == undefined || isNaN(year) == undefined) {
            console.log("Start DateDate Element Is undefined, returning");
            return
        }
        month--
        if (month < 0 || month > 11) {
            console.log("Start Date Month not right value");
            return
        }
        if (day < 1 || day > 31) {
            console.log("Start Date Date not right value");
            return
        }
        if (year < 1980 || year > 9999) {
            console.log("Year Not Right Value")
        }
        var startDate = new Date()
        startDate.setMonth(month)
        startDate.setDate(day)
        startDate.setFullYear(year)
        console.log("New Start Date: %O", startDate)
        startDate = startDate.getTime()
        console.log("Start Date Mili: %O", startDate)
        $("#createCampaignForm").append("<input type=\"hidden\" name=\"startDate\" value=\"" + startDate + "\">")
    }

    if (endDate != "") {
        endDate = endDate.split("/")
        console.log("Split endDate: %O", endDate)
        if (endDate.length < 3) {
            console.log("End Date.length < 3 returning");
            return
        }
        var month = parseInt(endDate[0])
        var day = parseInt(endDate[1])
        var year = parseInt(endDate[2])
        console.log("endDate Month: %O, day: %O, year: %O", month, day, year)
        if (isNaN(month) || isNaN(day) == undefined || isNaN(year) == undefined) {
            console.log("endDate Element Is undefined, returning");
            return
        }
        month--
        if (month < 0 || month > 11) {
            console.log("endDate Month not right value");
            return
        }
        if (day < 1 || day > 31) {
            console.log("endDate Date not right value");
            return
        }
        if (year < 1980 || year > 9999) {
            console.log("endDate Year Not Right Value")
        }
        var endDate = new Date()
        endDate.setMonth(month)
        endDate.setDate(day)
        endDate.setFullYear(year)
        console.log("New endDate: %O", endDate)
        endDate = endDate.getTime()
        console.log("End Date Mili: %O", endDate)
        $("#createCampaignForm").append("<input type=\"hidden\" name=\"endDate\" value=\"" + endDate + "\">")
    }
    $("#createCampaignForm").submit()
})
