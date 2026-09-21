import Image from "next/image";
import ab1 from "@/../public/ab1.webp";
import pillarsImg from "@/../public/pillars.webp";
import globeImg from "@/../public/globe.png";
import city from "@/../public/city.png";
import {
  GlobeAltIcon,
  BookOpenIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  PauseCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const pillars = [
  {
    title: "Harmony Across Systems",
    description:
      "Designing AI to coexist with natural ecosystems, social systems, and technological networks.",
    icon: <GlobeAltIcon className="w-8 h-8 text-purple-600" />,
  },
  {
    title: "Ma in Innovation",
    description:
      "Embedding intentional pauses for reflection and co-creation in the AI development process.",
    icon: <PauseCircleIcon className="w-8 h-8 text-pink-600" />,
  },
  {
    title: "Cultural Wisdom & Global Equity",
    description:
      "Ensuring AI honors diverse traditions, languages, and perspectives.",
    icon: <UserGroupIcon className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Regenerative AI Economics",
    description:
      "Building AI-driven business models that restore environmental and community well-being.",
    icon: <SparklesIcon className="w-8 h-8 text-green-600" />, // closest replacement for "Leaf"
  },
  {
    title: "Trust, Transparency and Accountability",
    description:
      "Closing the global trust gap through openness and ethical governance.",
    icon: <ShieldCheckIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Education for Co-Flourishing",
    description:
      "Cultivating AI literacy and eco-social awareness in the next generation.",
    icon: <BookOpenIcon className="w-8 h-8 text-orange-600" />,
  },
];

export function ConstraintsSection() {
  return (
    <section className="my-11 grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-4 md:px-8 py-8">
      {/* Left Content */}
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">Turning Constraints into Strengths</h2>
          <p className="text-sm text-gray-600 mt-2">
            Rather than viewing geographic and logistical limitations as obstacles, we designed them as features that enhance our mission.
          </p>
        </div>
        {/* First row with two cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Intimate Gathering */}
          <div className="bg-pink-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="mb-2 text-base font-semibold">Intimate Gathering</h3>
            <p className="text-sm leading-relaxed">
              A small, high-trust in-person assembly in Osaka creates the conditions for meaningful connection and breakthrough thinking.
            </p>
          </div>
          {/* Global Relay */}
          <div className="bg-pink-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="mb-2 text-base font-semibold">Global Relay</h3>
            <p className="text-sm leading-relaxed mb-2">
              A 24-hour online participation structure spans three global zones, ensuring diverse voices are included:
            </p>
            <ul className="text-sm leading-relaxed pl-5 list-disc">
              <li>Asia-Pacific</li>
              <li>Europe–Africa</li>
              <li>Americas</li>
            </ul>
          </div>
        </div>
        {/* Full-width Symbolic Completion */}
        <div className="bg-pink-500 text-white p-4 rounded-xl shadow-lg">
          <h3 className="mb-2 text-base font-semibold">Symbolic Completion</h3>
          <p className="text-sm leading-relaxed">
            Closing the event in Kyoto completes our symbolic ring, connecting ancient wisdom with future innovation.
          </p>
        </div>
      </div>
      {/* Right Image */}
      <div className="flex justify-center items-center">
        <Image src={globeImg} alt="Globe" width={300} height={300} className="w-full max-w-xs md:max-w-md h-auto" />
      </div>
    </section>
  );
}

export function ExpoInspiration() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 md:px-8 py-8">
      {/* Left Image */}
      <div className="flex justify-center items-center">
        <div className="rounded-xl overflow-hidden w-full max-w-xs md:max-w-md">
          <Image src={city} alt="City View" layout="responsive" width={500} height={500} />
        </div>
      </div>
      {/* Right Content */}
      <div className="flex flex-col gap-6">
        <h2 className="text-center font-bold text-xl md:text-2xl text-gray-900">Expo 2025 Inspiration</h2>
        <p className="text-center text-base text-gray-700">
          Our Forum draws deep inspiration from the architectural and philosophical foundations of Expo 2025 Osaka:
        </p>
        {/* Box 1 */}
        <div className="border border-yellow-400 rounded p-5 text-center">
          <h3 className="mb-2 font-bold text-lg text-[#0A2144]">Design System: ID → GROUP → WORLD</h3>
          <p className="text-base text-[#0A2144]">
            A philosophy of connection that moves from individual identity to collective collaboration to global impact.
          </p>
        </div>
        {/* Box 2 */}
        <div className="border border-yellow-400 rounded p-5 text-center">
          <h3 className="mb-2 font-bold text-lg text-[#0A2144]">Grand Ring</h3>
          <p className="text-base text-[#0A2144]">
            The world’s largest wooden structure serves as a powerful symbol of unity in diversity—a continuous circle with no beginning or end.
          </p>
        </div>
        {/* Box 3 */}
        <div className="border border-yellow-400 rounded p-5 text-center">
          <h3 className="mb-2 font-bold text-lg text-[#0A2144]">Myaku–Myaku</h3>
          <p className="text-base text-[#0A2144]">
            The Expo mascot embodies the pulse of continuity and interconnection, representing the heartbeat of our shared planet.
          </p>
        </div>
        <p className="text-center text-xs text-gray-600">
          Our event design intentionally mirrors these principles, creating a living metaphor for harmonious coexistence.
        </p>
      </div>
    </section>
  );
}

