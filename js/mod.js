let modInfo = {
	name: "CRG's Neck Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1",
	name: "Neck-romancy",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>v1.1 idk</h3><br>
	Implemented booxters and milestones, "balanced" up to 20 booxters<br>I would do more but I'm tired of using tmt<br><br>
	<h3>v1.0</h3><br>
		Added upgrades.<br>
		Balanced up to 1 million CRG necks.`

let winText = `Congratulations! You beat the game I guess, there won't be any more bc I am lazy.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('cn', 11)) gain = gain.times(2)
	if (hasUpgrade('cn', 12)) gain = gain.times(player.cn.points.pow(0.3).plus(1))
	if (hasUpgrade('cn', 21)) gain = gain.times(player.points.plus(10).log10().div(2).plus(1).pow(2))
	gain = gain.times(Decimal.pow(1.5, getBuyableAmount('cn', 11)))
	gain = gain.times(Decimal.pow(2, player.b.points))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.b.points.gte(new Decimal("20"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
