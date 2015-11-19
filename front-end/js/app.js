$(initialize);

function initialize(){
  $('form').on('submit', submitForm);
}

function submitForm(){
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api"+ $(this).attr("action");
  var data   = $(this).serialize();

  $.ajax({
    method: method,
    url: url,
    data: data
  }).done(function(data){
    console.log(data)
  });
}
