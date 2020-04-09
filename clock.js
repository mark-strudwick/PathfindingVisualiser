function startClock() {
    var startTime = new Date();
    return startTime;
}

function stopClock(startTime) {
    var elapsedTime = new Date() - startTime;
    // Formats elapsedTime into seconds.milliseconds
    return elapsedTime / 1000;
}