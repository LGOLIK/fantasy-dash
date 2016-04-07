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
round: 1,
position: "WR",
position_count: "2",
team_names: [
"I BILL-IEVE!!!",
"Go Big or Go Shoppin"
],
players: [
"Antonio Brown",
"Dez Bryant"
],
team_ids: [
3,
8
]
},
{
round: 1,
position: "TE",
position_count: "1",
team_names: [
"Brady-haters"
],
players: [
"Rob Gronkowski"
],
team_ids: [
7
]
},
{
round: 1,
position: "RB",
position_count: "7",
team_names: [
"JT",
"Griv Em Hell",
"D Marcquali Rod-Qez@",
"Morning Woodhead",
"Demaryius Targaryen",
"Freight Train",
"Max ArtO"
],
players: [
"Le Veon Bell",
"Adrian Peterson",
"Eddie Lacy",
"Jamaal Charles",
"Marshawn Lynch",
"C.J. Anderson",
"DeMarco Murray"
],
team_ids: [
4,
6,
5,
1,
9,
10,
2
]
},
{
round: 2,
position: "RB",
position_count: "4",
team_names: [
"Go Big or Go Shoppin",
"D Marcquali Rod-Qez@",
"Griv Em Hell",
"Demaryius Targaryen"
],
players: [
"Matt Forte",
"LeSean McCoy",
"Jeremy Hill",
"Frank Gore"
],
team_ids: [
8,
5,
6,
9
]
},
{
round: 2,
position: "WR",
position_count: "5",
team_names: [
"Freight Train",
"Brady-haters",
"Max ArtO",
"I BILL-IEVE!!!",
"Morning Woodhead"
],
players: [
"Demaryius Thomas",
"Odell Beckham Jr.",
"Julio Jones",
"Calvin Johnson",
"A.J. Green"
],
team_ids: [
10,
7,
2,
3,
1
]
},
{
round: 2,
position: "QB",
position_count: "1",
team_names: [
"JT"
],
players: [
"Andrew Luck"
],
team_ids: [
4
]
},
{
round: 3,
position: "QB",
position_count: "2",
team_names: [
"Demaryius Targaryen",
"Go Big or Go Shoppin"
],
players: [
"Aaron Rodgers",
"Russell Wilson"
],
team_ids: [
9,
8
]
},
{
round: 3,
position: "TE",
position_count: "1",
team_names: [
"JT"
],
players: [
"Jimmy Graham"
],
team_ids: [
4
]
},
{
round: 3,
position: "RB",
position_count: "4",
team_names: [
"I BILL-IEVE!!!",
"Morning Woodhead",
"Freight Train",
"Griv Em Hell"
],
players: [
"Mark Ingram",
"Lamar Miller",
"Carlos Hyde",
"Justin Forsett"
],
team_ids: [
3,
1,
10,
6
]
},
{
round: 3,
position: "WR",
position_count: "3",
team_names: [
"D Marcquali Rod-Qez@",
"Max ArtO",
"Brady-haters"
],
players: [
"Randall Cobb",
"Jordan Matthews",
"Jeremy Maclin"
],
team_ids: [
5,
2,
7
]
},
{
round: 4,
position: "WR",
position_count: "8",
team_names: [
"Morning Woodhead",
"Freight Train",
"Griv Em Hell",
"JT",
"Go Big or Go Shoppin",
"Max ArtO",
"Demaryius Targaryen",
"D Marcquali Rod-Qez@"
],
players: [
"Alshon Jeffery",
"T.Y. Hilton",
"Mike Evans",
"Emmanuel Sanders",
"DeAndre Hopkins",
"Brandin Cooks",
"Davante Adams",
"Andre Johnson"
],
team_ids: [
1,
10,
6,
4,
8,
2,
9,
5
]
},
{
round: 4,
position: "QB",
position_count: "1",
team_names: [
"I BILL-IEVE!!!"
],
players: [
"Peyton Manning"
],
team_ids: [
3
]
},
{
round: 4,
position: "RB",
position_count: "1",
team_names: [
"Brady-haters"
],
players: [
"Latavius Murray"
],
team_ids: [
7
]
},
{
round: 5,
position: "WR",
position_count: "1",
team_names: [
"Demaryius Targaryen"
],
players: [
"Jermaine Kearse"
],
team_ids: [
9
]
},
{
round: 5,
position: "QB",
position_count: "3",
team_names: [
"D Marcquali Rod-Qez@",
"Freight Train",
"Griv Em Hell"
],
players: [
"Drew Brees",
"Tom Brady",
"Ben Roethlisberger"
],
team_ids: [
5,
10,
6
]
},
{
round: 5,
position: "RB",
position_count: "6",
team_names: [
"JT",
"I BILL-IEVE!!!",
"Max ArtO",
"Morning Woodhead",
"Go Big or Go Shoppin",
"Brady-haters"
],
players: [
"Alfred Morris",
"Melvin Gordon",
"Jonathan Stewart",
"Andre Ellington",
"Joseph Randle",
"Ronnie Hillman"
],
team_ids: [
4,
3,
2,
1,
8,
7
]
},
{
round: 6,
position: "WR",
position_count: "5",
team_names: [
"JT",
"Griv Em Hell",
"D Marcquali Rod-Qez@",
"Morning Woodhead",
"Brady-haters"
],
players: [
"Julian Edelman",
"DeSean Jackson",
"Golden Tate",
"Brandon Marshall",
"Kelvin Benjamin"
],
team_ids: [
4,
6,
5,
1,
7
]
},
{
round: 6,
position: "RB",
position_count: "1",
team_names: [
"Go Big or Go Shoppin"
],
players: [
"Ameer Abdullah"
],
team_ids: [
8
]
},
{
round: 6,
position: "TE",
position_count: "4",
team_names: [
"Max ArtO",
"Freight Train",
"Demaryius Targaryen",
"I BILL-IEVE!!!"
],
players: [
"Greg Olsen",
"Travis Kelce",
"Jason Witten",
"Delanie Walker"
],
team_ids: [
2,
10,
9,
3
]
},
{
round: 7,
position: "TE",
position_count: "1",
team_names: [
"Griv Em Hell"
],
players: [
"Martellus Bennett"
],
team_ids: [
6
]
},
{
round: 7,
position: "WR",
position_count: "6",
team_names: [
"JT",
"D Marcquali Rod-Qez@",
"Go Big or Go Shoppin",
"Freight Train",
"Demaryius Targaryen",
"Brady-haters"
],
players: [
"Keenan Allen",
"Amari Cooper",
"Jarvis Landry",
"Eric Decker",
"Marques Colston",
"Jeff Janis"
],
team_ids: [
4,
5,
8,
10,
9,
7
]
},
{
round: 7,
position: "RB",
position_count: "3",
team_names: [
"Morning Woodhead",
"I BILL-IEVE!!!",
"Max ArtO"
],
players: [
"Chris Ivory",
"LeGarrette Blount",
"Doug Martin"
],
team_ids: [
1,
3,
2
]
},
{
round: 8,
position: "DST",
position_count: "1",
team_names: [
"Griv Em Hell"
],
players: [
"Seattle Seahawks"
],
team_ids: [
6
]
},
{
round: 8,
position: "RB",
position_count: "5",
team_names: [
"JT",
"I BILL-IEVE!!!",
"Brady-haters",
"Freight Train",
"Demaryius Targaryen"
],
players: [
"Todd Gurley",
"Joique Bell",
"T.J. Yeldon",
"Rashad Jennings",
"Ryan Mathews"
],
team_ids: [
4,
3,
7,
10,
9
]
},
{
round: 8,
position: "QB",
position_count: "1",
team_names: [
"Max ArtO"
],
players: [
"Matt Ryan"
],
team_ids: [
2
]
},
{
round: 8,
position: "TE",
position_count: "3",
team_names: [
"Go Big or Go Shoppin",
"D Marcquali Rod-Qez@",
"Morning Woodhead"
],
players: [
"Jordan Cameron",
"Kyle Rudolph",
"Tyler Eifert"
],
team_ids: [
8,
5,
1
]
},
{
round: 9,
position: "K",
position_count: "2",
team_names: [
"Griv Em Hell",
"I BILL-IEVE!!!"
],
players: [
"Stephen Gostkowski",
"Steven Hauschka"
],
team_ids: [
6,
3
]
},
{
round: 9,
position: "WR",
position_count: "4",
team_names: [
"D Marcquali Rod-Qez@",
"JT",
"Max ArtO",
"Demaryius Targaryen"
],
players: [
"Sammy Watkins",
"Allen Robinson",
"Martavis Bryant",
"Victor Cruz"
],
team_ids: [
5,
4,
2,
9
]
},
{
round: 9,
position: "RB",
position_count: "4",
team_names: [
"Morning Woodhead",
"Brady-haters",
"Freight Train",
"Go Big or Go Shoppin"
],
players: [
"Arian Foster",
"Chris Ivory",
"Shane Vereen",
"Tevin Coleman"
],
team_ids: [
1,
7,
10,
8
]
},
{
round: 10,
position: "QB",
position_count: "4",
team_names: [
"JT",
"D Marcquali Rod-Qez@",
"Morning Woodhead",
"Griv Em Hell"
],
players: [
"Tony Romo",
"Cam Newton",
"Ryan Tannehill",
"Eli Manning"
],
team_ids: [
4,
5,
1,
6
]
},
{
round: 10,
position: "WR",
position_count: "6",
team_names: [
"Max ArtO",
"I BILL-IEVE!!!",
"Freight Train",
"Brady-haters",
"Go Big or Go Shoppin",
"Demaryius Targaryen"
],
players: [
"Vincent Jackson",
"Mike Wallace",
"John Brown",
"Steve Smith Sr.",
"Anquan Boldin",
"Terrance Williams"
],
team_ids: [
2,
3,
10,
7,
8,
9
]
},
{
round: 11,
position: "TE",
position_count: "2",
team_names: [
"JT",
"Go Big or Go Shoppin"
],
players: [
"Owen Daniels",
"Vernon Davis"
],
team_ids: [
4,
8
]
},
{
round: 11,
position: "WR",
position_count: "1",
team_names: [
"Griv Em Hell"
],
players: [
"Nelson Agholor"
],
team_ids: [
6
]
},
{
round: 11,
position: "K",
position_count: "1",
team_names: [
"Max ArtO"
],
players: [
"Adam Vinatieri"
],
team_ids: [
2
]
},
{
round: 11,
position: "RB",
position_count: "1",
team_names: [
"D Marcquali Rod-Qez@"
],
players: [
"Giovani Bernard"
],
team_ids: [
5
]
},
{
round: 11,
position: "QB",
position_count: "5",
team_names: [
"I BILL-IEVE!!!",
"Morning Woodhead",
"Demaryius Targaryen",
"Brady-haters",
"Freight Train"
],
players: [
"Philip Rivers",
"Sam Bradford",
"Matthew Stafford",
"Colin Kaepernick",
"Joe Flacco"
],
team_ids: [
3,
1,
9,
7,
10
]
},
{
round: 12,
position: "QB",
position_count: "1",
team_names: [
"Brady-haters"
],
players: [
"Teddy Bridgewater"
],
team_ids: [
7
]
},
{
round: 12,
position: "WR",
position_count: "3",
team_names: [
"Morning Woodhead",
"Go Big or Go Shoppin",
"Griv Em Hell"
],
players: [
"Charles Johnson",
"Larry Fitzgerald",
"Pierre Garcon"
],
team_ids: [
1,
8,
6
]
},
{
round: 12,
position: "RB",
position_count: "1",
team_names: [
"JT"
],
players: [
"Isaiah Crowell"
],
team_ids: [
4
]
},
{
round: 12,
position: "DST",
position_count: "4",
team_names: [
"Freight Train",
"D Marcquali Rod-Qez@",
"Max ArtO",
"I BILL-IEVE!!!"
],
players: [
"Buffalo Bills",
"Houston Texans",
"Miami Dolphins",
"New England Patriots"
],
team_ids: [
10,
5,
2,
3
]
},
{
round: 12,
position: "TE",
position_count: "1",
team_names: [
"Demaryius Targaryen"
],
players: [
"Larry Donnell"
],
team_ids: [
9
]
},
{
round: 13,
position: "RB",
position_count: "3",
team_names: [
"Griv Em Hell",
"Morning Woodhead",
"Max ArtO"
],
players: [
"Devonta Freeman",
"Danny Woodhead",
"Fred Jackson"
],
team_ids: [
6,
1,
2
]
},
{
round: 13,
position: "K",
position_count: "1",
team_names: [
"Demaryius Targaryen"
],
players: [
"Nick Folk"
],
team_ids: [
9
]
},
{
round: 13,
position: "WR",
position_count: "2",
team_names: [
"Brady-haters",
"JT"
],
players: [
"Torrey Smith",
"Brandon LaFell"
],
team_ids: [
7,
4
]
},
{
round: 13,
position: "TE",
position_count: "3",
team_names: [
"I BILL-IEVE!!!",
"D Marcquali Rod-Qez@",
"Freight Train"
],
players: [
"Zach Ertz",
"Austin Seferian-Jenkins",
"Heath Miller"
],
team_ids: [
3,
5,
10
]
},
{
round: 13,
position: "QB",
position_count: "1",
team_names: [
"Go Big or Go Shoppin"
],
players: [
"Jay Cutler"
],
team_ids: [
8
]
},
{
round: 14,
position: "TE",
position_count: "1",
team_names: [
"Griv Em Hell"
],
players: [
"Julius Thomas"
],
team_ids: [
6
]
},
{
round: 14,
position: "WR",
position_count: "1",
team_names: [
"JT"
],
players: [
"Roddy White"
],
team_ids: [
4
]
},
{
round: 14,
position: "K",
position_count: "1",
team_names: [
"Freight Train"
],
players: [
"Josh Scobee"
],
team_ids: [
10
]
},
{
round: 14,
position: "DST",
position_count: "4",
team_names: [
"Brady-haters",
"Demaryius Targaryen",
"Morning Woodhead",
"Go Big or Go Shoppin"
],
players: [
"St. Louis Rams",
"Baltimore Ravens",
"Arizona Cardinals",
"Philadelphia Eagles"
],
team_ids: [
7,
9,
1,
8
]
},
{
round: 14,
position: "RB",
position_count: "3",
team_names: [
"D Marcquali Rod-Qez@",
"Max ArtO",
"I BILL-IEVE!!!"
],
players: [
"Tre Mason",
"Knile Davis",
"Darren Sproles"
],
team_ids: [
5,
2,
3
]
},
{
round: 15,
position: "RB",
position_count: "1",
team_names: [
"JT"
],
players: [
"Darren McFadden"
],
team_ids: [
4
]
},
{
round: 15,
position: "K",
position_count: "5",
team_names: [
"Morning Woodhead",
"Go Big or Go Shoppin",
"Griv Em Hell",
"D Marcquali Rod-Qez@",
"Brady-haters"
],
players: [
"Justin Tucker",
"Cody Parkey",
"Dan Bailey",
"Dan Carpenter",
"Mason Crosby"
],
team_ids: [
1,
8,
6,
5,
7
]
},
{
round: 15,
position: "WR",
position_count: "4",
team_names: [
"Max ArtO",
"Demaryius Targaryen",
"I BILL-IEVE!!!",
"Freight Train"
],
players: [
"Markus Wheaton",
"Percy Harvin",
"Stevie Johnson",
"Doug Baldwin"
],
team_ids: [
2,
9,
3,
10
]
}
]

let positions = _.uniq(_.map(dataset, function(value) {
  return value.position
}))


console.log(positions);

let rounds = _.uniq(_.map(dataset, function(value) {
  return `R${value.round}`;
}));

console.log(rounds);
