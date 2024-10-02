let tablebody = document.getElementById("table-data");
let deleteButton = document.getElementById("deleteData");
const data = [
  {
    id: 1,
    chemical_name: "Acetone",
    vendor: "Sigma-Aldrich",
    density: "0.784 g/cm³",
    viscosity: "0.32 cP",
    packaging: "Glass Bottle",
    pack_size: 500,
    unit: "mL",
    quantity: 10,
  },
  {
    id: 2,
    chemical_name: "Ethanol",
    vendor: "Fisher Scientific",
    density: "0.789 g/cm³",
    viscosity: "1.2 cP",
    packaging: "Plastic Bottle",
    pack_size: 1000,
    unit: "mL",
    quantity: 20,
  },
  {
    id: 3,
    chemical_name: "Methanol",
    vendor: "Merck",
    density: "0.792 g/cm³",
    viscosity: "0.59 cP",
    packaging: "Plastic Drum",
    pack_size: 200,
    unit: "L",
    quantity: 5,
  },
  {
    id: 4,
    chemical_name: "Benzene",
    vendor: "TCI Chemicals",
    density: "0.876 g/cm³",
    viscosity: "0.65 cP",
    packaging: "Metal Drum",
    pack_size: 25,
    unit: "L",
    quantity: 3,
  },
  {
    id: 5,
    chemical_name: "Chloroform",
    vendor: "Alfa Aesar",
    density: "1.489 g/cm³",
    viscosity: "0.54 cP",
    packaging: "Glass Bottle",
    pack_size: 100,
    unit: "mL",
    quantity: 15,
  },
  {
    id: 6,
    chemical_name: "Hexane",
    vendor: "Honeywell",
    density: "0.655 g/cm³",
    viscosity: "0.31 cP",
    packaging: "Plastic Bottle",
    pack_size: 500,
    unit: "mL",
    quantity: 8,
  },
  {
    id: 7,
    chemical_name: "Sulfuric Acid",
    vendor: "Sigma-Aldrich",
    density: "1.84 g/cm³",
    viscosity: "22 cP",
    packaging: "Glass Bottle",
    pack_size: 250,
    unit: "mL",
    quantity: 12,
  },
  {
    id: 8,
    chemical_name: "Toluene",
    vendor: "Fisher Scientific",
    density: "0.867 g/cm³",
    viscosity: "0.59 cP",
    packaging: "Plastic Bottle",
    pack_size: 1000,
    unit: "mL",
    quantity: 6,
  },
  {
    id: 9,
    chemical_name: "Hydrochloric Acid",
    vendor: "Merck",
    density: "1.18 g/cm³",
    viscosity: "2.0 cP",
    packaging: "Plastic Drum",
    pack_size: 50,
    unit: "L",
    quantity: 2,
  },
  {
    id: 10,
    chemical_name: "Acetic Acid",
    vendor: "TCI Chemicals",
    density: "1.05 g/cm³",
    viscosity: "1.22 cP",
    packaging: "Glass Bottle",
    pack_size: 1000,
    unit: "mL",
    quantity: 10,
  },
  {
    id: 11,
    chemical_name: "Nitric Acid",
    vendor: "Alfa Aesar",
    density: "1.51 g/cm³",
    viscosity: "1.6 cP",
    packaging: "Plastic Bottle",
    pack_size: 500,
    unit: "mL",
    quantity: 7,
  },
  {
    id: 12,
    chemical_name: "Sodium Hydroxide",
    vendor: "Honeywell",
    density: "2.13 g/cm³",
    viscosity: "79 cP",
    packaging: "Plastic Drum",
    pack_size: 100,
    unit: "kg",
    quantity: 1,
  },
  {
    id: 13,
    chemical_name: "Potassium Hydroxide",
    vendor: "Sigma-Aldrich",
    density: "2.04 g/cm³",
    viscosity: "60 cP",
    packaging: "Plastic Drum",
    pack_size: 50,
    unit: "kg",
    quantity: 4,
  },
  {
    id: 14,
    chemical_name: "Ammonium Hydroxide",
    vendor: "Fisher Scientific",
    density: "0.91 g/cm³",
    viscosity: "1.8 cP",
    packaging: "Plastic Bottle",
    pack_size: 1000,
    unit: "mL",
    quantity: 9,
  },
  {
    id: 15,
    chemical_name: "Hydrogen Peroxide",
    vendor: "Merck",
    density: "1.45 g/cm³",
    viscosity: "1.24 cP",
    packaging: "Glass Bottle",
    pack_size: 500,
    unit: "mL",
    quantity: 5,
  },
];
let ChemicalData = localStorage.getItem("ChemicalData")
  ? JSON.parse(localStorage.getItem("ChemicalData"))
  : (localStorage.setItem("ChemicalData", JSON.stringify(data)), data); // Default data

