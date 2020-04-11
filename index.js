// Race, Subrace, Class, Subclass
var character_base = {};
// AbilityScore
var abilityScores = {};
// All random proficiencies
var proficiencies = [];
// Starting equipment
var equipment = [];
// [spellName, spellType]
var spellList = [];
//Languages
var languages = [];
//Backstory
var backstory = [];

$("#button").click(function () {
    $("#button").css({ display: "none" });
    $("#wait").css({ display: "block" });
    main();
});

function main() {

    getRace.done(function () {

        getClass.done(function () {

            prepareBackstory();
            getAbilityScores();
            addExtraAbilityScores();
            getProficiencies();
            getSpellcasting(); //needs more time
            getAge();
            getLanguages();
            setTimeout(showInfo, 2000);
        });
    });
    
}

function showInfo() {

    $("#box").css({ display: "flex" });
    $("#wait").css({ display: "none" });

    if(character_base["Subrace"]) {
        var race = document.createElement("h1");
        race.innerHTML = character_base["Race"].charAt(0).toUpperCase() + character_base["Race"].slice(1) + " (" + character_base["Subrace"].charAt(0).toUpperCase() + character_base["Subrace"].slice(1) + ") ";
        document.getElementById("title").appendChild(race);
    } else {
        var race = document.createElement("h1");
        race.innerHTML = character_base["Race"].charAt(0).toUpperCase() + character_base["Race"].slice(1);
        document.getElementById("title").appendChild(race);
    }

    var theClass = document.createElement("h2");
    theClass.innerHTML = character_base["Class"].charAt(0).toUpperCase() + character_base["Class"].slice(1);
    document.getElementById("title").appendChild(theClass);

    if(character_base["Subclass"]) {
        var subclass = document.createElement("h2");
        subclass.innerHTML = character_base["Subclass"].charAt(0).toUpperCase() + character_base["Subclass"].slice(1);
        document.getElementById("title").appendChild(subclass);
    }

    for(var i = 0; i < proficiencies.length; i++) {
        var prof = document.createElement("h4");
        prof.innerHTML = proficiencies[i];
        document.getElementById("proficiences").appendChild(prof);
    }

    for(var j = 0; j < languages.length; j++) {
        var language = document.createElement("h4");
        language.innerHTML = languages[j];
        document.getElementById("languages").appendChild(language);
    }

    for(var s in spellList) {
        var spell = document.createElement("h4");
        if(spellList[s][1] == 0) {
            spell.innerHTML = spellList[s][0];
            document.getElementById("cantrips").appendChild(spell);
        }
        if(spellList[s][1] == 1) {
            spell.innerHTML = spellList[s][0];
            document.getElementById("spells").appendChild(spell);
        }
    }

    for(var score in abilityScores) {

        var scoreBox = document.createElement("div");
        scoreBox.className = "score";
        var h3 = document.createElement("h3");
        h3.innerHTML = score + abilityScores[score];
        var h4 = document.createElement("h4");
        h4.innerHTML = calculate(abilityScores[score]);
        scoreBox.append(h3);
        scoreBox.append(h4);

        document.getElementById("abilityScores").appendChild(scoreBox);

    }

    console.log(backstory);

    document.getElementById("firstline").append(character_base["Age"] + " y/o " + backstory[0][1]);
    document.getElementById("shortbio").append("You're a " + backstory[1][1] + " " + character_base["Class"] + ". " + backstory[2][1]);

    document.getElementById("birthstory").append("You were born " + backstory[3][1] + ". ");
    
    if(backstory[4][0] != "Parents") {
        document.getElementById("birthstory").append(backstory[4][1] + ". ");
        backstory.splice(4, 1);
    }
    document.getElementById("birthstory").append(backstory[4][1] + " and you live " + backstory[5][1] + ". ");
    
    if(backstory[8][0] != "ChildhoodMemories") {
        document.getElementById("birthstory").append(backstory[8][1] + ". ");
        backstory.splice(8, 1);
    }

    if(backstory[8][0] != "ChildhoodMemories") {
        document.getElementById("birthstory").append("They " + backstory[8][1] + ". ");
        backstory.splice(8, 1);
    }

    document.getElementById("birthstory").append("You live " + backstory[6][1] + " " + backstory[7][1] + ". ");
    document.getElementById("birthstory").append(backstory[8][1] + ". ");
    document.getElementById("lifestory").append("Your occupation is being a " + backstory[9][1] + ". " + backstory[10][1] + " ");

    document.getElementById("lifestory").append(backstory[11][1]);

    var arrayLength = backstory.length - 1;
    if(backstory[arrayLength][0] != "LifeEvents") {
        document.getElementById("lifestory").append(" (" + backstory[arrayLength][1] + ")");
    }
}

