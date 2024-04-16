let data = [{
    studentId: 1,
    name: "Nguyễn Văn A",
    dob: "12/04/2024",
    gender: "Nam",
    courses: "Công nghệ thông tin",
    address: "123 Đường ABC, Quận XYZ, Thành phố HCM",
    phone: "0964644897",
    cmnd: "001202001003",
    consultant: "Nguyễn Huy Hoàng",
    hignschool: "THPT Phú Xuyên A",
    email: "hoangutc2002@gmail.com"
},
{
    studentId: 2,
    name: "Trần Thị B",
    dob: "12/04/2024",
    gender: "Nam",
    courses: "Công nghệ thông tin",
    address: "456 Đường XYZ, Quận ABC, Thành phố Hà Nội",
    phone: "0964644897",
    cmnd: "001202001004",
    consultant: "Nguyễn Huy Hoàng",
    hignschool: "THPT Phú Xuyên A",
    email: "hoangutc2002@gmail.com"
},
{
    studentId: 3,
    name: "Lê Văn C",
    dob: "12/04/2024",
    gender: "Nữ",
    courses: "Xây dựng",
    address: "789 Đường DEF, Quận HIJ, Thành phố Đà Nẵng",
    phone: "0964644897",
    cmnd: "001202001005",
    consultant: "Nguyễn Huy Hoàng",
    highschool: "THPT Phú Xuyên A",
    email: "hoangutc2002@gmail.com"
},
{
    studentId: 4,
    name: "Nguyễn Huy Hoàng",
    dob: "12/04/2024",
    gender: "Nam",
    courses: "Kinh tế",
    address: "789 Đường DEF, Quận HIJ, Thành phố Đà Nẵng",
    phone: "0964644897",
    cmnd: "001202001006",
    consultant: "Nguyễn Huy Hoàng",
    highschool: "THPT Phú Xuyên A",
    email: "hoangutc2002@gmail.com"
},
{
    studentId: 5,
    name: "Lê Quang Việt",
    dob: "12/04/2024",
    gender: "Nữ",
    courses: "Xây dựng",
    address: "789 Đường DEF, Quận HIJ, Thành phố Đà Nẵng",
    phone: "0964644897",
    cmnd: "001202001007",
    consultant: "Nguyễn Huy Hoàng",
    highschool: "THPT Phú Xuyên A",
    email: "hoangutc2002@gmail.com"
},
{
    studentId: 6,
    name: "Tạ Quang Lợi",
    dob: "12/04/2024",
    gender: "Nữ",
    courses: "Xây dựng",
    address: "789 Đường DEF, Quận HIJ, Thành phố Đà Nẵng",
    phone: "0964644897",
    cmnd: "001202001008",
    consultant: "Nguyễn Huy Hoàng",
    highschool: "THPT Phú Xuyên A",
    email: "hoangutc2002@gmail.com"
}
];

//save to local storage
function saveData(){
	localStorage.setItem("data", JSON.stringify(data));
}

//retrieve data from local storage
function getData(){
	data = JSON.parse(localStorage.getItem("data")).length === 0 ? data : JSON.parse(localStorage.getItem("data"));
}

function renderTable(inpt){
	let res = inpt;
	if(inpt === undefined){
		res = data;
	}else{
		if(inpt.length === 0){
			res = [];
		}
	}
	
	let ret = ` <tr>
		<th></th>
		<th>studentId</th>
		<th>name</th>
		<th>dob</th>
		<th>gender</th>
		<th>courses</th>
		<th>phone</th>
		<th>cmnd</th>
		<th>action</th>
	</tr>`;
	for (let i = 0; i < res.length; i++) {
		ret += `
		<tr>
			<td><input type="checkbox" value="${res[i].studentId}" name="toremove"/></td>
			<td>${res[i].studentId}</td>
			<td>${res[i].name}</td>
			<td>${res[i].dob}</td>
			<td>${res[i].gender}</td>
			<td>${res[i].courses}</td>
			<td>${res[i].phone}</td>
			<td>${res[i].cmnd}</td>
			<td>
				<button class="open-edit" value="${res[i].studentId}">Edit</button>
				<button class="open-detail" value="${res[i].studentId}">Show detail</button>
				<button class="open-delete" value="${res[i].studentId}">Delete</button>
			</td>
		</tr>`;
	}


	document.getElementById('list').innerHTML = ret;


}

//reset form and hide modal
function cleanUp(){
	//save data
	saveData();
	//resetForm
	document.getElementById('modal-form').reset();
	//hide modal
	document.getElementsByClassName("modal-container")[0].style.display = 'none';
	//reattach events
	attach();


}

//add function
function add(){
	//initialize new person with data from input fields
	let new_student = {
		id: data.length,
		studentId: document.getElementById('studentId').value,
		name: document.getElementById('name').value,
		dob: document.getElementById('dob').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        courses: document.getElementById('courses').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        cmnd: document.getElementById('cmnd').value,
        consultant: document.getElementById('consultant').value,
        highschool: document.getElementById('highschool').value,
        email: document.getElementById('email').value,

	}
	//add to data
	data.push(new_student);
	//hide modal on submit
	document.getElementsByClassName("modal-container")[0].style.display = 'none';
	//refreah table
	renderTable();
	//clean up form
	cleanUp();
}

//search function
function search(key){
	let ret = [];
	for(let i = 0; i < data.length; ++i){
		if(data[i].name.toLowerCase().includes(key)){
			ret.push(data[i])
		}
	}
	renderTable(ret)
}

