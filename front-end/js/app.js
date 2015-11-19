$(initialize);

function initialize(){
  $('form').on('submit', submitForm);
}

function submitForm(){
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api"+ $(this).attr("action");
  var data   = $(this).serialize();

  return ajaxRequest(method, url, data)
}

function authenticationSuccessful(data) {
  if (data.token) setToken(data.token);
}

function setToken(token) {
  return window.localStorage.setItem("token", token);
}

function ajaxRequest(method, url, data, callback) {
  $.ajax({
    method: method,
    url: url,
    data: data
  }).done(function(data){
    console.log(data);
    authenticationSuccessful(data);
  });
}