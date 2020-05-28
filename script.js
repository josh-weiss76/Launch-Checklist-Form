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
       event.defaultPrevented();
     };
     let fuelLevelFigure = Number(fuelLevelInput.value);
     let cargoMassFigure = Number(cargoMassInput.value);
     let pilotNameFigure = Number(pilotNameInput.value);
     let copilotNameFigure = Number(copilotNameInput.value);
     if (isNaN(fuelLevelFigure) === true || isNaN(cargoMassFigure) === true){
        alert("Fuel level and cargo mass should be numbers.");
        event.defaultPrevented();
     };
     if (isNaN(pilotNameFigure) === false || isNaN(copilotNameFigure) === false){
        alert("Pilot and Co-pilot names should not be numbers.")
        event.defaultPrevented();
     };
     let launchStatusUpdate = document.getElementById("launchStatus");
     let statusUpdate = document.getElementById("faultyItems");
     let pilotUpdate = document.getElementById("pilotStatus");
     let copilotUpdate = document.getElementById("copilotStatus");
     let fuelLevelStatus = document.getElementById("fuelStatus");
     let cargoMassStatus = document.getElementById("cargoStatus");

     pilotUpdate.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch.`;
     copilotUpdate.innerHTML =`Co-pilot ${copilotNameInput.value} is ready for launch.`;

     if (fuelLevelFigure < 10000){
         fuelLevelStatus.innerHTML = `Fuel level too low for launch.`
     } else {
         fuelLevelStatus.innerHTML = `Fuel level high enough for launch.`
     };

     if (cargoMassFigure > 10000){
         cargoMassStatus.innerHTML = `Cargo mass too high for launch.`
     } else {
         cargoMassStatus.innerHTML = `Cargo mass low enough for launch.`
     };

     if (fuelLevelFigure < 10000 || cargoMassFigure > 10000){
         statusUpdate.style = "visibility: visible";
         launchStatusUpdate.style = "color:red";
         launchStatusUpdate.innerHTML = `Shuttle not ready for launch`
     } else {
         statusUpdate.style = "visibility: hidden";
         launchStatusUpdate.style = "color:green";
         launchStatusUpdate.innerHTML = `Shuttle is ready for launch`
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
