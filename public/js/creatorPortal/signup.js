var userName = document.getElementById('username')

document.getElementById('form').onsubmit = function(e) {
    var terms = document.getElementById('basic-register-checkbox')

    if(!terms.checked){
        e.preventDefault()

        $("#terms-policy").addClass("text-danger")
        setTimeout(function() {
            $("#terms-policy").removeClass("text-danger")
            setTimeout(function() {
                $("#terms-policy").addClass("text-danger")
                setTimeout(function() {
                    $("#terms-policy").removeClass("text-danger")
                    setTimeout(function() {
                        $("#terms-policy").addClass("text-danger")
                        setTimeout(function() {
                            $("#terms-policy").removeClass("text-danger")
                        }, 300)
                    }, 300)
                }, 300)
            }, 300)
        }, 300)
        
        return null
    }
    var password = document.getElementById('password').value
    var confirmPassword = document.getElementById('confirm-password').value

    var usernameLengthGood = true
    var passwordLengthGood = true
    var passwordUpperCaseGood = true
    var passwordNumberGood = true
    var passwordMatchGood = true

    if (userName.value.length < 6) {
        usernameLengthGood = false
    }

    if (password.length < 8) {
        passwordLengthGood = false
    }

    if (!/^(?=.*?[0-9])/.test(password)) {
        passwordNumberGood = false
    }

    if (!/^(?=.*[A-Z])/.test(password)) {
    	console.log("uppcase password letter not good at all")
        passwordUpperCaseGood = false
    } else {
    	console.log("uppcase password letter PASSED THE TEST")
    }

    if (password !== confirmPassword) {
        passwordMatchGood = false
    }

    if (usernameLengthGood == false || passwordLengthGood == false || passwordUpperCaseGood == false || passwordNumberGood == false || passwordMatchGood == false) {
        e.preventDefault()

        if (!usernameLengthGood) {
            $("#usernameLengthValue").addClass("text-danger")
            setTimeout(function() {
                $("#usernameLengthValue").removeClass("text-danger")
                setTimeout(function() {
                    $("#usernameLengthValue").addClass("text-danger")
                    setTimeout(function() {
                        $("#usernameLengthValue").removeClass("text-danger")
                        setTimeout(function() {
                            $("#usernameLengthValue").addClass("text-danger")
                            setTimeout(function() {
                                $("#usernameLengthValue").removeClass("text-danger")
                            }, 300)
                        }, 300)
                    }, 300)
                }, 300)
            }, 300)
        }

        if (!passwordLengthGood) {
            $("#passwordLengthValue").addClass("text-danger")
            setTimeout(function() {
                $("#passwordLengthValue").removeClass("text-danger")
                setTimeout(function() {
                    $("#passwordLengthValue").addClass("text-danger")
                    setTimeout(function() {
                        $("#passwordLengthValue").removeClass("text-danger")
                        setTimeout(function() {
                            $("#passwordLengthValue").addClass("text-danger")
                            setTimeout(function() {
                                $("#passwordLengthValue").removeClass("text-danger")
                            }, 300)
                        }, 300)
                    }, 300)
                }, 300)
            }, 300)
        }

        if (!passwordUpperCaseGood) {
            $("#passwordUpperCaseValue").addClass("text-danger")
            setTimeout(function() {
                $("#passwordUpperCaseValue").removeClass("text-danger")
                setTimeout(function() {
                    $("#passwordUpperCaseValue").addClass("text-danger")
                    setTimeout(function() {
                        $("#passwordUpperCaseValue").removeClass("text-danger")
                        setTimeout(function() {
                            $("#passwordUpperCaseValue").addClass("text-danger")
                            setTimeout(function() {
                                $("#passwordUpperCaseValue").removeClass("text-danger")
                            }, 300)
                        }, 300)
                    }, 300)
                }, 300)
            }, 300)
        }

        if (!passwordNumberGood) {
        	$("#passwordNumberValue").addClass("text-danger")
            setTimeout(function() {
                $("#passwordNumberValue").removeClass("text-danger")
                setTimeout(function() {
                    $("#passwordNumberValue").addClass("text-danger")
                    setTimeout(function() {
                        $("#passwordNumberValue").removeClass("text-danger")
                        setTimeout(function() {
                            $("#passwordNumberValue").addClass("text-danger")
                            setTimeout(function() {
                                $("#passwordNumberValue").removeClass("text-danger")
                            }, 300)
                        }, 300)
                    }, 300)
                }, 300)
            }, 300)
        }

        if (!passwordMatchGood) {
        	$("#passwordsMustMatchInfo").css({
        		display: "inline"
        	})
        	$("#passwordMatchValue").addClass("text-danger")
            setTimeout(function() {
                $("#passwordMatchValue").removeClass("text-danger")
                setTimeout(function() {
                    $("#passwordMatchValue").addClass("text-danger")
                    setTimeout(function() {
                        $("#passwordMatchValue").removeClass("text-danger")
                        setTimeout(function() {
                            $("#passwordMatchValue").addClass("text-danger")
                            setTimeout(function() {
                                $("#passwordMatchValue").removeClass("text-danger")
                            }, 300)
                        }, 300)
                    }, 300)
                }, 300)
            }, 300)
        } else {
        	$("#passwordsMustMatchInfo").css({
        		display: "none"
        	})
        }
    }
}
