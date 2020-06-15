// Race, Subrace, Class, Subclass
var character_base = {};
// AbilityScore
var abilityScores = {};
// Saving Throws
var savingthrows = [];
// Skill proficiencies
var skillproficiencies = [];
// Rest of the proficiencies
var proficiencies = [];
// [name, amount]
var equipment = [];
// attacks
var attacks = [];
// armor
var armor = [];
// [spellName, spellType]
var spellList = [];
//Languages
var languages = [];
//Backstory
var backstory = [];
//Traits
var traits = [];

$("#menu-charactersheet").click(function () {

    $("#character-sheet-info").slideToggle(300, function () {
        
        document.getElementById("menu-backgroundinfo").classList.add("passive");
        document.getElementById("menu-charactersheet").classList.remove("passive");
        $("#background-sheet-info").slideToggle();

    });

});

$("#menu-backgroundinfo").click(function () {

    $("#background-sheet-info").slideToggle(10, function () {
        document.getElementById("menu-charactersheet").classList.add("passive");
        document.getElementById("menu-backgroundinfo").classList.remove("passive");
        $("#character-sheet-info").slideToggle();
    });

});

$("#button").click(function () {
    $("#button").fadeToggle(300, function () {
        $("#wait").fadeToggle();
    });

    setTimeout(changeText, 1900);

});

$("#button2").click(function () {

    location.reload();
});

function changeText() {

    var text = ["Reading the Player's Handbook..", "Trying out the fireball spell..", "Preparing the character sheet while on fire.."];

    for (var i = 0; i < 3; ++i) {

        (function (index) {
            setTimeout(function () {
                document.getElementById("wait-text").innerHTML = text[index];
            }, i * 1900);
        })(i);
    }

    setTimeout(main, 1900);
}

$("#showinfo").click(function () {
    $(".projectInformation").slideToggle();

});

function main() {

    getRace.done(function () {

        getTraits();

        getClass.done(function () {

            prepareBackstory();
            getAbilityScores();
            getSkillProficiencies();
            getProficiencies();
            getAge();
            getStartingWealth();
            getSpeed();
            getHitDie();
            getLanguages();
            setTimeout(getSpellcasting, 1000);
            setTimeout(showInfo, 4000);
        });
    });
}

