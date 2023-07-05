const cs = [];
const mca = [];
const pgdca = [];
const aiml = [];

let course = document.getElementById("course");
let close = document.getElementById("close");
let addbtn = document.getElementById("addbtn");
let submit = document.getElementById("submit");
let print = document.getElementById("print");
let showbtn = document.getElementById("showbtn");
let form = document.getElementById("form");
let u_submit = document.getElementById("u-submit");
let u_close = document.getElementById("u-close");
let msg = document.getElementById("msg");

if (course.value == "") {
    let msg = document.getElementById("alert");
    msg.innerHTML = "Please, Select course";
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
u_close.onclick = function () {
    let modal = document.getElementById("u-modal");
    let table = document.getElementById("table");
    modal.style.display = "none";
    table.style.display = "block";
}

course.onchange = function () {
    let cour = course.value;
    let msg = document.getElementById("alert");
    let key = cour;

    if (course.value == "") {
        msg.innerHTML = "Please, select course";
    }
    else {
        msg.innerHTML = "";
    }

    cs.splice(0, cs.length);
    mca.splice(0, mca.length);
    pgdca.splice(0, pgdca.length);
    aiml.splice(0, aiml.length);

    let temp = localStorage.getItem(key);

    if (temp != null) {
        temp = JSON.parse(temp);

        for (let i = 0; i < temp.length; i++) {
            let t = {
                rollno: temp[i].rollno,
                name: temp[i].name,
                gender: temp[i].gender,
                age: temp[i].age,
                birthdate: temp[i].birthdate
            }
            switch (cour) {
                case "cs":
                    cs.push(t);
                    break;

                case "mca":
                    mca.push(t);
                    break;

                case "pgdca":
                    pgdca.push(t);
                    break;

                case "aiml":
                    aiml.push(t);
                    break;
                case "":
                    break;
            }
        }
    }
    tabledata();
}

submit.onclick = function () {
    cour = course.value;
    let modal = document.getElementById("modal");
    let table = document.getElementById("table");
    modal.style.display = "none";
    table.style.display = "block";

    let rollno = document.getElementById("rollno").value;
    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let age = document.getElementById("age").value;
    let birthdate = document.getElementById("birthdate").value;

    if (rollno == "" || name == "" || gender == "" || age == "" || birthdate == "" || age < 0 || age > 110) {
        msg.style.display = "block";
        msg.classList.remove("success");
        msg.classList.add("fail");
        msg.innerHTML = "Please, Enter valid data.";

        setTimeout(() => {
            msg.style.display = "none"
        }, 3000);
    }
    else {
        let cour = course.value;

        let arr = {
            rollno: rollno,
            name: name,
            gender: gender,
            age: age,
            birthdate: birthdate
        };

        if (cour == "cs") {
            let key = cour;
            adata(cs, arr, key);
        }
        else if (cour == "mca") {
            let key = cour;
            adata(mca, arr, key);
        }
        else if (cour == "pgdca") {
            let key = cour;
            adata(pgdca, arr, key);
        }
        else if (cour == "aiml") {
            let key = cour;
            adata(aiml, arr, key);
        }
        else if (cour == "") {
            msg.style.display = "block";
            msg.classList.remove("success");
            msg.classList.add("fail");
            msg.innerHTML = "Please, select course.";

            setTimeout(() => {
                msg.style.display = "none"
            }, 3000);
        }
    }

    form.reset();
    tabledata();
}

function deletedata() {

    let cour = course.value;
    if (cour == "cs") {
        let key = cour;
        ddata(cs, key);
    }
    else if (cour == "mca") {
        let key = cour;
        ddata(mca, key);
    }
    else if (cour == "pgdca") {
        let key = cour;
        ddata(pgdca, key);
    }
    else if (cour == "aiml") {
        let key = cour;
        ddata(aiml, key);
    }
}

function tabledata() {
    let cour = course.value;
    if (cour == "") {
        tdata();
    }
    else if (cour == "cs") {
        tdata(cs);
    }
    else if (cour == "mca") {
        tdata(mca);
    }
    else if (cour == "pgdca") {
        tdata(pgdca);
    }
    else if (cour == "aiml") {
        tdata(aiml);
    }

    deletedata();
    updatedata();
}

function updatedata() {
    let cour = course.value;

    if (cour == "cs") {
        let key = cour;
        udata(cs, key);
    }
    else if (cour == "mca") {
        let key = cour;
        udata(mca, key);
    }
    else if (cour == "pgdca") {
        let key = cour;
        udata(pgdca, key);
    }
    else if (cour == "aiml") {
        let key = cour;
        udata(aiml, key);
    }
}

function ddata(data, key) {
    let delet = document.getElementsByClassName("delete");
    for (let x in data) {
        delet[x].onclick = function () {
            let tr = this.parentElement.parentElement;
            let ind = tr.getAttribute("index");

            if (window.confirm("are you sure to delete ?")) {
                data.splice(ind, 1);
                localStorage.setItem(key, JSON.stringify(data));

                msg.style.display = "block";
                msg.classList.remove("fail");
                msg.classList.add("success");
                msg.innerHTML = "Data deleted successfully.";

                setTimeout(() => {
                    msg.style.display = "none"
                }, 3000);
            }
            tabledata();
        }
    }
}

function tdata(data) {
    print.innerHTML = "";
    let index = 0;
    for (let x in data) {
        print.innerHTML +=
            "<tr index=" + index + "> <td>" + data[x].rollno + "</td> <td>" + data[x].name + "</td> <td>" + data[x].gender + "</td> <td>" + data[x].age + "</td> <td>" + data[x].birthdate +
            "</td> <td><button class='btn delete'> Delete </button> <button class='btn update'> Update </button></td> </tr>";
        index += 1;
    }
}

function udata(data, key) {

    let update = document.getElementsByClassName("update");

    for (let i = 0; i < data.length; i++) {
        update[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            let index = tr.getAttribute("index");
            let modal = document.getElementById("u-modal");
            let table = document.getElementById("table");
            modal.style.display = "block";
            table.style.display = "none";

            let rollno = document.getElementById("u-rollno");
            let name = document.getElementById("u-name");
            let gender = document.getElementById("u-gender");
            let age = document.getElementById("u-age");
            let birthdate = document.getElementById("u-birthdate");

            rollno.value = data[index].rollno;
            name.value = data[index].name;
            gender.value = data[index].gender;
            age.value = data[index].age;
            birthdate.value = data[index].birthdate;

            u_submit.onclick = function () {
                let modal = document.getElementById("u-modal");
                let table = document.getElementById("table");
                modal.style.display = "none";
                table.style.display = "block";

                rollno = document.getElementById("u-rollno").value;
                name = document.getElementById("u-name").value;
                gender = document.getElementById("u-gender").value;
                age = document.getElementById("u-age").value;
                birthdate = document.getElementById("u-birthdate").value;


                if (rollno == "" || name == "" || gender == "" || age == "" || birthdate == "" || age < 0 || age > 110) {
                    msg.style.display = "block";
                    msg.classList.remove("success");
                    msg.classList.add("fail");
                    msg.innerHTML = "Please, Enter valid data.";

                    setTimeout(() => {
                        msg.style.display = "none"
                    }, 3000);
                }
                else if (window.confirm("Are you sure to update ?")) {
                    data[index] = {
                        rollno: rollno,
                        name: name,
                        gender: gender,
                        age: age,
                        birthdate: birthdate
                    }
                    localStorage.setItem(key, JSON.stringify(data));

                    msg.style.display = "block";
                    msg.classList.remove("fail");
                    msg.classList.add("success");
                    msg.innerHTML = "Data updated successfully.";

                    setTimeout(() => {
                        msg.style.display = "none"
                    }, 3000);
                }
                tabledata();
            }

        }
    }
}

function adata(data, arr, key) {
    data.push(arr);
    localStorage.setItem(key, JSON.stringify(data));
    msg.style.display = "block";
    msg.classList.remove("fail");
    msg.classList.add("success");
    msg.innerHTML = "Date added successfully.";

    setTimeout(() => {
        msg.style.display = "none"
    }, 3000);
}