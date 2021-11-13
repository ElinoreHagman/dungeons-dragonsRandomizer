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

    var text = ["Rolling some dices..", "Reading the Player's Handbook..", "Trying out the fireball spell..", "Preparing the character sheet while on fire.."];

    for (var i = 0; i < 3; ++i) {

        (function (index) {
            setTimeout(function () {
                document.getElementById("wait-text").innerHTML = text[index];
            }, i * 3000);
        })(i);
    }
}

$("#showinfo").click(function () {
    $(".projectInformation").slideToggle();
});


function main() {
    
    changeText();

    let getRace = new Promise((resolve, reject) => {
    
        var races = [];
        
        var getRaces = $.getJSON('https://www.dnd5eapi.co/api/races', function (json) {
    
            $(json.results).each(function (i) {
                races.push(json.results[i].index);
            });
        });
    
        getRaces.done(function() {
    
            var randIndex = Math.floor(Math.random() * races.length);
            character_base["Race"] = races[randIndex];
    
            $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {
    
                character_base["Speed"] = json.speed;
    
                var subraces = [];
    
                if (json.subraces.length > 0) {
    
                    $(json.subraces).each(function (i) {
                        subraces.push(json.subraces[i].index);
                    });
    
                    var random = Math.random() > 0.6;
                    var randIndex2 = Math.floor(Math.random() * subraces.length);
    
                    if (random) {
    
                        character_base["Subrace"] = subraces[randIndex2];
        
                    }
                }
                resolve();
            });
    
        });
    
    
    });
    
    let getClass = new Promise((resolve, reject) => {
        
        var classes = [];
    
        var getClasses = $.getJSON('https://www.dnd5eapi.co/api/classes', function (json) {
    
            $(json.results).each(function (i) {
                classes.push(json.results[i].index);
            });
        });  
    
        getClasses.done(function() {
    
            var randIndex = Math.floor(Math.random() * classes.length);
            character_base["Class"] = classes[randIndex];
    
            $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json) {
    
                var subclasses = [];
                if (json.subclasses.length > 0) {
    
                    $(json.subclasses).each(function (i) {
                        subclasses.push(json.subclasses[i].index);
                    });
                }
    
                var random = Math.random() > 0.6;
                var randIndex2 = Math.floor(Math.random() * subclasses.length);
    
                if (random) {          
                    character_base["Subclass"] = subclasses[randIndex2];
                }
    
                resolve();
    
            });
        });
    });

    Promise.all([getRace, getClass]).then(values => {

        const getTraits = new Promise((resolve, reject) => {
        
            $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {
        
                $(json.traits).each(function (i) {
        
                    $.getJSON('https://www.dnd5eapi.co' + json.traits[i].url, function (json2) {
        
                        traits.push([json2.name, json2.desc[0]]);

                    });
                });
        
                resolve();
            });
            
        });   
        
        const getName = new Promise((resolve, reject) => {
        
            var race = character_base["Race"]; 
            race = race.replace("-", "");
            var raceNames = window["name_" + race];
            var raceSurnames = window["surname_" + race];
        
            var randIndex = Math.floor(Math.random() * raceNames.length);
            var randIndex2 = Math.floor(Math.random() * raceSurnames.length);
        
            character_base["Name"] = raceNames[randIndex] + " " + raceSurnames[randIndex2];
                    
            resolve();
        
        });
        
        const getAge = new Promise((resolve, reject) => {
        
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
        
            resolve();
        });
        
        const getLanguages = new Promise((resolve, reject) => {
        
            var getlanguages1 = $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {
        
                $(json.languages).each(function (i) {
                    languages.push(json.languages[i].name);
                });
            });
        
            getlanguages1.done(function() {
        
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
                
                resolve();
        
            });
        
            });
        
            
        });

        const getOccupation = new Promise((resolve, reject) => {

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

            resolve();
        
        });

        const getAbilityScores = new Promise((resolve, reject) => {
        
            var abilities = [];
            scores = [8, 10, 12, 13, 14, 15];
        
            var getAbility1 = $.getJSON('https://www.dnd5eapi.co/api/ability-scores', function (json) {
        
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
        
            getAbility1.done(function(){
    
                $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {
        
                    var bonusList = [];
        
                    $(json.ability_bonuses).each(function (index) {

                        bonusList.push(json.ability_bonuses[index].ability_score.name);
                        var ability = json.ability_bonuses[index].ability_score.name;
                        var number = json.ability_bonuses[index].bonus;
        
                        abilityScores[ability] += number;

                    });
                    
                    if (json.hasOwnProperty('ability_bonus_options')) {
        
                        var choose = json.ability_bonus_options.choose;
                        var listBonuses = {};
                        $(json.ability_bonus_options.from).each(function (i) {
                            listBonuses[json.ability_bonus_options.from[i].ability_score.name] = json.ability_bonus_options.from[i].bonus;
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
        
                                var ability = json.ability_bonuses[index].ability_score.name;
                                var number = json.ability_bonuses[index].bonus;
        
                                abilityScores[ability] += number;
                            });
                        });
                    } 
                
                    resolve();
        
                });
        
            });
        
        });

        // DO THE CHOOSING STARTING EQUIPMENT PART
        const getStartingEquipment = new Promise((resolve, reject) => {

            $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json) {
        
                $(json.starting_equipment).each(function (i) {
        
                    equipment.push([json.starting_equipment[i].equipment.name, json.starting_equipment[i].quantity, json.starting_equipment[i].equipment.url]);

                });                             
        
                resolve();
                
            });
        
        });
                            
        Promise.all([getTraits, getAge, getAbilityScores, getLanguages, getName, getOccupation]).then(values => {
            
            //console.log("first batch done");

            const getSavingThrows = new Promise((resolve, reject) => {
    
                $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json) {
            
                    $(json.saving_throws).each(function (i) {
                        savingthrows.push(json.saving_throws[i].name);
                    });
            
                    resolve();
            
                });
            
            });

            const getStartingWealth = new Promise((resolve, reject) => {

                var background = character_base["Occupation"];
                for(var choice in BackgroundGold) {
                    if(choice.includes(background)) {
                        character_base["Wealth"] = BackgroundGold[choice];
                    }
                }
            
                resolve();
            
            });

            const getHitDie = new Promise((resolve, reject) => {

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
            
                    resolve();
                });
            
            });

            const getFeatures = new Promise((resolve, reject) => {
 
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
            
                    resolve();
            
                });
                
            });

            const getSkillProficiencies = new Promise((resolve, reject) => {

                var getOrdinary = $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base['Race'], function (json) {
            
                    $(json.starting_proficiencies).each(function (i) {
                        if(json.starting_proficiencies[i].name.includes("Skill:")) {
                            skillproficiencies.push(json.starting_proficiencies[i].name);
                        }
                    });

                });
                  
                getOrdinary.done(function() {

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

                    });
                            
                    resolve();
            
                });
            
            });

            var proficiencyUrls = [];
            const getProficiencies = new Promise((resolve, reject) => {

                var getRaceProfs = $.getJSON('https://www.dnd5eapi.co/api/races/' + character_base["Race"], function (json) {

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

                });

                getRaceProfs.done(function() {

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

                        resolve();
                    });

                });

            });

            Promise.all([getSavingThrows, getStartingWealth, getHitDie, getFeatures, getSkillProficiencies, getProficiencies, getStartingEquipment]).then(values => {

                //console.log("second batch done");

                const getPassiveWisdom = new Promise((resolve, reject) => {

                    var wisdomModifier = calculate(abilityScores["WIS"]);
                    var profBonus = document.getElementById("proficiency-bonus").value;
                
                    if(skillproficiencies.includes("Skill: Perception")) {
                        character_base["PassiveWisdom"] = 10 + parseInt(wisdomModifier) + parseInt(profBonus);
                
                    } else {
                        character_base["PassiveWisdom"] = 10 + parseInt(wisdomModifier);
                    }
                
                    resolve();
                    
                });

                const getProficiencyType = new Promise((resolve, reject) => {

                    for(var i = 0; i < proficiencyUrls.length; i++) {
                
                        $.getJSON('https://www.dnd5eapi.co' + proficiencyUrls[i], function (json) {
                
                        proficiencies.push([json.type, json.name]);
                
                        });
                    }

                    resolve();

                });

                const getArmorclass = new Promise((resolve, reject) => {

                    var promises = [];
                
                    for(var i = 0; i < equipment.length; i++) {
                
                        promises.push($.getJSON('https://www.dnd5eapi.co' + equipment[i][2]));
                
                    }
                
                    $.when.apply($, promises).then(function() {
                
                        for(var i = 0; i < promises.length; i++){
                
                            if(promises.length > 1) {
                                
                                if(arguments[i][0].equipment_category.name == "Armor") {
                
                                    armor.push ({
                                    "name" : arguments[i][0].equipment_category.name,
                                    "armor" : arguments[i][0].armor_class.base,
                                    "category" : arguments[i][0].armor_category,
                                    "bonus" : arguments[i][0].armor_class.dex_bonus,
                                    "maxbonus" : arguments[i][0].armor_class.max_bonus,
                                    "strength" : arguments[i][0].str_minimum
                                    });
                                } 
                
                            } else {
                
                                if(arguments[0].equipment_category.name == "Armor") {
                
                                    armor.push ({
                                    "name" : arguments[0].equipment_category.name,
                                    "armor" : arguments[0].armor_class.base,
                                    "category" : arguments[0].armor_category,
                                    "bonus" : arguments[0].armor_class.dex_bonus,
                                    "maxbonus" : arguments[0].armor_class.max_bonus,
                                    "strength" : arguments[0].str_minimum
                                    });
                                } 
                
                            }
                
                        }
                
                        resolve();
                
                    });
                
                });

                const getAttackDetails = new Promise((resolve, reject) => {

                    var promises = [];

                    for(let url in equipment) {
                
                        promises.push($.getJSON('https://www.dnd5eapi.co' + equipment[url][2]));

                    }

                    $.when.apply($, promises).then(function() {

                        for(var i = 0; i < promises.length; i++){

                            if(promises.length > 1) {

                                if(arguments[i][0].equipment_category.name == "Weapon") {
                                
                                    attacks.push ({
                                    "name" : arguments[i][0].name,
                                    "category" : arguments[i][0].weapon_category,
                                    "diceroll" : arguments[i][0].damage.damage_dice,
                                    "damagetype" : arguments[i][0].damage.damage_type.name,
                                    "range" : arguments[i][0].weapon_range,
                                    "bonus" : 0
                                    });
                    
                                    var properties = arguments[i][0].properties.length;

                                    for(var j = 0; j < properties; j++) {

                                        if(arguments[i][0].properties[j].name == "Finesse") {
                    
                                            attacks[attacks.length-1]["range"] = "Finesse";
                    
                                        }

                                    }
                                    
                                    var isProficient = false;
                                    for(var item in proficiencies) {
                                        if(proficiencies[item][1].includes(attacks[attacks.length-1]["name"]) || proficiencies[item][1].includes(attacks[attacks.length-1]["category"])) {    
                                            isProficient = true;
                                        }
                                    }
                    
                                    var bonus = 0;
                    
                                        if(isProficient == true) {    
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

                            } else {

                                if(arguments[0].equipment_category.name == "Weapon") {
                                
                                    attacks.push ({
                                    "name" : arguments[0].name,
                                    "category" : arguments[0].weapon_category,
                                    "diceroll" : arguments[0].damage.damage_dice,
                                    "damagetype" : arguments[0].damage.damage_type.name,
                                    "range" : arguments[0].weapon_range,
                                    "bonus" : 0
                                    });
                    
                                    var properties = arguments[0].properties.length;

                                    for(var j = 0; j < properties; j++) {

                                        if(arguments[0].properties[j].name == "Finesse") {
                    
                                            attacks[attacks.length-1]["range"] = "Finesse";
                    
                                        }

                                    }
                                    
                                    var isProficient = false;
                                    for(var item in proficiencies) {
                                        if(proficiencies[item][1].includes(attacks[attacks.length-1]["name"]) || proficiencies[item][1].includes(attacks[attacks.length-1]["category"])) {    
                                            isProficient = true;
                                        }
                                    }
                    
                                    var bonus = 0;
                    
                                        if(isProficient == true) {    
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

                            }
                        }
                            
                        resolve();

                    });

                });

                const getAlignment = new Promise((resolve, reject) => {

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

                    resolve();
                });

                const getSpellcasting = new Promise((resolve, reject) => {

                    var cantripsAmount = 0;
                    var firstLevelSpellsAmount = 0;
                    var hasSpellcasting = false;
                
                    var getSpellNumber = $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"] + '/levels/1', function (json) {
                
                        if (json.hasOwnProperty('spellcasting')) {
                
                            hasSpellcasting = true;
                
                            if (json.spellcasting.hasOwnProperty('cantrips_known')) {
                                cantripsAmount = json.spellcasting.cantrips_known;
                            }
                
                            if (json.spellcasting.hasOwnProperty('spells_known')) {
                                firstLevelSpellsAmount = json.spellcasting.spells_known;
                            }
                
                            if (json.spellcasting.hasOwnProperty('spell_slots_level_1')) {
                                character_base["SpellSlots"] = json.spellcasting.spell_slots_level_1;
                            }
                  
                        }
                
                    });
                
                    getSpellNumber.done(function() {
                
                        if(hasSpellcasting == true) {
                
                            var getSpellModifier = $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"], function (json2) {
                                
                                character_base["SpellcastingAbility"] = json2.spellcasting.spellcasting_ability.name;
                    
                            });
                
                            getSpellModifier.done(function() {        

                                var classSpells = [];
                        
                                var getSpells = $.getJSON('https://www.dnd5eapi.co/api/classes/' + character_base["Class"] + '/spells', function (json3) {

                                    $(json3.results).each(function (i) {
                                        classSpells.push(json3.results[i].url);
                                    });
                                });

                                getSpells.done(function() {
                        
                                    var promises = [];
                                    
                                    for (var i = 0; i < classSpells.length; i++) {

                                        promises.push($.getJSON('https://www.dnd5eapi.co' + classSpells[i]));

                                    }

                                    $.when.apply($, promises).then(function() {
                                        
                                        var random = Math.floor(Math.random() * classSpells.length);
                                        var cantripsPicked = 0;
                                        var spellsPicked = 0;
                                        var chosenCantrips = [];
                                        var chosenSpells = [];

                                        while (cantripsAmount > cantripsPicked) {
                                            
                                            random = Math.floor(Math.random() * classSpells.length);

                                            if(arguments[random][0].hasOwnProperty('damage')) {
                    
                                                if(arguments[random][0].damage.hasOwnProperty('damage_at_character_level')) {
                
                                                    if(arguments[random][0].damage.damage_at_character_level.hasOwnProperty('1')) {
                
                                                        if (arguments[random][0].level === 0) {
                            
                                                            if (chosenCantrips.length < cantripsAmount && !chosenCantrips.includes(arguments[random][0].index)) {

                                                                chosenCantrips.push(arguments[random][0].index); 

                                                                if(arguments[random][0].damage.hasOwnProperty('damage_type')) {
                                                                    spellList.push([arguments[random][0].name, arguments[random][0].level, arguments[random][0].damage.damage_at_character_level['1'], arguments[random][0].damage.damage_type["index"]]);
                                                                    
                
                                                                } else {
                                                                    spellList.push([arguments[random][0].name, arguments[random][0].level, arguments[random][0].damage.damage_at_character_level['1'], null]);
                
                                                                } 
                                                                
                                                                cantripsPicked++;

                                                            } else {
                
                                                                random = Math.floor(Math.random() * classSpells.length);
                    
                                                            }
                                    
                                                        } else {
                                                            random = Math.floor(Math.random() * classSpells.length);
                                                        }
                
                                                    } else {
                                                        random = Math.floor(Math.random() * classSpells.length);
                                                    }
                
                                                }
                                                
                                                else if(arguments[random][0].damage.hasOwnProperty('damage_at_slot_level')) {
                
                                                    if(arguments[random][0].damage.damage_at_slot_level.hasOwnProperty('1')) {
                
                                                        if (arguments[random][0].level === 0) {
                            
                                                            if (chosenCantrips.length < cantripsAmount && !chosenCantrips.includes(arguments[random][0].index)) {

                                                                chosenCantrips.push(arguments[random][0].index);    

                                                                if(arguments[random][0].damage.hasOwnProperty('damage_type')) {
                                                                    spellList.push([arguments[random][0].name, arguments[random][0].level, arguments[random][0].damage.damage_at_slot_level['1'], arguments[random][0].damage.damage_type["index"]]);
                
                                                                } else {
                                                                    spellList.push([arguments[random][0].name, arguments[random][0].level, arguments[random][0].damage.damage_at_slot_level['1'], arguments[random][0].damage.damage_type["index"]]);
                
                                                                }         

                                                                cantripsPicked++;


                                                            } else {
                
                                                                random = Math.floor(Math.random() * classSpells.length);
                                                            }
                                    
                                                        } else {
                                                            random = Math.floor(Math.random() * classSpells.length);
                                                        }
                
                                                    } else {
                                                        random = Math.floor(Math.random() * classSpells.length);
                                                    }
                
                                                }
                                                
                
                                            } else {

                                                if (arguments[random][0].level === 0) {
                            
                                                    if (chosenCantrips.length < cantripsAmount && !chosenCantrips.includes(arguments[random][0].index)) {

                                                        chosenCantrips.push(arguments[random][0].index);    

                                                        spellList.push([arguments[random][0].name, arguments[random][0].level, null, null]);
                                                        cantripsPicked++;

                                                    } else {
                                                        random = Math.floor(Math.random() * classSpells.length);
                                                    }
                            
                                                } else {
                                                    random = Math.floor(Math.random() * classSpells.length);
                                                }
                
                                            }

                                        }

                                        while (firstLevelSpellsAmount > spellsPicked) {
                                            
                                            random = Math.floor(Math.random() * classSpells.length);

                                            if(arguments[random][0].hasOwnProperty('damage')) {

                                                if(arguments[random][0].damage.hasOwnProperty('damage_at_character_level')) {
                
                                                    if(arguments[random][0].damage.damage_at_character_level.hasOwnProperty('1')) {
                
                                                        if (arguments[random][0].level === 1) {
                            
                                                            if (chosenSpells.length < firstLevelSpellsAmount && !chosenSpells.includes(arguments[random][0].index)) {

                                                                chosenSpells.push(arguments[random][0].index); 

                                                                if(arguments[random][0].damage.hasOwnProperty('damage_type')) {
                                                                    spellList.push([arguments[random][0].name, arguments[random][0].level, arguments[random][0].damage.damage_at_character_level['1'], arguments[random][0].damage.damage_type["index"]]);
                                                                    
                
                                                                } else {
                                                                    spellList.push([arguments[random][0].name, arguments[random][0].level, arguments[random][0].damage.damage_at_character_level['1'], null]);
                
                                                                } 
                                                                
                                                                spellsPicked++;

                                                            } else {
                
                                                                random = Math.floor(Math.random() * classSpells.length);
                    
                                                            }
                                    
                                                        } else {
                                                            random = Math.floor(Math.random() * classSpells.length);
                                                        }
                
                                                    } else {
                                                        random = Math.floor(Math.random() * classSpells.length);
                                                    }
                
                                                }
                                                
                                                else if(arguments[random][0].damage.hasOwnProperty('damage_at_slot_level')) {
                
                                                    if(arguments[random][0].damage.damage_at_slot_level.hasOwnProperty('1')) {
                
                                                        if (arguments[random][0].level === 1) {
                            
                                                            if (chosenSpells.length < firstLevelSpellsAmount && !chosenSpells.includes(arguments[random][0].index)) {

                                                                chosenSpells.push(arguments[random][0].index);    

                                                                if(arguments[random][0].damage.hasOwnProperty('damage_type')) {
                                                                    spellList.push([arguments[random][0].name, arguments[random][0].level, arguments[random][0].damage.damage_at_slot_level['1'], arguments[random][0].damage.damage_type["index"]]);
                
                                                                } else {
                                                                    spellList.push([arguments[random][0].name, arguments[random][0].level, arguments[random][0].damage.damage_at_slot_level['1']]);
                
                                                                }         

                                                                spellsPicked++;


                                                            } else {
                
                                                                random = Math.floor(Math.random() * classSpells.length);
                                                            }
                                    
                                                        } else {
                                                            random = Math.floor(Math.random() * classSpells.length);
                                                        }
                
                                                    } else {
                                                        random = Math.floor(Math.random() * classSpells.length);
                                                    }
                
                                                }
                                                
                
                                            } else {

                                                if (arguments[random][0].level === 1) {
                            
                                                    if (chosenSpells.length < firstLevelSpellsAmount && !chosenSpells.includes(arguments[random][0].index)) {

                                                        chosenSpells.push(arguments[random][0].index);    

                                                        spellList.push([arguments[random][0].name, arguments[random][0].level, null, null]);
                                                        spellsPicked++;

                                                    } else {
                                                        random = Math.floor(Math.random() * classSpells.length);
                                                    }
                            
                                                } else {
                                                    random = Math.floor(Math.random() * classSpells.length);
                                                }
                
                                            }

                                        }

                                        resolve();

                                    });
                                                      
                                });
                            });
                
                        } else {

                            resolve();

                        }
                                      
                    });
                
                });

                Promise.all([getPassiveWisdom, getProficiencyType, getArmorclass, getAttackDetails, getAlignment, getSpellcasting]).then(values => {

                    //console.log("third batch done");

                    const getArmorDetails = new Promise((resolve, reject) => {

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

                        if(armor[item]["category"] == "Shield") {

                            shield = armor[item]["armor"];

                        }

                    }

                    }

                    character_base["Armorclass"] = parseInt(biggestArmor) + parseInt(shield); 
                    resolve();
                    });

                    const insertSpellsIntoAttacks = new Promise((resolve, reject) => {

                        for(var item in spellList) {
                                                
                            if(spellList[item][3] !== null) {
                    
                                var bonus = calculate(abilityScores[character_base["SpellcastingAbility"]]) + parseInt(document.getElementById("proficiency-bonus").value);
                    
                                attacks.push ({
                                    "name" : spellList[item][0],
                                    "category" : null,
                                    "diceroll" : spellList[item][2],
                                    "damagetype" : spellList[item][3],
                                    "range" : null,
                                    "bonus" : bonus
                                });
                    
                            }
                        }

                        resolve();
                    
                    });

                    const prepareBackstory = new Promise((resolve, reject) => {

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
                    
                        resolve();
                    });

                    Promise.all([getArmorDetails, insertSpellsIntoAttacks, prepareBackstory]).then(values => {

                        //console.log("fourth batch done");
                        showInfo();
                    });

                });

            });

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

    textField2.textContent += " " + backstory["LifeEvent"];
    if(backstory["LifeEventDetails"]) {
        textField2.textContent += ". " + backstory["LifeEventDetails"];

    }

    textField2.textContent += " You're now " + character_base["Age"] + " years old, and live " + backstory["Lifestyle"] + backstory["Home"];
    textField2.textContent += ". " + backstory["Occupation"];

    textField2.textContent += ". " + backstory["Class"];
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

function removeHashtags(item) {
    var info = backstory[item].split('#').pop();
    backstory[item] = backstory[item].replace("#" + info, "");
}