function showInfo() {

    $("#content-part2").fadeToggle();
    $("#content-part1").toggle();
    // Character info
    if(character_base["Subclass"]) {
        document.getElementById("character-class").value = upperCase(character_base["Class"]) + " (" + upperCase(character_base["Subclass"]) + ") 1";
    } else {
        document.getElementById("character-class").value = upperCase(character_base["Class"]);
    }

    if(character_base["Subrace"]) {
        document.getElementById("character-race").value = upperCase(character_base["Subrace"]);
    } else {
        document.getElementById("character-race").value = upperCase(character_base["Race"]);
    }

    document.getElementById("character-background").value = upperCase(character_base["Occupation"]);
    document.getElementById("character-alignment").value = upperCase(character_base["Alignment"]);

    // Ability scores
    for(var ability in abilityScores) {

        var totalNumber = "character-" + ability.toLowerCase();
        var modifierNumber = "modifier-" + ability.toLowerCase();

        document.getElementById(totalNumber).value = abilityScores[ability];
        document.getElementById(modifierNumber).value = calculate(abilityScores[ability]);
    }

    // Saving Throws
    for(var ability in abilityScores) {

        var numberId = "saving-" + ability.toLowerCase();

        if(savingthrows.includes(ability)) {
            var checkboxId = "checkbox-" + ability.toLowerCase();
            document.getElementById(checkboxId).checked = true;
            document.getElementById(numberId).value = calculate(abilityScores[ability]) + parseInt(document.getElementById("proficiency-bonus").value);

        } else {
            document.getElementById(numberId).value = calculate(abilityScores[ability]);
        }

    }

    // Skills     
    $('.skills-item').each(function () {

        var idString = this.id.slice(9);
        for(var item in skillproficiencies) {           
            var skill = skillproficiencies[item].toLowerCase();
            if(skill.includes(idString)) {
                document.getElementById(this.id).checked = true;
            }
        }
    });
    $('.prof-list').each(function () {

        for (var i = 0; i < this.childNodes.length; i++) {

            if (this.childNodes[i].className == "prof-text") {

                var itemContent = this.querySelector("h4").innerHTML;
                var inputField = this.querySelector(".skills-number");
                var checkboxStatus = this.querySelector(".skills-item");

                for(var skill in abilityScores) {
                    if(itemContent.toLowerCase().includes(skill.toLowerCase())) {
                        
                        if(document.getElementById(checkboxStatus.id).checked == true) {
                            inputField.value = parseInt(calculate(abilityScores[skill])) + parseInt(document.getElementById("proficiency-bonus").value);

                        } else {
                            inputField.value = calculate(abilityScores[skill]);

                        }

                    }
                }


            }        
        }

    });

    // Hit Ponts, Armor class smaller things
    document.getElementById("maxHitpoints").value = character_base["HitDie"];
    document.getElementById("currentHitpoints").value = character_base["HitDie"];
    document.getElementById("initiative-input").value = calculate(abilityScores["DEX"]);
    document.getElementById("armorclass-input").value = character_base["Armorclass"];
    document.getElementById("speed-input").value = character_base["Speed"];
    document.getElementById("passive-wisdom").value = character_base["PassiveWisdom"];

    // Equipment
    document.getElementById("coin-gold").value = character_base["Wealth"];

    // Proficiences
    for(var item in proficiencies) {
        
        var bigDiv = document.createElement("div");
        bigDiv.className = "list-item";

        var smallDiv1 = document.createElement("div");
        smallDiv1.className = "list-type";
        var input1 = document.createElement("input");
        input1.className = "h6 proficiency-info";
        input1.type = "text";
        input1.value = proficiencies[item][0];

        var smallDiv2 = document.createElement("div");
        smallDiv2.className = "list-info";
        var input2 = document.createElement("input");
        input2.className = "h6 proficiency-info";
        input2.type = "text";
        input2.value = proficiencies[item][1];

        smallDiv1.appendChild(input1);
        smallDiv2.appendChild(input2);
        bigDiv.appendChild(smallDiv1);
        bigDiv.appendChild(smallDiv2);    

        document.getElementById("proficiency-list").appendChild(bigDiv);

    }
    $("#proficiency-list").append('<div class="description"><h1>Proficiencies & Languages</h1></div>');
    
    // Starting Equipment
    for(var item in equipment) {
        
        var bigDiv = document.createElement("div");
        bigDiv.className = "list-item";

        var smallDiv1 = document.createElement("div");
        smallDiv1.className = "list-name";
        var input1 = document.createElement("input");
        input1.className = "h6 equipment-amount";
        input1.type = "text";
        input1.value = equipment[item][1];

        var smallDiv2 = document.createElement("div");
        smallDiv2.className = "list-bonus";
        var input2 = document.createElement("input");
        input2.className = "h6 equipment-name";
        input2.type = "text";
        input2.value = equipment[item][0];

        var smallDiv3 = document.createElement("div");
        smallDiv3.className = "list-attack";
        var input3 = document.createElement("input");
        input3.className = "h6 equipment-weight";
        input3.type = "text";

        smallDiv1.appendChild(input1);
        smallDiv2.appendChild(input2);
        smallDiv3.appendChild(input3);
        bigDiv.appendChild(smallDiv1);
        bigDiv.appendChild(smallDiv2);
        bigDiv.appendChild(smallDiv3);  

        document.getElementById("right-side").appendChild(bigDiv);
    }
    
    // Attack list
    for(var item in attacks) {
        
        var bigDiv = document.createElement("div");
        bigDiv.className = "list-item";

        var smallDiv1 = document.createElement("div");
        smallDiv1.className = "list-name";
        var input1 = document.createElement("input");
        input1.className = "h6 weapon-name";
        input1.type = "text";
        input1.value = attacks[item]["name"];

        var smallDiv2 = document.createElement("div");
        smallDiv2.className = "list-bonus";
        var input2 = document.createElement("input");
        input2.className = "h6 weapon-bonus";
        input2.type = "text";
        input2.value = attacks[item]["bonus"];

        var smallDiv3 = document.createElement("div");
        smallDiv3.className = "list-attack";
        var input3 = document.createElement("input");
        input3.className = "h6 weapon-attack";
        input3.type = "text";
        input3.value = attacks[item]["diceroll"] + "+" + attacks[item]["ability"] + " " + attacks[item]["damagetype"];

        smallDiv1.appendChild(input1);
        smallDiv2.appendChild(input2);
        smallDiv3.appendChild(input3);
        bigDiv.appendChild(smallDiv1);
        bigDiv.appendChild(smallDiv2);
        bigDiv.appendChild(smallDiv3);  

        document.getElementById("weapon-list").appendChild(bigDiv);
    }
    $("#weapon-list").append('<div class="description"><h1>Attacks & Spellcasting</h1></div>');

    // Traits
    for(var item in traits) {
        
        var bigDiv = document.createElement("div");
        bigDiv.className = "trait-item";

        var input = document.createElement("input");
        input.className = "trait-name";
        input.type = "text";
        input.value = traits[item][0];
        var textarea = document.createElement("textarea");
        textarea.className = "trait-text";
        textarea.value = traits[item][1];

        bigDiv.appendChild(input);
        bigDiv.appendChild(textarea);

        document.getElementById("trait-list").appendChild(bigDiv);
        textarea.style.height = (textarea.scrollHeight > textarea.clientHeight) ? (textarea.scrollHeight)+"px" : "60px";

    }

}

