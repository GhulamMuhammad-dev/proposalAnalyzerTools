// gradient-generator.js
const fs = require("fs");

// scales you defined
const scales = ["50","100","200","300","400","500","600","700","800","900","950"];

// build gradients
let css = `@layer utilities {\n`;

// Primary ↔ Secondary (full 11x11 matrix = 121 classes)
for (let p of scales) {
  for (let s of scales) {
    css += `  .bg-gradient-primary-${p}-secondary-${s} { background: linear-gradient(to right, var(--color-primaryColor-${p}), var(--color-secondaryColor-${s})); }\n`;
  }
}

// Primary ↔ Neutral
["lightColor","darkColor","dimLightColor","dimDarkColor"].forEach(n => {
  css += `  .bg-gradient-primary-${n} { background: linear-gradient(to right, var(--color-primaryColor-500), var(--color-${n})); }\n`;
});

// Secondary ↔ Neutral
["lightColor","darkColor","dimLightColor","dimDarkColor"].forEach(n => {
  css += `  .bg-gradient-secondary-${n} { background: linear-gradient(to right, var(--color-secondaryColor-500), var(--color-${n})); }\n`;
});

// Mint with everything
["primaryColor-500","secondaryColor-500","lightColor","darkColor","dimLightColor","dimDarkColor"].forEach(n => {
  css += `  .bg-gradient-mint-${n.replace("Color-500","").replace("Color","").replace("-","")} { background: linear-gradient(to right, var(--color-mint-500), var(--color-${n})); }\n`;
});

css += `}\n`;

fs.writeFileSync("gradients.css", css);
console.log("✅ gradients.css generated with all gradient classes!");
