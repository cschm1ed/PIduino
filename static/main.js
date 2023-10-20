const createTable = function () {
    fetch("table")
        .then(data => data.json())
        .then(data =>  {
            let tableDiv = document.getElementById("table");
            let keys = Object.keys(data[0]);

            let tr = "<table>";
            tr += "<tr>";
            for (let key of keys) {
                tr += "<th>" + key + "</th>";
            }
            tr += "</tr>";
            for (let obj of data) {
                tr += "<tr>";
                for (let key of keys) {
                    tr += "<td>" + obj[key] + "</td>";
                }
                tr += "</tr>";
            }
            tr += "</table>";

            tableDiv.innerHTML += tr;
    })
        .catch(err => console.log("ERROR: " + err));
}

const connectSelection = function() {
    fetch("connect-board")
        .then(data => data.json())
        .then(data => {
            if (data.ok === 500) {
                console.log("ERROR: could not fetch Serial Connections");
            }
            let dropdown = document.getElementById("connectionDropdown");
            for (let connection of data) {
                dropdown.innerHTML += "<p>" + connection.path + "</p>";
            }
        })
}

createTable()