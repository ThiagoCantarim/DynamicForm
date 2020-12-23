function cadUser(){
    let name = document.getElementById("name")
    let email = document.getElementById("email")
    let user = document.getElementById("username")
    let pass = document.getElementById("password")
    let age = document.getElementById("age")
    let cpf = document.getElementById("cpf")

    // if (!vrfEmpty(name, email, user, pass, age, cpf)){
    //     return alert("Cadastro não efetuado, favor informar todos os dados requeridos!")
    // } else {
    //     if(age.value < 18){
    //         clearField(name, email, user, pass, age, cpf)
    //         return alert("É necessário ter mais de 18 anos para se cadastrar!")
    //     } else {
    //         if(!vrfCPF(cpf.value)){
    //             cpf.value = ""
    //             cpf.focus()
    //             return alert("O CPF inserido é inválido!")
    //         } else {
    //             alert("Cadastro efetuado com sucesso!")
    //         }
    //     }
    // }
    
    //Verifica se existe algum campo em branco
    if (!vrfEmpty(name, email, user, pass, age, cpf)) {
        return alert("Cadastro não efetuado, favor informar todos os dados!")
    }

    //Verifica se o usuário é maior de 18 anos
    if(age.value < 18) {
        clearField(name, email, user, pass, age, cpf)
        return alert("É necessário ter 18 anos ou mais para realizar o cadastro!")
    }
    //Verifica se o CPF digitado é válido
    if(!vrfCPF(cpf.value)) {
        cpf.value = ""
        cpf.focus()
        return alert("Número de CPF informado é inválido!")
    }

    //Faz o cadastro do usuario caso tenha passado em todas a verificações
    let newUser = new Usuario(name, email, user, pass, age, cpf)
    newUser.save()
    
    alert("Cadastro efetuado com sucesso!")
    clearField(name, email, user, pass, age, cpf) 
}

//Function que erifica se algum campo obrigatório foi deixado em branco
function vrfEmpty(){
    for(let c = 0; c < arguments.length; c++){
        if(arguments[c].value == ""){
            arguments[c].focus()
            return false
        } else {
            return true
        }
    }
}

//Function que limpa os campos após o cadastro dos usuários
function clearField(){
    for(let c = 0; c < arguments.length; c++){
        arguments[c].value = ""
    }
    arguments[0].focus()
}

//Function que verifica se o CPF Digitado é válido
function vrfCPF(cpf) {

    if(cpf.length < 11){
        return false
    }

    //Bloco 1 - Este bl acml = 0oco calcula o primeir digito verificador    
    let acml = 0       //Acumulador
    let mult = 10      //multiplicador

    for(let ctrl = 0; ctrl < 9; ctrl++){
        acml += cpf[ctrl] * mult
        mult--     
    }
    let dig1 = (acml * 10) % 11 //calcula o resto da divisão
    if(dig1 >= 10){             //verifica se o resto da divisao é 10, caso seja considera 0
        dig1 = 0
    }
    
    //Bloco 2 - Este bloco calcula o segundo digito verificador
    acml = 0                    //zera o acumulador
    mult = 11                   //Define novo multiplicador

    for(let ctrl = 0; ctrl < 10; ctrl++){
        acml += cpf[ctrl] * mult
        mult--        
    }
    let dig2 = (acml * 10) % 11 //calcula o resto da divisão
    if(dig2 >= 10){             //verifica se o resto da divisao é 10, caso seja considera 0
        dig2 = 0
    }

    //Bloco 3 - Este bloco verifica os digitos verificadores do cpf são validos
    if (dig1 == cpf[9] && dig2 == cpf[10]){
        return true
    } else {
        return false
    }

}

//Constructor que organiza e grava os dados digitados
let Usuario = function(name, email, user, pass, age, cpf){
    this.id = Usuario.usuarios.length + 1
    this.name = name.value
    this.email = email.value
    this.user = user.value
    this.pass = pass.value
    this.age = age.value
    this.cpf = cpf.value

    this.save = function(){
        Usuario.usuarios.push(this)
    }
}

Usuario.usuarios = [] //Armazena os dados dos usuários


//Funtion que mostra os usuários cadastrados na tela
Usuario.showUsers = function(){
    let arrayUsers = Usuario.usuarios

    if(arrayUsers.length < 1){
        return alert("Nenhum registro de usuário cadastrados")
    }

    let fieldUsers = document.getElementById("showUsers")
    let tableUsers = document.getElementById("cadTable")
    fieldUsers.style.display = "block"

    let userLine = ""

    for(let c = 0; c < arrayUsers.length; c ++){
        userLine += `<tr id="linha-${arrayUsers[c].id}"><td>${arrayUsers[c].id}</td><td>${arrayUsers[c].name}</td><td>${arrayUsers[c].email}</td><td>${arrayUsers[c].user}</td><td>${arrayUsers[c].age}</td><td>${arrayUsers[c].cpf}</td></tr>`
    }

    tableUsers.innerHTML = "<tr id='linha-0'> <th>ID</th><th>Nome</th><th>E-mail</th><th>Usuário</th><th>Idade</th><th>CPF</th></tr>" + userLine
}
