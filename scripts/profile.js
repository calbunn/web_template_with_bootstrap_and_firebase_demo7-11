var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {

          //go to the correct user document by referencing to the user uid
          currentUser = db.collection("users").doc(user.uid);
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                  //get the data fields of the user
                  var userName = userDoc.data().name;
                  var userSchool = userDoc.data().school;
                  var userCity = userDoc.data().city;

                  //if the data fields are not empty, then write them in to the form.
                  if (userName != null) {
                      document.getElementById("nameInput").value = userName;
                  }
                  if (userSchool != null) {
                      document.getElementById("schoolInput").value = userSchool;
                  }
                  if (userCity != null) {
                      document.getElementById("cityInput").value = userCity;
                  }
              })
      } else {
          // No user is signed in.
          console.log ("No user is signed in");
      }
  });
}
//call the function to run it 
populateUserInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
  //enter code here
  if (document.getElementById("personalInfoFields").disabled == false) {

  //a) get user entered values
    let newName = document.getElementById("nameInput").value;
    let newSchool = document.getElementById("schoolInput").value;
    let newCity = document.getElementById("cityInput").value;

  //b) update user's document in Firestore
    currentUser.update({
      name: newName,
      school: newSchool,
      city: newCity
    }).then(() => {
      console.log("Document successfully updated!");
    });
    
  //c) disable edit 
    alert("Saved!");
    document.getElementById("personalInfoFields").disabled = true;
  }
}