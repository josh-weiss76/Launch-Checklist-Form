window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
     event.preventDefault();
     let pilotNameInput = document.querySelector("input[name=pilotName]");
     let copilotNameInput = document.querySelector("input[name=copilotName]");
     let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
     let cargoMassInput = document.querySelector("input[name=cargoMass]");

     if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
       alert("All fields are required!");
       event.preventDefault();
     };
     let fuelLevelFigure = Number(fuelLevelInput.value);
     let cargoMassFigure = Number(cargoMassInput.value);
     let pilotNameFigure = Number(pilotNameInput.value);
     let copilotNameFigure = Number(copilotNameInput.value);
     if (isNaN(fuelLevelFigure) === true || isNaN(cargoMassFigure) === true){
        alert("Fuel level and cargo mass should be numbers.");
        event.preventDefault();
     };
     if (isNaN(pilotNameFigure) === false || isNaN(copilotNameFigure) === false){
        alert("Pilot and Co-pilot names should not be numbers.")
     };
     let launchStatusUpdate = document.getElementById("launchStatus");
     let statusUpdate = document.getElementById("faultyItems");
     let pilotUpdate = document.getElementById("pilotStatus");
     let copilotUpdate = document.getElementById("copilotStatus");
     let fuelLevelStatus = document.getElementById("fuelStatus");
     let cargoMassStatus = document.getElementById("cargoStatus");

     pilotUpdate.innerHTML = `
         <li id="pilotStatus">Pilot ${pilotNameInput.value} is ready for launch</li>`;
     copilotUpdate.innerHTML =`
         <li id="copilotStatus">Co-pilot ${copilotNameInput.value} is ready for launch</li>`;

     if (fuelLevelFigure < 10000){
         statusUpdate.style = "visibility: visible";
         fuelLevelStatus.innerHTML = `
         <li id="fuelStatus">Fuel level too low for launch.</li>`
     } else {
         fuelLevelStatus.innerHTML = `
         <li id="fuelStatus">Fuel level high enough for launch.</li>`
     };

     if (cargoMassFigure > 10000){
         statusUpdate.style = "visibility: visible";
         cargoMassStatus.innerHTML = `
         <li id="cargoStatus">Cargo mass too high for launch.</li>`
         // launchStatusUpdate.innerHTML = `
         // <h2 id="launchStatus" style="color:red">Shuttle not ready for launch</h2>`
     } else {
         cargoMassStatus.innerHTML = `
         <li id="cargoMass">Cargo mass low enough for launch.</li>`
     };

     if (fuelLevelFigure < 10000 || cargoMassFigure > 10000){
      launchStatusUpdate.innerHTML = `
      <h2 id="launchStatus" style="color:red">Shuttle not ready for launch</h2>`
     } else {
      launchStatusUpdate.innerHTML = `
      <h2 id="launchStatus" style="color:green">Shuttle is ready for launch</h2>`
     }

   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const destination = document.getElementById("missionTarget");
         let destinationChoice = Math.round(Math.random()*6);
         destination.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[destinationChoice].name}</li>
               <li>Diameter: ${json[destinationChoice].diameter}</li>
               <li>Star: ${json[destinationChoice].star}</li>
               <li>Distance from Earth: ${json[destinationChoice].distance}</li>
               <li>Number of Moons: ${json[destinationChoice].moons}</li>
            </ol>
            <img src="${json[destinationChoice].image}">
            `;
      });
   });
});





/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