var getRace = $.getJSON('https://www.dnd5eapi.co/api/races', function (json) {
    var races = [];

    $(json.results).each(function (i) {
        races.push(json.results[i].index);
    });

    var randIndex = Math.floor(Math.random() * races.length);
    character_base["Race"] = races[randIndex];

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {

        var subrace;
        if (json.subraces.length > 0) {

            $(json.subraces).each(function (i) {
                subrace = json.subraces[i].name;
            });

            var random = Math.random() > 0.6;
            if (random) {
                $.getJSON('https://www.dnd5eapi.co/api/subraces/', function (json) {

                    $(json.results).each(function (i) {

                        if (json.results[i].name === subrace) {

                            character_base["Subrace"] = json.results[i].index;
                        }

                    });
                });
            }
        }
    });
});

var getClass = $.getJSON('https://www.dnd5eapi.co/api/classes', function (json) {
    var classes = [];

    $(json.results).each(function (i) {
        classes.push(json.results[i].index);
    });

    var randIndex = Math.floor(Math.random() * classes.length);
    character_base["Class"] = classes[randIndex];

    $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json) {

        var subclass;
        if (json.subclasses.length > 0) {

            $(json.subclasses).each(function (i) {
                subclass = json.subclasses[i].name;
            });
        }

        var random = Math.random() > 0.6;
        if (random) {
            $.getJSON('https://www.dnd5eapi.co/api/subclasses/', function (json) {

                $(json.results).each(function (i) {

                    if (json.results[i].name === subclass) {

                        character_base["Subclass"] = json.results[i].index;
                    }
                });
            });
        }
    });
});

function getAbilityScores() {

    $.getJSON('https://www.dnd5eapi.co/api/ability-scores', function (json) {

        var abilities = [];
        scores = [8, 10, 12, 13, 14, 15];

        $(json.results).each(function (i) {
            abilities.push(json.results[i].name);
        });

        for (let index = 0; index < abilities.length; index++) {

            var randIndex = Math.floor(Math.random() * scores.length);

            abilityScores[abilities[index]] = scores[randIndex];
            var removableIndex = scores.indexOf(scores[randIndex]);
            scores.splice(removableIndex, 1);
        }
    });
}

function addExtraAbilityScores() {

    if (character_base["Subrace"]) {
        $.getJSON('https://www.dnd5eapi.co/api/subraces/' + character_base["Subrace"], function (json) {

            $(json.ability_bonuses).each(function (index) {

                var ability = json.ability_bonuses[index].name;
                var number = json.ability_bonuses[index].bonus;

                abilityScores[ability] += number;
            });
        });
    } else {
        $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {

            $(json.ability_bonuses).each(function (index) {

                var ability = json.ability_bonuses[index].name;
                var number = json.ability_bonuses[index].bonus;

                abilityScores[ability] += number;
            });
        });
    }
}

function calculate(number) {

    let plus = -1;

    if (number == 8 && number == 9) {
        plus = -1;
    }
    else if (number == 10 || number == 11) {
        plus = 0;
    } else if (number == 12 || number == 13) {
        plus = 1;
    } else if (number == 14 || number == 15) {
        plus = 2;
    } else if (number == 16 || number == 17) {
        plus = 3;
    } else if (number == 18 || number == 19) {
        plus = 4;
    }
    return plus;
}