function showInfo2() {

    $("#button2").fadeToggle(300);
    $("#box").css({ display: "flex" });
    $("#wait").css({ display: "none" });

    if (character_base["Subrace"]) {
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

    if (character_base["Subclass"]) {
        var subclass = document.createElement("h2");
        subclass.innerHTML = character_base["Subclass"].charAt(0).toUpperCase() + character_base["Subclass"].slice(1);
        document.getElementById("title").appendChild(subclass);
    }

    for (var i = 0; i < proficiencies.length; i++) {
        var prof = document.createElement("h4");
        prof.innerHTML = proficiencies[i];
        document.getElementById("proficiences").appendChild(prof);
    }

    for (var i = 0; i < equipment.length; i++) {
        var e = document.createElement("h4");
        e.innerHTML = equipment[i][0] + " (" + equipment[i][1] + ")";
        document.getElementById("equipment").appendChild(e);
    }

    for (var j = 0; j < languages.length; j++) {
        var language = document.createElement("h4");
        language.innerHTML = languages[j];
        document.getElementById("languages").appendChild(language);
    }

    for (var j = 0; j < traits.length; j++) {
        var trait = document.createElement("h4");
        trait.innerHTML = traits[j];
        document.getElementById("traits").appendChild(trait);
    }

    for (var s in spellList) {
        var spell = document.createElement("h4");
        if (spellList[s][1] == 0) {
            spell.innerHTML = spellList[s][0];
            document.getElementById("cantrips").appendChild(spell);
        }
        if (spellList[s][1] == 1) {
            spell.innerHTML = spellList[s][0];
            document.getElementById("spells").appendChild(spell);
        }
    }

    for (var score in abilityScores) {

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

    document.getElementById("firstline").innerHTML = "<h2>" + character_base["Age"] + " y/o " + backstory[0][1] + "</h2>";

    document.getElementById("shortbio").innerHTML = "<h5>Bio</h5>";
    $("#shortbio").append("<p> You're a " + backstory[1][1] + " " + character_base["Class"] + ". " + backstory[2][1] + "</p>");

    document.getElementById("birthstory").innerHTML = "<h5>Childhood</h5>";
    $("#birthstory").append("<p>You were born " + backstory[3][1] + ". </p>");

    if (backstory[4][0] != "Parents") {
        $("#birthstory").append("<p>" + backstory[4][1] + ". </p>");
        backstory.splice(4, 1);
    }
    $("#birthstory").append("<p>" + backstory[4][1] + " and you grew up " + backstory[5][1] + ". </p>");

    if (backstory[8][0] != "ChildhoodMemories") {
        $("#birthstory").append("<p>" + backstory[8][1] + ". </p>");

        if (backstory[9][0] != "ChildhoodMemories") {
            $("#birthstory").append("<p>They " + backstory[9][1] + ". </p>");
            backstory.splice(8, 1);
        }

        backstory.splice(8, 1);
    }

    $("#birthstory").append("<p>" + backstory[8][1] + ". </p>");

    document.getElementById("lifestory").innerHTML = "<h5>Background</h5>";
    $("#lifestory").append("<p>You live " + backstory[6][1] + " " + backstory[7][1] + ". </p>");
    $("#lifestory").append("<p>Your occupation is being a " + backstory[9][1] + ". " + backstory[10][1] + " </p>");

    $("#lifestory").append("<p>" + backstory[11][1] + "</p>");

    var arrayLength = backstory.length - 1;
    if (backstory[arrayLength][0] != "LifeEvents") {
        $("#lifestory").append("<p> (" + backstory[arrayLength][1] + ")</p>");
    }
}

var getRace = $.getJSON('https://www.dnd5eapi.co/api/races', function (json) {
    var races = [];
    console.log();
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
    getSavingThrows();
});

function getSavingThrows() {
    
    $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json) {

        $(json.saving_throws).each(function (i) {
            savingthrows.push(json.saving_throws[i].name);
        });

    });
}

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

    addExtraAbilityScores();
}

