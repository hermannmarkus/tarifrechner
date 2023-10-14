function setCellValue(cellId, value, increaseType) {
    const selector = '[data-id="' + cellId + '"]';
    const cell = jQuery("#targetTable").find('[data-id="' + cellId + '"]');
    cell.text(value);

    cell.removeClass("table-primary");
    cell.removeClass("table-secondary");

    if (increaseType === "percent") {
        cell.addClass("table-primary");
    }

    if (increaseType === "absolute") {
        cell.addClass("table-secondary");
    }
}

function calculate() {
    const percentage = parseInt(jQuery("#percentInput").val());
    const minimum = parseInt(jQuery("#minimumInput").val());
    const resultView = jQuery("#resultView").val();

    cells = jQuery("#sourceTable").find('td');

    jQuery.each(cells, function(index, cell) {
        const selector = jQuery(cell).attr("data-id");
        const inputText = jQuery("#sourceTable").find('[data-id="' + selector + '"]').text();

        if (inputText !== "") {
            const inputNumber = parseFloat(inputText);

            const percentageIncrease = (percentage / 100) * inputNumber;
            const percentageResult = (inputNumber + percentageIncrease).toFixed(2);
            const absoluteResult = (inputNumber + minimum).toFixed(2);

            if (parseInt(percentageResult) > parseInt(absoluteResult)) {
                if (resultView === "absolute") {
                    setCellValue(selector, percentageResult, "percent");
                }

                if (resultView === "absoluteIncrease") {
                    setCellValue(selector, "+" + percentageIncrease.toFixed(2), "percent");
                }

                if (resultView === "percentIncrease") {
                    setCellValue(selector, "+" + percentage + "%", "percent");
                }

            } else if (parseInt(percentageResult) < parseInt(absoluteResult)) {
                if (resultView === "absolute") {
                    setCellValue(selector, absoluteResult, "absolute");
                }

                if (resultView === "absoluteIncrease") {
                    setCellValue(selector, "+" + minimum, "absolute");
                }

                if (resultView === "percentIncrease") {
                    const percentageIncreaseForAbsolute = ((absoluteResult - inputNumber) / inputNumber * 100).toFixed(2);
                    setCellValue(selector, "+" + percentageIncreaseForAbsolute + "%", "absolute");
                }
            } else {
                if (resultView === "absolute") {
                    setCellValue(selector, inputNumber);
                }

                if (resultView === "absoluteIncrease") {
                    setCellValue(selector, "+0");
                }

                if (resultView === "percentIncrease") {
                    setCellValue(selector, "+0%");
                }
            }
        }
    });
}

jQuery("#calculateButton").on("click", calculate);
jQuery("#percentInput").on("change", calculate);
jQuery("#minimumInput").on("change", calculate);
jQuery("#resultView").on("change", calculate);
