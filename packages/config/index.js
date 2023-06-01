
const OPTIONS = {
  gender: {
    name: 'Gender',
    options: {
      M: 'Male fit',
      F: 'Female fit'
    }
  },
  pockets: {
    name: 'Pockets',
    options: {
      N: 'No pockets',
      Y: 'With pockets',
      P0: 'No pocket',
      P1: 'One pocket',
      P3: 'Three pockets',
      N1: 'One number pocket',
      N2: 'Two number pockets',
      NR: 'One number pocket + radio pocket'
    }
  },
  sleeves: {
    name: 'Sleeves',
    options: {
      S: 'Short sleeves',
      L: 'Long sleeves'
    }
  },
  colour: {
    name: 'Colour',
    options: {
      WHI: 'White',
      BLK: 'Black'
    }
  },
  zip: {
    name: 'Zip',
    options: {
      S: 'Half',
      L: 'Full'
    }
  },
  pad: {
    name: 'Pad',
    options: {
      MR: 'Male Regular pad',
      ME: 'Male Endurance pad',
      FR: 'Female Regular pad',
      FE: 'Female Endurance pad',
      NP: 'No pad'
    }
  },
  material: {
    name: 'Material',
    options: {
      RAZ: 'Smooth',
      VER: 'Lightweight',
      CAR: 'Woven',
      SPI: 'Woven',
      STR: 'Smooth',
      ROU: 'Roubaix',
      LP: 'Lycra',
      GOF: 'Lycra',
      REV: 'Lightweight',
      BRI: 'Lycra',
      DEV: 'Woven',
      FLA: 'Insulated'
    }
  },
  back: {
    name: 'Back',
    notes: 'Mesh for breathability, membrane for warmth',
    options: {
      ME: 'Mesh',
      MB: 'Membrane'
    }
  },
  valuables: {
    name: 'Valuables Pouch',
    notes: 'A removable plastic pouch for your valuables',
    options: {
      N: 'No',
      Y: 'Yes'
    }
  },
  size: {
    'arm-warmers': {
      name: 'Size',
      options: {
        1: {
          name: '1',
          measurements: {
            jersey: {
              U: '1'
            },
            bicep: {
              U: 21
            },
            length: {
              U: 39
            }
          }
        },
        '2/3': {
          name: '2-3',
          measurements: {
            jersey: {
              U: '2-3'
            },
            bicep: {
              U: 23.5
            },
            length: {
              U: 43
            }
          }
        },
        '4/5': {
          name: '4-5',
          measurements: {
            jersey: {
              U: '4-5'
            },
            bicep: {
              U: 25
            },
            length: {
              U: 47
            }
          }
        },
        '6/8': {
          name: '6-8',
          measurements: {
            jersey: {
              U: '6-8'
            },
            bicep: {
              U: 27
            },
            length: {
              U: 48
            }
          }
        }
      }
    },
    jerseys: {
      name: 'Size',
      notes: 'L sizes add 5cm length to the arms & body',
      options: {
        1: {
          name: '1',
          measurements: {
            chest: {
              M: {
                min: 84,
                max: 88
              },
              F: {
                min: 82,
                max: 86
              }
            }
          }
        },
        '1+': {
          name: '1L',
          measurements: {
            chest: {
              M: {
                min: 84,
                max: 88
              }
            }
          }
        },
        2: {
          name: '2',
          measurements: {
            chest: {
              M: {
                min: 88,
                max: 92
              },
              F: {
                min: 86,
                max: 90
              }
            }
          }
        },
        '2+': {
          name: '2L',
          measurements: {
            chest: {
              M: {
                min: 88,
                max: 92
              }
            }
          }
        },
        3: {
          name: '3',
          measurements: {
            chest: {
              M: {
                min: 92,
                max: 96
              },
              F: {
                min: 90,
                max: 94
              }
            }
          }
        },
        '3+': {
          name: '3L',
          measurements: {
            chest: {
              M: {
                min: 92,
                max: 96
              }
            }
          }
        },
        4: {
          name: '4',
          measurements: {
            chest: {
              M: {
                min: 96,
                max: 100
              },
              F: {
                min: 94,
                max: 98
              }
            }
          }
        },
        '4+': {
          name: '4L',
          measurements: {
            chest: {
              M: {
                min: 96,
                max: 100
              }
            }
          }
        },
        5: {
          name: '5',
          measurements: {
            chest: {
              M: {
                min: 100,
                max: 104
              },
              F: {
                min: 98,
                max: 106
              }
            }
          }
        },
        6: {
          name: '6',
          measurements: {
            chest: {
              M: {
                min: 104,
                max: 112
              },
              F: {
                min: 106,
                max: 114
              }
            }
          }
        },
        7: {
          name: '7',
          measurements: {
            chest: {
              M: {
                min: 112,
                max: 120
              }
            }
          }
        },
        8: {
          name: '8',
          measurements: {
            chest: {
              M: {
                min: 120,
                max: 128
              }
            }
          }
        }
      }
    },

    kids: {
      name: 'Size',
      options: {
        110: {
          name: '110',
          measurements: {
            height: {
              U: {
                min: 104,
                max: 116
              }
            }
          }
        },
        122: {
          name: '122',
          measurements: {
            height: {
              U: {
                min: 116,
                max: 124
              }
            }
          }
        },
        128: {
          name: '128',
          measurements: {
            height: {
              U: {
                min: 124,
                max: 130
              }
            }
          }
        },
        134: {
          name: '134',
          measurements: {
            height: {
              U: {
                min: 130,
                max: 138
              }
            }
          }
        },
        140: {
          name: '140',
          measurements: {
            height: {
              U: {
                min: 138,
                max: 142
              }
            }
          }
        },
        146: {
          name: '146',
          measurements: {
            height: {
              U: {
                min: 142,
                max: 148
              }
            }
          }
        },
        152: {
          name: '152',
          measurements: {
            height: {
              U: {
                min: 148,
                max: 154
              }
            }
          }
        },
        158: {
          name: '158',
          measurements: {
            height: {
              U: {
                min: 154,
                max: 160
              }
            }
          }
        }
      }
    },

    shorts: {
      name: 'Size',
      notes: 'L sizes add 5cm length to the legs',
      options: {
        1: {
          name: '1',
          measurements: {
            hips: {
              M: {
                min: 85,
                max: 89
              },
              F: {
                min: 86,
                max: 90
              }
            }
          }
        },
        '1+': {
          name: '1L',
          measurements: {
            hips: {
              M: {
                min: 85,
                max: 89
              }
            }
          }
        },
        2: {
          name: '2',
          measurements: {
            hips: {
              M: {
                min: 89,
                max: 93
              },
              F: {
                min: 90,
                max: 94
              }
            }
          }
        },
        '2+': {
          name: '2L',
          measurements: {
            hips: {
              M: {
                min: 89,
                max: 93
              }
            }
          }
        },
        3: {
          name: '3',
          measurements: {
            hips: {
              M: {
                min: 93,
                max: 97
              },
              F: {
                min: 94,
                max: 98
              }
            }
          }
        },
        '3+': {
          name: '3L',
          measurements: {
            hips: {
              M: {
                min: 93,
                max: 97
              }
            }
          }
        },
        4: {
          name: '4',
          measurements: {
            hips: {
              M: {
                min: 97,
                max: 101
              },
              F: {
                min: 94,
                max: 98
              }
            }
          }
        },
        '4+': {
          name: '4L',
          measurements: {
            hips: {
              M: {
                min: 97,
                max: 101
              }
            }
          }
        },
        5: {
          name: '5',
          measurements: {
            hips: {
              M: {
                min: 102,
                max: 1110
              },
              F: {
                min: 98,
                max: 106
              }
            }
          }
        },
        6: {
          name: '6',
          measurements: {
            hips: {
              M: {
                min: 105,
                max: 113
              },
              F: {
                min: 110,
                max: 118
              }
            }
          }
        },
        7: {
          name: '7',
          measurements: {
            hips: {
              M: {
                min: 113,
                max: 121
              }
            }
          }
        },
        8: {
          name: '8',
          measurements: {
            hips: {
              M: {
                min: 121,
                max: 129
              }
            }
          }
        }
      }
    },

    socks: {
      name: 'Size',
      options: {
        'S/M': {
          name: 'S/M',
          measurements: {
            shoe: {
              U: 'UK 3-6'
            }
          }
        },
        'L/XL': {
          name: 'L/XL',
          measurements: {
            shoe: {
              U: 'UK 7-11+'
            }
          }
        }
      }
    },

    gloves: {
      name: 'Size',
      options: {
        XS: {
          name: 'XS',
          measurements: {
            palm: {
              U: {
                metric: '7cm',
                imperial: '2.7"'
              }
            }
          }
        },
        S: {
          name: 'S',
          measurements: {
            palm: {
              U: {
                metric: '8cm',
                imperial: '3.1"'
              }
            }
          }
        },
        M: {
          name: 'M',
          measurements: {
            palm: {
              U: {
                metric: '9cm',
                imperial: '3.5"'
              }
            }
          }
        },
        L: {
          name: 'L',
          measurements: {
            palm: {
              U: {
                metric: '10cm',
                imperial: '3.9"'
              }
            }
          }
        },
        XL: {
          name: 'XL',
          measurements: {
            palm: {
              U: {
                metric: '11cm',
                imperial: '4.3"'
              }
            }
          }
        },
        XXL: {
          name: 'XXL',
          measurements: {
            palm: {
              U: {
                metric: '12cm',
                imperial: '5.1"'
              }
            }
          }
        }
      }
    },

    't-shirts': {
      name: 'Size',
      options: {
        XXS: {
          name: 'XXS',
          measurements: {
            chest: 87,
            body: 64,
            sleeve: 19
          }
        },
        XS: {
          name: 'XS',
          measurements: {
            chest: 92,
            body: 66,
            sleeve: 19.5
          }
        },
        S: {
          name: 'S',
          measurements: {
            chest: 98,
            body: 69,
            sleeve: 20.5
          }
        },
        M: {
          name: 'M',
          measurements: {
            chest: 104,
            body: 72,
            sleeve: 21.5
          }
        },
        L: {
          name: 'L',
          measurements: {
            chest: 110,
            body: 74,
            sleeve: 22.5
          }
        },
        XL: {
          name: 'XL',
          measurements: {
            chest: 116,
            body: 76,
            sleeve: 22.5
          }
        },
        '2XL': {
          name: 'XXL',
          measurements: {
            chest: 122,
            body: 76,
            sleeve: 23.5
          }
        }
      }
    },

    'ls-t-shirts': {
      name: 'Size',
      options: {
        S: {
          name: 'S',
          measurements: {
            chest: 98,
            body: 70,
            sleeve: 64
          }
        },
        M: {
          name: 'M',
          measurements: {
            chest: 104,
            body: 72,
            sleeve: 65
          }
        },
        L: {
          name: 'L',
          measurements: {
            chest: 110,
            body: 74,
            sleeve: 66
          }
        },
        XL: {
          name: 'XL',
          measurements: {
            chest: 116,
            body: 76,
            sleeve: 67
          }
        },
        '2XL': {
          name: '2XL',
          measurements: {
            chest: 122,
            body: 78,
            sleeve: 68
          }
        }
      }
    },

    hoodies: {
      name: 'Size',
      options: {
        XXS: {
          name: 'XXS',
          measurements: {
            chest: 93,
            body: 63,
            sleeve: 60.5
          }
        },
        XS: {
          name: 'XS',
          measurements: {
            chest: 98,
            body: 65,
            sleeve: 61.5
          }
        },
        S: {
          name: 'S',
          measurements: {
            chest: 103,
            body: 68,
            sleeve: 64
          }
        },
        M: {
          name: 'M',
          measurements: {
            chest: 108,
            body: 72,
            sleeve: 65.5
          }
        },
        L: {
          name: 'L',
          measurements: {
            chest: 114,
            body: 74,
            sleeve: 67
          }
        },
        XL: {
          name: 'XL',
          measurements: {
            chest: 120,
            body: 76,
            sleeve: 68.5
          }
        },
        '2XL': {
          name: 'XXL',
          measurements: {
            chest: 126,
            body: 78,
            sleeve: 70
          }
        }
      }
    },

    'zip-hoodies': {
      name: 'Size',
      options: {
        XXS: {
          name: 'XXS',
          measurements: {
            chest: 93,
            body: 63,
            sleeve: 60.5
          }
        },
        XS: {
          name: 'XS',
          measurements: {
            chest: 98,
            body: 65,
            sleeve: 61.5
          }
        },
        S: {
          name: 'S',
          measurements: {
            chest: 103,
            body: 68,
            sleeve: 64
          }
        },
        M: {
          name: 'M',
          measurements: {
            chest: 108,
            body: 72,
            sleeve: 65.5
          }
        },
        L: {
          name: 'L',
          measurements: {
            chest: 114,
            body: 74,
            sleeve: 67
          }
        },
        XL: {
          name: 'XL',
          measurements: {
            chest: 120,
            body: 76,
            sleeve: 68.5
          }
        },
        '2XL': {
          name: 'XXL',
          measurements: {
            chest: 126,
            body: 78,
            sleeve: 70
          }
        }
      }
    },

    'track-tops': {
      name: 'Size',
      options: {
        S: {
          name: 'S',
          measurements: {
            chest: {
              min: 85,
              max: 92
            },
            sleeve: 60,
            back: 64
          }
        },
        M: {
          name: 'M',
          measurements: {
            chest: {
              min: 92,
              max: 97
            },
            sleeve: 62,
            back: 66
          }
        },
        L: {
          name: 'L',
          measurements: {
            chest: {
              min: 98,
              max: 104
            },
            sleeve: 64,
            back: 70
          }
        },
        XL: {
          name: 'XL',
          measurements: {
            chest: {
              min: 104,
              max: 110
            },
            sleeve: 66,
            back: 74
          }
        },
        '2XL': {
          name: 'XXL',
          measurements: {
            chest: {
              min: 110,
              max: 118
            },
            sleeve: 69,
            back: 78
          }
        }
      }
    }
  },

  productCodes: {
    // male pro jersey
    'n50076-MS61': {
      name: 'Jersey S/S PRO 61 | Razor'
    },
    'n50076-MS62': {
      name: 'Jersey S/S PRO 62 | Razor',
      notes: 'small removable pocket'
    },
    'n51079-MS65': {
      name: 'Jersey S/S PRO 65 | Carbon Z1'
    },
    'n51079-MS66': {
      name: 'Jersey S/S PRO 66 | Carbon Z1',
      notes: 'small removable pocket'
    },
    'n50074-MS61': {
      name: 'Jersey S/S PRO 61 | VeranoUltra'
    },
    'n50074-MS62': {
      name: 'Jersey S/S PRO 62 | VeranoUltra',
      notes: 'small removable pocket'
    },

    // female pro jersey
    'n50076-LS61': {
      name: 'Jersey S/S PRO 61 | Razor'
    },
    'n50076-LS62': {
      name: 'Jersey S/S PRO 62 | Razor',
      notes: 'small removable pocket'
    },
    'n51079-LS65': {
      name: 'Jersey S/S PRO 65 | Carbon Z1'
    },
    'n51079-LS66': {
      name: 'Jersey S/S PRO 66 | Carbon Z1',
      notes: 'small removable pocket'
    },
    'n50074-LS61': {
      name: 'Jersey S/S PRO 61 | VeranoUltra'
    },
    'n50074-LS62': {
      name: 'Jersey S/S PRO 62 | VeranoUltra',
      notes: 'small removable pocket'
    },

    // male club jersey
    'n50078-MS50': {
      name: 'Jersey S/S ELITE 50 | Spinn'
    },
    'n50078-MS51': {
      name: 'Jersey S/S ELITE 51 | Spinn',
      notes: 'small removable pocket'
    },
    'n51072-MS53': {
      name: 'Jersey S/S ELITE 53 | Stripes'
    },
    'n51072-MS54': {
      name: 'Jersey S/S ELITE 54 | Stripes',
      notes: 'small removable pocket'
    },

    // female club jersey
    'n50078-LS50': {
      name: 'Jersey S/S ELITE 50 | Spinn'
    },
    'n50078-LS51': {
      name: 'Jersey S/S ELITE 51 | Spinn',
      notes: 'small removable pocket'
    },
    'n51072-LS53': {
      name: 'Jersey S/S ELITE 53 | Stripes'
    },
    'n51072-LS54': {
      name: 'Jersey S/S ELITE 54 | Stripes',
      notes: 'small removable pocket'
    },

    // kids club jersey
    'n50016-JS06': {
      name: 'Jersey S/S ACTIVE 06 | Devan',
      notes: 'long zipper'
    },
    'n50016-JS37': {
      name: 'Jersey S/S ACTIVE 37 | Devan',
      notes: 'short zipper'
    },

    // male pro long sleeve jersey
    'n50052-ML33': {
      name: 'Jersey L/S PRO 33 | TEMPS'
    },

    // female pro long sleeve jersey
    'n50052-LL33': {
      name: 'Jersey L/S PRO 33 | TEMPS'
    },

    // male club long sleeve jersey
    'n50057-ML40': {
      name: 'Jersey L/S ELITE 40 | ANDORRA'
    },

    // female club long sleeve jersey
    'n50057-LL40': {
      name: 'Jersey L/S ELITE 40 | ANDORRA'
    },

    // kids long sleeve jersey
    'n50055-JL06': {
      name: 'Jersey L/S ACTIVE 06 | FLANDERS'
    },

    // male club bibs
    'n60069-MA89': {
      name: 'Bib shorts ARCO-ELITE 89 | Lycra POWER',
      notes: 'Endurance 3D pad'
    },
    'n60069-MA49': {
      name: 'Bib shorts ARCO-ELITE 49 | Lycra POWER',
      notes: 'Zoom X pad'
    },
    'n60064-MA07': {
      name: 'Bib shorts ARCO-ELITE 07 | ROUBAIX',
      notes: 'Endurance 3D pad'
    },
    'n60064-MA24': {
      name: 'Bib shorts ARCO-ELITE 24 | ROUBAIX',
      notes: 'Zoom X pad'
    },

    // female club bibs
    'n60069-LA89': {
      name: 'Bib shorts ARCO-ELITE 89 | Lycra POWER',
      notes: 'Endurance 3D women pad'
    },
    'n60069-UA89': {
      name: 'Bib shorts ARCO-ELITE 89 | Lycra POWER',
      notes: 'Endurance 3D women pad, men´s cut'
    },
    'n60069-LA50': {
      name: 'Bib shorts ARCO-ELITE 50 | Lycra POWER',
      notes: 'Zoom X women pad'
    },
    'n60069-UA50': {
      name: 'Bib shorts ARCO-ELITE 50 | Lycra POWER',
      notes: 'Zoom X women pad, men´s cut'
    },
    'n60064-LA52': {
      name: 'Bib shorts ARCO-ELITE 52 | ROUBAIX',
      notes: 'Endurance 3D women pad'
    },
    'n60064-UA52': {
      name: 'Bib shorts ARCO-ELITE 52 | ROUBAIX',
      notes: 'Endurance 3D women pad, men´s cut'
    },
    'n60064-LA51': {
      name: 'Bib shorts ARCO-ELITE 51 | ROUBAIX',
      notes: 'Zoom X women pad'
    },
    'n60064-UA51': {
      name: 'Bib shorts ARCO-ELITE 51 | ROUBAIX',
      notes: 'Zoom X women pad, men´s cut'
    },

    // male pro bibs
    'n61065-MA13': {
      name: 'Bib shorts ARCO-PRO 13 | GOFFRATO',
      notes: 'Endurance 3D pad'
    },
    'n61065-MA12': {
      name: 'Bib shorts ARCO-PRO 12 | GOFFRATO',
      notes: 'Zoom X pad'
    },
    'n61066-MA13': {
      name: 'Bib shorts ARCO-PRO 13 | VeranoFlex X9',
      notes: 'Endurance 3D pad'
    },
    'n61066-MA12': {
      name: 'Bib shorts ARCO-PRO 12 | VeranoFlex X9',
      notes: 'Zoom X pad'
    },
    'n61064-MA13': {
      name: 'Bib shorts ARCO-PRO 13 | ROUBAIX',
      notes: 'Endurance 3D pad'
    },
    'n61064-MA12': {
      name: 'Bib shorts ARCO-PRO 12 | ROUBAIX',
      notes: 'Zoom X pad'
    },

    // female pro bibs
    'n61065-LA02': {
      name: 'Bib shorts ARCO-PRO 02 | GOFFRATO',
      notes: 'Endurance 3D women pad'
    },
    'n61065-UA02': {
      name: 'Bib shorts ARCO-PRO 02 | GOFFRATO',
      notes: 'Endurance 3D women pad, men´s cut'
    },
    'n61065-LA04': {
      name: 'Bib shorts ARCO-PRO 04 | GOFFRATO',
      notes: 'Zoom X women pad'
    },
    'n61065-UA04': {
      name: 'Bib shorts ARCO-PRO 04 | GOFFRATO',
      notes: 'Zoom X women pad, men´s cut'
    },
    'n61066-LA02': {
      name: 'Bib shorts ARCO-PRO 02 | VeranoFlex X9',
      notes: 'Endurance 3D women pad'
    },
    'n61066-UA02': {
      name: 'Bib shorts ARCO-PRO 02 | VeranoFlex X9',
      notes: 'Endurance 3D women pad, men´s cut'
    },
    'n61066-LA04': {
      name: 'Bib shorts ARCO-PRO 04 | VeranoFlex X9',
      notes: 'Zoom X women pad'
    },
    'n61066-UA04': {
      name: 'Bib shorts ARCO-PRO 04 | VeranoFlex X9',
      notes: 'Zoom X women pad, men´s cut'
    },
    'n61064-LA02': {
      name: 'Bib shorts ARCO-PRO 02 | ROUBAIX',
      notes: 'Endurance 3D women pad'
    },
    'n61064-UA02': {
      name: 'Bib shorts ARCO-PRO 02 | ROUBAIX',
      notes: 'Endurance 3D women pad, men´s cut'
    },
    'n61064-LA04': {
      name: 'Bib shorts ARCO-PRO 04 | ROUBAIX',
      notes: 'Zoom X women pad'
    },
    'n61064-UA04': {
      name: 'Bib shorts ARCO-PRO 04 | ROUBAIX',
      notes: 'Zoom X women pad, men´s cut'
    },

    // male 3/4 bibs
    'n60169-MA07': {
      name: '3/4 bib tights ARCO-ELITE 07 | Lycra POWER',
      notes: 'Endurance 3D pad'
    },
    'n60169-MA24': {
      name: '3/4 bib tights ARCO-ELITE 24 | Lycra POWER',
      notes: 'Zoom X pad'
    },
    'n60164-MA07': {
      name: '3/4 bib tights ARCO-ELITE 07 | ROUBAIX',
      notes: 'Endurance 3D pad'
    },
    'n60164-MA24': {
      name: '3/4 bib tights ARCO-ELITE 24 | ROUBAIX',
      notes: 'Zoom X pad'
    },

    // female 3/4 bibs
    'n60169-LA52': {
      name: '3/4 bib tights ARCO-ELITE 52 | Lycra POWER',
      notes: 'Endurance 3D women pad'
    },
    'n60169-LA51': {
      name: '3/4 bib tights ARCO-ELITE 51 | Lycra POWER',
      notes: 'Zoom X women pad'
    },
    'n60164-LA52': {
      name: '3/4 bib tights ARCO-ELITE 52 | ROUBAIX',
      notes: 'Endurance 3D women pad'
    },
    'n60164-LA51': {
      name: '3/4 bib tights ARCO-ELITE 51 | ROUBAIX',
      notes: 'Zoom X women pad'
    },

    // male bib tights
    'n60266-MA25': {
      name: 'Bib tights ARCO-ELITE 25 | ROUBAIX',
      notes: 'Endurance 3D pad'
    },
    'n60266-MA48': {
      name: 'Bib tights ARCO-ELITE 48 | ROUBAIX',
      notes: 'Zoom X pad'
    },
    'n60266-MA90': {
      name: 'Bib tights ARCO-ELITE 90 | ROUBAIX',
      notes: 'No pad'
    },

    // female bib tights
    'n60266-LA88': {
      name: 'Bib tights ARCO-ELITE 88 | ROUBAIX',
      notes: 'Endurance 3D women pad'
    },
    'n60266-LA53': {
      name: 'Bib tights ARCO-ELITE 53 | ROUBAIX',
      notes: 'Zoom X women pad'
    },
    'n60266-LA90': {
      name: 'Bib tights ARCO-ELITE 90 | ROUBAIX',
      notes: 'No pad'
    },

    // male lightweight gilet
    'n50113-MN19': {
      name: 'Gilet ELITE 19 | MicroFibre/net'
    },

    // female lightweight gilet
    'n50113-LN19': {
      name: 'Gilet ELITE 19 | MicroFibre/net'
    },

    // male club gilet
    'n50126-MN03': {
      name: 'Gilet ELITE 03 | W&W Mission Flow',
      notes: '3 back pockets, mesh back'
    },
    'n50128-MN05': {
      name: 'Gilet ELITE 05 | W&W Mission Flow',
      notes: '3 back pockets, membrane back'
    },

    // female club gilet
    'n50126-LN03': {
      name: 'Gilet ELITE 03 | W&W Mission Flow',
      notes: '3 back pockets, mesh back'
    },
    'n50128-LN05': {
      name: 'Gilet ELITE 05 | W&W Mission Flow',
      notes: '3 back pockets, membrane back'
    },

    // male pro gilet
    'n50111-MN01': {
      name: 'Gilet PRO 01 | W&W STRATOS',
      notes: 'mesh back'
    },
    'n50118-MN20': {
      name: 'Gilet PRO 20 | W&W STRATOS',
      notes: 'membrane back'
    },

    // female pro gilet
    'n50111-LN01': {
      name: 'Gilet PRO 01 | W&W STRATOS',
      notes: 'mesh back'
    },
    'n50118-LN20': {
      name: 'Gilet PRO 20 | W&W STRATOS ',
      notes: 'membrane back'
    },

    // male rain jacket
    'n50219-ML09': {
      name: 'Jacket PRO 09 | W&W eVent '
    },

    // female rain jacket
    'n50219-LL09': {
      name: 'Jacket PRO 09 | W&W eVent'
    },

    // male winter jacket
    'n50248-ML06': {
      name: 'Jacket ELITE 06 | W&W Mission Flow'
    },

    // female winter jacket
    'n50248-LL06': {
      name: 'Jacket ELITE 06 | W&W Mission Flow'
    },

    // male pit jacket
    'n80134-ML14': {
      name: 'Jacket TRACK 14 | W&W Bell'
    },

    // female pit jacket
    'n80134-LL14': {
      name: 'Jacket TRACK 14 | W&W Bell'
    },

    // pit tights
    'n70271-UP18': {
      name: 'Pants START-FINISH 18 | ROUBAIX'
    },

    // arm warmers
    'n70012-UF04': {
      name: 'ARM warmers ACTIVE 04 | ROUBAIX'
    },
    'n70011-UF04': {
      name: 'ARM warmers ACTIVE 04 | LYCRA'
    },

    // neck warmer
    'n70161-UF01': {
      name: 'Scarf TUBE 01 | TUBE'
    },

    // male club skinsuit
    'n56018-MA03': {
      name: 'Skinsuit S/S ELITE-A 03 | Lycra POWER',
      notes: 'Endurance 3D pad'
    },
    'n56018-MA38': {
      name: 'Skinsuit S/S ELITE-A 38 | Lycra POWER',
      notes: 'Zoom X pad'
    },
    'n56018-MA02': {
      name: 'Skinsuit S/S ELITE-A 02 | Lycra POWER',
      notes: 'Endurance 3D pad, one small back pocket'
    },
    'n56018-MA37': {
      name: 'Skinsuit S/S ELITE-A 37 | Lycra POWER',
      notes: 'Zoom X pad, one small back pocket'
    },
    'n56028-MA03': {
      name: 'Skinsuit L/S ELITE-A 03 | Lycra POWER ',
      notes: 'Endurance 3D pad'
    },
    'n56028-MA38': {
      name: 'Skinsuit L/S ELITE-A 38 | Lycra POWER',
      notes: 'Zoom X pad'
    },
    'n56028-MA02': {
      name: 'Skinsuit L/S ELITE-A 02 | Lycra POWER',
      notes: 'Endurance 3D pad, one small back pocket'
    },
    'n56028-MA37': {
      name: 'Skinsuit L/S ELITE-A 37 | Lycra POWER',
      notes: 'Zoom X pad, one small back pocket'
    },
    'n56016-MA03': {
      name: 'Skinsuit S/S ELITE-A 03 | REVOLUTIONAL',
      notes: 'Endurance 3D pad'
    },
    'n56016-MA38': {
      name: 'Skinsuit S/S ELITE-A 38 | REVOLUTIONAL',
      notes: 'Zoom X pad'
    },
    'n56016-MA02': {
      name: 'Skinsuit S/S ELITE-A 02 | REVOLUTIONAL',
      notes: 'Endurance 3D pad, one small back pocket'
    },
    'n56016-MA37': {
      name: 'Skinsuit S/S ELITE-A 37 | REVOLUTIONAL',
      notes: 'Zoom X pad, one small back pocket'
    },
    'n56026-MA03': {
      name: 'Skinsuit S/S ELITE-A 03 | REVOLUTIONAL',
      notes: 'Endurance 3D pad'
    },
    'n56026-MA38': {
      name: 'Skinsuit L/S ELITE-A 38 | REVOLUTIONAL',
      notes: 'Zoom x pad'
    },
    'n56026-MA02': {
      name: 'Skinsuit L/S ELITE-A 02 | REVOLUTIONAL',
      notes: 'Endurance 3D pad, one small back pocket'
    },
    'n56026-MA37': {
      name: 'Skinsuit L/S ELITE-A 37 | REVOLUTIONAL',
      notes: 'Zoom X pad, one small back pocket'
    },

    // female club skinsuit
    'n56018-UA35': {
      name: 'Skinsuit S/S ELITE-A 35 | Lycra POWER',
      notes: 'Endurance 3D women pad'
    },
    'n56018-UA34': {
      name: 'Skinsuit S/S ELITE-A 34 | Lycra POWER',
      notes: 'Zoom X women pad'
    },
    'n56018-UA33': {
      name: 'Skinsuit S/S ELITE-A 33 | Lycra POWER',
      notes: 'Endurance 3D women pad, one small back pocket'
    },
    'n56018-UA32': {
      name: 'Skinsuit S/S ELITE-A 32 | Lycra POWER',
      notes: 'Zoom X women pad, one small back pocket'
    },
    'n56028-UA35': {
      name: 'Skinsuit L/S ELITE-A 35 | Lycra POWER',
      notes: 'Endurance 3D women pad'
    },
    'n56028-UA34': {
      name: 'Skinsuit L/S ELITE-A 34 | Lycra POWER',
      notes: 'Zoom X women pad'
    },
    'n56028-UA33': {
      name: 'Skinsuit L/S ELITE-A 33 | Lycra POWER',
      notes: 'Endurance 3D women pad, one small back pocket'
    },
    'n56028-UA32': {
      name: 'Skinsuit L/S ELITE-A 32 | Lycra POWER',
      notes: 'Zoom X women pad, one small back pocket'
    },
    'n56016-UA35': {
      name: 'Skinsuit S/S ELITE-A 35 | REVOLUTIONAL',
      notes: 'Endurance 3D women pad'
    },
    'n56016-UA34': {
      name: 'Skinsuit S/S ELITE-A 34 | REVOLUTIONAL',
      notes: 'Zoom X women pad'
    },
    'n56016-UA33': {
      name: 'Skinsuit S/S ELITE-A 33 | REVOLUTIONAL',
      notes: 'Endurance 3D women pad, one small back pocket'
    },
    'n56016-UA32': {
      name: 'Skinsuit S/S ELITE-A 32 | REVOLUTIONAL',
      notes: 'Zoom X women pad, one small back pocket'
    },
    'n56026-UA35': {
      name: 'Skinsuit L/S ELITE-A 35 | REVOLUTIONAL',
      notes: 'Endurance 3D women pad'
    },
    'n56026-UA34': {
      name: 'Skinsuit L/S ELITE-A 34 | REVOLUTIONAL',
      notes: 'Zoom X women pad'
    },
    'n56026-UA33': {
      name: 'Skinsuit L/S ELITE-A 33 | REVOLUTIONAL',
      notes: 'Endurance 3D women pad, one small back pocket'
    },
    'n56026-UA32': {
      name: 'Skinsuit L/S ELITE-A 32 | REVOLUTIONAL',
      notes: 'Zoom X women pad, one small back pocket'
    },

    // male road skinsuit
    'n56069-MA09': {
      name: 'Skinsuit S/S PRO-A 09 | Brios/SPEED',
      notes: 'Endurance 3D pad, front opening, 3 back pockets'
    },
    'n56069-MA20': {
      name: 'Skinsuit S/S PRO-A 20 | Brios/SPEED',
      notes: 'Zoom X pad front opening, 3 back pockets'
    },
    'n56069-MA18': {
      name: 'Skinsuit S/S PRO-A 18 | Brios/SPEED',
      notes: 'Endurance 3D pad, front opening, one small back pocket'
    },
    'n56069-MA21': {
      name: 'Skinsuit S/S PRO-A 21 | Brios/SPEED',
      notes: 'Zoom X pad front opening, one small back pocket'
    },
    'n56063-MA09': {
      name: 'Summer skinsuit S/S PRO-A 09 | VeranoFlex',
      notes: 'Endurance 3D pad, front opening, 3 back pockets'
    },
    'n56063-MA20': {
      name: 'Summer skinsuit S/S PRO-A 20 | VeranoFlex',
      notes: 'Zoom X pad, front opening, 3 back pockets'
    },

    // female road skinsuit
    'n56069-UA29': {
      name: 'Skinsuit S/S PRO-A 29 | Brios/SPEED',
      notes: 'Endurance 3D women pad, front opening, 3 back pockets'
    },
    'n56069-UA28': {
      name: 'Skinsuit S/S PRO-A 28 | Brios/SPEED',
      notes: 'Zoom X women pad, front opening, 3 back pockets'
    },
    'n56069-UA31': {
      name: 'Skinsuit S/S PRO-A 31 | Brios/SPEED',
      notes: 'Endurance 3D women pad, front opening, one small back pocket'
    },
    'n56069-UA30': {
      name: 'Skinsuit S/S PRO-A 30 | Brios/SPEED',
      notes: 'Zoom X women, front opening, one small back pocket'
    },
    'n56063-UA29': {
      name: 'Summer skinsuit S/S PRO-A 29 | VeranoFlex',
      notes: 'Endurance 3D women pad, front opening, 3 back pockets'
    },
    'n56063-UA28': {
      name: 'Summer skinsuit S/S PRO-A 28 | VeranoFlex',
      notes: 'Zoom X women pad, front opening, 3 back pockets'
    },

    // male track skinsuit
    'n50542-UT14': {
      name: 'Skinsuit L/S SONIC 14 | ENDURANCE',
      notes: 'Sonic 3D pad, one number pocket'
    },
    'n50542-UT24': {
      name: 'Skinsuit L/S SONIC 24 | ENDURANCE',
      notes: 'Sonic 3D pad, two number pocket'
    },
    'n50542-UT18': {
      name: 'Skinsuit L/S SONIC 18 | ENDURANCE',
      notes: 'Sonic 3D pad, one number pocket + radio pocket'
    },

    // female track skinsuit
    'n50542-UT15': {
      name: 'Skinsuit L/S SONIC 15 | ENDURANCE',
      notes: 'Sonic 3D women pad, one number pocket'
    },
    'n50542-UT25': {
      name: 'Skinsuit L/S SONIC 25 | ENDURANCE',
      notes: 'Sonic 3D women pad, two number pocket'
    },
    'n50542-UT19': {
      name: 'Skinsuit L/S SONIC 19 | ENDURANCE',
      notes: 'Sonic 3D women pad, one number pocket + radio pocket'
    }
  },

  productPrices: {
    'pro-jersey-2022': {
      'M-RAZ-N': 'n50076-MS61',
      'M-RAZ-Y': 'n50076-MS62',
      'M-CAR-N': 'n51079-MS65',
      'M-CAR-Y': 'n51079-MS66',
      'M-VER-N': 'n50074-MS61',
      'M-VER-Y': 'n50074-MS62',

      'F-RAZ-N': 'n50076-LS61',
      'F-RAZ-Y': 'n50076-LS62',
      'F-CAR-N': 'n51079-LS65',
      'F-CAR-Y': 'n51079-LS66',
      'F-VER-N': 'n50074-LS61',
      'F-VER-Y': 'n50074-LS62'
    },

    'club-jersey-2022': {
      'M-SPI-N': 'n50078-MS50',
      'M-SPI-Y': 'n50078-MS51',
      'M-STR-N': 'n51072-MS53',
      'M-STR-Y': 'n51072-MS54',
      'F-SPI-N': 'n50078-LS50',
      'F-SPI-Y': 'n50078-LS51',
      'F-STR-N': 'n51072-LS53',
      'F-STR-Y': 'n51072-LS54'
    },

    'youth-jersey-2022': {
      S: 'n50016-JS37',
      L: 'n50016-JS06'
    },

    'winter-pro-jersey-2022': {
      M: 'n50052-ML33',
      F: 'n50052-LL33'
    },

    'winter-club-jersey-2022': {
      M: 'n50057-ML40',
      F: 'n50057-LL40'
    },

    'winter-youth-jersey-2022': 'n50055-JL06',

    'club-bib-shorts-2022': {
      'M-MR-LP': 'n60069-MA49',
      'M-ME-LP': 'n60069-MA89',
      'M-MR-ROU': 'n60064-MA24',
      'M-ME-ROU': 'n60064-MA07',
      'M-FR-LP': 'n60069-UA50',
      'M-FE-LP': 'n60069-UA89',
      'M-FR-ROU': 'n60064-UA51',
      'M-FE-ROU': 'n60064-UA52',
      'F-FR-LP': 'n60069-LA50',
      'F-FE-LP': 'n60069-LA89',
      'F-FR-ROU': 'n60064-LA51',
      'F-FE-ROU': 'n60064-LA52'
    },

    'pro-bib-shorts-2022': {
      'M-MR-GOF': 'n61065-MA12',
      'M-ME-GOF': 'n61065-MA13',
      'M-MR-VER': 'n61066-MA12',
      'M-ME-VER': 'n61066-MA13',
      'M-MR-ROU': 'n61064-MA12',
      'M-ME-ROU': 'n61064-MA13',
      'M-FR-GOF': 'n61065-UA04',
      'M-FE-GOF': 'n61065-UA02',
      'M-FR-VER': 'n61066-UA04',
      'M-FE-VER': 'n61066-UA02',
      'M-FR-ROU': 'n61064-UA04',
      'M-FE-ROU': 'n61064-UA02',
      'F-FR-GOF': 'n61065-LA04',
      'F-FE-GOF': 'n61065-LA02',
      'F-FR-VER': 'n61066-LA04',
      'F-FE-VER': 'n61066-LA02',
      'F-FR-ROU': 'n61064-LA04',
      'F-FE-ROU': 'n61064-LA02'
    },

    'club-3-4-bib-shorts-2022': {
      'M-MR-LP': 'n60169-MA24',
      'M-ME-LP': 'n60169-MA07',
      'M-MR-ROU': 'n60164-MA24',
      'M-ME-ROU': 'n60164-MA07',
      'F-FR-LP': 'n60169-LA51',
      'F-FE-LP': 'n60169-LA52',
      'F-FR-ROU': 'n60164-LA51',
      'F-FE-ROU': 'n60164-LA52'
    },

    'club-bib-tights-2022': {
      'M-NP': 'n60266-MA90',
      'M-MR': 'n60266-MA48',
      'M-ME': 'n60266-MA25',
      'F-NP': 'n60266-LA90',
      'F-FR': 'n60266-LA53',
      'F-FE': 'n60266-LA88'
    },

    'lightweight-gilet-2022': {
      M: 'n50113-MN19',
      F: 'n50113-LN19'
    },

    'club-gilet-2022': {
      'M-ME': 'n50126-MN03',
      'M-MB': 'n50128-MN05',
      'F-ME': 'n50126-LN03',
      'F-MB': 'n50128-LN05'
    },

    'pro-gilet-2022': {
      'M-ME': 'n50111-MN01',
      'M-MB': 'n50118-MN20',
      'F-ME': 'n50111-LN01',
      'F-MB': 'n50118-LN20'
    },

    'rain-jacket-2022': {
      M: 'n50219-ML09',
      F: 'n50219-LL09'
    },

    'winter-jacket-2022': {
      M: 'n50248-ML06',
      F: 'n50248-LL06'
    },

    'pit-jacket-2022': {
      M: 'n80134-ML14',
      F: 'n80134-LL14'
    },

    'pit-tights-2022': {
      M: 'n70271-UP18',
      F: 'n70271-UP18'
    },

    'club-skin-suit-2022': {
      'M-ME-LP-S-P0': 'n56018-MA03',
      'M-MR-LP-S-P0': 'n56018-MA38',
      'M-ME-LP-S-P1': 'n56018-MA02',
      'M-MR-LP-S-P1': 'n56018-MA37',
      'M-ME-LP-L-P0': 'n56028-MA03',
      'M-MR-LP-L-P0': 'n56028-MA38',
      'M-ME-LP-L-P1': 'n56028-MA02',
      'M-MR-LP-L-P1': 'n56028-MA37',
      'M-ME-REV-S-P0': 'n56016-MA03',
      'M-MR-REV-S-P0': 'n56016-MA38',
      'M-ME-REV-S-P1': 'n56016-MA02',
      'M-MR-REV-S-P1': 'n56016-MA37',
      'M-ME-REV-L-P0': 'n56026-MA03',
      'M-MR-REV-L-P0': 'n56026-MA38',
      'M-ME-REV-L-P1': 'n56026-MA02',
      'M-MR-REV-L-P1': 'n56026-MA37',
      'F-FE-LP-S-P0': 'n56018-UA35',
      'F-FR-LP-S-P0': 'n56018-UA34',
      'F-FE-LP-S-P1': 'n56018-UA33',
      'F-FR-LP-S-P1': 'n56018-UA32',
      'F-FE-LP-L-P0': 'n56028-UA35',
      'F-FR-LP-L-P0': 'n56028-UA34',
      'F-FE-LP-L-P1': 'n56028-UA33',
      'F-FR-LP-L-P1': 'n56028-UA32',
      'F-FE-REV-S-P0': 'n56016-UA35',
      'F-FR-REV-S-P0': 'n56016-UA34',
      'F-FE-REV-S-P1': 'n56016-UA33',
      'F-FR-REV-S-P1': 'n56016-UA32',
      'F-FE-REV-L-P0': 'n56026-UA35',
      'F-FR-REV-L-P0': 'n56026-UA34',
      'F-FE-REV-L-P1': 'n56026-UA33',
      'F-FR-REV-L-P1': 'n56026-UA32'
    },

    'road-skin-suit-2022': {
      'M-ME-BRI': 'n56069-MA09',
      'M-MR-BRI': 'n56069-MA20',
      'M-ME-VER': 'n56063-MA09',
      'M-MR-VER': 'n56063-MA20',
      'F-FE-BRI': 'n56069-UA29',
      'F-FR-BRI': 'n56069-UA28',
      'F-FE-VER': 'n56063-UA29',
      'F-FR-VER': 'n56063-UA28'
    },

    'track-skin-suit-2022': {
      'M-N1': 'n50542-UT14',
      'M-N2': 'n50542-UT24',
      'M-NR': 'n50542-UT18',
      'F-N1': 'n50542-UT15',
      'F-N2': 'n50542-UT25',
      'F-NR': 'n50542-UT19'
    },

    'summer-sleeves-2022': 'n70011-UF04',
    'winter-arm-warmers-2022': 'n70012-UF04',
    'neck-warmer-2022': 'n70161-UF01',

    // premade items
    'black-cap-2019': 'black-cap-2019',
    'white-cap-2019': 'white-cap-2019',
    'black-socks-2019': 'black-socks-2019',
    'white-socks-2019': 'white-socks-2019',
    'bidon-2019': 'bidon-2019',
    'musette-2019': 'musette-2019',
    'track-top-2023': 'track-top-2023',
    'bar-bag-2022': 'bar-bag-2022',

    // dropship items
    'bday-t-shirt-2021': {
      BLK: 'bday-t-shirt-2021',
      WHI: 'bday-t-shirt-2021'
    },
    'ls-t-shirt-2021': {
      BLK: 'ls-t-shirt-2021',
      WHI: 'ls-t-shirt-2021'
    },
    't-shirt-2021': {
      BLK: 't-shirt-2021',
      WHI: 't-shirt-2021'
    },
    'zip-hoodie-2021': {
      BLK: 'zip-hoodie-2021'
    },
    'hoodie-2021': {
      BLK: 'hoodie-2021'
    }
  }
}