function addExtraAbilityScores() {

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {

        var bonusList = [];
        $(json.ability_bonuses).each(function (index) {

            bonusList.push(json.ability_bonuses[index].name);
            var ability = json.ability_bonuses[index].name;
            var number = json.ability_bonuses[index].bonus;

            abilityScores[ability] += number;
        });
        
        if (json.hasOwnProperty('ability_bonus_options')) {

            var choose = json.ability_bonus_options.choose;
            var listBonuses = {};
            $(json.ability_bonus_options.from).each(function (i) {
                listBonuses[json.ability_bonus_options.from[i].name] = json.ability_bonus_options.from[i].bonus;
            });

            for(var i = 0; i < choose; i++) {
                var randIndex = Math.floor(Math.random() * Object.keys(listBonuses).length);
                
                if(!bonusList.includes(Object.keys(listBonuses)[randIndex])) {
                    bonusList.push(Object.keys(listBonuses)[randIndex]);
                    abilityScores[Object.keys(listBonuses)[randIndex]] += listBonuses[Object.keys(listBonuses)[randIndex]];
                } else {
                    choose++;
                }
            }

        } 

        if (character_base["Subrace"]) {
            $.getJSON('https://www.dnd5eapi.co/api/subraces/' + character_base["Subrace"], function (json) {

                $(json.ability_bonuses).each(function (index) {

                    var ability = json.ability_bonuses[index].name;
                    var number = json.ability_bonuses[index].bonus;

                    abilityScores[ability] += number;
                });
            });
        } 

    });

}

function getStartingWealth() {

    var background = character_base["Occupation"];
    for(var choice in BackgroundGold) {
        if(choice.includes(background)) {
            character_base["Wealth"] = BackgroundGold[choice];
        }
    }
}

function getPassiveWisdom() {

    var wisdomModifier = calculate(abilityScores["WIS"]);
    var profBonus = document.getElementById("proficiency-bonus").value;

    if(skillproficiencies.includes("Skill: Perception")) {
        character_base["PassiveWisdom"] = 10 + parseInt(wisdomModifier) + parseInt(profBonus);

    } else {
        character_base["PassiveWisdom"] = 10 + parseInt(wisdomModifier);
    }
}

