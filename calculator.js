function calculate() {
    const inputCFUElement = document.getElementById('input_result');
    const rawCFU = parseFloat(inputCFUElement.value);
    
    // Fixed Expanded Uncertainty Value from the template example (0.1108)
    const EXPANDED_UNCERTAINTY = 0.1108; 

    // Reset error message
    document.getElementById('error-message').textContent = '';

    // Function to clear all result fields
    function clearResults() {
        const idsToClear = ['log_result', 'report_result_log_val', 'log_lower', 'log_upper', 'cfu_lower', 'mu_sample_center', 'cfu_upper', 'final_lower', 'final_upper'];
        idsToClear.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '#NUM!'; 
            }
        });
        document.getElementById('fixed_uncertainty').textContent = EXPANDED_UNCERTAINTY.toFixed(4);
    }
    
    // --- Error Handling (0 CFU or Invalid Input) ---
    if (isNaN(rawCFU) || rawCFU < 0) {
        document.getElementById('error-message').textContent = 'Error: Please key in a valid CFU count (must be non-negative).';
        clearResults();
        return;
    }
    
    if (rawCFU === 0) {
        document.getElementById('error-message').textContent = 'Error: Log10 of 0 is undefined. Report as "< 1 cfu" based on the limit of detection.';
        clearResults();
        return;
    }

    // --- Log Scale Calculations ---
    const logResult = Math.log10(rawCFU);
    const logLower = logResult - EXPANDED_UNCERTAINTY;
    const logUpper = logResult + EXPANDED_UNCERTAINTY;

    // --- CFU Scale (Anti-log) Calculations ---
    const cfuLower = Math.pow(10, logLower);
    const cfuUpper = Math.pow(10, logUpper);

    // --- Update HTML Elements ---
    
    // Row 2: Log10 of Result
    document.getElementById('log_result').textContent = logResult.toFixed(4);
    
    // Row 3: Report Result (Log10 ± Uncertainty)
    document.getElementById('report_result_log_val').textContent = logResult.toFixed(4);
    
    // Row 5: Uncertainty Interval (Log10)
    document.getElementById('log_lower').textContent = logLower.toFixed(4);
    document.getElementById('log_upper').textContent = logUpper.toFixed(4);
    
    // Row 6: MU of the sample (CFU - Anti-log)
    document.getElementById('cfu_lower').textContent = cfuLower.toFixed(2);
    document.getElementById('mu_sample_center').textContent = `< ${rawCFU.toFixed(0)} <`; // Uses the raw CFU for the middle value
    document.getElementById('cfu_upper').textContent = cfuUpper.toFixed(2);

    // Row 7: Final Uncertainty Interval (CFU) - Rounded to whole numbers
    document.getElementById('final_lower').textContent = Math.round(cfuLower);
    document.getElementById('final_upper').textContent = Math.round(cfuUpper);
}
