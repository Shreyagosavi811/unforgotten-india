import type { Story } from '../../types/domain';

export const PAN_INDIA_STORIES: Story[] = [
  {
    id: 'pi-001',
    slug: 'grand-trunk-road-lifeline',
    title: 'The Grand Trunk Road: India\'s Oldest Highway',
    subtitle: 'A 2,500-year-old route connecting Kabul to Calcutta that shaped trade, conquest, and culture',
    shortDescription: 'The Grand Trunk Road — known as Uttarapatha in ancient texts, Badshahi Sadak under the Mughals, and GT Road under the British — is one of the longest and oldest roads in Asia. It has connected the subcontinent\'s northwest frontier to the Gangetic plains for over two millennia.',
    regionId: 'IN-UP',
    category: 'PLACES',
    classification: 'HISTORICAL_EVIDENCE',
    status: 'PUBLISHED',
    historicalPeriod: 'c. 3rd Century BCE – Present',
    estimatedReadingMinutes: 6,
    tags: ['Grand Trunk Road', 'trade route', 'Maurya empire', 'Sher Shah Suri', 'pan-India', 'infrastructure'],
    audioNarration: { available: false },
    relatedStoryIds: ['wb-001', 'mh-003'],
    relatedRegionIds: ['IN-PB', 'IN-HR', 'IN-UP', 'IN-BR', 'IN-WB'],
    narrativeSections: [
      {
        id: 'pi001-s1',
        type: 'NARRATIVE',
        heading: 'The Ancient Uttarapatha',
        body: 'The route predates recorded history. The Mauryan emperor Chandragupta Maurya (c. 321–297 BCE) is credited with developing it as a royal highway connecting his capital Pataliputra (modern Patna) to the northwestern frontier of the empire at Taxila (in modern Pakistan). The Arthashastra of Kautilya references the maintenance of trunk roads as a duty of the state.',
      },
      {
        id: 'pi001-s2',
        type: 'NARRATIVE',
        heading: 'Sher Shah Suri\'s Reconstruction',
        body: 'The road was substantially rebuilt and extended by Sher Shah Suri during his brief reign (1538–1545 CE). He planted shade trees along the route, established sarais (rest houses) at regular intervals, and improved the road surface. This reconstruction earned the road the name "Sadak-e-Azam" (Grand Road). The serais also served as postal relay stations, creating one of the earliest systematic communication networks in South Asia.',
      },
      {
        id: 'pi001-s3',
        type: 'QUOTE',
        body: '"The Grand Trunk Road is a wonderful spectacle. Look! It runs straight, bearing without crowding India\'s traffic for fifteen hundred miles."',
        attribution: 'Rudyard Kipling, Kim (1901), Chapter 3',
      },
      {
        id: 'pi001-s4',
        type: 'REFLECTION',
        body: 'The modern GT Road (now National Highway networks NH-44, NH-19, and others) broadly follows the same alignment. It remains one of the most heavily trafficked road corridors in India. The road has witnessed the march of the Maurya, Mughal, and British armies, the migration of millions during Partition, and the daily movement of contemporary commerce.',
      },
    ],
    evidenceSources: [
      {
        id: 'pi001-e1',
        title: 'The Arthashastra of Kautilya — References to Royal Highways',
        publisher: 'R. Shamasastry (translator), Government Press, Bangalore, 1915',
        sourceType: 'ACADEMIC',
        verificationLevel: 'PRIMARY',
        notes: 'Ancient treatise on statecraft referencing road maintenance and trunk route administration.',
      },
      {
        id: 'pi001-e2',
        title: 'The Grand Trunk Road from Peshawar to Calcutta',
        publisher: 'Aman Nath',
        sourceType: 'BOOK',
        verificationLevel: 'SECONDARY',
        citation: 'Aman Nath, "The Grand Trunk Road," India Book House, 2002.',
      },
    ],
  },
];
