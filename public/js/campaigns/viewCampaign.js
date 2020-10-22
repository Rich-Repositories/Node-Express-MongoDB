availableCreators = []
invitedCreators = []
campaignCreators = []
removedCampaignCreators = []
page = 0
invitedCreatorsPage = 0
invitedCreatorsPerPage = 6

changeAvailableCreatorsPage()

function changeAvailableCreatorsPage() {
    var campaignID = $("#campaignIDLabel").html()
    $.ajax({
        url: "/admin/creators/getCreatorsForCampaign?page=" + page + "&campaignID=" + campaignID,
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

$("#updateInvitedCreatorsButton").click(function() {
	campaignID = $("#campaignIDLabel").html()
	$.ajax({
        url: "/admin/campaigns/updateCampaignCreators",
        type: "POST",
        data: {
        	invitedCreators: invitedCreators,
        	campaignID: campaignID
        },
        success: function(response) {
        	if (response.status == 0) {
        		location.reload()
        	} else {
        		alert("Something went wrong with your edit: " + resp.response)
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