const config = {
  aws: {
    ses: {
      region: 'eu-west-1',
      version: '2010-12-01'
    },
    dynamodb: {
      region: 'eu-west-2'
    },
    lambda: {
      region: 'eu-west-2'
    }
  },
  lambda: {
    sendPayment: '/lambda/send-payment',
    sendContactFormEmail: '/lambda/send-contact-form-email',
    rideRoulettePreferencesSet: '/lambda/ride-roulette-preferences-set',
    rideRouletteRidesGet: '/lambda/ride-roulette-rides-get',
    accountTokenGenerate: '/lambda/account-token-create',
    accountTokenExchange: '/lambda/account-token-exchange',
    accountTokenInvalidate: '/lambda/account-token-invalidate',
    accountUserGet: '/lambda/account-user-get',
    accountUserUpdate: '/lambda/account-user-update',
    shopProductsGet: '/lambda/shop-products-get',
    shopOrdersCreate: '/lambda/shop-orders-create',
    shopOrdersGet: '/lambda/shop-orders-get',
    shopOrdersItemsGet: '/lambda/shop-orders-items-get',
    fopccJoin: '/lambda/fopcc-join',
    fopccLeave: '/lambda/fopcc-leave',
    membersGet: '/lambda/members-get',
    kitOrdersGet: '/lambda/kit-orders-get',
    kitOrdersUpdate: '/lambda/kit-orders-update',
    rrcOrdersGet: '/lambda/rrc-orders-get'
  },
  flags: {
    shop: true,
    email: true,
    payments: true
  },
  email: {
    to: 'peckhamcc@gmail.com',
    from: 'peckhamcc@gmail.com'
  },
  square: {
    environment: 'sandbox',
    accessToken: 'EAAAEDclhYJquUZNfyBK8G6x1acrazt7EzUNRf5AHAIOJGeOxe1_WFB26ZTW3-DP',
    applicationId: 'sandbox-sq0idb-J3q1SN1H7--5mkRr16_yPg',
    locationId: 'LR4HXJWWC8747'
  },
  stripe: {
    publishableKey: 'pk_test_rmrtd0D68Bhyua67OuSctFir',
    secretKey: 'sk_test_DhQgzX3EJlaiDQPhbsju94dc',
    checkoutSuccess: 'http://localhost:9000/checkout/success',
    checkoutCancel: 'http://localhost:9000/basket',
    webhookSecret: 'whsec_V85VMT9TqY03irWzudQjqfagPD7iC6f4',
    fopccSuccess: 'http://localhost:9000/profile/fopcc',
    fopccCancel: 'http://localhost:9000/profile/fopcc',
    fopccId: 'price_1I2XUx2cnIK2AWWQ8Y5xgq4I',
    shipping: [
      'price_1JD96L2cnIK2AWWQpPRZ1rUE', // £3.90 Royal Mail 24 Tracked
      'price_1JD9512cnIK2AWWQQQ1eNiv8' // £5.75 Amazon Next Day
    ]
  },
  contentful: {
    accessToken: '9BIPHbYi-pk3yqZJlaJMgp8iVaTJY1Pj2pVIE-uc61A',
    space: '6dcasuqyhf2a'
  },
  inkthreadable: {
    appId: 'inkthreadable-1234',
    secretKey: 'wow-such-secret-shhhh'
  },
  kit: {
    name: 'Supplier Name',
    email: 'supplier-email@example.com'
  }
}

