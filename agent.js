const model = "MobileNet";
const maleOrFemaleModel = "https://teachablemachine.withgoogle.com/models/Vsqm0_v-a/model.json";

function id(id) {
    return document.getElementById(id);
}

function tableRow(result) {
    return `
    <tr>
        <th>${result.label}</th>
        <td>${(result.confidence * 100).toFixed(2)}%</td>
    </tr>
    `;
}

function displayResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        id("result-text").innerHTML = "";
        results.forEach(result => {
            id("table").innerHTML += tableRow(result);
        });
    }
}

function calculate() {
    // Display a placeholder message
    id("table").innerHTML = "";
    id("result-text").innerHTML = "Please wait...";
    ml5.imageClassifier(maleOrFemaleModel).then(classifier => {
        classifier.classify(id("image"), displayResults);
    });
}

// Event listener to trigger the model when an image is uploaded
id("file-input").onchange = e => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
        const reader = new FileReader();
        reader.onload = e => id("image").src = e.target.result;
        reader.readAsDataURL(fileList[0]);

        calculate();
    }
};
