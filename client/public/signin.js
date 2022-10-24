const handleSignin = async (event) =>{
    event.preventDefault();
    const formData ={
        email: document.getElementById('email'),
        password: document.getElementById('password')
    }

    const response = await fetch('signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if(response.status === 200){}
      
}

const signinBtn = document.getElementById("signinBtn");
signinBtn.addEventListener("click", handleSignin);