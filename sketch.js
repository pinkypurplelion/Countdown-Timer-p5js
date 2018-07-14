var counter = 300;
var startTime = 0;

function convertSeconds(s)
{
    var seconds = nf(s % 60, 2, 0);
    var minutes = nf(floor((s/60)%60), 2, 0);
    var hours = nf(floor(s / 3600), 2, 0);

    return hours + ':' + minutes + ':' + seconds;
}

function setup()
{
    // URL Parameters:
    // seconds: Amount of seconds for timer
    // background_colour: Background colour of timer
    // school
    // repeats
    // alternating
    // alternating_timer

    startTime = millis();


    noCanvas();

    var params = getURLParams();
    var counter = params.seconds;
    var counterOriginal = counter;
    var repeatTimer = params.repeats;
    var alternatingCounter = params.alternating_timer;
    var alternating = params.alternating;
    var isAlternative = true;

    var timer = select("#timer");
    var body = select("#body");
    var school = select("#school");

    timer.html(convertSeconds(counter));
    body.style("background-color: #"+params.background_colour)
    school.html((decodeURI(params.school)));

    function timeIt()
    {
        var currentTime = floor((millis() - startTime)/1000);

        timer.html(convertSeconds(counter - currentTime));

        if (counter - currentTime <= 0)
        {
            console.log(repeatTimer)
            if (repeatTimer === "true")
            {
                if (alternating === "true")
                {
                    if (isAlternative)
                    {
                        console.log("Repeating Alternative Timer")
                        counter = alternatingCounter;
                        startTime = millis();
                        isAlternative = false;
                    }
                    else
                    {
                        console.log("Repeating Alternative Timer")
                        counter = counterOriginal;
                        startTime = millis();
                        isAlternative = true;
                    }
                }
                else
                {
                    console.log("Repeating Timer")
                    counter = counterOriginal;
                    startTime = millis();
                }
            }
            else
            {
                console.log("TIMER FINISHED")
                clearInterval(interval);
            }
        }
    }

    var interval = setInterval(timeIt, 100);
}
