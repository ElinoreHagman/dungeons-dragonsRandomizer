var Parents = { 
	"Dice": "1d100",
	"01-90": "You know who your parents are or were. ",
	"91-100": "You do not know who your parents were. "
};

var HalfElfParents = { 
	"Dice": "1d8",
	"1-5": "One parent was an elf and the other was a human. ",
	"6": "One parent was an elf and the other was a half-elf. ",
	"7": "One parent was a human and the other was a half-elf. ",
	"8": "Both parents were half-elves. "
};

var TieflingParents = { 
	"Dice": "1d8",
	"1-4": "Both parents were humans, their infernal heritage dormant until you came along. ",
	"5-6": "One parent was a tiefling and the other was a human. ",
	"7": "One parent was a tiefling and the other was a devil. ",
	"8": "One parent was a human and the other was a devil. "
};

var HalfOrcParents = { 
	"Dice": "1d8",
	"1-3": "One parent was an orc and the other was a human. ",
	"4-5": "One parent was an orc and the other was a half-orc. ",
	"6-7": "One parent was a human and the other was a half-orc. ",
	"8": "Both parents were half-orcs. "
};

var Birthplace = { 
	"Dice": "1d101",
	"1-50": "at home. ",
	"51-55": "in the home of a family friend. ",
	"56-63": "in the home of a healer or midwife. ",
	"64-65": "in a carriage, cart, or wagon. ",
	"66-68": "in a barn, shed, or other outbuilding. ",
	"69-70": "in a cave. ",
	"71-72": "in a field. ",
	"73-74": "in a forest. ",
	"75-77": "in a temple. ",
	"78-78": "on a battlefield. ",
	"79-80": "in an alley or street. ",
	"81-82": "in a brothel, tavern, or inn. ",
	"83-84": "in a castle, keep, tower, or palace. ",
	"85-85": "in a sewer or rubbish heap. ",
	"86-88": "among people of a different race. ",
	"89-91": "on board a boat or a ship. ",
	"92-93": "in a prison or in the headquarters of a secret organization. ",
	"94-95": "in a sage's laboratory. ",
	"96-96": "in the Feywild. ",
	"97-97": "in the Shadowfell. ",
	"98-98": "on the Astral Plane or the Ethereal Plane. ",
	"99-99": "on an Inner Plane of your choice. ",
	"100-101": "on an Outer Plane of your choice. "
};

var Family = { 
	"Dice": "1d100",
	"1-4": "without a family#AbsentParents",
	"5-10": "in an institution, such as an asylum",
	"11-15": "in a temple",
	"16-21": "in an orphanage.#AbsentParents",
	"22-27": "with a guardian.#AbsentParents",
	"28-35": "with your paternal or maternal aunt, uncle, or both; or extended family such as a tribe or clan",
	"36-43": "with your paternal or maternal grandparent(s)#AbsentParents",
	"44-50": "with your adoptive family (same or different race)",
	"51-69": "with your single father or stepfather#AbsentMother",
	"70-81": "with your single mother or stepmother#AbsentFather",
	"82-100": "with your mother and father"
};

var AbsentParents = { 
	"Dice": "1d4",
	"1-1": "your parents #CauseOfDeath",
	"2-2": "your parents were imprisoned, enslaved, or otherwise taken away",
	"3-3": "your parents abandoned you",
	"4-4": "your parents disappeared to an unknown fate"
};

var AbsentFather = { 
	"Dice": "1d4",
	"1-1": "your father #CauseOfDeath",
	"2-2": "your father was imprisoned, enslaved, or otherwise taken away",
	"3-3": "your father abandoned you",
	"4-4": "your father disappeared to an unknown fate"
};

var AbsentMother = { 
	"Dice": "1d4",
	"1-1": "your mother #CauseOfDeath",
	"2-2": "your mother was imprisoned, enslaved, or otherwise taken away",
	"3-3": "your mother abandoned you",
	"4-4": "your mother disappeared to an unknown fate"
};

var Lifestyle = { 
	"Dice": "1d50",
	"1-5": "wretchedly ",
	"6-13": "in squalor ",
	"14-22": "poor ",
	"23-39": "modestly ",
	"40-51": "comfortably ",
	"52-60": "wealthy ",
	"45-50": "aristocratically "
};

