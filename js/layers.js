addLayer("cn", {
    name: "crg's neck", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "cn", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#2400ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "CRG necks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	    if (hasUpgrade('cn', 11)) mult = mult.times(2)
	    if (hasUpgrade('cn', 13)) mult = mult.times(player.points.plus(10).log10())
	    if (hasUpgrade('cn', 14)) mult = mult.times(3)
	    return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
    rows: 1,
    cols:4,
    11: {
	title: "Vampirism",	
        description: "multiplies neck and point gain by two.",
        cost: new Decimal(2)
       
    },
    12: {
	title: "Giraffe DNA",
	description: "necks are now longer, boosts point gain based on necks",
	effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.cn.points.pow(0.3).plus(1)
            },
	cost: new Decimal(12)
    },
    13: {
	title: "Adam's apple",
	description: "now there is a lump in your necks, boosts neck gain based on points",
	effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.points.plus(10).log10()
            },
	cost: new Decimal(40)
    },
    14: {
	title: "bad joke",
        description: "it's CRG's neck, of course this would happen. triple neck gain",
	cost: new Decimal(69)
    },
    21: {
	title: "Sponsored by Dracula",
	description: "i vant to succ ur blood. (boosts point gain based on points)",
	effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.points.plus(10).log10().div(2).plus(1)
            },
	cost: new Decimal(500)
		
},
	passiveGeneration() {
	if(player.b.points.gte(3)) return(player.b.points)
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "crg's neck reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
	
	
})
addLayer("b", {
    name: "booxters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "yb", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#990026",
    requires: new Decimal("1e10"), // Can be a function that takes requirement increases into account
    resource: "booxters", // Name of prestige currency
    baseResource: "CRG necks", // Name of resource prestige is based on
    baseAmount() {return player.cn.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	   
	    return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(2)
    },
	upgrades: {
    rows: 1,
    cols:4,
    11: {
	title: "Information",	
        description: "this is coming soon (not really)",
        cost: new Decimal(0),
       
    },
},
	autoPrestige() {
	if (player.b.points.gte(10) && player.b.points.lt(100)) return true
	if(player.b.points.gte(100)) return false
},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "booxter reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
	
	
})
let autoUpgrades1 = setInterval(function() {
if (player.b.points.gte(10)) {
buyUpgrade("cn", 11)
buyUpgrade("cn", 12)
buyUpgrade("cn", 13)
buyUpgrade("cn", 14)
}
},
			       100)
			       
