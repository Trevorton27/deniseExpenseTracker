const expenseTbl = document.getElementById("expenseTbl");
const expenseTblRow = document.getElementById("tblRowInput");

const expenseDate = document.getElementById("dateInput");
const expenseDescr = document.getElementById("descrInput");
const expenseAmt = document.getElementById("amountInput");
const expenseVendor = document.getElementById("vendorInput");

const inputs = document.getElementsByTagName("input");

const addBtn = document.getElementById("addBtn");
  
addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("add button clicked");

    let dateNew = expenseDate.value;
    let descrNew = expenseDescr.value;
    let amountNew = expenseAmt.value; 
    let vendorNew = expenseVendor.value;

    const expenseTblTemplate = `
        <table>
            <tr>
                <td>${(dateNew)}</td>
                <td>${(descrNew)}</td>
                <td>${(amountNew)}</td>
                <td>${(vendorNew)}</td> 
                <td><input type="button" id="delExpenseBtn" value="Delete" onclick="deleteExpenseRow(this)"></td>
            </tr>
        </table>
    `;

   const template = expenseTblTemplate;
   
   expenseTbl.innerHTML += template; //not working with textContent

    expenseDate.value = ""; 
    expenseDescr.value = "";
    expenseAmt.value = "";
    expenseVendor.value = "";
});

function deleteExpenseRow(i) {
    console.log("function deleteExpenseRow activated");
    let expenseRow=i.parentNode.parentNode;
    expenseRow.parentNode.removeChild(expenseRow);
};
