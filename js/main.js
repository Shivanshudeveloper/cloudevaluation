$(document).ready(() => {
    var pageURL = window.location.href
    var url = new URL(pageURL)
    var page = url.searchParams.get("page")

    if (page === "groups") {
        $("#root").load("components/groups.html")
        loadlist()
    } else if (page === "register") {
        $("#root").load("components/register.html")
    } else if (page === "view") {
        $("#root").load("components/view.html")
    } else if (page === "marks") {
        $("#root").load("components/marks.html")
        allMarks()
    } 
})

const allMarks = () => {
    var database = firebase.database()
    var ref = database.ref('marks/')
    ref.on('value', gotData, errData)
    var groupCount = 0;
    function gotData(data) {
        var posts = data.val()
        var keys = Object.keys(posts)
        for (let i = 0; i < keys.length; i++) {
            groupCount++
            var k = keys[i]
            var StudentsName = posts[k].StudentsName
            var delivery = posts[k].Delivery
            var efficiency = posts[k].Efficiency
            var General_Knowladge = posts[k].General_Knowladge
            var Runtime = posts[k].Runtime
            var Total = posts[k].Total

            var ProjectName = posts[k].Project
            var element = `
                    <ul class="list-group mt-3">
                        <li class="list-group-item active"><h5>${StudentsName}</h5></li>
                        <li class="list-group-item">Delivery Marks: ${delivery}</li>
                        <li class="list-group-item">Efficiency Marks: ${efficiency}</li>
                        <li class="list-group-item">General Knowladge: ${General_Knowladge}</li>
                        <li class="list-group-item">Runtime Marks: ${Runtime}</li>
                        <li class="list-group-item">Total Marks: ${Total}</li>
                    </ul>
                    <hr />
        `;
            document.getElementById("AllMarks").innerHTML += element;
            console.log("Marks Added")
        }
    }
    function errData(error) {
        console.error(error);
    }
}


const loadlist = () => {
    var database = firebase.database()
    var ref = database.ref('groups/')
    ref.on('value', gotData, errData)
    var groupCount = 0;
    function gotData(data) {
        var posts = data.val()
        var keys = Object.keys(posts)
        for (let i = 0; i < keys.length; i++) {
            groupCount++
            var k = keys[i]
            var studentsName = posts[k].Names
            var email = posts[k].Email
            var ProjectName = posts[k].Project
            var element = `
                    <div class="col-sm mt-2">
                        <div class="card";">
                        <div class="card-body">
                            <h5 class="card-title"><a href="index.html?page=view&projectName=${ProjectName}&email=${email}&names=${studentsName}" class="card-link">${ProjectName}</a></h5>
                            <h6 class="card-subtitle mb-2 text-muted">${email}</h6>
                            <p class="card-text">
                                ${studentsName}
                            </p>
                            <a href="index.html?page=view&projectName=${ProjectName}&email=${email}&names=${studentsName}" class="btn btn-primary card-link">View</a>
                        </div>
                        </div>
                    </div>
        `;
            document.getElementById("grouplist").innerHTML += element;
            console.log("List Added")
        }
    }
    function errData(error) {
        console.error(error);
    }
}

const register = () => {
    event.preventDefault()
    var projectname = $("#projectName").val()
    var email = $("#email").val()
    var phoneNumber = $("#phone").val()
    var studentsName = $("#studentsName-txt").val()
    if (projectname.length == 0) {
        swal("Empty Field!", "You left the Project Name!", "error");
    } else if (email.length == 0) {
        swal("Empty Field!", "You left the Email!", "error");
    } else if (phoneNumber.length == 0) {
        swal("Empty Field!", "You left the Phone!", "error");
    } else if (studentsName.length == 0) {
        swal("Empty Field!", "Name of Students are not filled!", "error");
    } else {
        var database = firebase.database()
        var ref = database.ref('groups/')
        data = {
            Project: projectname,
            Email: email,
            Phone: phoneNumber,
            Names: studentsName
        }
        ref.push(data)
    }
    var element = `
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Well done!</h4>
    <p>Your Team Is Registered</p>
    <hr>
    <p class="mb-0">You can mail us @ support@flekdeno.com OR Contact @8888-121-888</p>
    </div>
    `;
    $("#register-form").html(element)
}

const submitMarks = () => {
    event.preventDefault()
    var pageURL = window.location.href
    var url = new URL(pageURL)
    var projectName = url.searchParams.get("projectName")
    var email = url.searchParams.get("email")
    var studentsName = url.searchParams.get("names")
    var nameArr = studentsName.split(',')
    var deliveryMarks = $("#delivery").val()
    var standardMarks = $("#standard").val()
    var efficiencyMarks = $("#efficiency").val()
    var runtimeMarks = $("#runtime").val()
    var generalMarks = $("#general").val()
    var total = $("#total").val()
    
    var database = firebase.database()
    var ref = database.ref('marks/')
    for (let i = 0; i < nameArr.length; i++) {
        data = {
            Project: projectName,
            StudentsName: nameArr[i],
            Delivery: deliveryMarks,
            Coding_Standard: standardMarks,
            Efficiency: efficiencyMarks,
            Runtime: runtimeMarks,
            General_Knowladge: generalMarks,
            Total: total
        }
        ref.push(data)
    }
    var element = `
        <div class="alert alert-primary mt-5" role="alert">
            Please wait marks are uploading!!
        </div>
    `;
    $("#marksSection").html(element)
    setTimeout(() => {
        window.location.href = "index.html?page=groups"
    }, 3500)
}