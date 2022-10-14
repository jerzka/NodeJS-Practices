// // const emailInput = document.getElementById();
// (() => {
//     'use strict'
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.needs-validation')
  
//     // Loop over them and prevent submission
//     Array.from(forms).forEach(form => {
//       form.addEventListener('submit', event => {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
  
//         form.classList.add('was-validated')
//       }, false)
//     })
//   })()
const url ="http://localhost:3002/api/users/register";

const userInput = document.getElementById("userInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("paswordInput");

const submitBtn = document.getElementById("submit-btn");

const handleSignup = async () => {
  const user = JSON.stringify({"email":emailInput, "password":passwordInput});
  fetch(url, { // `${url}/${id}`
    method: "POST",
    body: user,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => response.json()
  .then(data=>{
    window.location('signin.html')
  })
  )};

submitBtn.addEventListener("submit", handleSignup);