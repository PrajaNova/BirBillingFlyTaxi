export const contact = {
  brand: "BirBilling FlyTaxi",
  tagline: "Feel like a bird",
  phoneDisplay: "+91 XXXXX XXXXX",
  whatsappNumber: "91XXXXXXXXXX",
  location: "Bir Billing, Himachal Pradesh",
};

export const navItems = [
  ["Packages", "#packages"],
  ["Safety", "#safety"],
  ["Gallery", "#gallery"],
  ["Booking", "#booking"],
  ["Contact", "#contact"],
] as const;

export const packages = [
  {
    name: "Tandem Flight",
    duration: "15-25 min airtime",
    price: "Confirm on WhatsApp",
    copy: "A smooth first flight with a certified pilot from Billing takeoff to Bir landing.",
    inclusions: ["Pilot assisted flight", "Basic pre-flight briefing", "Landing support"],
  },
  {
    name: "High Fly",
    duration: "30-45 min airtime",
    price: "Confirm on WhatsApp",
    copy: "Longer air time for guests who want bigger views and a more complete mountain flight.",
    inclusions: ["Longer soaring window", "Priority flight slot", "Optional video add-on"],
    featured: true,
  },
  {
    name: "Flight + Pickup",
    duration: "Door pickup support",
    price: "Confirm on WhatsApp",
    copy: "Paragliding plus FlyTaxi coordination from your hotel, bus stop, or nearby stay.",
    inclusions: ["Pickup planning", "Takeoff transfer", "Return guidance"],
  },
];

export const trustPoints = [
  "Certified pilots",
  "Weather-first decisions",
  "Pickup coordination",
  "GoPro video option",
];

export const steps = [
  "Choose your flight",
  "Share date and pickup",
  "Confirm on WhatsApp",
  "Fly from Billing",
];

export const gallery = [
  "Sunset ridge flights",
  "Billing takeoff views",
  "Bir landing moments",
  "FlyTaxi pickup support",
];

export const faqs = [
  {
    question: "Do I need experience?",
    answer: "No. Tandem flights are flown with a trained pilot after a short briefing.",
  },
  {
    question: "Can weather cancel a flight?",
    answer: "Yes. Wind and visibility decide flight timing. Safety comes before schedule.",
  },
  {
    question: "Do you arrange pickup?",
    answer: "Yes. Share your stay or pickup point and FlyTaxi will coordinate the route.",
  },
  {
    question: "Are videos included?",
    answer: "GoPro video can be requested as an add-on while confirming your slot.",
  },
];
