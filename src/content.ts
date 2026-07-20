export const contact = {
  brand: "BirBilling FlyTaxi",
  tagline: "Feel like a bird",
  phoneDisplay: "+91 85274 70972",
  whatsappNumber: "918527470972",
  location: "Bir Billing, Himachal Pradesh",
};

export const navItems = [
  ["Home", "#/"],
  ["Packages", "#/packages"],
  ["Courses", "#/courses"],
  ["Safety", "#/safety"],
  ["Gallery", "#/gallery"],
  ["Booking", "#/booking"],
] as const;

export const packages = [
  {
    name: "Classic Paragliding",
    duration: "20-minute joy flight",
    price: "Confirm on WhatsApp",
    copy: "A taste of what paragliding can be. Fly from 2500m at Billing top to 1400m landing site in Bir.",
    inclusions: [
      "20-minute joy flight",
      "Certified experienced pilot",
      "Fly from 2500m to 1400m",
      "Breathtaking valley views",
    ],
  },
  {
    name: "Prime Paragliding",
    duration: "Exciting 40-min flight",
    price: "Confirm on WhatsApp",
    copy: "Double the airtime! Soar above takeoff site, glide to a nearby ridge, and take a longer ride.",
    inclusions: [
      "Exciting 40 minutes airtime",
      "Soar above takeoff site",
      "Glide to a nearby ridge",
      "Priority flight slot",
    ],
    featured: true,
  },
  {
    name: "Cross Country (XC)",
    duration: "90 to 120-min flight",
    price: "Confirm on WhatsApp",
    copy: "Sustained thermic flying with top pilots. Fly as far as Palampur or Dharamshala weather permitting.",
    inclusions: [
      "90 to 120 minutes airtime",
      "Sustained thermic soaring",
      "Fly towards Palampur/Dharamshala",
      "Crème de la crème pilots",
    ],
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
  {
    src: "/assets/DSC_0578.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "Flying above Bir Billing",
  },
  {
    src: "/assets/DSC_0169.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "Ready to fly",
  },
  {
    src: "/assets/DSC_0587.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "Feel like a bird",
  },
  {
    src: "/assets/DSC_0185.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "Mountain flight moments",
  },
  {
    src: "/assets/DSC_0682.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "Over the village at sunset",
  },
  {
    src: "/assets/DSC_0288.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0187.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0595.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "Happy landings",
  },
  {
    src: "/assets/DSC_2063.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "Pure joy in the air",
  },
  {
    src: "/assets/DSC_0178.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0683.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0190.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "Coming in to land",
  },
  {
    src: "/assets/DSC_2067.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
    caption: "The view from above",
  },
  {
    src: "/assets/DSC_0314.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0591.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0181.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0678.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0583.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_2071.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0594.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0319.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_2736.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_3413.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
  {
    src: "/assets/DSC_0168_1.JPG",
    alt: "Tandem paragliding moment in Bir Billing",
  },
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

export type CtaType = "enroll" | "whatsapp";

export const courses: {
  id: string;
  name: string;
  duration: string;
  price: string;
  copy: string;
  inclusions: string[];
  ctaLabel: string;
  ctaType: CtaType;
}[] = [
  {
    id: "p1-p2",
    name: "Beginner's P1 & P2 Course",
    duration: "7-8 Days",
    price: "₹25,000",
    copy: "Understand your equipment, ground control, and complete 5 solo flights.",
    inclusions: [
      "Getting Started: Understand your equipment, how to care for it, and the basics of forward launches.",
      "On-Ground Mastery: Gain confidence in glider control, safe takeoff, and landing techniques.",
      "The Art of Flying: Learn directional control, smooth turns, and essential air traffic rules.",
      "Weather Wisdom: Discover how to identify safe weather and wind conditions for your flight.",
      "5 Solo Flights: Take to the skies on your own under direct guidance.",
    ],
    ctaLabel: "ENROLL NOW",
    ctaType: "enroll",
  },
  {
    id: "p3",
    name: "Soar Higher: P3 Intermediate Course",
    duration: "15 Days",
    price: "₹35,000",
    copy: "Advance your launching skills, master maneuvers, and start thermal/ridge soaring.",
    inclusions: [
      "Reverse launching and ground kiting for better control.",
      "Techniques like pitch, yaw, and roll control to navigate the skies.",
      "Exciting maneuvers like 360-degree turns and \"big ears\" for safe descents.",
      "An introduction to thermal and ridge soaring, where you'll gain height effortlessly.",
    ],
    ctaLabel: "ENROLL NOW",
    ctaType: "enroll",
  },
  {
    id: "p4",
    name: "Master the Skies: P4 Advanced Course",
    duration: "20-25 Days",
    price: "₹60,000",
    copy: "Master cross-country flight planning, thermals, and long distance glides.",
    inclusions: [
      "Advanced kiting skills and sharp turns for precision flying.",
      "Thermalling and ridge soaring to ride the wind and gain altitude.",
      "Speed bar flying for long-distance glides up to 20 km!",
      "In-depth meteorology for safe and strategic flight planning.",
      "15 Solo Flights: Build advanced hours in diverse weather conditions.",
    ],
    ctaLabel: "ENROLL NOW",
    ctaType: "enroll",
  },
];
