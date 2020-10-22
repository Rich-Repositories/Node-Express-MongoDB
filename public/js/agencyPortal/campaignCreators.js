availableCreators = []
invitedCreators = []
campaignCreators = []
removedCampaignCreators = []
acceptedCreators = []
declinedCreators = []
pendingCreators = []
page = 0
invitedCreatorsPage = 0
invitedCreatorsPerPage = 6

pendingCreatorsForRequest = []
declinedCreatorsForRequest = []
acceptedCreatorsForRequest = []

changeAvailableCreatorsPage()

function changeAvailableCreatorsPage() {
    var campaignID = $("#campaignIDLabel").html()
    $.ajax({
        url: "/agency/getCreatorsForCampaign?page=" + page + "&campaignID=" + campaignID,
        success: function(results) {
            if (!results.availableCreators || !results.campaignCreators) {
                return
            }
            console.log("Results: %O", results)
            if (results.availableCreators.length == 0) {
                if (page == 0) {
                    $("#availableCreators").empty()
                    $("#availableCreators").append("<div class=\"\" id=\"noCreatorsFoundDiv\" style=\"width: 100%; border-radius: 8px; padding: 8px; margin-top: 8px;\"><h3 style=\"text-align: center; margin-top: 8px;\"><b>No Creators Found</b></h3><a href=\"/admin/creators/addCreator\" class=\"btn btn-primary\" style=\"margin-top: 16px; position: relative; left: 50%; transform: translate(-50%, 0);\">Add Creator</a></div>")
                    return
                }
                page -= 1
                changeAvailableCreatorsPage()
                return
            }
            availableCreators = results.availableCreators
            for (onlineInvitedCreatorsIndex = 0; onlineInvitedCreatorsIndex < results.campaignCreators.length; onlineInvitedCreatorsIndex++) {
                var exists = false
                for (localInvitedCreatorsIndex = 0; localInvitedCreatorsIndex < invitedCreators.length; localInvitedCreatorsIndex++) {
                    if (results.campaignCreators[onlineInvitedCreatorsIndex]._id == invitedCreators[localInvitedCreatorsIndex]._id) {
                        exists = true
                        break
                    }
                }
                if (exists == false) {
                    var existsInRemovedCreators = false
                    for (removedCampaignCreatorIndex = 0; removedCampaignCreatorIndex < removedCampaignCreators.length; removedCampaignCreatorIndex++) {
                        if (removedCampaignCreators[removedCampaignCreatorIndex]._id == results.campaignCreators[onlineInvitedCreatorsIndex]._id) {
                            existsInRemovedCreators = true
                            break
                        }
                    }
                    if (existsInRemovedCreators == false) {
                        // console.log("Pushing creator: %O to invitedCreators array because it was not found in invitedCreators or in removedCampaignCreators", results.campaignCreators[onlineInvitedCreatorsIndex].handle)       
                        invitedCreators.push(results.campaignCreators[onlineInvitedCreatorsIndex])
                    }
                }
            }
            campaignCreators = results.campaignCreators
            acceptedCreators = results.acceptedCreators
            declinedCreators = results.declinedCreators
            pendingCreators = results.invitedCreators

            reloadAvailableCreators()
            reloadInvitedCreators()
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

        toAppend = "<div class=\"card bg-light"
        if (creatorIndex != availableCreators.length - 1) {
            toAppend += " mb-3\""
        } else {
            toAppend += "\""
        }
        toAppend += " style=\"width: 100%;\"><div class=\"card-body p-0\"><div style=\"height: 60px; padding: 8px;\"><img src=\"" + profilePath + "\" style=\"border-radius: 6px; float: left; width: 44px; height: 44px;\"><span style=\"float: left; line-height: 44px;\" class=\"ml-3\"><b>" + availableCreators[creatorIndex].name + "</b></span><a href=\"javascript:void(0)\" class=\"btn btn-primary\" onclick=\"addAvailableCreator(this)\" id=\"" + availableCreators[creatorIndex]._id + "\" style=\"border-radius: 6px; float: right; width: 44px; height: 44px;\"><img src=\"/images/whitePlus.png\" width=\"20\" height=\"20\" style=\"display: block; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);\"></a>"

        var declinedInvite = false

        for (declinedCreatorsIndex = 0;declinedCreatorsIndex < declinedCreators.length;declinedCreatorsIndex++) {
            if (availableCreators[creatorIndex]._id == declinedCreators[declinedCreatorsIndex]) {
                declinedInvite = true
            }
        }

        if (declinedInvite) {
            toAppend += "<b class=\"text-white mr-2 bg-danger px-2 py-1 fs--1\" style=\"float: right; border-radius: 6px; top: 50%; position: relative; transform: translate(0, -50%);\">Declined</b>"
        }

        toAppend += "</div><div class=\"row p-3\"><div class=\"col-4\"><span class=\"fs--1\" style=\"display: block;\">Age</span><span class=\"fs-2\"><b>" + availableCreators[creatorIndex].age + "</b></span></div><div class=\"col-4\"><span class=\"fs--1\" style=\"display: block;\">Gender</span><span class=\"fs-2\"><b>" + availableCreators[creatorIndex].genderName + "</b></span></div><div class=\"col-4\"><span class=\"fs--1\" style=\"display: block;\">Region</span><span class=\"fs-2\"><b>" + availableCreators[creatorIndex].regionName + "</b></span></div></div></div></div>"
        $("#availableCreators").append(toAppend)
    }
    if (allAvailableCreatorsInvited == true) {
        $("#availableCreators").append("<div style=\"width: 100%;\" class=\"mt-5\"><h5 style=\"text-align: center;\"><b>All Creators Invited On This Page</b></h5></div>")
    }
}

function reloadInvitedCreators() {
    $("#invitedCreatorsPageNumber").html(invitedCreatorsPage + 1)
    $("#invitedCreatorsDiv").empty()
    if (invitedCreators.length == 0) {
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
        toAppend = "<div class=\"card bg-light"
        if (invitedCreatorsIndex != invitedCreators.length - 1) {
            toAppend += " mb-3\""
        } else {
            toAppend += "\""
        }
        toAppend += " style=\"width: 100%;\"><div class=\"card-body p-0\"><div style=\"height: 60px; padding: 8px;\"><img src=\"" + profilePath + "\" style=\"border-radius: 6px; float: left; width: 44px; height: 44px;\"><span style=\"float: left; line-height: 44px;\" class=\"ml-3 fs-0\"><b>" + invitedCreators[invitedCreatorsIndex].name + "</b></span><a href=\"javascript:void(0)\" class=\"btn btn-danger\" onclick=\"removeInvitedCreator(this)\" id=\"" + invitedCreators[invitedCreatorsIndex]._id + "\" style=\"border-radius: 6px; float: right; width: 44px; height: 44px;\"><img src=\"/images/whiteX.png\" width=\"14\" height=\"14\" style=\"display: block; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);\"></a>"

        var acceptedInvite = false
        var declinedInvite = false
        var pendingInvite = false

        for (acceptedCreatorsIndex = 0;acceptedCreatorsIndex < acceptedCreators.length;acceptedCreatorsIndex++) {
            if (invitedCreators[invitedCreatorsIndex]._id == acceptedCreators[acceptedCreatorsIndex]) {
                acceptedInvite = true
            }
        }

        for (declinedCreatorsIndex = 0;declinedCreatorsIndex < declinedCreators.length;declinedCreatorsIndex++) {
            if (invitedCreators[invitedCreatorsIndex]._id == declinedCreators[declinedCreatorsIndex]) {
                declinedInvite = true
            }
        }

        for (pendingCreatorsIndex = 0;pendingCreatorsIndex < pendingCreators.length;pendingCreatorsIndex++) {
            if (invitedCreators[invitedCreatorsIndex]._id == pendingCreators[pendingCreatorsIndex]) {
                pendingInvite = true
            }
        }

        if (acceptedInvite) {
            acceptedCreatorsForRequest.push(invitedCreators[invitedCreatorsIndex]._id)
            toAppend += "<b class=\"text-200 mr-2 bg-success px-2 py-1 fs--1\" style=\"float: right; border-radius: 6px; top: 50%; position: relative; transform: translate(0, -50%);\">Accepted</b>"
        } else if (declinedInvite) {
            declinedCreatorsForRequest.push(invitedCreators[invitedCreatorsIndex]._id)
            toAppend += "<b class=\"text-white mr-2 bg-danger px-2 py-1 fs--1\" style=\"float: right; border-radius: 6px; top: 50%; position: relative; transform: translate(0, -50%);\">Declined</b>"
        } else if (pendingInvite) {
            pendingCreatorsForRequest.push(invitedCreators[invitedCreatorsIndex]._id)
            toAppend += "<b class=\"text-white mr-2 bg-warning px-2 py-1 fs--1\" style=\"float: right; border-radius: 6px; top: 50%; position: relative; transform: translate(0, -50%);\">Pending</b>"
        }

        toAppend += "</div><div class=\"row p-3\"><div class=\"col-4\"><span class=\"fs--1\" style=\"display: block;\">Age</span><span class=\"fs-2\"><b>" + invitedCreators[invitedCreatorsIndex].age + "</b></span></div><div class=\"col-4\"><span class=\"fs--1\" style=\"display: block;\">Gender</span><span class=\"fs-2\"><b>" + invitedCreators[invitedCreatorsIndex].genderName + "</b></span></div><div class=\"col-4\"><span class=\"fs--1\" style=\"display: block;\">Region</span><span class=\"fs-2\"><b>" + invitedCreators[invitedCreatorsIndex].regionName + "</b></span></div></div></div></div>"
        $("#invitedCreatorsDiv").append(toAppend)
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

$("#updateInvitedCreatorsButton").click(function() {

    campaignID = $("#campaignIDLabel").html()
    $.ajax({
        url: "/agency/updateCampaignCreators",
        type: "POST",
        data: {
            invitedCreators: invitedCreators.map(el => el._id),
            campaignID: campaignID
        },
        success: function(response) {
            if (response.status == 0) {
                location.reload()
            } else {
                alert("Something went wrong with your edit: " + response)
            }
        }
    })
})

function addAvailableCreator(button) {
    for (creatorIndex = 0; creatorIndex < availableCreators.length; creatorIndex++) {
        if (availableCreators[creatorIndex]._id == button.id) {
            invitedCreators.push(availableCreators[creatorIndex])
            break
        }
    }
    var tempRemovedCampaignCreators = []
    for (removedCampaignCreatorIndex = 0; removedCampaignCreatorIndex < removedCampaignCreators.length; removedCampaignCreatorIndex++) {
        if (removedCampaignCreators[removedCampaignCreatorIndex]._id != button.id) {
            tempRemovedCampaignCreators.push(removedCampaignCreators[removedCampaignCreatorIndex])
        }
    }
    removedCampaignCreators = tempRemovedCampaignCreators
    // console.log("Removed Campaign Creators after add: %O", removedCampaignCreators)
    reloadAvailableCreators()
    reloadInvitedCreators()
}

// Remove Invited Creator
function removeInvitedCreator(button) {
    var tempInvitedCreators = []

    if(declinedCreatorsForRequest.includes(button.id)){
        declinedCreatorsForRequest.splice(declinedCreatorsForRequest.indexOf(button.id), 1)
        declinedCreators = declinedCreators.filter(creator => creator._id !== button.id)
    }
    if(acceptedCreatorsForRequest.includes(button.id)){
        acceptedCreatorsForRequest.splice(acceptedCreatorsForRequest.indexOf(button.id), 1)
        acceptedCreators = acceptedCreators.filter(creator => creator._id !== button.id)
    }
    if(pendingCreatorsForRequest.includes(button.id)){
        pendingCreatorsForRequest.splice(pendingCreatorsForRequest.indexOf(button.id), 1)
    }

    for (invitedCreatorsIndex = 0; invitedCreatorsIndex < invitedCreators.length; invitedCreatorsIndex++) {
        if (invitedCreators[invitedCreatorsIndex]._id != button.id) {
            tempInvitedCreators.push(invitedCreators[invitedCreatorsIndex])
        }
    }
    for (campaignCreatorsIndex = 0; campaignCreatorsIndex < campaignCreators.length; campaignCreatorsIndex++) {
        if (campaignCreators[campaignCreatorsIndex]._id == button.id) {
            removedCampaignCreators.push(campaignCreators[campaignCreatorsIndex])
            break
        }
    }
    // console.log("Removed Campaign Creators after remove: %O", removedCampaignCreators)
    invitedCreators = tempInvitedCreators
    reloadAvailableCreators()
    reloadInvitedCreators()
}