function getProficiencies() {

    var isRace;
    var shortcut;

    if (character_base["Subrace"]) {
        isRace = "Subrace";
        shortcut = "subraces/";
    } else {
        isRace = "Race";
        shortcut = "races/";
    }

    $.getJSON('https://www.dnd5eapi.co/api/' + shortcut + character_base[isRace], function (json) {

        existingProficiencies = [];
        newProficiencies = [];

        $(json.starting_proficiencies).each(function (i) {
            existingProficiencies.push(json.starting_proficiencies[i].name);
        });

        $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base['Class'], function (json) {

            $(json.proficiencies).each(function (i) {
                existingProficiencies.push(json.proficiencies[i].name);
            });

            var choose = 0;
            var amountOfLists = Object.keys(json.proficiency_choices).length;

            for (var i = 0; i < amountOfLists; i++) {
                var listOfProf = [];
                var amountProf = 0;

                $(json.proficiency_choices[i].from).each(function (j) {
                    choose = json.proficiency_choices[i].choose;
                    listOfProf.push(json.proficiency_choices[i].from[j].name);
                    amountProf++;
                });

                for (var k = 0; k < choose; k++) {
                    var randIndex = Math.floor(Math.random() * amountProf);

                    while (existingProficiencies.includes(listOfProf[randIndex])) {
                        randIndex = Math.floor(Math.random() * amountProf);
                    }

                    newProficiencies.push(listOfProf[randIndex]);
                    listOfProf.splice(randIndex, 1);
                    amountProf--;
                }
            }

            for (var i = 0; i < existingProficiencies.length; i++) {
                proficiencies.push(existingProficiencies[i]);
            }

            for (var i = 0; i < newProficiencies.length; i++) {
                proficiencies.push(newProficiencies[i]);
            }
        });
    });
}

function getAge() {

    var ages = {};
    ages["dwarf"] = [20, 250];
    ages["elf"] = [50, 350];
    ages["gnome"] = [20, 200];
    ages["half-elf"] = [14, 125];
    ages["half-orc"] = [8, 60];
    ages["halfling"] = [14, 100];
    ages["human"] = [13, 70];
    ages["dragonborn"] = [15, 80];
    ages["tiefling"] = [13, 70];

    var minAge = Math.ceil(ages[character_base["Race"]][0]);
    var maxAge = Math.floor(ages[character_base["Race"]][1]);

    var randIndex = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
    character_base["Age"] = randIndex;
}

// KONSTIGT UPPLÄGG (KASTA SKITEN) / Kolla om du får det att funka sen på slutet kanske..
function getStartingEquipment() {

    $.getJSON('https://www.dnd5eapi.co/api/starting-equipment', function (json) {
        var shortcut;

        var chosenClass = character_base["Class"];
        toUpper = chosenClass.charAt(0).toUpperCase() + chosenClass.slice(1);

        $(json.results).each(function (i) {
            if (json.results[i].class == toUpper) {
                shortcut = json.results[i].url;
            }
        });

        $.getJSON('https://www.dnd5eapi.co' + shortcut, function (json) {

            $(json.starting_equipment).each(function (i) {
                equipment.push([json.starting_equipment[i].item.name, json.starting_equipment[i].quantity]);
            });

            var choiceBoxes = [];
            var choice = "choice_"
            var contentKeys = Object.keys(json);

            for (var index = 0; index < contentKeys.length; index++) {
                if (contentKeys[index].startsWith(choice)) {
                    choiceBoxes.push(contentKeys[index]);
                }
            }

            for (var index = 0; index < choiceBoxes.length; index++) {

                $(json[choiceBoxes[index]]).each(function (i) {

                    var theEquipment = [];
                    var choose = json[choiceBoxes[index]][i].choose;

                    $(json[choiceBoxes[index]][i].from).each(function (j) {
                        console.log(json[choiceBoxes[index]][j]);
                    });

                    console.log("done with box");
                });
            }

        });
    });
}

// Humans/Half-elfs får välja extra språk, dvärgar får välja extra proficiencies, dragonborns får välja extra traits

