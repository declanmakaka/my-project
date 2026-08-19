alert("JavaScript has been loaded!!");

// ===== WASTE STRATEGY SECTION =====
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
    plastic: "plastic", paper: "paper", metal: "metal", glass: "glass",
    organic: "organic", food: "organic", electronic: "electronics",
    wire: "electronics", cable: "electronics", clothes: "clothes", fabric: "clothes"
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


// ===== LOCATION FINDER SECTION =====

// Real, verified collection points — only Nairobi has actual sample data so far.
// Add more counties here once real, verified locations are available.
const collectionPoints = {
  nairobi: {
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
  }
};

// Holds the real county/sub-county dataset once fetched
let kenyaCountiesData = null;

// Fetch the real, verified list of Kenyan counties and their sub-counties
async function loadCountiesData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Mondieki/kenya-counties-subcounties/master/counties.json"
    );
    kenyaCountiesData = await response.json();
  } catch (error) {
    console.error("Could not load county/sub-county data:", error);
  }
}

// Load the data as soon as the page opens
loadCountiesData();

function findLocation() {
  const countySelect = document.getElementById("county");
  const countyValue = countySelect.value.trim().toLowerCase();

  const locationInput = document.getElementById("location");
  const location = locationInput.value.trim().toLowerCase();

  const locationOutput = document.getElementById("locationOutput");

  if (!countyValue) {
    locationOutput.textContent = "Please select a county first.";
    return;
  }

  if (!kenyaCountiesData) {
    locationOutput.textContent = "Still loading county data — please try again in a moment.";
    return;
  }

  // Find the matching county object in the real dataset
  const countyRecord = kenyaCountiesData.find(function(c) {
    return c.name.trim().toLowerCase() === countyValue;
  });

  if (!countyRecord) {
    locationOutput.textContent = "County data not found. Please select a valid county.";
    return;
  }

  // Check if the typed area matches a real sub-county within this county
  const matchedSubCounty = countyRecord.sub_counties.find(function(sub) {
    return sub.trim().toLowerCase().includes(location) ||
           location.includes(sub.trim().toLowerCase());
  });

  if (!matchedSubCounty) {
    locationOutput.textContent =
      "That location was not found in the county chosen. Please enter a location found within " +
      countyRecord.name + " County.";
    return;
  }

  // Valid area confirmed — now check if we have real collection point data for it
  const countyKey = countyValue;
  const areaKey = location;
  const countyPoints = collectionPoints[countyKey];
  const matchedPoints = countyPoints
    ? Object.keys(countyPoints).find(function(key) { return areaKey.includes(key); })
    : null;

  if (matchedPoints) {
    const points = countyPoints[matchedPoints];
    let listHTML = "<strong>Collection points near you:</strong><ul>";
    points.forEach(function(point) {
      const mapsQuery = encodeURIComponent(point + ", Kenya");
      const mapsLink = "https://www.google.com/maps/search/?api=1&query=" + mapsQuery;
      listHTML += "<li>" + point +
        " — <a href='" + mapsLink + "' target='_blank' rel='noopener noreferrer'>Get Directions</a></li>";
    });
    listHTML += "</ul>";
    locationOutput.innerHTML = listHTML;
  } else {
    locationOutput.innerHTML =
      "<strong>" + matchedSubCounty + "</strong> is a recognized area in " + countyRecord.name +
      " County, but we don't have verified collection point data for it yet. Check back soon as we add more locations.";
  }
}

const findLocationButton = document.getElementById("findLocation");
findLocationButton.addEventListener("click", findLocation);