var Home = { 
	"Dice": "1d116",
	"1-3": "on the streets",
	"4-20": "in a rundown shack",
	"21-30": "without a permanent residence; You moved around a lot",
	"31-40": "in an encampment or village in the wilderness",
	"41-50": "in an apartment in a rundown neighborhood",
	"51-70": "in a small house",
	"71-90": "in a large house",
	"91-110": "in a mansion",
	"111-116": "in a palace or castle"
};

var ChildhoodMemories = { 
	"Dice": "1d100",
	"1-10": "You are still haunted by your childhood, when you were treated badly by your peers",
	"11-22": "You spent most of your childhood alone, with no close friends",
	"23-34": "Others saw you as being different or strange, and so you had few companions",
	"35-46": "You had a few close friends and lived an ordinary childhood",
	"47-68": "You had several friends, and your childhood was generally a happy one",
	"69-80": "You always found it easy to make friends, and you loved being around people",
	"81-100": "Everyone knew who you were, and you had friends everywhere you went"
};

var acolyte = { 
	"Dice": "1d6",
	"1": "You ran away from home at an early age and found refuge in a temple.",
	"2": "Your family gave you to a temple, since they were unable or unwilling to care for you.",
	"3": "You grew up in a household with strong religious convictions. Entering the service of one or more gods seemed natural.",
	"4": "An impassioned sermon struck a chord deep in your soul and moved you to serve the faith.",
	"5": "You followed a childhood friend, a respected acquaintance, or someone you loved into religious service.",
	"6": "After encountering a true servant of the gods, you were so inspired that you immediately entered the service of a religious group."
};

var charlatan = { 
	"Dice": "1d6",
	"1": "You were left to your own devices, and your knack for manipulating others helped you survive.",
	"2": "You learned early on that people are gullible and easy to exploit.",
	"3": "You often got in trouble, but you managed to talk your way out of it every time.",
	"4": "You took up with a confidence artist, from whom you learned your craft.",
	"5": "After a charlatan fleeced your family, you decided to learn the trade so you would never be fooled by such deception again.",
	"6": "You were poor or you feared becoming poor, so you learned the tricks you needed to keep yourself out of poverty."
};

var criminal = { 
	"Dice": "1d6",
	"1": "You resented authority in your younger days and saw a life of crime as the best way to fight against tyranny and oppression.",
	"2": "Necessity forced you to take up the life, since it was the only way you could survive.",
	"3": "You fell in with a gang of reprobates and ne'er-do-wells, and you learned your specialty from them.",
	"4": "A parent or relative taught you your criminal specialty to prepare you for the family business.",
	"5": "You left home and found a place in a thieves' guild or some other criminal organization.",
	"6": "You were always bored, so you turned to crime to pass the time and discovered you were quite good at it."
};

var spy = { 
	"Dice": "1d6",
	"1": "You resented authority in your younger days and saw a life of crime as the best way to fight against tyranny and oppression.",
	"2": "Necessity forced you to take up the life, since it was the only way you could survive.",
	"3": "You fell in with a gang of reprobates and ne'er-do-wells, and you learned your specialty from them.",
	"4": "A parent or relative taught you your criminal specialty to prepare you for the family business.",
	"5": "You left home and found a place in a thieves' guild or some other criminal organization.",
	"6": "You were always bored, so you turned to crime to pass the time and discovered you were quite good at it."
};

var entertainer = { 
	"Dice": "1d6",
	"1": "Members of your family made ends meet by performing, so it was fitting for you to follow their example.",
	"2": "You always had a keen insight into other people, enough so that you could make them laugh or cry with your stories or songs.",
	"3": "You ran away from home to follow a minstrel troupe.",
	"4": "You saw a bard perform once, and you knew from that moment on what you were born to do.",
	"5": "You earned coin by performing on street corners and eventually made a name for yourself.",
	"6": "A traveling entertainer took you in and taught you the trade."
};

