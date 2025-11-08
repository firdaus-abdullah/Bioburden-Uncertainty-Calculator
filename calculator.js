/**
 * calculator.js
 * Contains the logic for the Bioburden MU Calculator.
 */

function calculateBioburden() {
    // 1. Get input values
    const resultCFUInput = document.getElementById('resultCFU');
    const expandedUncertaintyLog10Input = document.getElementById('expandedUncertaintyLog10');

    // Convert inputs to numbers, defaulting to 0 if empty or invalid
    const resultCFU = parseFloat(resultCFUInput.value) || 0;
    const expandedUncertaintyLog10 = parseFloat(expandedUncertaintyLog10Input.value) || 0;

    // Check for CFU <= 0
    if (resultCFU <= 0) {
        displayError("CFU must be > 0 for Log10 calculation. See Remark for <1 cfu.");
        return;
    }

    // --- 2. Perform Calculations ---

    // Log10 of Result: Log10(Result)
    const log10Result = Math.log10(resultCFU);

    // Uncertainty Interval (Log10): Log10(Result) +/- Expanded Uncertainty
    const uncertaintyIntervalLog10Lower = log10Result - expandedUncertaintyLog10;
    const uncertaintyIntervalLog10Upper = log10Result + expandedUncertaintyLog10;

    // MU of the sample (CFU): Convert Log10 Interval to CFU (10^Log10 Interval)
    const muSampleCFULower = Math.pow(10, uncertaintyIntervalLog10Lower);
    const muSampleCFUUpper = Math.pow(10, uncertaintyIntervalLog10Upper);

    // --- 3. Display Results (Formatting to match the image's precision) ---

    // Log10 of Result (4 decimal places like 1.6990)
    document.getElementById('log10Result').textContent = log10Result.toFixed(4);

    // Report Result (Log10)
    const formattedLog10Result = log10Result.toFixed(4);
    const formattedUncertainty = expandedUncertaintyLog10.toFixed(4);
    document.getElementById('reportLog10Value').textContent = formattedLog10Result;
    document.getElementById('reportLog10Uncertainty').textContent = formattedUncertainty;
    // Report Result (CFU)
    document.getElementById('reportCFUValue').textContent = resultCFU.toFixed(1);

    // Uncertainty Interval (Log10) (5 decimal places like 1.58817 and 1.8098)
    document.getElementById('uncertaintyIntervalLog10Lower').textContent = uncertaintyIntervalLog10Lower.toFixed(5);
    document.getElementById('uncertaintyIntervalLog10Upper').textContent = uncertaintyIntervalLog10Upper.toFixed(5);

    // MU of the sample (CFU) (1 decimal place like 38.7 and 64.5)
    const formattedMULower = muSampleCFULower.toFixed(1);
    const formattedMUUpper = muSampleCFUUpper.toFixed(1);
    document.getElementById('muSampleCFULower').textContent = formattedMULower;
    document.getElementById('muSampleCFUUpper').textContent = formattedMUUpper;

    // Uncertainty Interval (CFU) (No decimal places, using Math.floor() for rounddown)
    // NOTE: For the lower limit (38.7 -> 38), Math.floor is appropriate.
    // However, for the upper limit (64.5 -> 64) rounding down (Math.floor) is typically used 
    // to strictly define the maximum reported integer value.
    // If the intent was to round UP the upper limit (like 64.5 -> 65), you'd use Math.ceil().
    // Assuming "rounddown" applies to the conversion of the calculated CFU values to integers:
    const finalIntervalLower = Math.floor(muSampleCFULower);
    const finalIntervalUpper = Math.floor(muSampleCFUUpper); // Rounding down the upper limit as requested

    document.getElementById('uncertaintyIntervalCFULower').textContent = finalIntervalLower;
    document.
