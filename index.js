const data = [];
let close = document.getElementById("close");
let addbtn = document.getElementById("addbtn");
let submit = document.getElementById("submit");
let print = document.getElementById("print");
let showbtn = document.getElementById("showbtn");
let form = document.getElementById("form");
let u_submit = document.getElementById("u-submit");
let u_close = document.getElementById("u-close");

u_close.onclick = function () {
    let modal = document.getElementById("u-modal");
    let table = document.getElementById("table");
    modal.style.display = "none";
    table.style.display = "block";
}
addbtn.onclick = function () {
    let modal = document.getElementById("modal");
    let table = document.getElementById("table");
    modal.style.display = "block";
    table.style.display = "none";
}
close.onclick = function () {
    let modal = document.getElementById("modal");
    let table = document.getElementById("table");
    modal.style.display = "none";
    table.style.display = "block";
}


function deletedata() {

    let delet = document.getElementsByClassName("delete");
    for (let i = 0; i < data.length; i++) {
        delet[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            let ind = tr.getAttribute("index");
            data.splice(ind, 1);
            tabledata();
            alert("Data deleted Successfully...");
        }
    }
}

function tabledata() {
    print.innerHTML = "";
    let index = 0;
    for (let x in data) {
        print.innerHTML +=
            "<tr index=" + index + "> <td>" + data[x].rollno + "</td> <td>" + data[x].name + "</td> <td>" + data[x].gender + "</td> <td>" + data[x].age + "</td> <td>" + data[x].birthdate +
            "</td> <td><button class='btn delete'> Delete </button> <button class='btn update'> Update </button></td> </tr>";
        index += 1;
    }
    deletedata();
    updatedate();
}

function updatedate() {
    let update = document.getElementsByClassName("update");

    for (let i = 0; i < data.length; i++) {
        update[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            let index = tr.getAttribute("index");
            let modal = document.getElementById("u-modal");
            let table = document.getElementById("table");
            modal.style.display = "block";
            table.style.display = "none";

            u_submit.onclick = function () {
                let modal = document.getElementById("u-modal");
                let table = document.getElementById("table");
                modal.style.display = "none";
                table.style.display = "block";

                let rollno = document.getElementById("u-rollno").value;
                let name = document.getElementById("u-name").value;
                let gender = document.getElementById("u-gender").value;
                let age = document.getElementById("u-age").value;
                let birthdate = document.getElementById("u-birthdate").value;

                if (rollno == "" || name == "" || gender == "" || age == "" || birthdate == "") {
                    alert("Please, Enter valid data..")
                }
                else {
                    data[index] = {
                        rollno: rollno,
                        name: name,
                        gender: gender,
                        age: age,
                        birthdate: birthdate
                    }
                    tabledata();
                    alert("Data updated Successfully...");
                }
            }

        }
    }
}

submit.onclick = function () {
    let modal = document.getElementById("modal");
    let table = document.getElementById("table");
    modal.style.display = "none";
    table.style.display = "block";

    let rollno = document.getElementById("rollno").value;
    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let age = document.getElementById("age").value;
    let birthdate = document.getElementById("birthdate").value;

    if (rollno == "" || name == "" || gender == "" || age == "" || birthdate == "") {
        alert("Please, Enter valid data..")
    }
    else {
        let arr = {
            rollno: rollno,
            name: name,
            gender: gender,
            age: age,
            birthdate: birthdate
        };

        data.push(arr);
        if (data[0] == undefined) {
            alert("Student is not found..");
        }
        tabledata();
        alert("Data added Successfully...");
        form.reset();
    }
}