// Displaying data in table
function displayData() {
  let out = "";
  for (let item of ChemicalData) {
    out += `        <tr data-id="${item.id}">
                    <td><input type="checkbox" name="select"></td>
                    <td>${item.id}</td>
                    <td contenteditable='false' data-field="chemical_name">${item.chemical_name}</td>
                    <td contenteditable='false' data-field="vendor">${item.vendor}</td>
                    <td contenteditable='false' data-field="density">${item.density}</td>
                    <td contenteditable='false' data-field="viscosity">${item.viscosity}</td>
                    <td contenteditable='false' data-field="packaging">${item.packaging}</td>
                    <td contenteditable='false' data-field="pack_size">${item.pack_size}</td>
                    <td contenteditable='false' data-field="unit">${item.unit}</td>
                    <td contenteditable='false' data-field="quantity">${item.quantity}</td>
                    <td class="text-blue edit-btn">edit</td>
                </tr>
            `;
  }
  tablebody.innerHTML = out;

  // Attach event listeners to all the edit buttons
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", handleEdit);
  });
}

displayData();

function saveToLocalStorage() {
  localStorage.setItem("ChemicalData", JSON.stringify(ChemicalData));
}



// Adding new row
let addRow = document.getElementById("add-row");

addRow.addEventListener("click", function () {
  let data = ChemicalData.sort((a, b) => (a.id > b.id ? 1 : -1));
  const newId = data[data.length - 1].id + 1;
  const newRow = {
    id: newId,
    chemical_name: "New Chemical",
    vendor: "New Vendor",
    density: "0",
    viscosity: "0",
    packaging: "New Packaging",
    pack_size: "0",
    unit: "kg",
    quantity: "0",
  };

  ChemicalData.push(newRow);

  // Append the new row to the table
  let row = document.createElement("tr");
  row.setAttribute("data-id", newRow.id);
  row.innerHTML = `
    <td><input type="checkbox" name="select"></td>
    <td>${newRow.id}</td>
    <td contenteditable="false" class="editable" data-field="chemical_name" >${newRow.chemical_name}</td>
    <td contenteditable="false" class="editable" data-field="vendor" >${newRow.vendor}</td>
    <td contenteditable="false" class="editable" data-field="density" >${newRow.density}</td>
    <td contenteditable="false" class="editable" data-field="viscosity" >${newRow.viscosity}</td>
    <td contenteditable="false" class="editable" data-field="chemical_name" >${newRow.packaging}</td>
    <td contenteditable="false" class="editable" data-field="packaging" >${newRow.pack_size}</td>
    <td contenteditable="false" class="editable" data-field="unit" >${newRow.unit}</td>
    <td contenteditable="false" class="editable" data-field="quantity" >${newRow.quantity}</td>\
             <td class="text-blue edit-btn">edit</td>
  `;
   document.querySelectorAll(".edit-btn").forEach((button) => {
     button.addEventListener("click", handleEdit);
   });
  tablebody.appendChild(row);
  saveToLocalStorage();

  // const selectAllCheckbox = document.getElementsByName("select")
});

function handleEdit() {
  const row = this.closest("tr");
  const cells = row.querySelectorAll("td");

  // Check if the button is in "edit" or "save" mode
  if (this.textContent.toLowerCase() === "edit") {
    // Switch to "save" mode and make cells editable
    cells.forEach((cell, index) => {
      if (index > 1 && index < 10) {
        // Skip checkbox, ID, and button columns
        cell.setAttribute("contenteditable", "true");
        cell.classList.add("editable");
      }
    });
    this.textContent = "Save";
    this.classList.add("text-green");
  } else {
    // Save changes and switch back to "edit" mode
    cells.forEach((cell, index) => {
      if (index > 1 && index < 10) {
        cell.setAttribute("contenteditable", "false");
        cell.classList.remove("editable");

        // Save the updated data to the ChemicalData array
        const id = row.getAttribute("data-id");
        ChemicalData[id - 1][cell.getAttribute("data-field")] =
          cell.textContent;
      }
    });
    this.textContent = "edit";
    this.classList.remove("text-green");

    // Save changes to local storage
    saveToLocalStorage();
  }
}


