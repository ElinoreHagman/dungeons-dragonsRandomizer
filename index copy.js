var theRace;
var isSubRace = false;
var theClass;
var theSubClass;
var theAbilityScores = new Map();
var extraScores = new Map();
var theAbilities = [];

$("#button").mouseover(function() {

    getRace();
    getClass();
    getAbilityScores();
    setTimeout(addExtraAbilityScores, 1000);
});

$("#button").click(function() {

    document.body.style.cursor = "wait";
    document.getElementById("button").style.cursor = "wait";
    setTimeout(showInfo, 1000);

});

function showInfo() {
    document.getElementById("abilityScores").innerHTML = "";
    document.getElementById("race").innerHTML = theRace;
    document.getElementById("class").innerHTML = theClass;
    document.getElementById("subclass").innerHTML = theSubClass;

    for (let index = 0; index < theAbilityScores.size; index++) {
        
        document.getElementById("abilityScores").append(theAbilities[index] + theAbilityScores.get(theAbilities[index]) + " ");
    }

    document.body.style.cursor = "default";
    document.getElementById("button").style.cursor = "default";
}

function addExtraAbilityScores() {

    if(isSubRace === false) {

        $.getJSON('https://www.dnd5eapi.co/api/races/' + theRace.toLowerCase(), function(json){

            $(json.ability_bonuses).each(function(i) {
    
                var ability = json.ability_bonuses[i].name;
                var number = json.ability_bonuses[i].bonus;   
                var oldNumber = theAbilityScores.get(ability);
                newNumber = number + oldNumber;
                theAbilityScores.set(ability, newNumber);

                extraScores.set(ability, newNumber);
                
            });
        });

    } else {

        $.getJSON('https://www.dnd5eapi.co/api/subraces/' + theRace.toLowerCase(), function(json){

            $(json.ability_bonuses).each(function(i) {
    
                var ability = json.ability_bonuses[i].name;
                var number = json.ability_bonuses[i].bonus;   
                var oldNumber = theAbilityScores.get(ability);
                newNumber = number + oldNumber;
                theAbilityScores.set(ability, newNumber);  
                
                extraScores.set(ability, newNumber);

            });
        });
    }
}

function getRace() {
isSubRace = false;

    $.getJSON('https://www.dnd5eapi.co/api/races', function(json){
        var races = [];
        var chosenRace;

        $(json.results).each(function(i) {
            races.push(json.results[i].name);
        });

        var randIndex = Math.floor(Math.random() * races.length);
        chosenRace = races[randIndex];

        $.getJSON('https://www.dnd5eapi.co/api/races/' + chosenRace.toLowerCase(), function(json){

        var subraces = [chosenRace, chosenRace];

        if(json.subraces.length >= 1) {

            $(json.subraces).each(function(i) {
                subraces.push(json.subraces[i].name);
            });
        }

        var randIndex = Math.floor(Math.random() * subraces.length);
        theRace = subraces[randIndex];
        theRace = theRace.replace(/\s+/g, '-');

        if (theRace != chosenRace) {
            isSubRace = true;
        }

    });

    });
}

function getClass() {

    $.getJSON('https://www.dnd5eapi.co/api/classes', function(json){
        var classes = [];
        var chosenClass;

        $(json.results).each(function(i) {
            classes.push(json.results[i].name);
        });

        var randIndex = Math.floor(Math.random() * classes.length);
        chosenClass = classes[randIndex];
        theClass = chosenClass;

        $.getJSON('https://www.dnd5eapi.co/api/classes/' + chosenClass.toLowerCase(), function(json){

        var subclasses = ["", ""];

        if(json.subclasses.length >= 1) {

            $(json.subclasses).each(function(i) {
                subclasses.push(json.subclasses[i].name);
            });
        }

        var randIndex = Math.floor(Math.random() * subclasses.length);
        theSubClass = subclasses[randIndex];

    });
});
}

function getAbilityScores() {

    $.getJSON('https://www.dnd5eapi.co/api/ability-scores', function(json){
        
        var abilities = [];
        scores = [8, 10, 12, 13, 14, 15];
        let abilityScores = new Map();
        let randIndex;

        $(json.results).each(function(i) {
            abilities.push(json.results[i].name);
        });
        theAbilities = abilities;

        for (let index = 0; index < abilities.length; index++) {

            randIndex = Math.floor(Math.random() * scores.length);
            
            abilityScores.set(abilities[index], scores[randIndex]);
            scores.splice(randIndex, 1)
        }

        theAbilityScores = abilityScores;
    });

}