function getHitDie() {

    $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json) {
        character_base["HitDie"] = json.hit_die;
    
        var dropdown = document.getElementById("hitdice");
        var options = dropdown.options;
    
        for(var i = 0; i < options.length; i++) {
        
            if(options[i].value.includes(character_base["HitDie"])) {
                dropdown.options.selectedIndex = i;
            }
    
        }

    });

}

function getSpeed() {

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {
        character_base["Speed"] = json.speed;
    });

}

function getSkillProficiencies() {

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base['Race'], function (json) {

        $(json.starting_proficiencies).each(function (i) {
            if(json.starting_proficiencies[i].name.includes("Skill:")) {
                skillproficiencies.push(json.starting_proficiencies[i].name);
            }
        });
        
        $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base['Class'], function (json2) {

        var amountOfLists = json2.proficiency_choices.length;
        for(var i = 0; i < amountOfLists; i++) {
            
            var choose = json2.proficiency_choices[i].choose;
            var oldRandIndex;

            for(var j = 0; j < choose; j++) {

                var randIndex = Math.floor(Math.random() * json2.proficiency_choices[i].from.length);
                while(oldRandIndex == randIndex) {
                    randIndex = Math.floor(Math.random() * json2.proficiency_choices[i].from.length);
                }
                
                if(json2.proficiency_choices[i].from[randIndex].name.includes("Skill:") && !skillproficiencies.includes(json2.proficiency_choices[i].from[randIndex].name)) {
                    skillproficiencies.push(json2.proficiency_choices[i].from[randIndex].name);
                    oldRandIndex = randIndex;
                }
            }

        }   
        getPassiveWisdom();
 
        });
    });

    

}

var proficiencyUrls = [];
function getProficiencies() {

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {

        $(json.starting_proficiencies).each(function (i) {

            if(!json.starting_proficiencies[i].name.includes("Skill:")) {

                proficiencyUrls.push(json.starting_proficiencies[i].url);
            }

        });

        if (json.hasOwnProperty('starting_proficiency_options')) {

            var choose = json.starting_proficiency_options.choose;
            var oldRandIndex;

            for(var j = 0; j < choose; j++) {

                var randIndex = Math.floor(Math.random() * json.starting_proficiency_options.from.length);
                while(oldRandIndex == randIndex) {
                    randIndex = Math.floor(Math.random() * json.starting_proficiency_options.from.length);
                }

                if(!proficiencies.includes(json.starting_proficiency_options.from[randIndex].name)) {

                    proficiencyUrls.push(json.starting_proficiency_options.from[randIndex].url);
                    oldRandIndex = randIndex;
                }
            }
        }

        if(character_base["Subrace"]) {

            $.getJSON('https://www.dnd5eapi.co/api/subraces/' + character_base["Subrace"], function (json) {
        
                $(json.starting_proficiencies).each(function (i) {

                    if(!json.starting_proficiencies[i].name.includes("Skill:") && !proficiencies.includes(json.starting_proficiencies[i].name)) {

                        proficiencyUrls.push(json.starting_proficiencies[i].url);
                    }
        
                });
            });  
        }

        $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json) {

            $(json.proficiencies).each(function (i) {

                if(!json.proficiencies[i].name.includes("Skill:")) {

                    proficiencyUrls.push(json.proficiencies[i].url);
                }

            });

            getProficiencyType();
        });

    });

}