// Select all checkboxes
document.getElementById("select-all").addEventListener("click", function () {
  const selectAllCheckbox = document.getElementsByName("select");
  for (let i = 0; i < selectAllCheckbox.length; i++) {
    selectAllCheckbox[i].checked = this.checked;
  }
});

// sorting data
// Track current sort order
let isSortedAsc = false;

// Sort in ascending order
const sortbyheader = (header) => {
  if (!isSortedAsc) {
    ChemicalData.sort((a, b) => (a[header] > b[header] ? 1 : -1));
    isSortedAsc = true;
  } else {
    ChemicalData.sort((a, b) => (a[header] < b[header] ? 1 : -1));
    isSortedAsc = false;
  }
  displayData(ChemicalData);
};

// moving data up and down
function getSelectedRows() {
  const selectedCheckboxes = document.querySelectorAll(
    "input[name='select']:checked"
  );
  return selectedCheckboxes;
}
function getUpadatesequence() {
  const rowsc = tablebody.querySelectorAll("tr");
  ChemicalData = Array.from(rowsc).map((row, index) => {
    const id = row.getAttribute("data-id");
    return {
      ...ChemicalData.find((item) => item.id == id), // Find the original item in ChemicalData
      position: index, // Update position if needed
    };
  });
}
document.getElementById("moverowup").addEventListener("click", function () {
  const selectedCheckboxes = getSelectedRows();

  if (selectedCheckboxes.length === 1) {
    let row = selectedCheckboxes[0].closest("tr");
    let previousRow = row.previousElementSibling;

    if (previousRow && previousRow.tagName === "TR") {
      row.parentNode.insertBefore(row, previousRow); // Move row up
      getUpadatesequence();
      saveToLocalStorage();
    }
  } else if (selectedCheckboxes.length === 0) {
    alert("Please select a row to move.");
  } else {
    alert("Only one row can be selected at a time.");
  }
});

document.getElementById("moverowdown").addEventListener("click", function () {
  const selectedCheckboxes = getSelectedRows();
  if (selectedCheckboxes.length === 1) {
    let row = selectedCheckboxes[0].closest("tr");
    let nextRow = row.nextElementSibling;

    if (nextRow && nextRow.tagName === "TR") {
      row.parentNode.insertBefore(nextRow, row); // Move row down by inserting the next row before the current row
      getUpadatesequence();
      saveToLocalStorage();
    }
  } else if (selectedCheckboxes.length === 0) {
    alert("Please select a row to move.");
  } else {
    alert("Only one row can be selected at a time.");
  }
});

// Delete selected rows

deleteButton.addEventListener("click", function () {
  const rowCheckboxes = document.querySelectorAll("input[name='select']:checked");
  rowCheckboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const rowId = parseInt(checkbox.closest("tr").getAttribute("data-id"));
      ChemicalData = ChemicalData.filter((item) => item.id !== rowId);
      checkbox.closest("tr").remove();
    }
  });
  saveToLocalStorage();
});

// Refresh the page
document.getElementById("refreshData").addEventListener("click", function () {
  if (confirm("Are you sure you want to refresh the page?")) {
    localStorage.removeItem("ChemicalData");
    localStorage.setItem("ChemicalData", JSON.stringify(data));
    location.reload();
  }
});

// save changes that are made in the table

document.getElementById("saveData").addEventListener("click", function () {

  const rowsc = tablebody.querySelectorAll("tr");
  ChemicalData = Array.from(rowsc).map((row, index) => {
    const id = row.getAttribute("data-id");
    return {
      ...ChemicalData.find((item) => item.id == id), // Find the original item in ChemicalData
      position: index, // Update position if needed
    };
  });
  saveToLocalStorage();
  alert("Data saved successfully");
});
