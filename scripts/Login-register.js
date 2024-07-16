const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {container.classList.add('right-panel-active');});
signInButton.addEventListener('click', () => {container.classList.remove('right-panel-active');});

function togglePasswordVisibilityLogIn() {
    const passwordField = document.getElementById('password-field-log-in');
    const toggleIcon = document.querySelector('.toggle-icon');
    checkPasswordType(passwordField,toggleIcon);
}
function togglePasswordVisibilityRegister() {
    const passwordField = document.getElementById('password-field-Register');
    const toggleIcon = document.querySelector('.toggle-icon');
    checkPasswordType(passwordField,toggleIcon);
}
function togglePasswordVisibilityRegisterComfirm() {
    const passwordField = document.getElementById('password-field-Register-Confirm');
    const toggleIcon = document.querySelector('.toggle-icon');
    checkPasswordType(passwordField,toggleIcon);
}

function checkPasswordType(passwordField,toggleIcon){
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.textContent = '👁️‍🗨️';
    } else {
        passwordField.type = 'password';
        toggleIcon.textContent = '👁️‍🗨️';
    }
}
















let logInEmailElement =document.querySelector(".js-input-log-in-email");
let logInPasswordElement =document.querySelector(".js-input-log-in-password");

let registerNameElement =document.querySelector(".js-input-register-name");
let registerEmailElement =document.querySelector(".js-input-register-email");
let registerPasswordElement =document.querySelector(".js-input-register-password");
let registerPasswordRepeatElement =document.querySelector(".js-input-register-password-repeat");

let User ={
    name: '',
    email: '',
    password: ''
};
function setUserData(){
        User.name = registerNameElement.value;
        User.email = registerEmailElement.value
        User.password = registerPasswordElement.value
        console.log(User.name);
};

function clearAllertMessageRegister(){
    document.querySelector(".allert-message-register").innerHTML = " ";
};

function clearAllertMessageLogIn(){
    document.querySelector(" .allert-message-log-in").innerHTML = " ";
};

document.querySelector(".js-button-register").addEventListener('click',()=>{
    clearAllertMessageRegister();

    //Backend: !!! A check is required in the Database if a the <User.name> already exists. !!!

    if(registerNameElement.value===""|| registerEmailElement.value==="" || registerPasswordElement.value==="" || registerPasswordRepeatElement.value==="" ) return document.querySelector(".allert-message-register").innerHTML = "Fill empty fields"; 

    if(!registerEmailElement.value.includes('@',0)) return document.querySelector(".allert-message-register").innerHTML = "Email does not exist!";

    if(!registerEmailElement.value.includes('.',1)) return document.querySelector(".allert-message-register").innerHTML = "Email does not exist!";
        
    if(registerPasswordElement.value !== registerPasswordRepeatElement.value || registerPasswordElement.value==="" || registerPasswordRepeatElement.value===""){
         return document.querySelector(".allert-message-register").innerHTML = "Passwords don't match!";
    }

    if(registerPasswordElement.value === registerPasswordRepeatElement.value ){
        setUserData();
    }
});

document.querySelector(".js-button-log-in").addEventListener('click',()=>{
    clearAllertMessageLogIn();

    //Backend: !!! A check is required in the Database if a the <User> already exists. If not an error "Account not found" is issued. !!!

    if(logInEmailElement.value==="" || logInPasswordElement.value==="") return document.querySelector(".allert-message-log-in").innerHTML = "Fill empty fields"; 

    if(!logInEmailElement.value.includes('@',0)) return document.querySelector(".allert-message-log-in").innerHTML = "Email does not exist!";

    if(!logInEmailElement.value.includes('.',1)) return document.querySelector(".allert-message-log-in").innerHTML = "Email does not exist!";

});
