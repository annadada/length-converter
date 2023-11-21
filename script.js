document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const inputValue = document.getElementById('inputValue');
    const outputValue = document.getElementById('outputValue');
    const unitFromSelect = document.getElementById('unitFrom');
    const unitToSelect = document.getElementById('unitTo');
    const conversionDirection = document.getElementById('conversionDirection');
    const swapButton = document.getElementById('swap-units');

    // Listen for changes in unit selectors and input value
    unitFromSelect.addEventListener('change', convertAndUpdate);
    unitToSelect.addEventListener('change', convertAndUpdate);
    inputValue.addEventListener('input', convertAndUpdate);
    swapButton.addEventListener('click', swapUnits);

    // Function to handle conversion and update result
    function convertAndUpdate() {
        const unitFrom = unitFromSelect.value;
        const unitTo = unitToSelect.value;
        const valueToConvert = inputValue.value.trim();

        // Check if the input value is empty
        if (valueToConvert === '') {
            outputValue.innerText = '';
            conversionDirection.innerText = '';
            return;
        }

        // Check if the input value is a valid number
        const isNumeric = !isNaN(parseFloat(valueToConvert));

        if (!isNumeric) {
            alert('Please enter a valid number.');
            return;
        }

        const parsedValue = parseFloat(valueToConvert);
        const result = convert(parsedValue, unitFrom, unitTo);
        const formula = `${parsedValue} ${getUnitSymbol(unitFrom)} = ${result} ${getUnitSymbol(unitTo)}`;

        // Update the output value and conversion direction
        outputValue.innerText = formula;
    }

    // Function to swap selected units
    function swapUnits() {
        const temp = unitFromSelect.value;
        unitFromSelect.value = unitToSelect.value;
        unitToSelect.value = temp;
        convertAndUpdate();
    }

    // Function to perform unit conversion
    function convert(value, unitFrom, unitTo) {
        if (unitFrom === unitTo) {
            return value; // Same unit, no conversion needed
        }

        const baseValue = value * getConversionFactor(unitFrom);
        return baseValue / getConversionFactor(unitTo);
    }

    // Function to get conversion factor for a unit
    function getConversionFactor(unit) {
        switch (unit) {
            case 'meter':
                return 1;
            case 'kilometer':
                return 1000;
            case 'centimeter':
                return 0.01;
            case 'millimeter':
                return 0.001;
            case 'micrometer':
                return 1e-6;
            case 'nanometer':
                return 1e-9;
            case 'mile':
                return 1609.34;
            case 'yard':
                return 0.9144;
            case 'foot':
                return 0.3048;
            case 'inch':
                return 0.0254;
            case 'lightyear':
                return 9.461e+15;
            default:
                return 1; // Default to 1 for unknown units
        }
    }

    // Function to get unit symbol for display
    function getUnitSymbol(unit) {
        switch (unit) {
            case 'meter':
                return 'm';
            case 'kilometer':
                return 'km';
            case 'centimeter':
                return 'cm';
            case 'millimeter':
                return 'mm';
            case 'micrometer':
                return 'μm';
            case 'nanometer':
                return 'nm';
            case 'mile':
                return 'mi';
            case 'yard':
                return 'yd';
            case 'foot':
                return 'ft';
            case 'inch':
                return 'in';
            case 'lightyear':
                return 'ly';
            default:
                return '?'; // Default to '?' for unknown units
        }
    }
});
