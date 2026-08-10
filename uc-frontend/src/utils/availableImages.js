// Centralized list of all available images in public and assets

const publicFilenames = [
  "AC.gas.png",
  "AC.heat.png",
  "AC.leaking.png",
  "AC.sound.png",
  "AC-gas.jpeg",
  "AC-sound.jpeg",
  "Refrigirator.cool.png",
  "Refrigirator.leak.png",
  "Refrigirator.light.png",
  "Refrigirator.power.png",
  "default-service.png",
  "hero.png",
  "vite.png",
  "1.svg",
  "WhatsApp Image 1948-05-19 at 20.54.00 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.00 (2).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.00.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.01 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.01 (2).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.01.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.02 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.02.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.03 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.03.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.04 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.04 (2).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.04.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.05 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.05.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.06 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.06.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.07 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.07.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.08 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.08.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.09 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.09.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.10 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.10.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.11 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.11 (2).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.11.jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.12 (1).jpeg",
  "WhatsApp Image 1948-05-19 at 20.54.12.jpeg"
];

const getPrettyLabel = (filename) => {
  if (filename.includes("AC.gas") || filename.includes("AC-gas")) return "AC Gas Refill";
  if (filename.includes("AC.heat")) return "AC Heat Coil";
  if (filename.includes("AC.leaking")) return "AC Water Leak";
  if (filename.includes("AC.sound") || filename.includes("AC-sound")) return "AC Sound Fix";
  if (filename.includes("Refrigirator.cool")) return "Fridge Cooling";
  if (filename.includes("Refrigirator.leak")) return "Fridge Leakage";
  if (filename.includes("Refrigirator.light")) return "Fridge Light";
  if (filename.includes("Refrigirator.power")) return "Fridge Power";
  if (filename.includes("default-service")) return "Default Appliance";
  if (filename.includes("hero")) return "Hero Banner";
  if (filename.startsWith("WhatsApp")) {
    const match = filename.match(/20\.54\.(\d+)(?:\s*\((.*?)\))?/);
    if (match) {
      return `Asset ${match[1]}${match[2] ? '-' + match[2] : ''}`;
    }
    return "Gallery Asset";
  }
  return filename.split('.')[0];
};

export const AVAILABLE_IMAGES = publicFilenames.map((name) => ({
  name,
  label: getPrettyLabel(name),
  url: encodeURI("/" + name)
}));