var gladiator = { 
	"Dice": "1d6",
	"1": "Members of your family made ends meet by performing, so it was fitting for you to follow their example.",
	"2": "You always had a keen insight into other people, enough so that you could make them laugh or cry with your stories or songs.",
	"3": "You ran away from home to follow a minstrel troupe.",
	"4": "You saw a bard perform once, and you knew from that moment on what you were born to do.",
	"5": "You earned coin by performing on street corners and eventually made a name for yourself.",
	"6": "A traveling entertainer took you in and taught you the trade."
};

var folkHero = { 
	"Dice": "1d6",
	"1": "You learned what was right and wrong from your family.",
	"2": "You were always enamored by tales of heroes and wished you could be something more than ordinary.",
	"3": "You hated your mundane life, so when it was time for someone to step up and do the right thing, you took your chance.",
	"4": "A parent or one of your relatives was an adventurer, and you were inspired by that person's courage.",
	"5": "A mad old hermit spoke a prophecy when you were born, saying that you would accomplish great things.",
	"6": "You have always stood up for those who are weaker than you am."
};

var guildArtisan = { 
	"Dice": "1d6",
	"1": "You were apprenticed to a master who taught you the guild's business.",
	"2": "You helped a guild artisan keep a secret or complete a task, and in return you were taken on as an apprentice.",
	"3": "One of your family members who belonged to the guild made a place for you.",
	"4": "You were always good with your hands, so you took the opportunity to learn a trade.",
	"5": "You wanted to get away from your home situation and start a new life.",
	"6": "You learned the essentials of your craft from a mentor but had to join the guild to finish your training."
};

var guildMerchant = { 
	"Dice": "1d6",
	"1": "You were apprenticed to a master who taught you the guild's business.",
	"2": "You helped a guild artisan keep a secret or complete a task, and in return you were taken on as an apprentice.",
	"3": "One of your family members who belonged to the guild made a place for you.",
	"4": "You were always good with your hands, so you took the opportunity to learn a trade.",
	"5": "You wanted to get away from your home situation and start a new life.",
	"6": "You learned the essentials of your craft from a mentor but had to join the guild to finish your training."
};

var hermit = { 
	"Dice": "1d6",
	"1": "Your enemies ruined your reputation, and you fled to the wilds to avoid further disparagement.",
	"2": "You am comfortable with being isolated, as you seek inner peace.",
	"3": "You never liked the people you called your friends, so it was easy for you to strike out on your own.",
	"4": "You felt compelled to forsake your past, but did so with great reluctance, and sometimes you regret making that decision.",
	"5": "You lost everything-your home, your family, your friends. Going it alone was all you could do.",
	"6": "Society's decadence disgusted you, so you decided to leave it behind."
};

var noble = { 
	"Dice": "1d6",
	"1": "You come from an old and storied family, and it fell to you to preserve the family name.",
	"2": "Your family has been disgraced, and you intend to clear our name.",
	"3": "Your family recently came by its title, and that elevation thrust us into a new and strange world.",
	"4": "Your family has a title, but none of your ancestors have distinguished themselves since they gained it.",
	"5": "Your family is filled with remarkable people. You hope to live up to their example.",
	"6": "You hope to increase your family's power and influence."
};

var knight = { 
	"Dice": "1d6",
	"1": "You come from an old and storied family, and it fell to you to preserve the family name.",
	"2": "Your family has been disgraced, and you intend to clear our name.",
	"3": "Your family recently came by its title, and that elevation thrust us into a new and strange world.",
	"4": "Your family has a title, but none of your ancestors have distinguished themselves since they gained it.",
	"5": "Your family is filled with remarkable people. You hope to live up to their example.",
	"6": "You hope to increase your family's power and influence."
};

var outlander = { 
	"Dice": "1d6",
	"1": "who spent a lot of time in the wilderness as a youngster, and you came to love that way of life.",
	"2": "who from a young age, you couldn't abide the stink of the cities and preferred to spend your time in nature.",
	"3": "who came to understand the darkness that lurks in the wilds, and you vowed to combat it.",
	"4": "and your people lived on the edges of civilization, and you learned the methods of survival from your family.",
	"5": "and after a tragedy you retreated to the wilderness, leaving your old life behind.",
	"6": "and your family moved away from civilization, and you learned to adapt to your new environment."
};