function getProficiencyType() {

    for(var i = 0; i < proficiencyUrls.length; i++) {

        $.getJSON('https://www.dnd5eapi.co' + proficiencyUrls[i], function (json) {

        proficiencies.push([json.type, json.name]);

        });
    }

    getStartingEquipment();

}

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

                equipment.push([json.starting_equipment[i].item.name, json.starting_equipment[i].quantity, json.starting_equipment[i].item.url]);
            });

            var choiceBoxes = [];
            var choice = "choice_"
            var contentKeys = Object.keys(json);

            for (var index = 0; index < contentKeys.length; index++) {
                if (contentKeys[index].startsWith(choice)) {
                    choiceBoxes.push(contentKeys[index]);
                }
            }

            for (var i = 0; i < choiceBoxes.length; i++) {

                var chooseBoxes = json[choiceBoxes[i]];
                var randIndex = Math.floor(Math.random() * chooseBoxes.length);

                $(json[choiceBoxes[i]][randIndex]).each(function (j) {

                    var sumItems = json[choiceBoxes[i]][randIndex].from;
                    var howMany = json[choiceBoxes[i]][randIndex].choose;
                    
                    var oldRandIndex;

                    for(var k = 0; k < howMany; k++) {

                        var randomIndex = Math.floor(Math.random() * sumItems.length);

                        while(oldRandIndex == randomIndex) {
                            randomIndex = Math.floor(Math.random() * sumItems.length);
                        }

                        var name = json[choiceBoxes[i]][randIndex].from[randomIndex].item.name;
                        var amount = json[choiceBoxes[i]][randIndex].from[randomIndex].quantity;
                        var url = json[choiceBoxes[i]][randIndex].from[randomIndex].item.url;

                        equipment.push([name, amount, url]);
                        oldRandIndex = randomIndex;

                    }
                });
            }

            getAttackDetails();
            getArmorclass();
        });

    });
}

function getStartingEquipment2() {

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

                equipment.push([json.starting_equipment[i].item.name, json.starting_equipment[i].quantity, json.starting_equipment[i].item.url]);
            });

            var choiceBoxes = [];
            var choice = "choice_"
            var contentKeys = Object.keys(json);

            for (var index = 0; index < contentKeys.length; index++) {
                if (contentKeys[index].startsWith(choice)) {
                    choiceBoxes.push(contentKeys[index]);
                }
            }

            for (var i = 0; i < choiceBoxes.length; i++) {

                var chooseBoxes = json[choiceBoxes[i]];
                var randIndex = Math.floor(Math.random() * chooseBoxes.length);

                $(json[choiceBoxes[i]][randIndex]).each(function (j) {

                    var sumItems = json[choiceBoxes[i]][randIndex].from;
                    var howMany = json[choiceBoxes[i]][randIndex].choose;
                    var oldRandIndex;

                    for (var k = 0; k < howMany; k++) {

                        var randomIndex = Math.floor(Math.random() * sumItems.length);
                        
                        while(oldRandIndex == randomIndex) {
                            var randomIndex = Math.floor(Math.random() * sumItems.length);
                        }
                
                        if(equipment.length > 0) {

                            if(!equipment[i][0].includes(json[choiceBoxes[i]][randIndex].from[randomIndex].item.name)) {
                                
                                var item = json[choiceBoxes[i]][randIndex].from[randomIndex].item.name;
                                var amount = json[choiceBoxes[i]][randIndex].from[randomIndex].quantity;
                                equipment.push([item, amount, json[choiceBoxes[i]][randIndex].from[randomIndex].item.url]);

                                oldRandIndex = randIndex;
                            } 

                        } else {

                            var item = json[choiceBoxes[i]][randIndex].from[randomIndex].item.name;
                            var amount = json[choiceBoxes[i]][randIndex].from[randomIndex].quantity;
                            equipment.push([item, amount, json[choiceBoxes[i]][randIndex].from[randomIndex].item.url]);

                            oldRandIndex = randIndex;
                        }

                    }

                });

            }
            getAttackDetails();

        });

    });
}

