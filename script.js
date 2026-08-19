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
  console.log(strategy); // Log the strategy to the console for debugging
  // Get the output div where the action message will be displayed
  const actionOutput = document.getElementById("actionOutput");
  // Create a variable to hold the action message; starts empty
  let action = "";

  // Check if the user typed "Plastic" (case-insensitive)
  if (strategy.toLowerCase() === "plastic") {
    // Set the action message for the Plastic area
    action = "Dispose of plastic waste in a plastic recycling bin, use a reusable plastic container, or recycle plastic waste at a recycling center.";
  // Check if the user typed "Paper" (case-insensitive)
  } else if (strategy.toLowerCase() === "paper") {
    // Set the action message for the Paper area
    action = "Dispose of paper waste in a paper recycling bin, use a reusable paper container, or recycle paper waste at a recycling center.";
  // Check if the user typed "Metal" (case-insensitive)
  } else if (strategy.toLowerCase() === "metal") {
    // Set the action message for the Metal area
    action = "Dispose of metal waste in a metal recycling bin, use a reusable metal container, or recycle metal waste at a recycling center or scrap yard.";
  // Check if the user typed "Glass" (case-insensitive)
  } else if (strategy.toLowerCase() === "glass") {
    // Set the action message for the Glass area
    action = "Dispose of glass waste in a glass recycling bin, use a reusable glass container, or recycle glass waste at a recycling center.";
  // Check if the user typed "Organic" (case-insensitive)
  } else if (strategy.toLowerCase() === "organic") {
    // Set the action message for the Organic area
    action = "Dispose of organic waste in a compost bin, use a reusable organic container, or recycle organic waste at a recycling center.";
  // Check if the user typed "Electronics" (case-insensitive)
  } else if (strategy.toLowerCase() === "electronics") {
    // Set the action message for the Electronics area
    action = "Dispose of electronics waste in a electronics recycling bin, use a reusable electronics container, or recycle electronics waste at a recycling center.";
  // Check if the user typed "Clothes" (case-insensitive)
  } else if (strategy.toLowerCase() === "clothes") {
    // Set the action message for the Clothes area
    action = "Dispose of clothes waste in a clothes recycling bin, use a reusable clothes container, or recycle clothes waste at a recycling center.";
  // If the strategy does not match any of the known areas
  } else {
    // Set the action message for any other strategy
    action = "Please enter a valid type of waste.";
  }

  // Write the chosen action message into the output div on the page
  actionOutput.textContent = action;
}

// Get the "Find Strategy" button element from the page
const findActionButton = document.getElementById("findAction");
// Listen for a click on the button and run findStrategy when clicked
findActionButton.addEventListener("click", findStrategy);