var sage = { 
	"Dice": "1d6",
	"1": ". You were naturally curious, so you packed up and went to a university to learn more about the world.",
	"2": "and your mentor's teachings opened your mind to new possibilities in that field of study.",
	"3": "who were always an avid reader, and you learned much you about your favorite topic on your own.",
	"4": "who discovered an old library and pored over the texts you found there. That experience awakened a hunger you for more knowledge.",
	"5": "who impressed a wizard who told you you were squandering your talents and should seek out an education to take advantage of your gifts.",
	"6": "and one of your parents or a relative gave you a basic education that whetted your appetite, and you left home to build on what you had learned."
};

var sailor = { 
	"Dice": "1d6",
	"1": "You were press-ganged by pirates and forced to serve on their ship until you finally escaped.",
	"2": "You wanted to see the world, so you signed on as a deckhand for a merchant ship.",
	"3": "One of your relatives was a sailor who took you to sea",
	"4": "You needed to escape your community quickly, so you stowed away on a ship. When the crew found you, you were forced to work for your passage.",
	"5": "Reavers attacked your community, so you found refuge on a ship until you could seek vengeance.",
	"6": "You had few prospects where you were living, so you left to find your fortune elsewhere."
};

var pirate = { 
	"Dice": "1d6",
	"1": "You were press-ganged by pirates and forced to serve on their ship until you finally escaped.",
	"2": "You wanted to see the world, so you signed on as a deckhand for a merchant ship.",
	"3": "One of your relatives was a sailor who took you to sea",
	"4": "You needed to escape your community quickly, so you stowed away on a ship. When the crew found you, you were forced to work for your passage.",
	"5": "Reavers attacked your community, so you found refuge on a ship until you could seek vengeance.",
	"6": "You had few prospects where you were living, so you left to find your fortune elsewhere."
};

var soldier = { 
	"Dice": "1d6",
	"1": "You joined the militia to help protect your community from monsters.",
	"2": "A relative of mine was a soldier, and you wanted to you carry on the family tradition.",
	"3": "The local lord forced you to enlist in the army.",
	"4": "War ravaged your homeland while you were growing up. Fighting was the only life you ever knew.",
	"5": "You wanted fame and fortune, so you joined a mercenary company, selling your sword to the highest bidder.",
	"6": "Invaders attacked your homeland. It was your duty to take up arms in defense of your people."
};

var urchin = { 
	"Dice": "1d6",
	"1": "Wanderlust caused you to leave your family to see the world. You look after yourself.",
	"2": "You ran away from a bad situation at home and made your own way in the world.",
	"3": "Monsters wiped out your village, and you were the sole survivor. You had to find a way to survive.",
	"4": "A notorious thief looked after you and other orphans, and you spied and stole to earn our keep.",
	"5": "One day you woke up on the streets, alone and hungry, with no memory of your early childhood.",
	"6": "Your parents died, leaving no one to look after you. You raised yourself."
};

var barbarian = { 
	"Dice": "1d6",
	"1": "Your devotion to your people lifted you in battle, making you powerful and dangerous.",
	"2": "The spirits of your ancestors called on you to carry out a great task.",
	"3": "You lost control in battle one day, and it was as if something else was manipulating your body, forcing it to kill every foe you could reach.",
	"4": "You went on a spiritual journey to find yourself and instead found a spirit animal to guide, protect, and inspire you.",
	"5": "You were struck by lightning and lived. Afterward, tou found a new strength within you that let you push beyond your limitations.",
	"6": "Your anger needed to be channeled into battle, or you risked becoming an indiscriminate killer."
};

var bard = { 
	"Dice": "1d6",
	"1": "You awakened your latent bardic abilities through trial and error.",
	"2": "You were a gifted performer and attracted the attention of a master bard who schooled you in the old techniques.",
	"3": "You joined a loose society of scholars and orators to learn new techniques of performance and magic.",
	"4": "You felt a calling to recount the deeds of champions and heroes, to bring them alive in song and story.",
	"5": "You joined one of the great colleges to learn old lore, the secrets of magic, and the art of performance.",
	"6": "You picked up a musical instrument one day and instantly discovered that you could play it."
};