function getAttackDetails() {

    for(var url in equipment) {

        $.getJSON('https://www.dnd5eapi.co' + equipment[url][2], function (json) {

        if(json.equipment_category == "Weapon") {

            attacks.push ({
            "name" : json.name,
            "category" : json.weapon_category,
            "bonus" : json.damage.damage_bonus,
            "diceroll" : json.damage.damage_dice,
            "damagetype" : json.damage.damage_type.name,
            "range" : json.weapon_range
            });

            $(json.properties).each(function (i) {

                if(json.properties[i].name == "Finesse") {

                    attacks[attacks.length-1]["range"] = "Finesse";

                }

            });
            
            var isProficient = false;
            for(var item in proficiencies) {
                if(proficiencies[item][1].includes(attacks[attacks.length-1]["name"]) || proficiencies[item][1].includes(attacks[attacks.length-1]["category"])) {    
                    isProficient = true;
                }
            }

            var bonus = parseInt(attacks[attacks.length-1]["bonus"]);

                if(isProficient = true) {    
                    bonus += parseInt(document.getElementById("proficiency-bonus").value);
                }

                if(attacks[attacks.length-1]["range"] == "Melee") {
                    bonus += parseInt(calculate(abilityScores["STR"]));
                    attacks[attacks.length-1]["ability"] = calculate(abilityScores["STR"]);

                } else if(attacks[attacks.length-1]["range"] == "Ranged") {
                    bonus += parseInt(calculate(abilityScores["DEX"]));
                    attacks[attacks.length-1]["ability"] = calculate(abilityScores["DEX"]);

                } else if(attacks[attacks.length-1]["range"] == "Finesse") {

                    if(calculate(abilityScores["DEX"]) > calculate(abilityScores["STR"])) {
                        bonus += parseInt(calculate(abilityScores["DEX"])); 
                        attacks[attacks.length-1]["ability"] = calculate(abilityScores["DEX"]);

                    } else {
                        bonus += parseInt(calculate(abilityScores["STR"]));
                        attacks[attacks.length-1]["ability"] = calculate(abilityScores["STR"]);

                    }
                }

                attacks[attacks.length-1]["bonus"] = bonus;

            }

        });

    }
}

function getArmorclass() {

    for(var url in equipment) {

        $.getJSON('https://www.dnd5eapi.co' + equipment[url][2], function (json) {

            if(json.equipment_category == "Armor") {

                armor.push ({
                "name" : json.name,
                "armor" : json.armor_class.base,
                "category" : json.armor_category,
                "bonus" : json.armor_class.dex_bonus,
                "maxbonus" : json.armor_class.max_bonus,
                "strength" : json.str_minimum
                });
            }

        });
    }
    setTimeout(getArmorDetails, 1000);
}

function getArmorDetails() {

    var biggestArmor = 10;
    var chosenArmor;
    var shield = 0;

    if(armor.length > 0) {

        for(var item in armor) {

            if(armor[item]["name"] != "Shield") {

                if(armor[item]["armor"] > biggestArmor && armor[item]["strength"] <= abilityScores["STR"]) {
                    chosenArmor = armor[item];
                    biggestArmor = parseInt(armor[item]["armor"]);

                    var dex = parseInt(calculate(abilityScores["DEX"]));

                    if(chosenArmor["category"] == "Light") {
                        biggestArmor += dex;
                    } else if(chosenArmor["category"] == "Medium") {

                        if(dex > 2) {
                            biggestArmor += 2;
                        } else {
                            biggestArmor += dex;
                        }

                    }

                }
            }
            
            if(armor[item]["name"] == "Shield") {
                shield = armor[item]["armor"];
            }

        }

    }

    character_base["Armorclass"] = parseInt(biggestArmor) + parseInt(shield); 

}

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

            for (var i = 0; i < choose; i++) {

                var randIndex = Math.floor(Math.random() * theLanguages.length);

                if (!languages.includes(theLanguages[randIndex])) {

                    languages.push(theLanguages[randIndex]);
                }
            }
        }
    });
}