if (process.env.NODE_ENV !== 'development') {
  config.lambda.sendPayment = 'https://api.peckham.cc/send-payment'
  config.lambda.sendContactFormEmail = 'https://api.peckham.cc/contact'
  config.lambda.rideRoulettePreferencesSet = 'https://api.peckham.cc/ride-roulette/preferences'
  config.lambda.rideRouletteRidesGet = 'https://api.peckham.cc/ride-roulette/rides'
  config.lambda.accountTokenGenerate = 'https://api.peckham.cc/token'
  config.lambda.accountTokenExchange = 'https://api.peckham.cc/token'
  config.lambda.accountTokenInvalidate = 'https://api.peckham.cc/token'
  config.lambda.accountUserGet = 'https://api.peckham.cc/user'
  config.lambda.accountUserUpdate = 'https://api.peckham.cc/user'
  config.lambda.shopProductsGet = 'https://api.peckham.cc/shop/products'
  config.lambda.shopOrdersCreate = 'https://api.peckham.cc/user/orders'
  config.lambda.shopOrdersGet = 'https://api.peckham.cc/user/orders'
  config.lambda.shopOrdersItemsGet = 'https://api.peckham.cc/user/orders'
  config.lambda.fopccJoin = 'https://api.peckham.cc/fopcc'
  config.lambda.fopccLeave = 'https://api.peckham.cc/fopcc'

  config.lambda.membersGet = 'https://api.peckham.cc/members'
  config.lambda.kitOrdersGet = 'https://api.peckham.cc/kit/orders'
  config.lambda.kitOrdersUpdate = 'https://api.peckham.cc/kit/orders'
  config.lambda.rrcOrdersGet = 'https://api.peckham.cc/rrc/orders'

  config.stripe.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY
  config.stripe.secretKey = process.env.STRIPE_SECRET_KEY
  config.stripe.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  config.stripe.fopccId = process.env.STRIPE_FOPCC_ID
  config.stripe.checkoutSuccess = 'https://peckham.cc/checkout/success'
  config.stripe.checkoutCancel = 'https://peckham.cc/basket'
  config.stripe.fopccSuccess = 'https://peckham.cc/profile/fopcc'
  config.stripe.fopccCancel = 'https://peckham.cc/profile/fopcc'
  config.stripe.shipping = [
    process.env.STRIPE_SHIPPING_0, // £3.90 Royal Mail 24 Tracked
    process.env.STRIPE_SHIPPING_1 // £5.75 Amazon Next Day
  ]

  config.contentful.accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
  config.contentful.space = process.env.CONTENTFUL_SPACE

  config.inkthreadable.appId = process.env.INKTHREADABLE_APP_ID
  config.inkthreadable.secretKey = process.env.INKTHREADABLE_SECRET_KEY

  config.kit.name = process.env.KIT_SUPPLIER_NAME
  config.kit.email = process.env.KIT_SUPPLIER_EMAIL
}

module.exports = {
  config,
  OPTIONS
}
