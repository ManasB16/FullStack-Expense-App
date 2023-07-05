const form = document.querySelector("#myform");
const amount = document.querySelector("#amount");
const description = document.querySelector("#description");
const category = document.querySelector("#category");
const userlist = document.querySelector("#users");

form.addEventListener("submit", onsubmit);

async function onsubmit(e) {
  e.preventDefault();

  let obj = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  };

  axios
    .post("http://localhost:8000/add-expense", obj)
    .then((res) => {
      showNewExpOnScreen(res.data.newExp);
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:8000/get-expense")
    .then((res) => {
      for (var i = 0; i < res.data.allExp.length; i++) {
        showNewExpOnScreen(res.data.allExp[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showNewExpOnScreen(expense) {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";

  const parentNode = document.getElementById("users");
  const childElement = `<li id=${expense.id}> ${expense.amount} - ${expense.description} - ${expense.category}
                        <button onclick=deleteExp('${expense.id}')> Delete </button>
                        <button onclick="editExp('${expense.id}','${expense.amount}','${expense.description}','${expense.category}')"> Edit </button>
                        </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childElement;
}

function deleteExp(expID) {
  axios
    .delete(`http://localhost:8000/delete-expense/${expID}`)
    .then((res) => {
      removeExpFromScreen(expID);
    })
    .catch((err) => {
      console.log(err);
    });
}

function editExp(expID, amount, description, category) {
  //   userid = expID;
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  document.getElementById("category").value = category;

  axios
    .delete(`http://localhost:8000/delete-expense/${expID}`)
    .then((res) => {
      removeExpFromScreen(expID);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeExpFromScreen(expID) {
  const parentNode = document.getElementById("users");
  const childnodetobeDeleted = document.getElementById(expID);
  if (childnodetobeDeleted) {
    parentNode.removeChild(childnodetobeDeleted);
  }
}
