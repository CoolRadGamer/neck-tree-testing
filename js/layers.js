addLayer("cn", {
    name: "crg's neck", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "cn", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
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
	    if (hasUpgrade('cn', 11)) mult = mult.times(player.cn.points.plus(10))
	    if (hasUpgrade('cn', 12)) mult = mult.plus(100).pow(player.cn.points.pow(0.1))
	    if (player.b.points.gte(2)) mult = mult.pow(player.b.points)
	     if (hasUpgrade('cn', 13)) mult = mult.tetrate(player.cn.points.tetrate(player.b.points.times(player.b.points.times(0.01)).plus(1)))
	    if (hasUpgrade('b', 14)) mult = mult.tetrate(player.cn.points)
	    return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(2)
    },
	upgrades: {
    rows: 1,
    cols:4,
    11: {
	title: "Vampirism",	
        description: "multiply neck and point gain by necks :kekw:",
        cost: new Decimal(10),
       
    },
		12: {
	title: "Oh no",	
        description: "The necks learn CRG balancing",
        cost: new Decimal("e1e50"),
       
    },
			13: {
	title: "The Neckoning Part 1",	
        description: "Neckst comes Inflation.",
        cost: new Decimal("10^^100"),
       
    },
		
			14: {
	title: "The Neckoning Part 2",	
        description: "Raise your necks from the dead and call it neckromancy, bc jac said it should be in there somehow",
        cost: new Decimal("10^^500"),
       
    },
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
		points: new Decimal(1),
    }},
    color: "#990026",
    requires: new Decimal("10^^100"), // Can be a function that takes requirement increases into account
    resource: "booxters", // Name of prestige currency
    baseResource: "CRG necks", // Name of resource prestige is based on
    baseAmount() {return player.cn.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
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
        description: "Booxters booxt the Neckoning base",
        cost: new Decimal(0),
       
    },
	  12: {
	title: "Information^2",	
        description: "Once you get 3 booxters, neck gain gets autoed",
        cost: new Decimal(0),
       
    },
	 13: {
	title: "Information^3",	
        description: "Once you get 10 booxters, everything gets autoed",
        cost: new Decimal(0),
       
    },
		 14: {
	title: "The True Neckoning",	
        description: "The cn Neckonings Were Fakes, THIS IS THE TRUE NECKONING",
        cost: new Decimal(100),
       
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
let autoUpgrades = setInterval(function() {
if (player.b.points.gte(10)) {
buyUpgrade("cn", 11)
buyUpgrade("cn", 12)
buyUpgrade("cn", 13)
buyUpgrade("cn", 14)
}
},
			       100)
			       