var cleric = { 
	"Dice": "1d6",
	"1": "A supernatural being in service to the gods called you to become a divine agent in the world.",
	"2": "You saw the injustice and horror in the world and felt moved to take a stand against them.",
	"3": "Your god gave you an unmistakable sign. You dropped everything to serve the divine.",
	"4": "Although you were always devout, it wasn't until you completed a pilgrimage that you knew your true calling.",
	"5": "You used to serve in your religion's bureaucracy but found you needed to work in the world, to bring the message of your faith to the darkest corners of the land.",
	"6": "You realize that your god works through you, and you do as commanded, even though you don't know why you were chosen to serve."
};

var druid = { 
	"Dice": "1d6",
	"1": "You saw too much devastation in the wild places, too much of nature's splendor ruined by the despoilers. You joined a circle of druids to fight back against the enemies of nature.",
	"2": "You found a place among a group of druids after you fled a catastrophe.",
	"3": "You have always had an affinity for animals, so you explored your talent to see how you could best use it.",
	"4": "You befriended a druid and was moved by druidic teachings. You decided to follow your friend's guidance and give something back to the world.",
	"5": "While you were growing up, you saw spirits all around you entities no one else could perceive. You sought out the druids to help you understand the visions and communicate with these beings.",
	"6": "You have always felt disgust for creatures of unnatural origin. For this reason, you immersed yourself in the study of the druidic mysteries and became a champion of the natural order."
};

var fighter = { 
	"Dice": "1d6",
	"1": "You wanted to hone your combat skills, and so you joined a war college.",
	"2": "You squired for a knight who taught you how to fight, care for a steed, and conduct yourself with honor. You decided to take up that path for yourself.",
	"3": "Horrible monsters descended on your community, killing someone you loved. You took up arms to destroy those creatures and others of a similar nature.",
	"4": "You joined the army and learned how to fight as part of a group.",
	"5": "You grew up fighting, and you refined your talents by defending yourself against people who crossed you.",
	"6": "You could always pick up just about any weapon and know how to use it effectively."
};

var monk = { 
	"Dice": "1d6",
	"1": "You were chosen to study at a secluded monastery. There, you were taught the fundamental techniques required to eventually master a tradition.",
	"2": "You sought instruction to gain a deeper understanding' of existence and your place in the world.",
	"3": "You stumbled into a portal to the Shadowfell and took refuge in a strange monastery, where you learned how to defend yourself against the forces of darkness.",
	"4": "You were overwhelmed with grief after losing someone close to you, and you sought the advice of philosophers to help you cope with your loss.",
	"5": "You could feel that a special sort of power lay within you, so you sought out those who could help you call it forth and master it.",
	"6": "You were wild and undisciplined as a youngster, but then you realized the error of your ways. You applied to a monastery and became a monk as a way to live a life of discipline."
};

var paladin = { 
	"Dice": "1d6",
	"1": "A fantastical being appeared before you and called on you to undertake a holy quest.",
	"2": "One of your ancestors left a holy quest unfulfilled, so you intend to finish that work.",
	"3": "The world is a dark and terrible place. You decided to serve as a beacon of light shining out against the gathering shadows.",
	"4": "You served as a paladin's squire, learning all you needed to swear your own sacred oath.",
	"5": "Evil must be opposed on all fronts. You feel compelled to seek out wickedness and purge it from the world.",
	"6": "Becoming a paladin was a natural consequence of your unwavering faith. In taking your vows, you became the holy sword of your religion."
};

var ranger = { 
	"Dice": "1d6",
	"1": "You found purpose while you honed your hunting skills by bringing down dangerous animals at the edge of civilization.",
	"2": "You always had a way with animals, able to calm them with a soothing word and a touch.",
	"3": "You suffer from terrible wanderlust, so being a ranger gave you a reason not to remain in one place for too long.",
	"4": "You have seen what happens when the monsters come out from the dark. You took it upon yourself to become the first line of defense against the evils that lie beyond civilization's borders.",
	"5": "You met a grizzled ranger who taught you woodcraft and the secrets of the wild lands.",
	"6": "You served in an army, learning the precepts of your profession while blazing trails and scouting enemy encampments."
};

