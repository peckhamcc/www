module.exports = {
  name: '🌈 PCC Rainbow Race 🌈',
  description: [
    'A three-day grand tour split over four stages.',
    'Scoring is based on the Tour de France, so General Classification riders compete for the lowest time across all stages, Points riders contest sprints and climbers contest the mountain stages.',
    'There are some differences, segment times are treated individually so it is the fastest up them who wins the points - not necessarily the first.'
  ],
  style: 'grand-tour',
  stages: [{
    name: 'Stage #4 - 2015 UCI Worlds Course - TT',
    description: [
      'A 16k timetrial around the UCI Worlds Course in Richmond, Virginia'
    ],
    start: new Date('Sun May 10 2020 09:30:00 GMT+0100'),
    distance: 16000,
    sprints: [{
      name: 'Zwift W Broad St Sprint',
      description: [
        'Intermediate sprint 200m 0%'
      ],
      type: 'intermediate'
    }],
    climbs: [{
      name: 'Richmond KOM.',
      description: [
        '600m long cat 4 "climb" rising a whopping 39m'
      ],
      category: 4
    }]
  }, {
    name: 'Stage #3 - Triple Loops - Road Race',
    description: [
      'A 40k road race around the Surrey Hills'
    ],
    start: new Date('Sat May 9 2020 08:35:00 GMT+0100'),
    distance: 41000,
    sprints: [{
      name: 'The Mall Sprint Forward (Zwift Insider verified)',
      description: [
        '180m intermediate sprint, -1% gradient'
      ],
      type: 'intermediate'
    }],
    climbs: [{
      name: 'Leith Hill Full - VeloViewer',
      description: [
        '5.24km cat 3 climb rising 238m'
      ],
      category: 3
    }]
  }, {
    name: 'Stage #2 - Innsbruckring - Crit',
    description: [
      'A 16k crit around Innsbruck'
    ],
    start: new Date('Fri May 8 2020 10:05:00 GMT+0100'),
    distance: 16000,
    sprints: [{
      name: 'Innsbruck Sprint Forward',
      description: [
        '300m intermediate sprint'
      ],
      type: 'intermediate'
    }]
  }, {
    name: 'Stage #1 - Duchy Estate - Prologue',
    description: [
      'A 4k TT through Yorkshire'
    ],
    start: new Date('Fri May 8 2020 09:05:00 GMT+0100'),
    distance: 4000
  }]
}
