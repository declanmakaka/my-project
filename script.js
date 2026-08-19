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

// Function that reads the waste type input and displays two matching disposal options
function findStrategy() {

  // Get the text input element where the user types their waste type
  const strategyInput = document.getElementById("strategy");

  // Read the value the user typed, remove extra spaces, and lowercase it for matching
  const strategy = strategyInput.value.trim().toLowerCase();

  // Get the output div where the action message will be displayed
  const actionOutput = document.getElementById("actionOutput");

  // Object holding two disposal options for each waste type
  const wasteOptions = {
    plastic: [
      "Recycle it at your nearest plastic recycling bin or collection point.",
      "Reuse it as a container or repurpose it at home before throwing it away."
    ],
    paper: [
      "Recycle it at a paper recycling bin or collection center.",
      "Reuse it for notes, packaging, or composting if uncoated."
    ],
    metal: [
      "Take it to a metal recycling center or scrap yard.",
      "Reuse sturdy metal containers or cans before recycling them."
    ],
    glass: [
      "Recycle it at a glass recycling bin or collection center.",
      "Reuse glass jars and bottles as storage containers."
    ],
    organic: [
      "Compost it at home or at a local composting site.",
      "Use it as animal feed where appropriate, instead of throwing it away."
    ],
    electronics: [
      "Take it to an e-waste recycling center — never bin it with regular trash.",
      "Donate or repair working electronics instead of disposing of them."
    ],
    clothes: [
      "Donate wearable clothes to a local charity or clothing bank.",
      "Recycle worn-out fabric at a textile recycling point."
    ]
  };

  // Keywords to match against what the user typed, mapped to a waste type key above
  const keywordMap = {
    plastic: "plastic",
    paper: "paper",
    metal: "metal",
    glass: "glass",
    organic: "organic",
    food: "organic",
    electronic: "electronics",
    wire: "electronics",
    cable: "electronics",
    clothes: "clothes",
    fabric: "clothes"
  };

  // Find the first keyword that appears in what the user typed
  let matchedType = null;
  for (const keyword in keywordMap) {
    if (strategy.includes(keyword)) {
      matchedType = keywordMap[keyword];
      break;
    }
  }

  if (matchedType) {
    const options = wasteOptions[matchedType];
    actionOutput.innerHTML =
      "<strong>Option 1:</strong> " + options[0] +
      "<br><strong>Option 2:</strong> " + options[1];
  } else {
    actionOutput.textContent = "Please enter a valid type of waste (e.g. plastic, paper, metal, glass, organic, electronics, clothes).";
  }
}

// Get the "Find Strategy" button element from the page and listen for clicks
const findActionButton = document.getElementById("findAction");
findActionButton.addEventListener("click", findStrategy);
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
