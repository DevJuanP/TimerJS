let inputs, clock, alarm, hours, minutes, seconds, repeater, timeInSeconds;

window.addEventListener('load', () => {
    inputs = Array.from(document.getElementsByClassName('number'));
    clock = document.querySelector('.clock');
    alarm = new Audio('sound/alarm-buzzer-sound.mp3');
});

function startTimer(){
    parseTime();
    setTimer();
    countdown();
}

function parseTime(){
    hours = Number(inputs[0].value);
    minutes = Number(inputs[1].value);
    seconds = Number(inputs[2].value);
    timeInSeconds = seconds+60*minutes+3600*hours-1;
}

function setTimer(){
    clock.innerHTML = `<p class="number">${(hours>9)? hours:('0'+hours)}</p>
                        <span>hs</span>
                        <p class="number">${(minutes>9)? minutes:('0'+minutes)}</p>
                        <span>min</span>
                        <p class="number">${(seconds>9)? seconds:('0'+seconds)}</p>
                        <span>s</span>`;

    document.title = `${hours>9? hours:('0'+hours)}
                        :${minutes>9? minutes:('0'+minutes)}
                        :${seconds>9? seconds:('0'+seconds)}`
}
function countdown(){
    repeater = setInterval(runner, 1000);
}
/*
function runner(){
    setTimer();
     if (seconds > 0) seconds--;
     else{
        if (minutes > 0){
            seconds = 59;
            minutes--;
        }else{
            if(hours > 0){
                seconds = 59;
                minutes = 59;
                hours --
            } else alarm.play();
        }
     }
     setTimer();
}*/

function runner(){
    if (timeInSeconds>=0) {
        seconds = timeInSeconds % 60;
        minutes = (timeInSeconds % 3600 - seconds)/60;
        hours = Math.floor(timeInSeconds/3600);
        setTimer();
        timeInSeconds--;
    }
    else {
        alarm.play();
        clearInterval(repeater);
    }
    
}

function stopTimer(){
    location.reload();
}

// function pauseTimer(){
//     clearInterval(repeater);
// }