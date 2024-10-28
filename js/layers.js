
addLayer("cn", {
    name: "crg's neck", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "cn", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	    clickyclicks: new Decimal(0)
    }},
    color: "#390073",
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
	    if (hasUpgrade('cn', 22)) mult = mult.times(player.cn.points.plus(10).log10())
        if (hasUpgrade('b', 12)) mult = mult.times(2)
	    return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
    rows: 3,
    cols: 4,
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
                return player.points.plus(10).log10().div(2).plus(1).pow(2)
            },
	cost: new Decimal(200)
    },
    22: {
	title: "neckodiles",
	description: "spread the word! they say 'neckneckneckneck' (boost neck gain based on necks)",
	effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.cn.points.plus(10).log10().div(2).plus(2)
            },
	cost: new Decimal(750)
    },
		
},
    buyables: {
    11: {
        title: "Neck Enhancers",
        cost(x=getBuyableAmount(this.layer, this.id)) { return Decimal.pow(3, x).mul(2000) },
        effect(x=getBuyableAmount(this.layer, this.id)) { return Decimal.pow(1.5, x) },
        display() { return "Multiplies point gain by 1.5x per buyable.<br>Currently: "+format(this.effect())+"x<br>Cost: "+(this.cost())+" crg necks"},
        canAfford: function() { return player[this.layer].points.gte(this.cost()) },
        buy: function() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() { if (hasUpgrade('b', 12)) return true},
    },
    },
	passiveGeneration() {
	if(hasMilestone("b",1)) return(player.b.points.div(100))
	},
    clickables: {
    11: {
        display() {return "clicky button!<br>" + format(player[this.layer].clickyclicks)},
	canClick() {return true},
        onClick() {player[this.layer].clickyclicks = player[this.layer].clickyclicks.plus(1)},
    }
    
},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c - crg's neck reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    

   tabFormat: [
"main-display",
"blank",
"prestige-button",
"blank",
["clickable", 11],
"blank",
"upgrades",
["buyable", 11]
]
})
addLayer("b", {
    name: "booxters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "yb", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        clickyclicks: new Decimal(0)
    }},
    color: "#990025",
    requires() {
         scale = player.b.points.times(0.02).plus(1.3).pow(player.b.points)
         return new Decimal(2500).times(scale)
        }, // Can be a function that takes requirement increases into account
    resource: "booxters", // Name of prestige currency
    baseResource: "CRG necks", // Name of resource prestige is based on
    baseAmount() {return player.cn.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
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
        description: "Booxter upgrades WILL NOT SPEND YOUR BOOXTERS (because that part of tmt games just adds arbitrary length idk)",
        cost: new Decimal(0),
       
    },
    12: {
	title: "Booxter seats",	
        description: "Double crg neck gain and unlock neck enhancers (cn buyable)",
        cost: new Decimal(2),
        pay() {return 0}
    },
},
	autoPrestige() {
	if (hasMilestone("b",2)) return true
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b - booxter reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        if (player.cn.points.gte(1000) || player.b.points.gte(1)) return true
    },
	milestones: {
        0: {
            requirementDescription: "3 booxters",
            effectDescription: "Automatically purchase crg neck upgrades.",
            done() { return player.b.points.gte(3) }
        },
        1: {
            requirementDescription: "5 booxters",
            effectDescription: "Gain x% of your crg necks on reset per second, where x is the number of booxters you have.",
            done() { return player.b.points.gte(5) }
        },
        2: {
            requirementDescription: "10 booxters",
            effectDescription: "Automatically booxter reset",
            done() { return player.b.points.gte(10) },
        },
        3: {
            requirementDescription: "15 booxters",
            effectDescription: "Nothing for now (I can't get it to work lul)",
            done() { return player.b.points.gte(15) },
        },
        
    },
    tabFormat: [
        "main-display",
        "blank",
        "prestige-button",
        ["display-text", function() {
            ybEff = new Decimal(2).pow(player.b.points)
            return "Your " + format(player.b.points, 0) + " booxters are multiplying point gain by " + format(ybEff)
        }],
        "blank",
        "milestones",
        "blank",
        ["clickable", 11],
        "blank",
        "upgrades"
    ],
    clickables: {
        11: {
            display() {return "clicky button 2!<br>" + format(player[this.layer].clickyclicks)},
        canClick() {return true},
            onClick() {player[this.layer].clickyclicks = player[this.layer].clickyclicks.plus(1)},
        }
    },


    
	
})
let autoUpgrades1 = setInterval(function() {
if (hasMilestone("b",0)) {
buyUpgrade("cn", 11)
buyUpgrade("cn", 12)
buyUpgrade("cn", 13)
buyUpgrade("cn", 14)
buyUpgrade("cn", 21)
buyUpgrade("cn", 22)
}
},
			       100)