function getSpellcasting() {

    $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"] + '/levels/1', function (json) {

        var cantripsAmount = 0;
        var firstLevelSpellsAmount = 0;

        if (json.hasOwnProperty('spellcasting')) {

            if (json.spellcasting.hasOwnProperty('cantrips_known')) {
                cantripsAmount = json.spellcasting.cantrips_known;
            }

            if (json.spellcasting.hasOwnProperty('spells_known')) {
                firstLevelSpellsAmount = json.spellcasting.spells_known;
            }
        }

        var classSpells = [];
        var chosenSpells = [];
        var chosenCantrips = [];

        var getSpells = $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"] + '/spells', function (json) {
            $(json.results).each(function (i) {
                classSpells.push(json.results[i].url);
            });
        });

        getSpells.done(function () {

            for (var i = 0; i < classSpells.length; i++) {

                var random = Math.floor(Math.random() * classSpells.length)

                $.getJSON('https://www.dnd5eapi.co' + classSpells[random], function (json2) {

                    if (json2.level === 0) {

                        if (chosenCantrips.length < cantripsAmount && !chosenCantrips.includes(json2.index)) {
                            chosenCantrips.push(json2.index);

                            spellList.push([json2.name, json2.level]);
                        }

                    } if (json2.level === 1) {

                        if (chosenSpells.length < firstLevelSpellsAmount && !chosenSpells.includes(json2.index)) {
                            chosenSpells.push(json2.index);
                            spellList.push([json2.name, json2.level]);

                        }
                    }

                });
            }

        });
    });
}

function getLanguages() {

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {

        $(json.languages).each(function (i) {
            languages.push(json.languages[i].name);
        });
    });

    getExtraLanguages();
}

function getExtraLanguages() {

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {

        if (json.hasOwnProperty('language_options')) {

            var choose = json.language_options.choose;
            var sumLanguages = 0;
            var theLanguages = [];

            $(json.language_options.from).each(function (i) {
                sumLanguages++;
                theLanguages.push(json.language_options.from[i].name);
            });

            for(var i = 0; i < choose; i++) {

                var randIndex = Math.floor(Math.random() * theLanguages.length);

                if(!languages.includes(theLanguages[randIndex])) {

                    languages.push(theLanguages[randIndex]);
                }
            }
        }
    });
}

function getBackstory(part) {

    var element = window[part];
    var dice = element["Dice"].split("d");
    var diceNumber = Math.floor(Math.random() * dice[1] + 1);
    const dash = '-';

    for(i in element) {
        
        var numbers = i.split(dash);

        if(numbers.length == 2) {

            if(diceNumber >= numbers[0] && diceNumber <= numbers[1]) {
                backstory.push([part, element[i]]);
                return element[i];    
            }

        } if (numbers.length == 1 && numbers[0] != "Dice") {

            if(diceNumber == numbers[0]) {
                backstory.push([part, element[i]]);
                return element[i];
            }
        }

    }
}

function prepareBackstory() {

    getBackstory("Gender");
    getBackstory("Alignment");
    getBackstory(character_base["Class"]);
    getBackstory("Birthplace");

    if(character_base["Race"] === "tiefling") {
        getBackstory("TieflingParents");
    }
    if(character_base["Race"] === "half-elf") {
        getBackstory("HalfElfParents");
    }
    if(character_base["Race"] === "half-orc") {
        getBackstory("HalfOrcParents");
    }

    getBackstory("Parents");
    getBackstory("Family");
    getBackstory("Lifestyle");
    getBackstory("Home");

    for(var info in backstory) {

        var getText = "";

        if(backstory[info][1].includes("#")) {
            getText = backstory[info][1].split('#').pop();
            backstory[info][1] = backstory[info][1].replace("#" + getText, "");

            var value = getBackstory(getText);
            var extraInformation = "";

            if(value.includes("#")) {

                extraInformation = value.split('#').pop();
                getBackstory(extraInformation);

                for(var extrainfo in backstory) {
                    if(backstory[extrainfo][1].includes(extraInformation)) {

                        backstory[extrainfo][1] = backstory[extrainfo][1].replace("#" + extraInformation, "");
                    }
                }
            }
        }
    }

    getBackstory("ChildhoodMemories");

    var backstoryDetails = getBackstory("Backgrounds");
    var check = backstoryDetails.split(' ');

    if(check.length === 2) {
        backstoryDetails = check[0] + check[1];
        getBackstory(backstoryDetails);
    } else {
        getBackstory(backstoryDetails);
    }

    var bigEvent = getBackstory("LifeEvents");

    if(bigEvent.includes("#")) {

        var typeOfEvent = bigEvent.split('#').pop();
        bigEvent = backstory[info][1].replace("#" + typeOfEvent, "");

            getBackstory(typeOfEvent);

            for(var item in backstory) {

                if(backstory[item][1].includes(typeOfEvent)) {

                    backstory[item][1] = backstory[item][1].replace("#" + typeOfEvent, "");
                }
            }

    }
    
}
