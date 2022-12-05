var zeiten = {
    java : [
            ["10:00", "10:15"],
            ["12:00", "12:45"], 
            ["14:30", "14:45"]
        ],
    python : [
            ["10:00", "10:15"],
            ["11:45", "12:30"], 
            ["14:00", "14:15"]
        ],
    embedded : [
            ["10:00", "10:15"],
            ["12:15", "13:00"], 
            ["14:30", "14:45"]
        ] 
}


var group = "java";

function convertStringToDate(time){
    var splittedTime = time.split(':')
    var givenDate = new Date();
    givenDate.setHours(splittedTime[0]);
    givenDate.setMinutes(splittedTime[1]);
    return givenDate.getTime();
}

function getNextTime(timesType){
    var now = new Date();

    for (let i = 0; i < timesType.length; i++) {
        if(now.getTime() <= convertStringToDate(timesType[i][0])){
            return convertStringToDate(timesType[i][0]);
        }
    }

}


var countDownDate = getNextTime(zeiten[group]);

// Update the count down every 1 second
var countDownInterval = setInterval(function() {

    // Get today's date and time
    var now = new Date();

    // Find the distance between now and the count down date
    var distance = countDownDate - now.getTime();

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        countDownDate = getNextTime(zeiten[group]);
    }
}, 1000);



















/*
var zeiten = {
    java : {
        arbeit : [
            ["8:30", "10:00"],
            ["10:15", "12:00"], 
            ["12:45", "14:30"], 
            ["14:45", "16:15"]
        ],
        pausen : [
            ["10:00", "10:15"],
            ["12:00", "12:45"], 
            ["14:30", "14:45"]
        ] 
    },
    python : {
        arbeit : [
            ["8:30", "10:00"],
            ["10:15", "11:45"], 
            ["12:30", "14:00"], 
            ["14:15", "16:15"]
        ],
        pausen : [
            ["10:00", "10:15"],
            ["11:45", "12:30"], 
            ["14:00", "14:15"]
        ] 
    },
    embedded : {
        arbeit : [
            ["8:30", "10:00"],
            ["10:15", "12:15"], 
            ["13:00", "14:30"], 
            ["14:45", "16:15"]
        ],
        pausen : [
            ["10:00", "10:15"],
            ["12:15", "13:00"], 
            ["14:30", "14:45"]
        ] 
    }
}
*/

