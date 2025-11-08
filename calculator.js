// Function to calculate the Standard Deviation of an array
function standardDeviation(arr) {
    const n = arr.length;
    if (n === 0) return 0;
    const mean = arr.reduce((a, b) => a + b) / n;
    return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1));
}

// Main calculation function
function calculate() {
    const k_factor = 2.0; // Coverage factor for 95% confidence

    // 1. Collect and Log Transform Data
    const cfuInputs = [
        document.getElementById('cfu1'),
        document.getElementById('cfu2'),
        document.getElementById('cfu3'),
        document.getElementById('cfu4'),
        document.getElementById('cfu5')
    ];
    
    // Filter out empty or non-numeric values
    const rawCFUs = cfuInputs.map(input => parseFloat(input.value)).filter(val => val > 0);

    // Apply log10 and update the table (B column)
    const logValues = rawCFUs.map(cfu => Math.log10(cfu));
    
    // Display log values (handling the original 5 rows)
    for (let i = 0; i < 5; i++) {
        const logCell = document.getElementById(`log${i + 1}`);
        if (i < logValues.length) {
            logCell.textContent = logValues[i].toFixed(4);
        } else {
            logCell.textContent = ''; // Clear if less than 5 data points
        }
    }

    if (logValues.length < 2) {
        // Not enough data for statistics
        document.getElementById('mean_log').textContent = 'N/A';
        document.getElementById('stdev_log').textContent = 'N/A';
        document.getElementById('exp_uncert').textContent = 'N/A';
        document.getElementById('mean_cfu').textContent = 'N/A';
        document.getElementById('lower_limit').textContent = 'N/A';
        document.getElementById('upper_limit').textContent = 'N/A';
        return;
    }

    // 2. Log Scale Calculations
    const meanLog = logValues.reduce((a, b) => a + b) / logValues.length;
    const stdevLog = standardDeviation(logValues);
    const expUncert = stdevLog * k_factor;

    // 3. Anti-log (CFU Scale) Calculations
    const meanCFU = Math.pow(10, meanLog);
    const lowerLimit = Math.pow(10, meanLog - expUncert);
    const upperLimit = Math.pow(10, meanLog + expUncert);

    // 4. Display Results
    document.getElementById('mean_log').textContent = meanLog.toFixed(4);
    document.getElementById('stdev_log').textContent = stdevLog.toFixed(4);
    document.getElementById('exp_uncert').textContent = expUncert.toFixed(4);
    document.getElementById('k_factor').textContent = k_factor.toFixed(2); // Ensure k is always shown

    document.getElementById('mean_cfu').textContent = meanCFU.toFixed(1);
    document.getElementById('lower_limit').textContent = lowerLimit.toFixed(1);
    document.getElementById('upper_limit').textContent = upperLimit.toFixed(1);
}
