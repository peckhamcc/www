'use strict'

const {
  getNextRidingDays,
  generateRides
} = require('../roulette')
const jsonDb = require('./json-db')
const ridesDb = jsonDb('roulette-rides.json')
const preferencesDb = jsonDb('roulette-preferences.json')

/*
const sat = '2020-01-01'
const sun = '2020-01-02'

const prefs = {
  'rider-1@gmail.com': {
    rider: 'rider-1',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'has-route'
      }
    }
  },
  'rider-2@gmail.com': {
    rider: 'rider-2',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'has-route'
      }
    }
  },
  'rider-3@gmail.com': {
    rider: 'rider-3',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-4@gmail.com': {
    rider: 'rider-4',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-5@gmail.com': {
    rider: 'rider-5',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-6@gmail.com': {
    rider: 'rider-6',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-7@gmail.com': {
    rider: 'rider-7',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'has-route'
      }
    }
  },
  'rider-8@gmail.com': {
    rider: 'rider-8',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social-plus',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-9@gmail.com': {
    rider: 'rider-9',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'pain-train',
        distance: 'short',
        route: 'no-route'
      },
      [sun]: {
        type: 'road',
        speed: 'antisocial',
        distance: 'short',
        route: 'no-route'
      }
    }
  }
}

console.info('rides', JSON.stringify(generateRides([sat, sun], prefs), null, 2))
*/

const getRides = async (date) => {
  return ridesDb.values[date]
}

const setRides = async (date, rides) => {
  ridesDb.values[date] = rides
  ridesDb.save()
}

const getAllPreferences = async () => {
  return preferencesDb.values
}

const getPreferences = async (id) => {
  return preferencesDb.values[id] || {
    preferences: {}
  }
}

const setPreferences = async (id, prefs) => {
  preferencesDb.values[id] = prefs
  preferencesDb.save()
}

module.exports = {
  getRides,
  setRides,
  getAllPreferences,
  getPreferences,
  setPreferences,
  getNextRidingDays,
  generateRides
}