var rogue = { 
	"Dice": "1d6",
	"1": "You've always been nimble and quick of wit, so you decided to use those talents to help you make your way in the world.",
	"2": "An assassin or a thief wronged you, so you focused your training on mastering the skills of your enemy to better combat foes of that sort.",
	"3": "An experienced rogue saw something in you and taught you several useful tricks.",
	"4": "You decided to turn your natural lucky streak into the basis of a career, though you still realize that improving your skills is essential.",
	"5": "You took up with a group of ruffians who showed you how to get what you want through sneakiness rather than direct confrontation.",
	"6": "I'm a sucker for a shiny bauble or a sack of coins, as long as you can get your hands on it without risking life and limb."
};

var sorcerer = { 
	"Dice": "1d6",
	"1": "When you were born, all the water in the house froze solid. The milk spoiled, or all the iron turned to copper. My family is convinced that this event was a harbinger of stranger things to come for you.",
	"2": "You suffered a terrible emotional or physical strain, which brought forth your latent magical power. You have fought to control it ever since.",
	"3": "Your immediate family never spoke of your ancestors, and when you asked, they would change the subject. It wasn't until you started displaying strange talents that the full truth of your heritage came out.",
	"4": "When a monster threatened one of your friends, you became filled with anxiety. You lashed out instinctively and blasted the wretched thing with a force that came from within you.",
	"5": "Sensing something special in you, a stranger taught you how to control your gift.",
	"6": "After you escaped from a magical conflagration, you realized that though you were unharmed, you were not unchanged. You began to exhibit unusual abilities that you am just beginning to understand."
};

var warlock = { 
	"Dice": "1d6",
	"1": "While wandering around in a forbidden place, you encountered an otherworldly being that offered to enter into a pact with you.",
	"2": "You were examining a strange tome you found in an abandoned library when the entity that would become your patron suddenly appeared before you.",
	"3": "You stumbled into the clutches of your patron after you accidentally stepped through a magical doorway.",
	"4": "When you were faced with a terrible crisis, you prayed to any being who would listen, and the creature that answered became your patron.",
	"5": "Your future patron visited you in your dreams and offered great power in exchange for your service.",
	"6": "One of your ancestors had a pact with your patron, so that entity was determined to bind you to the same agreement."
};

var wizard = { 
	"Dice": "1d6",
	"1": "An old wizard chose you from among several candidates to serve an apprenticeship.",
	"2": "When you became lost in a forest, a hedge wizard found you, took you in, and taught you the rudiments of magic.",
	"3": "You grew up listening to tales of great wizards and knew you wanted to follow their path. You strove to be accepted at an academy of magic and succeeded.",
	"4": "One of your relatives was an accomplished wizard who decided you were smart enough to learn the craft.",
	"5": "While exploring an old tomb, library, or temple, you found a spellbook. You were immediately driven to learn all you could about becoming a wizard.",
	"6": "You were a prodigy who demonstrated mastery of the arcane arts at an early age. When you became old enough to set out on your own, you did so to learn more magic and expand your power."
};

var LifeEvents = { 
	"Dice": "1d100",
	"1-10": "You suffered a tragedy#Tragedies",
	"11-20": "You gained a bit of good fortune#Boons",
	"21-30": "You fell in love or got married",
	"31-40": "You made an enemy of an adventurer. Roll 1d6. An odd number indicates you are to blame for the rift, and an even number indicates you are blameless.",
	"41-50": "You made a friend of an adventurer",
	"51-70": "You Spent time working in a job related to your background. Start the game with an extra 2d6 gp",
	"71-75": "You met someone important",
	"76-80": "You went on an adventure",
	"81-85": "You had a supernatural experience#SupernaturalEvent",
	"86-90": "You fought in a battle#War",
	"91-95": "You committed a crime or were wrongly accused of doing so#Crime",
	"96-99": "You encountered something magical#ArcaneMatters",
	"100": "Something truly strange happened to you#WeirdStuff"
};

var ArcaneMatters = { 
	"Dice": "1d8",
	"1": "You were charmed or frightened by a spell",
	"2": "You were injured by the effect of a spell",
	"3": "You witnessed a powerful spell being cast by a cleric, a druid, a sorcerer, a warlock, or a wizard",
	"4": "You drank a potion (of the DM's choice)",
	"5": "You found a spell scroll (of the DM's choice) and succeeded in casting the Spell it contained",
	"6": "You were affected by teleportation magic",
	"7": "You turned invisible for a time",
	"8": "You identified an illusion for what it was"
};

