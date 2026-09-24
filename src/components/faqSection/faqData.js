export const faqColumns = [
  {
    colIndex: 1,
    items: [
      {
        id: 'c1-1',
        question: 'What is the AI+Compassion Global Forum?',
        answer:
          'A continuous 24-hour worldwide relay connecting innovators, researchers, policymakers, and cultural leaders across 12 global regions to center empathy, human dignity, and wisdom traditions in artificial intelligence.',
      },
      {
        id: 'c1-2',
        question: 'What are the main objectives?',
        answer:
          'To establish shared ethical frameworks for AI development, showcase real-world community solutions, facilitate cross-cultural dialogue between technology and ancient wisdom, and catalyze collaborative international pilot initiatives.',
      },
      {
        id: 'c1-3',
        question: 'Who is organizing this event?',
        answer:
          'The forum is co-organized by the AI+Compassion Global Alliance in partnership with The Purple Movement.',
      },
      {
        id: 'c1-4',
        question: 'What makes this summit unique?',
        answer:
          'Unlike conventional tech conferences, the AI+Compassion Forum follows the sun across 12 distinct global timezones, uniting grassroots community leaders with frontier AI researchers and philosophical traditions to foster authentic global solidarity.',
      },
      {
        id: 'c1-5',
        question: 'How can I participate?',
        answer:
          'You can participate as an attendee watching the livestream, contribute questions during live regional Q&A sessions, join a regional group, or apply to be an ambassador or speaker.',
      },
    ],
  },
  {
    colIndex: 2,
    items: [
      {
        id: 'c2-1',
        question: 'What is the cost to attend?',
        answer:
          'Access to the entire 24-hour global interactive livestream is 100% free of charge. We believe critical dialogues on humanity and technology must be universally accessible to everyone around the world.',
      },
      {
        id: 'c2-2',
        question: 'What is the complete schedule?',
        answer:
          'The summit runs for 24 continuous hours across 12 regional blocks, beginning with the Kyoto Kickoff and concluding with the Kyoto Closing Ceremony. View the complete interactive schedule to see times in your local timezone.',
      },
      {
        id: 'c2-3',
        question: 'How does the global relay work?',
        answer:
          'The relay operates like an Olympic torch: each regional hub hosts a dedicated 2-hour block featuring localized case studies, discussions, and cultural reflections before ceremonially passing the broadcast baton westward to the next timezone.',
      },
      {
        id: 'c2-4',
        question: 'What is the Kyoto closing ceremony?',
        answer:
          "The Kyoto closing ceremony gathers global delegates for a reflective synthesis rooted in the traditional Japanese concept of Wa (和, harmony) and planetary stewardship, grounding the summit's shared vision into actionable long-term projects.",
      },
    ],
  },
  {
    colIndex: 3,
    items: [
      {
        id: 'c3-1',
        question: 'What topics will be covered?',
        answer:
          "Topics vary by region, spanning Indigenous wisdom, planet-centered AI, education and youth opportunity, governance and policy, peacebuilding, social impact, digital rights, and ecological regeneration. See the full regional schedule for each block's theme.",
      },
      {
        id: 'c3-2',
        question: 'How do I register?',
        answer:
          "You can register directly on this website by clicking the 'Register Now' button. You'll receive a confirmation email with the live streaming link.",
      },
      {
        id: 'c3-3',
        question: 'Will session recordings be available?',
        answer:
          'Yes, all 24 hours of relay dialogues, regional panels, and keynote sessions are recorded and made available on-demand in our YouTube channel shortly after the broadcast.',
      },
      {
        id: 'c3-4',
        question: 'What languages will be supported?',
        answer:
          'The forum is fully conducted in English. Some regional relay segments are hosted in local languages with English subtitles.',
      },
    ],
  },
];

export const faqs = faqColumns.flatMap((col) => col.items);
