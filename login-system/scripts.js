var userButton = document.getElementById("newUser-button");
userButton.onclick = () => {
  var loginForm = (document.getElementById("login-form").style.display =
    "none");
  var registerForm = (document.getElementById("register-form").style.display =
    "block");
};

var oldUserButton = document.getElementById("oldUser-button");
oldUserButton.onclick = () => {
  var loginForm = (document.getElementById("login-form").style.display =
    "block");
  var registerForm = (document.getElementById("register-form").style.display =
    "none");
};

var loginButton = document.getElementById("login-button");
loginButton.onclick = (e) => {
  const uN = document.getElementById("login-username").value.toLowerCase();
  const pass = document.getElementById("login-password").value;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(uN)) {
    e.preventDefault();
    alert("Invalid email address.");
  }
  if (pass === "") {
    e.preventDefault();
    alert("No Password");
  }

  const result = fetchBody(uN, pass, 1);
};

async function loginCredentials(uN, pass) {
  const url = "http://localhost:9092/login";
  const body = {
    email: uN,
    password: pass,
  };
  const headers = {
    "Content-Type": "application/json",
  };

  var response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  //here await response.json() returns data 
  response = await response.json();
  console.log(response);
  return response;
}

async function fetchResources(token,refreshToken,id){
    const url = `http://localhost:9092/resources`;
  const body = {
    token: token,
    refreshToken : refreshToken
  };
  const headers = {
    "Content-Type": "application/json",
  };

  var response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  //here await response.json() returns data 
  response = await response.json();
  console.log(response);
  return response;
}


async function fetchBody(uN, pass,id) {
    //but whenever we call async function, we need to write await bcz even though
    // the return type is not promise functions assumes it
    //try removing await and return "Response" above
    //we can see still the output of below console.log is <Pending> it's bcz
    //by default async function assumes like that
    //chekc for reasons
    var response =  await loginCredentials(uN, pass);
    console.log(response);
    if(!response.token){
        alert("Password is incorrect");
    }
    else{
        response = await fetchResources(response.token, response.refreshToken,id);
        console.log(response);
        displayResult(response);
    }
}

function displayResult(data){
    var loginForm = (document.getElementById("login-form").style.display =
    "none");
  var registerForm = (document.getElementById("register-form").style.display =
    "none");
    var resultSection = document.getElementById("result-section");
    resultSection.textContent = JSON.stringify(data, 5);
    resultSection.style.display = "block";
}
