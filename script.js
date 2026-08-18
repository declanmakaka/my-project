alert("JavaScript has been loaded!!");

//target the element
 let myButton = document.getElementById("button1")

 myButton.addEventListener("click",function(){
   alert("Button clicked!");
 })

// Function that reads the location input and displays a matching local climate action
function findLocalAction() {
  // Get the text input element where the user types their location
  const locationInput = document.getElementById("location");
  // Read the value the user typed and remove extra spaces from the start and end
  const location = locationInput.value.trim();
  // Get the output div where the action message will be displayed
  const actionOutput = document.getElementById("actionOutput");
  // Create a variable to hold the action message; starts empty
  let action = "";

  // Check if the user typed "Kibera" (case-insensitive)
  if (location.toLowerCase() === "kibera") {
    // Set the action message for the Kibera area
    action = "Join a community clean-up in Kibera to reduce waste and protect local waterways.";
  // Check if the user typed "Westlands" (case-insensitive)
  } else if (location.toLowerCase() === "westlands") {
    // Set the action message for the Westlands area
    action = "Use public transport or carpool in Westlands to cut down on traffic pollution.";
  // Check if the user typed "Karen" (case-insensitive)
  } else if (location.toLowerCase() === "karen") {
    // Set the action message for the Karen area
    action = "Plant native trees in Karen to support local wildlife and improve air quality.";
  // If the location does not match any of the three known areas
  } else (location.toLowerCase() === "other locations") {
    // Set a default action message for any other location
    action = "Find the nearest garbage dumb site and dispose of your waste properly;.
  }

  // Write the chosen action message into the output div on the page
  actionOutput.textContent = action;
}

// Get the "Find Local Action" button element from the page
const findActionButton = document.getElementById("findAction");
// Listen for a click on the button and run findLocalAction when clicked
findActionButton.addEventListener("click", findLocalAction);
