
async function userList(users){
    let ul = document.getElementById("users");
    if(users == undefined){
        const result = await fetch('/users')
         users =  await result.json()
    }
            ul.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let name = (users[i].name)
        let id = (users[i].id)
        let email = (users[i].email)
        let li = document.createElement("li")
        li.className = 'list-group-item'
        li.innerHTML='<b>'+id+'-</b>'+' '+ name +'<br/> '+'<b>Email :</b>'+email
        ul.appendChild(li)
    }
 };
function addUser(){
    let user = { name:document.getElementById("getUser").value}
    sendApi("/add-user", "post", JSON.stringify(user))
}
function editUser(){
    let user = {
        id:document.getElementById("getUserEditId").value,
        name:document.getElementById("getUserEditName").value
    }
    sendApi("/edit-user", "put", JSON.stringify(user))
}
function deleteUser(){
    let id = { id:document.getElementById("getUserId").value}
    sendApi("/delete-user", "delete", JSON.stringify(id))
}

async function sendApi(url, reqMethod, body ){
    let error = document.getElementById('error')
    error.innerHTML = ''
    const response = await fetch(url, {
        headers: {"content-type": "application/json"},
        method : reqMethod,
        body: body
    })
    const data = await response.json()
    if(data.message == undefined)
    userList(data)
    else
    {
         let div = document.createElement("div")
         div.className = 'alert alert-danger'
         div.innerText = data.message
         error.appendChild(div)
    }
    return data
}
