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
var expertise;
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
var backstory = {};
//Traits
var traits = [];

$("#menu-charactersheet").click(function () {

    $("#character-sheet-info").slideToggle(300, function () {
        
        document.getElementById("menu-backgroundinfo").classList.add("passiveb");
        document.getElementById("menu-charactersheet").classList.remove("passivec");
        $("#background-sheet-info").slideToggle();

    });

});

$("#menu-backgroundinfo").click(function () {

    $("#background-sheet-info").slideToggle(10, function () {
        document.getElementById("menu-charactersheet").classList.add("passivec");
        document.getElementById("menu-backgroundinfo").classList.remove("passiveb");
        $("#character-sheet-info").slideToggle();
    });

});

$("#button").click(function () {
    
    $("#button").fadeToggle(300, function () {
        $("#wait").fadeToggle();
    });

    main();

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
            }, i * 2000);
        })(i);
    }

    setTimeout(showInfo, 6000);
}

$("#showinfo").click(function () {
    $(".projectInformation").slideToggle();
});

function main() {

    setTimeout(changeText, 1900);

    getRace.done(function () {

        getTraits();
        getAge();
        getAbilityScores();
        getLanguages();
        getName();

        getClass.done(function () {
            getAlignment();
            getOccupation();
            getHitDie();
            getSpellcasting();
            getSkillProficiencies();
            getProficiencies();
            getFeatures();

            setTimeout(getStartingEquipment, 1000);

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
        document.getElementById("character-class").value = upperCase(character_base["Class"]) + " 1";;
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
                    
                    if(itemContent.toLowerCase().includes("(" + skill.toLowerCase() + ")")) {

                        if(document.getElementById(checkboxStatus.id).checked == true) {

                            inputField.value = parseInt(calculate(abilityScores[skill])) + parseInt(document.getElementById("proficiency-bonus").value);

                            if(expertise) {
                                if(itemContent.includes(expertise.split(' ').pop())) {
                                    inputField.value = parseInt(inputField.value) + parseInt(document.getElementById("proficiency-bonus").value);
                                }
                            }

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
    document.getElementById("character-name").value = character_base["Name"];
    
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

        if(parseInt(attacks[item]["bonus"]) > 0 ) {
            input2.value = "+" + attacks[item]["bonus"];
        } else {
            input2.value = attacks[item]["bonus"];
        }

        var smallDiv3 = document.createElement("div");
        smallDiv3.className = "list-attack";
        var input3 = document.createElement("input");
        input3.className = "h6 weapon-attack";
        input3.type = "text";
        if(attacks[item]["ability"] > 0) {
            input3.value = attacks[item]["diceroll"] + "+" + attacks[item]["ability"] + " " + attacks[item]["damagetype"];
        } else {
            input3.value = attacks[item]["diceroll"] + " " + attacks[item]["damagetype"];
        }

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

    // Background
    var textField = document.getElementById("background-text");
    var textField2 = document.getElementById("background-text2");

    textField.textContent = "You were born " + backstory["Birthplace"];

    if(backstory["Parents2"]) {
        textField.textContent += backstory["Parents2"];
    }

    textField.textContent += "You grew up " + backstory["Family"];
    if(backstory["AbsentFamily"]) {
        textField.textContent += " because " + backstory["AbsentFamily"];
        if(backstory["FamilyDeath"]) {
            textField.textContent += backstory["FamilyDeath"];
        }
    }
    textField.textContent += ". " + backstory["ChildhoodMemories"] + ". ";

    textField2.textContent += "You're now " + character_base["Age"] + " years old, and live " + backstory["Lifestyle"] + backstory["Home"];
    textField2.textContent += ". " + backstory["Occupation"];

    textField2.textContent += " " + backstory["LifeEvent"];
    if(backstory["LifeEventDetails"]) {
        textField2.textContent += ". " + backstory["LifeEventDetails"];

    }

    textField2.textContent += ". " + backstory["Class"];
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

        character_base["Speed"] = json.speed;

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

function getName() {

    var race = character_base["Race"]; 
    race = race.replace("-", "");
    var raceNames = window["name_" + race];
    var raceSurnames = window["surname_" + race];

    var randIndex = Math.floor(Math.random() * raceNames.length);
    var randIndex2 = Math.floor(Math.random() * raceSurnames.length);

    character_base["Name"] = raceNames[randIndex] + " " + raceSurnames[randIndex2];

}

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

        if(calculate(abilityScores["CON"]) != "-1") {
            character_base["HitDie"] += parseInt(calculate(abilityScores["CON"]));
        }
    });

}

function getSkillProficiencies() {

    $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base['Race'], function (json) {

        $(json.starting_proficiencies).each(function (i) {
            if(json.starting_proficiencies[i].name.includes("Skill:")) {
                skillproficiencies.push(json.starting_proficiencies[i].name);
            }
        });
        
        let part2 = $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base['Class'], function (json2) {

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

 
        });

        part2.done(function () {

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

        $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json) {

            $(json.proficiencies).each(function (i) {

                if(!json.proficiencies[i].name.includes("Skill:")) {

                    proficiencyUrls.push(json.proficiencies[i].url);
                }

            });

            if(character_base["Subrace"]) {

                $.getJSON('https://www.dnd5eapi.co/api/subraces/' + character_base["Subrace"], function (json) {
            
                    $(json.starting_proficiencies).each(function (i) {
    
                        if(!json.starting_proficiencies[i].name.includes("Skill:") && !proficiencies.includes(json.starting_proficiencies[i].name)) {
    
                            proficiencyUrls.push(json.starting_proficiencies[i].url);
                        }
            
                    });
                });  
            }

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
    getExpertise();
}

function getStartingEquipment() {

    var shortcut; 

    var getUrl = $.getJSON('https://www.dnd5eapi.co/api/starting-equipment', function (json) {

        var chosenClass = character_base["Class"];
        toUpper = chosenClass.charAt(0).toUpperCase() + chosenClass.slice(1);

        $(json.results).each(function (i) {
            if (json.results[i].class == toUpper) {
                shortcut = json.results[i].url;
            }
        });

    });

    getUrl.done(function() {

        $.getJSON('https://www.dnd5eapi.co' + shortcut, function (json) {

            $(json.starting_equipment).each(function (i) {

                equipment.push([json.starting_equipment[i].equipment.name, json.starting_equipment[i].quantity, json.starting_equipment[i].equipment.url]);
            
            });


            // Starting equipment options under development after API changed tree structure

            // console.log(json.starting_equipment_options);

            // $(json.starting_equipment_options).each(function (i) {

            //     var choose = json.starting_equipment_options[i].choose;
            
            //     $(json.starting_equipment_options[i].from).each(function (j) {

            //         console.log(json.starting_equipment_options[i].from[j].equipment.name);

            //     });

            // });

            // for (var i = 0; i < choiceBoxes.length; i++) {

            //     var chooseBoxes = json[choiceBoxes[i]];

            //     var randIndex = Math.floor(Math.random() * chooseBoxes.length);

            //     $(json[choiceBoxes[i]][randIndex]).each(function (j) {

            //         var howMany = json[choiceBoxes[i]][randIndex].choose;
            //         var oldRandIndex = 99;

            //         for(var k = 0; k < howMany; k++) {

            //             var items = json[choiceBoxes[i]][randIndex].from;

            //             if(howMany > items.length) {
            //                 howMany = items.length;
            //             }

            //             var randomIndex = Math.floor(Math.random() * items.length);

            //             while(oldRandIndex == randomIndex) {
            //                 randomIndex = Math.floor(Math.random() * items.length);
            //             }

            //             var exist = false;
            //             for(var e in equipment) {

            //                 if(equipment[e][0] == json[choiceBoxes[i]][randIndex].from[randomIndex].item.name) {

            //                     exist = true;
   

            //                 } 
            //             }

            //             if(exist == false) {
            //                 var name = json[choiceBoxes[i]][randIndex].from[randomIndex].item.name;
            //                     var amount = json[choiceBoxes[i]][randIndex].from[randomIndex].quantity;
            //                     var url = json[choiceBoxes[i]][randIndex].from[randomIndex].item.url;
        
            //                     equipment.push([name, amount, url]);

            //             }

            //             oldRandIndex = randomIndex;

            //         }

            //     });
            // }

            getAttackDetails();
            getArmorclass();
        });

    });
}

function getAttackDetails() {

    for(let url in equipment) {

        $.getJSON('https://www.dnd5eapi.co' + equipment[url][2], function (json) {

        if(json.equipment_category.name == "Weapon") {
         
            attacks.push ({
            "name" : json.name,
            "category" : json.weapon_category,
            "diceroll" : json.damage.damage_dice,
            "damagetype" : json.damage.damage_type.name,
            "range" : json.weapon_range,
            "bonus" : 0
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

            var bonus = 0;

                if(isProficient = true) {    
                    bonus = parseInt(document.getElementById("proficiency-bonus").value);
                }

                if(attacks[attacks.length-1]["range"] == "Melee") {

                    if(parseInt(calculate(abilityScores["STR"])) > 0) {
                        bonus += parseInt(calculate(abilityScores["STR"]));
                        attacks[attacks.length-1]["ability"] = calculate(abilityScores["STR"]);
                    }

                } else if(attacks[attacks.length-1]["range"] == "Ranged") {

                    if(parseInt(calculate(abilityScores["DEX"])) > 0) {
                        bonus += parseInt(calculate(abilityScores["DEX"]));
                        attacks[attacks.length-1]["ability"] = calculate(abilityScores["DEX"]);
                    }

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

    for(let url in equipment) {

        $.getJSON('https://www.dnd5eapi.co' + equipment[url][2], function (json) {

            if(json.equipment_category.name == "Armor") {

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

    console.log(armor);
    console.log(armor.length);

    if(armor.length > 0) {

        console.log(armor);

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

function getExpertise() {
    
    if(character_base["Class"] == "rogue") {

        randomIndex = Math.floor(Math.random() * skillproficiencies.length);

        expertise = skillproficiencies[randomIndex];

    }

}

function getFeatures() {
 
    let featureList = [];

    var getList = $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"] + '/levels/1', function (json) {
        
        $(json.features).each(function (i) {
            featureList.push(json.features[i].url);
        });
    });

    getList.done(function() {
        
        for(let f in featureList) {

            $.getJSON('https://www.dnd5eapi.co' + featureList[f], function (json) {
        
                traits.push([json.name, json.desc[0]]);
            });
        }

    });
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

    getStartingWealth();
    prepareBackstory();

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

function getItem(part) {

    var element = window[part];
    var dice = element["Dice"].split("d");
    var diceNumber = Math.floor(Math.random() * dice[1] + 1);
    const dash = '-';

    for (i in element) {

        var numbers = i.split(dash);

        if (numbers.length == 2) {

            if (diceNumber >= numbers[0] && diceNumber <= numbers[1]) {

                return element[i];
            }

        } if (numbers.length == 1 && numbers[0] != "Dice") {

            if (diceNumber == numbers[0]) {
                
                return element[i];
            }
        }

    }
}

function prepareBackstory() {

    backstory["Parents"] = getItem("Parents");
    if (character_base["Race"] === "tiefling") {
        backstory["Parents2"] = getItem("TieflingParents");
    }
    if (character_base["Race"] === "half-elf") {
        backstory["Parents2"] = getItem("HalfElfParents");
    }
    if (character_base["Race"] === "half-orc") {
        backstory["Parents2"] = getItem("HalfOrcParents");
    }

    backstory["Birthplace"] = getItem("Birthplace");
    backstory["Family"] = getItem("Family");

    if (backstory["Family"].includes("#AbsentParents")) {
        backstory["AbsentFamily"] = getItem("AbsentParents");
        if(backstory["AbsentFamily"].includes("#CauseOfDeath")) {
            backstory["FamilyDeath"] = getItem("CauseOfDeath");
            removeHashtags("AbsentFamily");
        }
        removeHashtags("Family");
    }
    if (backstory["Family"].includes("#AbsentMother")) {
        backstory["AbsentFamily"] = getItem("AbsentMother");
        if(backstory["AbsentFamily"].includes("#CauseOfDeath")) {
            backstory["FamilyDeath"] = getItem("CauseOfDeath");
            removeHashtags("AbsentFamily");
        }
        removeHashtags("Family");

    }
    if (backstory["Family"].includes("#AbsentFather")) {
        backstory["AbsentFamily"] = getItem("AbsentFather");
        if(backstory["AbsentFamily"].includes("#CauseOfDeath")) {
            backstory["FamilyDeath"] = getItem("CauseOfDeath");
            removeHashtags("AbsentFamily");
        }
        removeHashtags("Family");

    }

    backstory["Lifestyle"] = getItem("Lifestyle");
    backstory["Home"] = getItem("Home");
    backstory["ChildhoodMemories"] = getItem("ChildhoodMemories");

    var convertedName = character_base["Occupation"].split(' ');
    if(convertedName.length == 2) {
        convertedName = convertedName[0] + convertedName[1];
    } else {
        convertedName = convertedName[0];
    }

    backstory["Occupation"] = getItem(convertedName);
    backstory["Class"] = getItem(character_base["Class"]);

    backstory["LifeEvent"] = getItem("LifeEvents");

    if(backstory["LifeEvent"].includes("#")) {
        backstory["LifeEventDetails"] = getItem(backstory["LifeEvent"].split('#').pop());
        removeHashtags("LifeEvent");
    }

}

function removeHashtags(item) {
    var info = backstory[item].split('#').pop();
    backstory[item] = backstory[item].replace("#" + info, "");
}