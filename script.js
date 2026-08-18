alert("JavaScript has been loaded!!");

//target the element
 let myButton = document.getElementById("button1")

 myButton.addEventListener("click",function(){
   alert("Button clicked!");
 })

// Function that reads the strategy input and displays a matching climate action
function findStrategy() {
  // Get the text input element where the user types their strategy
  const strategyInput = document.getElementById("strategy");
  // Read the value the user typed and remove extra spaces from the start and end
  const strategy = strategyInput.value.trim();
  // Get the output div where the action message will be displayed
  const actionOutput = document.getElementById("actionOutput");
  // Create a variable to hold the action message; starts empty
  let action = "";

  // Check if the user typed "Kibera" (case-insensitive)
  if (strategy.toLowerCase() === "kibera") {
    // Set the action message for the Kibera area
    action = "Join a community clean-up in Kibera to reduce waste and protect local waterways.";
  // Check if the user typed "Westlands" (case-insensitive)
  } else if (strategy.toLowerCase() === "westlands") {
    // Set the action message for the Westlands area
    action = "Use public transport or carpool in Westlands to cut down on traffic pollution.";
  // Check if the user typed "Karen" (case-insensitive)
  } else if (strategy.toLowerCase() === "karen") {
    // Set the action message for the Karen area
    action = "Plant native trees in Karen to support local wildlife and improve air quality.";
  // If the strategy does not match any of the three known areas
  } else {
    // Set a default action message for any other strategy
    action = "Find the nearest garbage dump site and dispose of your waste properly.";
  }

  // Write the chosen action message into the output div on the page
  actionOutput.textContent = action;
}

// Get the "Find Strategy" button element from the page
const findActionButton = document.getElementById("findAction");
// Listen for a click on the button and run findStrategy when clicked
findActionButton.addEventListener("click", findStrategy);
