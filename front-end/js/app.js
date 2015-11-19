$(initialize);

function initialize(){
  $('form').on('submit', submitForm);
  $('.logout-link').on('click', logout);
  $('.users-link').on('click', users);
  checkLoginState();
}

function checkLoginState(){
  if(getToken()){
    return loggedInState();
  }else{
    return loggedOutState();
  }
}

function showPage(){
}

function submitForm(){
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api"+ $(this).attr("action");
  var data   = $(this).serialize();

  return ajaxRequest(method, url, data, authenticationSuccessful)
}

function users(){
  event.preventDefault();
  getUsers();
  ajaxRequest("get", "http://localhost:3000/api/users", null, displayUsers);
}

function logout(){
  event.preventDefault();
  removeToken();
}

function getUsers(){
}

function displayUsers(data){
}

function hideUsers(){
  $('#users').hide();
}

function hideErrors(){
}

function displayErrors(data){
}

function loggedInState(){
  $('section, .logged-out').hide();
  $('#users, .logged-in').show();
  return getUsers();
}

function loggedOutState(){
  $('section, .logged-in').hide();
}

function authenticationSuccessful(data){
  if (data.token) setToken(data.token);
}

function setToken(token){
  return window.localStorage.setItem("token", token);
}

function getToken(){
  return localStorage.getItem('token');
}

function removeToken(){
  return localStorage.clear();
}

function setRequestHeader(xhr, settings){
  var token = getToken();
  if(token) return xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

function ajaxRequest(method, url, data, callback){
  $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader
  }).done(function(data){
    callback(data)
  }).fail(function(data){
    console.log(data.responseJSON.message);
  });
}