alert("JavaScript has been loaded!!");

//target the element
 let myButton = document.getElementById("button1")

 myButton.addEventListener("click",function(){
   alert("Button clicked!");
 })

// Function that reads the waste type input and displays a management strategy plus two disposal options
function findStrategy() {
  // Get the text input element where the user types their waste type
  const strategyInput = document.getElementById("strategy");
  // Read the value the user typed, remove extra spaces, and lowercase it for matching
  const strategy = strategyInput.value.trim().toLowerCase();
  // Get the output div where the action message will be displayed
  const actionOutput = document.getElementById("actionOutput");

  // Object holding a general management strategy plus two disposal options for each waste type
  const wasteOptions = {
    plastic: {
      strategy: "Reduce single-use plastic where possible, and separate plastic from other waste before disposal so it can be recycled cleanly.",
      options: [
        "Recycle it at your nearest plastic recycling bin or collection point.",
        "Reuse it as a container or repurpose it at home before throwing it away."
      ]
    },
    paper: {
      strategy: "Keep paper dry and separated from wet waste, since damp or contaminated paper often can't be recycled.",
      options: [
        "Recycle it at a paper recycling bin or collection center.",
        "Reuse it for notes, packaging, or composting if uncoated."
      ]
    },
    metal: {
      strategy: "Rinse food residue off metal containers before disposal to make recycling easier and more valuable.",
      options: [
        "Take it to a metal recycling center or scrap yard.",
        "Reuse sturdy metal containers or cans before recycling them."
      ]
    },
    glass: {
      strategy: "Separate glass by color if your local collection point requires it, and handle broken glass carefully to avoid injury.",
      options: [
        "Recycle it at a glass recycling bin or collection center.",
        "Reuse glass jars and bottles as storage containers."
      ]
    },
    organic: {
      strategy: "Separate organic waste at the source, since mixing it with non-biodegradable waste makes composting impossible.",
      options: [
        "Compost it at home or at a local composting site.",
        "Use it as animal feed where appropriate, instead of throwing it away."
      ]
    },
    electronics: {
      strategy: "Never mix electronics with regular trash — they contain materials that can be hazardous if dumped or burned.",
      options: [
        "Take it to an e-waste recycling center — never bin it with regular trash.",
        "Donate or repair working electronics instead of disposing of them."
      ]
    },
    clothes: {
      strategy: "Sort clothes into wearable and unwearable piles first, since each has a different best disposal route.",
      options: [
        "Donate wearable clothes to a local charity or clothing bank.",
        "Recycle worn-out fabric at a textile recycling point."
      ]
    }
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
    const data = wasteOptions[matchedType];
    actionOutput.innerHTML =
      "<strong>Management strategy:</strong> " + data.strategy +
      "<br><br><strong>Option 1:</strong> " + data.options[0] +
      "<br><strong>Option 2:</strong> " + data.options[1];
  } else {
    actionOutput.textContent = "Please enter a valid type of waste (e.g. plastic, paper, metal, glass, organic, electronics, clothes).";
  }
}

// Get the "Find Strategy" button element from the page and listen for clicks
const findActionButton = document.getElementById("findAction");
findActionButton.addEventListener("click", findStrategy);
