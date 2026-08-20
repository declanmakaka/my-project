alert ("Welcome to TAKA POA! This website helps you find nearby waste collection points and provides strategies for managing different types of waste. Please select your county and enter your location to get started.");

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(function(page) {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");
}

document.getElementById("navHome").addEventListener("click", function() {
  showPage("homePage");
  setActiveNav("navHome");
});

document.getElementById("navStart").addEventListener("click", function() {
  showPage("inputPage");
  setActiveNav("navStart");
});

document.getElementById("backToStart").addEventListener("click", function() {
  showPage("inputPage");
  setActiveNav("navStart");
});

function setActiveNav(activeId) {
  document.querySelectorAll(".nav-btn").forEach(function(btn) {
    btn.classList.remove("active");
  });
  document.getElementById(activeId).classList.add("active");
}


// ===== WASTE STRATEGY DATA =====
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

function getStrategyHTML(strategyInputValue) {
  const strategy = strategyInputValue.trim().toLowerCase();

  if (!strategy) {
    return "<p>No waste type was entered.</p>";
  }

  let matchedType = null;
  for (const keyword in keywordMap) {
    if (strategy.includes(keyword)) {
      matchedType = keywordMap[keyword];
      break;
    }
  }

  if (matchedType) {
    const data = wasteOptions[matchedType];
    return "<h3>Waste Disposal Strategy</h3><p><strong>Management strategy:</strong> " + data.strategy +
      "</p><p><strong>Option 1:</strong> " + data.options[0] +
      "<br><strong>Option 2:</strong> " + data.options[1] + "</p>";
  } else {
    return "<h3>Waste Disposal Strategy</h3><p>Please enter a valid type of waste (e.g. plastic, paper, metal, glass, organic, electronics, clothes).</p>";
  }
}


// ===== LOCATION FINDER DATA =====
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

let kenyaCountiesData = null;

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

loadCountiesData();

async function getLocationHTML(countyValue, locationValue) {
  const county = countyValue.trim().toLowerCase();
  const location = locationValue.trim().toLowerCase();

  if (!county) {
    return "<h3>Collection Points</h3><p>No county was selected.</p>";
  }

  if (!kenyaCountiesData) {
    // Wait briefly in case the data is still loading
    await new Promise(function(resolve) { setTimeout(resolve, 800); });
  }

  if (!kenyaCountiesData) {
    return "<h3>Collection Points</h3><p>County data could not be loaded. Please try again.</p>";
  }

  const countyRecord = kenyaCountiesData.find(function(c) {
    return c.name.trim().toLowerCase() === county;
  });

  if (!countyRecord) {
    return "<h3>Collection Points</h3><p>County data not found. Please select a valid county.</p>";
  }

  const matchedSubCounty = countyRecord.sub_counties.find(function(sub) {
    return sub.trim().toLowerCase().includes(location) ||
           location.includes(sub.trim().toLowerCase());
  });

  if (!matchedSubCounty) {
    return "<h3>Collection Points</h3><p>That location was not found in the county chosen. Please enter a location found within " +
      countyRecord.name + " County.</p>";
  }

  const countyPoints = collectionPoints[county];
  const matchedArea = countyPoints
    ? Object.keys(countyPoints).find(function(key) { return location.includes(key); })
    : null;

  if (matchedArea) {
    const points = countyPoints[matchedArea];
    let listHTML = "<h3>Collection Points</h3><p><strong>Collection points near you:</strong></p><ul>";
    points.forEach(function(point) {
      const mapsQuery = encodeURIComponent(point + ", Kenya");
      const mapsLink = "https://www.google.com/maps/search/?api=1&query=" + mapsQuery;
      listHTML += "<li>" + point +
        " — <a href='" + mapsLink + "' target='_blank' rel='noopener noreferrer'>Get Directions</a></li>";
    });
    listHTML += "</ul>";
    return listHTML;
  } else {
    return "<h3>Collection Points</h3><p><strong>" + matchedSubCounty + "</strong> is a recognized area in " +
      countyRecord.name + " County, but we don't have verified collection point data for it yet.</p>";
  }
}


// ===== SUBMIT HANDLER: COMBINES BOTH RESULTS =====
document.getElementById("getResultsBtn").addEventListener("click", async function() {
  const strategyValue = document.getElementById("strategy").value;
  const countyValue = document.getElementById("county").value;
  const locationValue = document.getElementById("location").value;

  document.getElementById("strategyResult").innerHTML = getStrategyHTML(strategyValue);
  document.getElementById("locationResult").innerHTML = "<p>Loading collection points…</p>";

  showPage("resultsPage");
  setActiveNav("navStart");

  const locationHTML = await getLocationHTML(countyValue, locationValue);
  document.getElementById("locationResult").innerHTML = locationHTML;
});