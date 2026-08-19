alert("JavaScript has been loaded!!");

// Function that reads the waste type input and displays a management strategy plus two disposal options
function findStrategy() {
  const strategyInput = document.getElementById("strategy");
  const strategy = strategyInput.value.trim().toLowerCase();
  const actionOutput = document.getElementById("actionOutput");

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

const findActionButton = document.getElementById("findAction");
findActionButton.addEventListener("click", findStrategy);


// Sample dataset of garbage collection points, grouped by Nairobi area
const collectionPoints = {
  westlands: [
    "Westlands Recycling Hub — Ring Road, near Sarit Centre",
    "Green Bin Point — Waiyaki Way collection depot"
  ],
  cbd: [
    "City Hall Waste Depot — City Hall Way",
    "Central Recycling Point — Tom Mboya Street collection bin"
  ],
  kibera: [
    "Kibera Community Recycling Center — Kibera Drive",
    "Taka Ni Mali Collection Point — Olympic Estate"
  ],
  kasarani: [
    "Kasarani Waste Collection Point — Mwiki Road",
    "Green Estate Recycling Bin — Kasarani Sports Ground area"
  ],
  eastleigh: [
    "Eastleigh Community Bin — 1st Avenue",
    "Garissa Lodge Collection Point — Eastleigh Section III"
  ],
  karen: [
    "Karen Recycling Depot — Karen Road",
    "Hardy Collection Point — Ngong Road junction"
  ]
};

// Function that reads the location input and displays nearby collection points with map links
function findLocation() {
  const locationInput = document.getElementById("location");
  const location = locationInput.value.trim().toLowerCase();
  const locationOutput = document.getElementById("locationOutput");

  let matchedArea = null;
  for (const area in collectionPoints) {
    if (location.includes(area)) {
      matchedArea = area;
      break;
    }
  }

  if (matchedArea) {
    const points = collectionPoints[matchedArea];
    let listHTML = "<strong>Collection points near you:</strong><ul>";

    points.forEach(function(point) {
      // Turn the point name into a Google Maps search link
      const mapsQuery = encodeURIComponent(point + ", Nairobi, Kenya");
      const mapsLink = "https://www.google.com/maps/search/?api=1&query=" + mapsQuery;

      listHTML += "<li>" + point +
        " — <a href='" + mapsLink + "' target='_blank' rel='noopener noreferrer'>Get Directions</a></li>";
    });

    listHTML += "</ul>";
    locationOutput.innerHTML = listHTML;
  } else {
    locationOutput.textContent = "No collection points found for that area yet. Try Westlands, CBD, Kibera, Kasarani, Eastleigh, or Karen.";
  }
}

const findLocationButton = document.getElementById("findLocation");
findLocationButton.addEventListener("click", findLocation);
