
var toUpdate;

var update = document.getElementById('update')

update.addEventListener('click', function () {
  // Send PUT Request here
  fetch('kids', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': toUpdate,
      'newName': nameChange,
      'quote': quoteChange,
      'age': ageChange,
      'base64': base64Change
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
   nameChange = null;
   ageChange = null;
   quoteChange = null;
   base64Change = null;
   toUpdate = null;
})


var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('kids', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
      'name': toDel
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
  toDel = null;
})


function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
   // console.log('RESULT', reader.result)
   var input2 = document.getElementById('base64');
    input2.value = reader.result;
  }
   reader.readAsDataURL(file);
}


var toDel;

function saveToDelete()
{
  toDel = document.getElementById("nameToDelete").value;
}



function updateEncodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
   // console.log('RESULT', reader.result)
   var input2 = document.getElementById('updateBase64');
    input2.value = reader.result;
  }
   reader.readAsDataURL(file);
}

function setNameToUpdate()
{
  toUpdate = document.getElementById("nameToUpdate").value;
}

function saveToUpdate()
{ 
 nameChange = document.getElementById("updateName").value;
 quoteChange = document.getElementById("updateQuote").value;
 ageChange = document.getElementById("updateAge").value;
 base64Change = document.getElementById("updateBase64").value;
}

