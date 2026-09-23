export const faqColumns = [
  {
    colIndex: 1,
    items: [
      {
        id: 'c1-1',
        question: 'What is the AI+Compassion Global Summit?',
        answer:
          'The AI+Compassion Global Forum is a continuous 24-hour worldwide relay connecting innovators, researchers, policymakers, and cultural leaders across 12 global regions to center empathy, human dignity, and wisdom traditions in artificial intelligence.',
      },
      {
        id: 'c1-2',
        question: 'What are the main objectives?',
        answer:
          'Our objectives are to establish shared ethical frameworks for AI development, showcase real-world community solutions, facilitate cross-cultural dialogue between cutting-edge technology and ancient wisdom, and catalyze collaborative international pilot initiatives.',
      },
      {
        id: 'c1-3',
        question: 'How do I register?',
        answer:
          "You can register directly on this website by clicking the 'Join Us' button. Registration gives you full free access to the 24-hour global interactive livestream, regional breakout rooms, working group resources, and post-summit archives.",
      },
      {
        id: 'c1-4',
        question: 'What happens during the USA Pavilion event?',
        answer:
          'The USA Pavilion in Osaka serves as the physical and broadcast launchpad for the forum, featuring high-level keynote addresses, bilateral AI ethics discussions, robotics demonstrations, and international cultural exchanges.',
      },
      {
        id: 'c1-5',
        question: 'Will session recordings be available?',
        answer:
          'Yes, all 24 hours of relay dialogues, regional panels, and keynote sessions are recorded and made available on-demand in our full video archive and media gallery shortly following the broadcast.',
      },
    ],
  },
  {
    colIndex: 2,
    items: [
      {
        id: 'c2-1',
        question: 'Who is organizing this event?',
        answer:
          'The forum is co-organized by the AI+Compassion Alliance in partnership with the Goi Peace Foundation, along with support from international pavilions, academic institutions, and civic coalitions worldwide including the Global AI Alliance (GAIA).',
      },
      {
        id: 'c2-2',
        question: 'How can I participate?',
        answer:
          'You can participate as an attendee watching the livestream, contribute questions during live regional Q&A sessions, participate in regional working groups, or apply to join as a community partner or speaker.',
      },
      {
        id: 'c2-3',
        question: 'What is the complete schedule?',
        answer:
          'The summit runs for 24 continuous hours across 12 regional blocks, beginning with the Kyoto/Osaka Kickoff and concluding with the sacred Kyoto Closing Ceremony. View the complete interactive Schedule section above to see times in your local timezone.',
      },
      {
        id: 'c2-4',
        question: 'What is the Kyoto closing ceremony?',
        answer:
          'The Kyoto closing ceremony gathers global delegates for a reflective synthesis rooted in traditional Japanese concepts of Ma (間, intentional pauses) and Wa (和, harmony), grounding the summit’s commitments into actionable long-term projects.',
      },
      {
        id: 'c2-5',
        question: 'What languages will be supported?',
        answer:
          'Flagship plenary sessions include simultaneous English and Japanese interpretation. Regional relay segments are hosted in local languages with English subtitles and community-led translation support.',
      },
    ],
  },
  {
    colIndex: 3,
    items: [
      {
        id: 'c3-1',
        question: 'What makes this summit unique?',
        answer:
          'Unlike conventional tech conferences, the AI+Compassion Forum follows the sun across 12 distinct global timezones, uniting grassroots community leaders with frontier AI researchers and philosophical traditions to foster authentic global solidarity.',
      },
      {
        id: 'c3-2',
        question: 'What is the cost to attend?',
        answer:
          'Access to the entire 24-hour global interactive livestream is 100% free of charge. We believe critical dialogues on humanity and technology must be universally accessible to everyone around the world.',
      },
      {
        id: 'c3-3',
        question: 'How does the global relay work?',
        answer:
          'The relay operates like an Olympic torch: each regional hub hosts a dedicated 2-hour block featuring localized case studies, discussions, and cultural reflections before ceremonially passing the broadcast baton westward to the next timezone.',
      },
      {
        id: 'c3-4',
        question: 'What topics will be covered?',
        answer:
          'Topics span compassionate robotics, algorithmic justice, healthcare AI in underserved communities, cultural preservation, digital public infrastructure, environmental AI stewardship, and youth empowerment.',
      },
    ],
  },
];

export const faqs = faqColumns.flatMap((col) => col.items);