var Boons = { 
	"Dice": "1d10",
	"1": "A friendly wizard gave you a spell scroll containing one cantrip (of the DM's choice)",
	"2": "You saved the life of a commoner, who now owes you a life debt. This individual accompanies you on your travels and performs mundane tasks for you, but will leave if neglected, abused, or imperiled",
	"3": "You found a riding horse",
	"4": "You found some money. You have 1d20 gp in addition to your regular starting funds",
	"5": "A relative bequeathed you a simple weapon of your choice",
	"6": "You found something interesting. You gain one additional trinket",
	"7": "You once performed a service for a local temple. The next time you visit the temple, you can receive healing up to your hit point maximum",
	"8": "A friendly alchemist gifted you with a potion of healing or a flask of acid, as you choose",
	"9": "You found a treasure map",
	"10": "A distant relative left you a stipend that enables you to live at the comfortable lifestyle for 1d20 years. If you choose to live at a higher lifestyle, you reduce the price of the lifestyle by 2 gp during that time period"
};

var Crime = { 
	"Dice": "1d8",
	"1": "murder",
	"2": "theft",
	"3": "burglary",
	"4": "assault",
	"5": "smuggling",
	"6": "kidnapping",
	"7": "extortion",
	"8": "counterfeiting"
};

var SupernaturalEvent = { 
	"Dice": "1d100",
	"1-5": "You were ensorcelled by a fey and enslaved for 1d6 years before you escaped.",
	"6-10": "You saw a demon and ran away before it could do anything to you.",
	"11-15": "A devil tempted you. Make a DC 10 Wisdom saving throw. On a failed save, your alignment shifts one step toward evil (if it's not evil already), and you start the game with an additional 1d20 + 50 gp.",
	"16-20": "You woke up one morning miles from your home, with no idea how you got there.",
	"21-30": "You visited a holy site and felt the presence of the divine there.",
	"31-40": "You witnessed a falling red star, a face appearing inthe frost, or some other bizarre happening. You are certain that it was an omen of some sort.",
	"41-50": "You escaped certain death and believe it was the intervention of a god that saved you.",
	"51-60": "You witnessed a minor miracle.",
	"61-70": "You explored an empty house and found it to be haunted.",
	"71-75": "You were briefly possessed. Roll 1d6 to determine what type of creature possessed you: 1, celestial; 2, devil; 3, demon; 4, fey; 5, elemental; 6, undead.",
	"76-30": "You saw a ghost.",
	"81-85": "You saw a ghoul feeding on a corpse.",
	"36-90": "A celestial or a fiend visited you in your dreams to give a warning of dangers to come.",
	"91-95": "You briefly visited the Feywild or the Shadowfell.",
	"96-100": "You saw a portal that you believe leads to another plane of existence."
};

var Tragedies = { 
	"Dice": "1d12",
	"1-2": "A family member or a close friend died.",
	"3": "A friendship ended bitterly, and the other person is now hostile to you. The cause might have been a misunderstanding or something you or the former friend did.",
	"4": "You lost all your possessions in a disaster, and you had to rebuild your life.",
	"5": "You were imprisoned for a crime you didn't commit and spent 1d6 years at hard labor, in jail, or shackled to an oar in a slave galley.",
	"6": "War ravaged your home community, reducing everything to rubble and ruin. in the aftermath, you either helped your town rebuild or moved somewhere else.",
	"7": "A lover disappeared without a trace. You have been looking for that person ever since.",
	"8": "A terrible blight in your home community caused crops to fail, and many starved. You lost a sibling or some other family member.",
	"9": "You did something that brought terrible shame to you in the eyes of your family. You might have been involved in a scandal, dabbled in dark magic, or offended someone important. The attitude of your family members toward you becomes indifferent at best, though they might eventually forgive you.",
	"10": "For a reason you were never told, you were exiled from your community. You then either wandered in the wilderness for a time or promptly found a new place to live.",
	"11": "A romantic relationship ended. Roll 3d6. An odd number means it ended with bad feelings, while an even number means it ended amicably.",
	"12": "A current or prospective romantic partner of yours died."
};

