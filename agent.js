// To add a model, add an object with the name and url of the model in this list.
const models = [
    {
        "name": "Male / Female",
        "model": "https://teachablemachine.withgoogle.com/models/Vsqm0_v-a/model.json",
        "first": true
    },
    {
        "name": "With/Without Headwear",
        "model": "https://teachablemachine.withgoogle.com/models/b_xJa7kL1/model.json"
    },
    {
        "name": "With/Without Glasses",
        "model": "https://teachablemachine.withgoogle.com/models/WwS0KEry5/model.json"
    },
    {
        "name": "MobileNet",
        "model": "MobileNet"
    }
];

let buttons = [], classifier;

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
    classifier.then(classifier => {
        classifier.classify(id("image"), displayResults);
    });
}

// Runs when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Create buttons for the model
    models.forEach(model => {
        const button = document.createElement("button");
        button.innerHTML = model.name;
        button.onclick = () => {
            buttons.forEach(btn => btn.disabled = false);
            button.disabled = true;
            classifier = ml5.imageClassifier(model.model);
        };
        buttons.push(button);
        id("model-btns").append(button);
    });

    // The default button is the first one in the list
    buttons[0].disabled = true;
    // Create classifier for first model in the list (as the button is not clicked to trigger it)
    classifier = ml5.imageClassifier(models[0].model);

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
});
