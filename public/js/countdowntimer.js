function countDownTimer(expriry_date, id) {
    var days, hours, minutes, seconds; // variables for time units

    var countdown = document.getElementById(id); // get tag element

    getCountdown(expriry_date);

    setInterval(function() {
        getCountdown(expriry_date);
    }, 1000);

    function getCountdown(expriry_date) {
        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left =
            (new Date(expriry_date).getTime() - current_date) / 1000;

        days = pad(parseInt(seconds_left / 86400));
        seconds_left = seconds_left % 86400;

        hours = pad(parseInt(seconds_left / 3600));
        seconds_left = seconds_left % 3600;

        minutes = pad(parseInt(seconds_left / 60));
        seconds = pad(parseInt(seconds_left % 60));

        // format countdown string + set tag value
        countdown.innerHTML = `<li><span>${days} D</span></li>
                <li><span>${hours} H</span></li>
                <li><span>${minutes} M</span></li>
                <li><span>${seconds} S</span></li>`;
    }

    function pad(n) {
        return (n < 10 ? '0' : '') + n;
    }
}

// CAN SUA LAI
function transferDateFormat(start_date, id) {

    var time = document.getElementById("time" + id); // get tag element
    getTime(start_date);

    function getTime(start_date) {
        // find the amount of "seconds" between now and target
        var Day = (new Date(start_date).getDay());
        var Month = (new Date(start_date).getMonth());
        var Year = (new Date(start_date).getYear());
        // format countdown string + set tag value
        time.innerHTML = `${Day}//${Month}//${Year}`;
    }
}