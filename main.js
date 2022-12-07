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


var currentTime = new Date();
var isPause = false;


function changeGroup(groupname){
    localStorage.setItem("group", groupname);
    countDownDate = getNextTime(zeiten[localStorage.getItem("group")]);
    document.getElementById("group").innerHTML = groupname;
}


// function that converts a hour and minute as a string to unix time 
function convertStringToDate(time){
    var splittedTime = time.split(':')
    var givenDate = new Date();
    givenDate.setHours(splittedTime[0]);
    givenDate.setMinutes(splittedTime[1]);
    givenDate.setSeconds(0);
    return givenDate.getTime();
}

function getNextTime(timesType){

    if(convertStringToDate(timesType[2][1]) < currentTime.getTime()){
        isPause = false;
        return convertStringToDate("16:15");
}
    for (let i = 0; i < timesType.length; i++) {
        if(currentTime.getTime() <= convertStringToDate(timesType[i][0])){
            isPause = false;
            return convertStringToDate(timesType[i][0]);
        } else if(currentTime.getTime() <= convertStringToDate(timesType[i][1])){
            isPause = true;
            return convertStringToDate(timesType[i][1]); 
        }
    }
    

}



var countDownDate = getNextTime(zeiten[localStorage.getItem("group")]);

// Update the count down every 1 second
var countDownInterval = setInterval(function() {

    currentTime = new Date();

    if(convertStringToDate("8:30") > currentTime.getTime()){
        document.getElementById("isPause").style.display = "unset"; 
        document.getElementById("isPause").innerHTML = "Arbeit beginnt in:";
        countDownDate = convertStringToDate("8:30");
    }

    // Find the distance between the currentTime and the count down date
    var distance = countDownDate - currentTime.getTime();

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = hours + "h "
    + minutes + "m " + seconds + "s ";

    if(isPause){
        document.getElementById("isPause").innerHTML = "Pausenzeit:";
    }else{
        document.getElementById("isPause").innerHTML = "Arbeitszeit:"; 
    }

    //Check if its weekend
    if(currentTime.getDay == 5 || currentTime.GetDay == 6){
        document.getElementById("timer").innerHTML = "Schönes Wochenende!";
        document.getElementById("isPause").style.display = "none";
        document.getElementById("group").style.display = "none";
    }

    //Check if work time is over
    if(convertStringToDate("16:15") < currentTime.getTime()){
        document.getElementById("timer").innerHTML = "Schönen Feierabend!";
        document.getElementById("isPause").style.display = "none";
        document.getElementById("group").style.display = "none";
    }

    

    if (distance < 0) {
        countDownDate = getNextTime(zeiten[localStorage.getItem("group")]);
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

