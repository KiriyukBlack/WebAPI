"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Coffee_1 = require("./Coffee");
try {
    var coffee = new Coffee_1.default('House Blend', 12);
    console.log(coffee.order());
    var darkRoast = new Coffee_1.default('Dark Roast', 16);
    console.log(darkRoast.order());
    var specialBlend = new Coffee_1.default('Special Blend', 200);
    console.log(specialBlend.order());
    var kenyan = new Coffee_1.default('Kenyan');
    console.log(kenyan.order());
    var anon = new Coffee_1.default();
    console.log(anon.order());
}
catch (err) {
    console.log("ERROR: ".concat(err));
}
