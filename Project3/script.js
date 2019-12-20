function performStatistics() {
    var textAreaValue = document.getElementById("txtArea").value;
    var spli = textAreaValue.split(" ").map(Number);
    var len = spli.length;

    var initialCheck = checkNumbers(spli);
    if (initialCheck) {
        if (len >= 5 && len <= 20) {
            var testSum = calcSum(spli);
            document.getElementById("sum").value = testSum;

            var testMean = calcMean(spli);
            document.getElementById("mean").value = testMean;

            var testMin = findMin(spli);
            document.getElementById("min").value = testMin;

            var testMax = findMax(spli);
            document.getElementById("max").value = testMax;

            var testMedian = calcMedian(spli);
            document.getElementById("median").value = testMedian;

            var testVariance = calcVariance(spli);
            document.getElementById("variance").value = testVariance;

            var testDeviation = calcStdDev(spli);
            document.getElementById("std_dev").value = testDeviation;

            var testMode = findMode(spli);
            document.getElementById("mode").value = testMode;

        } else {
            alert("You must enter between 5 and 20 numbers.");
            return false;
        }
    }
} //end performStatistics

//Checks the numbers to see whether they are between 0 and 100
function checkNumbers(array) {
    var bool = true;
    for (var i = 0; i <= array.length - 1; i++) {
        if (array[i] >= 0 && array[i] < 100) {
            x = true;
        } else {
            alert("You must enter numbers between 0 and 100.");
            return false;
        }
    }
    return bool;
} //end checkNumbers

//Calculates the sum from 
function calcSum(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total.toFixed(2);
} //end sum

//Calculates the mean.
function calcMean(array) {
    var total = calcSum(array);
    var len = array.length;
    var mean = total / len;
    return mean.toFixed(2);
} //end calc mean

//Finds the smallest value of the array.
function findMin(array) {
    var min = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
        }
    }
    return min.toFixed(2);
} //end calcMin

//Finds the largest value of the array.
function findMax(array) {
    var max = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max.toFixed(2);
} //end calcMax


//NEEDS WORK.

function findMode(array){
    var firstArr = [];
    var secArr = [];
    var sort = array.sort(function(a, b) { return a - b });
    for(var i = 0; i < sort.length; i++){
        tempNumber = sort[i];
        for(var j = 1; j < sort.length; j++){
            if(tempNumber == sort[j]){
                firstArr.push(tempNumber);
                break;  
            }
        }
    }

    var stepper = 1;
    for(var k = 0; k < firstArr.length; k++){
        if(firstArr[k] == firstArr[stepper]){
            secArr.push(firstArr[k]);
        }
        stepper++;
    }
    return secArr.toString();
}

//Calculates/finds the median value.
function calcMedian(array) {
    var sort = array.sort(function(a, b) { return a - b });
    var middle = Math.floor((sort.length - 1) / 2);

    if (sort.length % 2) {
        return sort[middle].toFixed(2);
    } else {
        return ((sort[middle] + sort[middle + 1]) / 2).toFixed(2);
    }
} //end findMedian

//Calculates the variance of the array.
function calcVariance(array) {
    var mean = calcMean(array);
    var len = array.length;
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        var inter = array[i] - mean;
        total += Math.pow(inter, 2);
    }
    return (total / len).toFixed(2);
} //end calcVariance

//Calculates the standard deviation of the array values.
function calcStdDev(array) {
    return (Math.sqrt(calcVariance(array))).toFixed(2);
} //end calcStdDev