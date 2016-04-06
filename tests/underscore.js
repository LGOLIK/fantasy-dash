'use strict';

const _ = require('underscore');

// let dataset = _.map(_.range(10), function(i) {
//   return Math.random() * 50;
// })
//
// console.log(dataset);

let dataset =
[
  {
    year: 2015,
    pick: 5,
    round: 1,
    fan_team_id: 1,
    player_id: 4,
    player_name: "Jamaal Charles",
    position: "RB",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 16,
    round: 2,
    fan_team_id: 1,
    player_id: 18,
    player_name: "A.J. Green",
    position: "WR",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 25,
    round: 3,
    fan_team_id: 1,
    player_id: 29,
    player_name: "Lamar Miller",
    position: "RB",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 36,
    round: 4,
    fan_team_id: 1,
    player_id: 21,
    player_name: "Alshon Jeffery",
    position: "WR",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 45,
    round: 5,
    fan_team_id: 1,
    player_id: 51,
    player_name: "Andre Ellington",
    position: "RB",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 56,
    round: 6,
    fan_team_id: 1,
    player_id: 59,
    player_name: "Brandon Marshall",
    position: "WR",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 65,
    round: 7,
    fan_team_id: 1,
    player_id: 55,
    player_name: "Chris Ivory",
    position: "RB",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 76,
    round: 8,
    fan_team_id: 1,
    player_id: 250,
    player_name: "Tyler Eifert",
    position: "TE",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 85,
    round: 9,
    fan_team_id: 1,
    player_id: 54,
    player_name: "Arian Foster",
    position: "RB",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 96,
    round: 10,
    fan_team_id: 1,
    player_id: 120,
    player_name: "Ryan Tannehill",
    position: "QB",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 105,
    round: 11,
    fan_team_id: 1,
    player_id: 135,
    player_name: "Sam Bradford",
    position: "QB",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 116,
    round: 12,
    fan_team_id: 1,
    player_id: 74,
    player_name: "Charles Johnson",
    position: "WR",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 125,
    round: 13,
    fan_team_id: 1,
    player_id: 93,
    player_name: "Danny Woodhead",
    position: "RB",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 136,
    round: 14,
    fan_team_id: 1,
    player_id: 147,
    player_name: "Arizona Cardinals",
    position: "DST",
    team_name: "Morning Woodhead",
    manager: "LG"
  },
  {
    year: 2015,
    pick: 145,
    round: 15,
    fan_team_id: 1,
    player_id: 154,
    player_name: "Justin Tucker",
    position: "K",
    team_name: "Morning Woodhead",
    manager: "LG"
  }
];

let positions = _.uniq(_.map(dataset, function(value) {
  return value.position
}))


console.log(positions);