var War = { 
	"Dice": "1d12",
	"1": "You were knocked out and left for dead. You woke up hours later with no recollection of the battle.",
	"2-3": "You were badly injured in the fight, and you still bear the awful scars of those wounds.",
	"4": "You ran away from the battle to save your life, but you still feel shame for your cowardice.",
	"5-7": "You suffered only minor injuries, and the wounds all healed without leaving scars.",
	"8-9": "You survived the battle, but you suffer from terrible nightmares in which you relive the experience.",
	"10-11": "You escaped the battle unscathed, though many of your Friends were injured or lost.",
	"12": "You acquitted yourselfwell in battle and are remembered as a hero. You might have received a medal for your bravery."
};

var WeirdStuff = { 
	"Dice": "1d12",
	"1": "You were turned into a toad and remained in that form for 1d4 weeks.",
	"2": "You were petrified and remained a stone statue for a time until someone freed you.",
	"3": "You were enslaved by a hag, a satyr, or some other being and lived in that creature's thrall for 1d6 years.",
	"4": "A dragon held you as a prisoner for 1d4 months until adventurers killed it.",
	"5": "You were taken captive by a race of evil humanoids such as drow, kuo-toa, or quaggoths. You lived as a slave in the Underdark until you escaped.",
	"6": "You served a powerful adventurer as a hireling. You have only recently left that service.",
	"7": "You went insane for 1d6 years and recently regained your sanity. A tic or some other bit of odd behavior might linger.",
	"8": "A lover of yours was secretly a silver dragon.",
	"9": "You were captured by a cult and nearly sacrificed on an altarto the foul being the cultists served. You escaped, but you fear they will find you.",
	"10": "You met a demigod, an archdevil, an archfey, a demon lord, or a titan, and you lived to tell the tale.",
	"11": "You were swallowed by a giant fish and spent a month in its gullet before you escaped.",
	"12": "A powerful being granted you a wish, but you squandered it on something frivolous."
};

var Alignment = { 
	"Dice": "1d100",
	"1-5": "chaotic evil",
	"6-12": "lawful evil",
	"13-23": "neutral evil",
	"24-40": "neutral",
	"41-54": "neutral good",
    "55-63": "lawful good",
    "64-76": "lawful neutral",
    "77-89": "chaotic good",
    "90-100": "chaotic neutral"
};

var CauseOfDeath = { 
	"Dice": "1d12",
	"1": "died of unknown reasons",
	"2": "were murdered",
	"3": "were killed in battle",
	"4": "were in an accident related to class or occupation",
	"5": "were in an accident unrelated to class or occupation",
	"6-7": "died of natural causes, such as disease or old age",
	"8": "died of apparent suicide",
	"9": "were torn apart by an animal or a natural disaster",
	"10": "were consumed by a monster",
	"11": "were executed for a crime or tortured to death",
	"12": "died due to a bizarre event, such as being hit by a meteorite, struck down by an angry god, or killed by a hatching slaad egg"
};

var Backgrounds = {
	"Dice": "1d54",
	"1-4": "acolyte",
	"5-6": "charlatan",
	"7-10": "criminal",
	"11-11": "spy",
	"12-15": "entertainer",
	"16-16": "gladiator",
	"17-20": "folk Hero",
	"21-24": "guild Artisan",
	"25-27": "guild Merchant",
	"28-29": "hermit",
	"30-33": "noble",
	"34-34": "knight",
	"35-38": "outlander",
	"39-42": "sage",
	"43-45": "sailor",
	"46-46": "pirate",
	"47-50": "soldier",
	"51-54": "urchin"
};

var Gender = { 
	"Dice": "1d2",
	"1": "male",
	"2": "female"
};

var BackgroundGold = { 
	"acolyte": "15",
	"charlatan": "15",
	"criminal & spy": "15",
	"entertainer & gladiator": "15",
	"folk Hero": "10",
	"guild Artisan & guild Merchant": "15",
	"hermit": "5",
	"noble & knight": "25",
	"outlander": "10",
	"sage": "10",
	"sailor & pirate": "10",
	"soldier": "10",
	"urchin": "10",
};