//edit function
function edit(id){
	//find and get corresponding person by id
	for(let i = 0; i < data.length; ++i){
		if(data[i].studentId === parseInt(id)){
			//update data
			data[i].studentId = document.getElementById('studentId').value;
			data[i].name = document.getElementById('name').value;
			data[i].gender = document.querySelector('input[name="gender"]:checked').value;
            data[i].courses = document.getElementById('courses').value;
            data[i].address = document.getElementById('address').value;
            data[i].phone = document.getElementById('phone').value;
            data[i].cmnd = document.getElementById('cmnd').value;
            data[i].consultant = document.getElementById('consultant').value;
            data[i].highschool = document.getElementById('highschool').value;
            data[i].email = document.getElementById('email').value;

		}
	}
	//refresh table
	renderTable();
	//reset form and hide modal
	cleanUp();
	
	
}
//confirm function
function confirm(){
	//enable input fields
	let inputs = document.getElementsByTagName('input');
	for(let i = 0; i < inputs.length; ++i){
		inputs[i].disabled = false;;
	}
	//
	cleanUp();
}

//delete batch function
function deleteSelected(){
	//get all ids of person to be deleted
	let to_delete = document.querySelectorAll('input[type=checkbox]:checked');
	for(let i = 0; i < data.length; ++i){
		for(let j = 0; j < to_delete.length; ++j){
			if(data[i].studentId === parseInt(to_delete[j].value) ){
				data.splice(i, 1)
			}
		}
	}
	//refresh table
	renderTable();
	//cleanUp
	cleanUp();

}

//delete single
function deleteSingle(id){
	for(let i = 0; i < data.length; ++i){
		if(data[i].studentId.toString() === id.toString() ){
			data.splice(i, 1)
		}
	}
	//refresh table
	renderTable();
	//cleanUp
	cleanUp();
}

//modal setting
function openEditModal(id){
	//show the modal and set corresponding submit button
	console.log(id);
	document.getElementsByClassName("modal-container")[0].style.display = 'block';
	document.getElementById('submit').innerHTML = `<button type="button" onclick="edit(${id})">Update</button>`;
	
	//find and get corresponding person by id
	for(let i = 0; i < data.length; ++i){
		if(data[i].id === parseInt(id)){
			document.getElementById('studentId').value = data[i].studentId;
			document.getElementById('name').value = data[i].name;
			document.getElementById('email').value = data[i].email;
            document.querySelector('input[name="gender"]:checked').value = data[i].gender;
			document.getElementById('courses').value = data[i].courses;
			document.getElementById('address').value = data[i].address;
            document.getElementById('phone').value = data[i].phone;
			document.getElementById('cmnd').value = data[i].cmnd;
			document.getElementById('consultant').value = data[i].consultant;
            document.getElementById('highschool').value = data[i].highschool;
			document.getElementById('email').value = data[i].email;
			break;
		}
	}
	
}

function openDetailModal(id){
	//show the modal and set corresponding submit button
	document.getElementsByClassName("modal-container")[0].style.display = 'block';
	document.getElementById('submit').innerHTML = '<button type="button" onclick="confirm()">Confirm</button>';
	
	//disable input fields
	let inputs = document.getElementsByTagName('input');
	for(let i = 0; i < inputs.length; ++i){
		inputs[i].disabled = true;
	}
	
	//find and get corresponding person by id
	for(let i = 0; i < data.length; ++i){
		if(data[i].studentId === parseInt(studentId)){
			document.getElementById('studentId').value = data[i].studentId;
			document.getElementById('name').value = data[i].name;
			document.getElementById('email').value = data[i].email;
            document.getElementById('gender').value = data[i].gender;
			document.getElementById('courses').value = data[i].courses;
			document.getElementById('address').value = data[i].address;
            document.getElementById('phone').value = data[i].phone;
			document.getElementById('cmnd').value = data[i].cmnd;
			document.getElementById('consultant').value = data[i].consultant;
            document.getElementById('highschool').value = data[i].highschool;
			document.getElementById('email').value = data[i].email;
			break;
		}
	}

}

//get elements and attach events if needed
function attach(){
	//get buttons
	let add_btn = document.getElementById("add-modal");
	let del_btn = document.getElementById("delete-batch");
	let edit_btns = document.getElementsByClassName("open-edit");
	let show_btns = document.getElementsByClassName("open-detail");
	let dels_btns = document.getElementsByClassName("open-delete");
	let search_inpt = document.getElementById("search");
	
	//get modal container
	let container = document.getElementsByClassName("modal-container")[0];
		
	//get close button
	let close = document.getElementById("close-btn");

	//add modal 
	add_btn.addEventListener("click", function(){
		container.style.display = "block";
		document.getElementById('submit').innerHTML = '<button type="button" onclick="add()">Add</button>';
	})
	
	//attach event listener to every element with class name 'open-edit', 'open-delete' and 'open-detail'
	for(let i = 0; i < edit_btns.length; ++i){
		edit_btns[i].addEventListener("click", function(){
			openEditModal(this.value);
		})
		show_btns[i].addEventListener("click", function(){
			openDetailModal(this.value);
		})
		dels_btns[i].addEventListener("click", function(){
			deleteSingle(this.value);
		})
	}
	
	//hide modal when click 'X' button
	close.addEventListener('click', function(){
		container.style.display = "none";
	})
	
	//hide modal when click outside modal content
	window.addEventListener("click", function(event){
		if(event.target === container){
			container.style.display = "none";
			//enable input fields
			let inputs = document.getElementsByTagName('input');
			for(let i = 0; i < inputs.length; ++i){
				inputs[i].disabled = false;
			}

		}
	})
	
	//add event listener to delete
	del_btn.addEventListener('click', function(){
		deleteSelected();
	})
	
	//add event listener to search input fields
	search_inpt.addEventListener('keyup', function(){
		search(this.value);
	})

}



document.addEventListener("DOMContentLoaded", function(){
	getData(); 
	renderTable();
	attach();
	
} )