function getTraits() {

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {

        $(json.traits).each(function (i) {

            $.getJSON('https://www.dnd5eapi.co' + json.traits[i].url, function (json2) {

                traits.push([json2.name, json2.desc[0]]);
            });
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

function getBackstory(part) {

    var element = window[part];
    var dice = element["Dice"].split("d");
    var diceNumber = Math.floor(Math.random() * dice[1] + 1);
    const dash = '-';

    for (i in element) {

        var numbers = i.split(dash);

        if (numbers.length == 2) {

            if (diceNumber >= numbers[0] && diceNumber <= numbers[1]) {
                backstory.push([part, element[i]]);
                return element[i];
            }

        } if (numbers.length == 1 && numbers[0] != "Dice") {

            if (diceNumber == numbers[0]) {
                backstory.push([part, element[i]]);
                return element[i];
            }
        }

    }
}

function getAlignment() {

    var element = window["Alignment"];
    var dice = element["Dice"].split("d");
    var diceNumber = Math.floor(Math.random() * dice[1] + 1);
    const dash = '-';

    for (i in element) {

        var numbers = i.split(dash);

        if (numbers.length == 2) {

            if (diceNumber >= numbers[0] && diceNumber <= numbers[1]) {
                character_base["Alignment"] = element[i];
            }

        } if (numbers.length == 1 && numbers[0] != "Dice") {

            if (diceNumber == numbers[0]) {
                character_base["Alignment"] = element[i];

            }
        }

    }

}

function getOccupation() {

    var element = window["Backgrounds"];
    var dice = element["Dice"].split("d");
    var diceNumber = Math.floor(Math.random() * dice[1] + 1);
    const dash = '-';

    for (i in element) {

        var numbers = i.split(dash);

        if (numbers.length == 2) {

            if (diceNumber >= numbers[0] && diceNumber <= numbers[1]) {
                character_base["Occupation"] = element[i];
            }

        } if (numbers.length == 1 && numbers[0] != "Dice") {

            if (diceNumber == numbers[0]) {
                character_base["Occupation"] = element[i];

            }
        }

    }

}

function prepareBackstory() {

    getAlignment();
    getOccupation();

    getBackstory("Gender");

    getBackstory(character_base["Class"]);
    getBackstory("Birthplace");

    if (character_base["Race"] === "tiefling") {
        getBackstory("TieflingParents");
    }
    if (character_base["Race"] === "half-elf") {
        getBackstory("HalfElfParents");
    }
    if (character_base["Race"] === "half-orc") {
        getBackstory("HalfOrcParents");
    }

    getBackstory("Parents");
    getBackstory("Family");
    getBackstory("Lifestyle");
    getBackstory("Home");

    for (var info in backstory) {

        var getText = "";

        if (backstory[info][1].includes("#")) {
            getText = backstory[info][1].split('#').pop();
            backstory[info][1] = backstory[info][1].replace("#" + getText, "");

            var value = getBackstory(getText);
            var extraInformation = "";

            if (value.includes("#")) {

                extraInformation = value.split('#').pop();
                getBackstory(extraInformation);

                for (var extrainfo in backstory) {
                    if (backstory[extrainfo][1].includes(extraInformation)) {

                        backstory[extrainfo][1] = backstory[extrainfo][1].replace("#" + extraInformation, "");
                    }
                }
            }
        }
    }

    getBackstory("ChildhoodMemories");

    var backstoryDetails = getBackstory("Backgrounds");
    var check = backstoryDetails.split(' ');

    if (check.length === 2) {
        backstoryDetails = check[0] + check[1];
        getBackstory(backstoryDetails);
    } else {
        getBackstory(backstoryDetails);
    }

    var bigEvent = getBackstory("LifeEvents");

    if (bigEvent.includes("#")) {

        var typeOfEvent = bigEvent.split('#').pop();
        bigEvent = backstory[info][1].replace("#" + typeOfEvent, "");

        getBackstory(typeOfEvent);

        for (var item in backstory) {

            if (backstory[item][1].includes(typeOfEvent)) {

                backstory[item][1] = backstory[item][1].replace("#" + typeOfEvent, "");
            }
        }

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

function upperCase(string) {

    converted = string.charAt(0).toUpperCase() + string.slice(1);

    return converted;
}