export default function AboutSection() {
  // Globe layout for thematic pillars (pie segments)
  // Each segment will be a rotated div with icon in the center
  const pieSegments = [
    { ...pillars[0], rotate: 0 },
    { ...pillars[1], rotate: 60 },
    { ...pillars[2], rotate: 120 },
    { ...pillars[3], rotate: 180 },
    { ...pillars[4], rotate: 240 },
    { ...pillars[5], rotate: 300 },
  ];

  return (
    <div
      id="about"
      className="flex flex-col gap-10 px-4 py-8 md:p-8 lg:p-16 text-[#0A2144]"
    >
      {/* About Us */}
      <h1 className="text-2xl md:text-3xl font-semibold">About Us</h1>
      <div className="flex flex-col xl:flex-row gap-12 items-center justify-between">
        <div className="w-full xl:w-1/2 flex flex-col gap-4 items-start">
          <b className="text-xl md:text-2xl font-semibold">Our Vision</b>
          <p className="text-base md:text-lg leading-relaxed">
            Artificial intelligence is advancing faster than ever, yet global
            trust in these systems remains uncertain. We imagine a future where
            nature, humanity, and technology thrive together. This forum
            explores how AI can move beyond fear and competition to nurture
            ecosystems, preserve cultural heritage, and strengthen communities.
            <br />
            <br />
            Our approach is guided by two essential Japanese concepts:
          </p>
          <div className="border-l-4 pl-4 py-4 border-[#CB4B4B]">
            <b>Futokoro (懐)</b>
            <p className="text-base md:text-lg pt-2">
              Translates to the intimate space near the body or the deep embrace of nature. Exploring how
              we responsibly receive AI into physical bodies, homes, care systems, and ecosystems.
            </p>
          </div>
          {/* <div className="border-l-4 pl-4 py-4 border-[#CB4B4B]">
            <b>Ma (間)</b>
            <p className="text-base md:text-lg pt-2">
              The concept of vital space between elements—the pause that gives
              meaning and allows for reflection.
            </p>
          </div> */}
        </div>
        <div className="w-full xl:w-1/2 flex justify-center items-center">
          <Image
            src={ab1}
            alt="About Us"
            className="w-[95%] h-[95%] shadow-[25px_25px_0px_rgba(255,205,119,0.8)] lg:shadow-[35px_35px_0px_rgba(255,205,119,0.8)] rounded-t-[3rem] rounded-r-[3rem]"
          />
        </div>
      </div>
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mt-15 justify-center flex">
        Why Now : The Critical Moment
      </h2>
      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="rounded-2xl bg-pink-300 p-8 md:p-10 shadow-lg flex flex-col justify-center w-full mx-auto">
          <h3 className="justify-center flex text-4xl md:text-5xl font-extrabold text-gray-900">
            90%
          </h3>
          <p className="mt-3 text-lg font-semibold text-gray-800 justify-center flex">
            AI Use at Work
          </p>
          <p className="mt-4 text-sm text-gray-700 text-center">
            90% of digital-trust professionals surveyed by ISACA in 2026 said they 
            believe employees are already using AI in their organizations—while only 22% 
            said AI ROI had met or exceeded expectations.
          </p>
        </div>
        {/* Right Card */}
        <div className="rounded-2xl bg-purple-400 p-8 md:p-10 shadow-lg flex flex-col justify-center w-full mx-auto">
          <h3 className="text-4xl md:text-5xl font-extrabold text-white justify-center flex">
            52%
          </h3>
          <p className="mt-3 text-lg font-semibold text-white justify-center flex">
            People Say AI Makes Them Nervous
          </p>
          <p className="mt-4 text-sm text-white/90 text-center">
            Stanford's 2026 AI Index reports that 52% of respondents said AI products and 
            services make them nervous, even as 59% said they see more benefits than drawbacks.
          </p>
        </div>
      </div>
      {/* Bottom Description */}
      <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
        AI capability is accelerating. Adoption is accelerating. Trust, governance and public 
        understanding must evolve with them.
        The question is no longer simply what AI can do. It is what we choose to do 
        with it and how we keep humanity at the centre.

      </p>
      {/* Constraints Section */}
        {/* <ConstraintsSection /> */}

      {/* Expo Inspiration Section */}
        {/* <ExpoInspiration /> */}

      {/* Thematic Pillars Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Thematic Pillars
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-center">
          Six interconnected themes will guide our discussions, workshops, and
          commitments. Each pillar will feature dedicated sessions led by global
          experts who embody both technical expertise and humanistic values,
          ensuring a holistic approach to AI development.
        </p>
        {/* Globe Pie Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left 3 pillar descriptions */}
          <div className="flex flex-col gap-8 md:gap-12 items-end justify-center flex-1">
            <div className="max-w-xs text-right">
              <h3 className="font-bold">{pillars[0].title}</h3>
              <p className="text-gray-600 text-sm">{pillars[0].description}</p>
            </div>
            <div className="max-w-xs text-right">
              <h3 className="font-bold">{pillars[5].title}</h3>
              <p className="text-gray-600 text-sm">{pillars[5].description}</p>
            </div>
            <div className="max-w-xs text-right">
              <h3 className="font-bold">{pillars[4].title}</h3>
              <p className="text-gray-600 text-sm">{pillars[4].description}</p>
            </div>
          </div>
          {/* Globe Pie */}
          <div className="relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] min-w-[220px] md:min-w-[320px] flex items-center justify-center">
            <Image src={pillarsImg} alt="Pillars Globe" width={1000} height={1000} className="w-full h-full" />
          </div>
          {/* Right 3 pillar descriptions */}
          <div className="flex flex-col gap-8 md:gap-12 items-start justify-center flex-1">
            <div className="max-w-xs text-left">
              <h3 className="font-bold">{pillars[1].title}</h3>
              <p className="text-gray-600 text-sm">{pillars[1].description}</p>
            </div>
            <div className="max-w-xs text-left">
              <h3 className="font-bold">{pillars[2].title}</h3>
              <p className="text-gray-600 text-sm">{pillars[2].description}</p>
            </div>
            <div className="max-w-xs text-left">
              <h3 className="font-bold">{pillars[3].title}</h3>
              <p className="text-gray-600 text-sm">{pillars[3].description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}