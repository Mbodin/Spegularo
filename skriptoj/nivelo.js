// Nivelo
// This file is part of Spegularo.
// © Copyright 2014, Martin Bodin
//
// Spegularo is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Spegularo is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Spegularo.  If not, see <http://www.gnu.org/licenses/>.
//
// This file defines the level prototype and its methods.


(function (Spegularo){
	with (Spegularo){

		addToContainer ([
			{ n: "Levels", o: {
					// This object contains every levels of the game.
				} },
			{ n: "createLevel", o: function (name, obj){
					// This function creates and add a level in “Levels”.
					if (name in Levels)
						internalError ("createLevel",
							"“" + name + "” already in object “Levels”.")

					Levels[name] =
						extendCopy (obj, LevelPrototype)
				} },
			{ n: "LevelPrototype", o: {
					// This object is the prototype of every level.

					// Every level stores pointers to its neighbouring levels.
					neighbours: {
						up: null,
						right: null,
						down: null,
						left: null
					},

					// A level should give lists (one for every direction) of levels to be
					// added next to them if the player goes in this particular direction
					// while no level has been defined in this direction in the
					// “neighbours” object.
					// If no level if given, the player can’t go in this direction.
					nextLevels: {
						up: [],
						right: [],
						down: [],
						left: []
					},

					// A level can send some informations for its neighbour levels by
					// leaving it some “hints”.  These hints can be everything, but they
					// are usually indications on what has been put in the other side (such
					// as walkways coordinates or such things).
					// Hints are stored in a level for its neighbours: levels do not edits
					// theirs neighbours!
					// Note that those objects in the prototype should not be edited without
					// good reasons: by default, levels have to create new hints objects
					// for their neighbours.
					hints: {
						up: {},
						right: {},
						down: {},
						left: {}
					},

					// This function displays the level using the interface.
					// This default function uses an internal “map” table that have to
					// be defined.  This table have to be of size sizeScreen, each cell
					// being of the form { o: array of objects (see “objekto.js” for
					// more precisions about objects), l: luminosity (an integer from 0 to
					// 6, 0 being the darker, 6 being the lighter) }.
					display: function (){
						Level.setLevel (
							mapArray2 (this.map, function (cell){
									var o = getMin (cell.o, function (o1, o2){
											return o1.depth < o2.depth
										}, {
											character: " ",
											color: Colors.Aluminium
										})
									var col = o.color

									if (typeof col === "function")
										col = col (cell.l)

									return {
											t: o.character,
											c: col
										}
								}))
					},

					// This function is a default function generating an empty map (see
					// function “display” above for more informations about the
					// generated table).
					generate: function (){
						this.map =
							createArray2 (sizeScreen, constant ({
									o: [],
									l: 6
								}, true, true, true))
					},

					// Levels have different behaviours depending on weither there are still
					// active objects in them.  This counter is there to trace the number of
					// active objects present in this level.
					numberOfActiveObjects: 0,

					// Returns weither the level is active or not (i.e. weither there are
					// more than one active object in it).
					isActive: function (){
						return this.numberOfActiveObjects > 0
					},

					// TODO
					allActions: function (){
						if (!this.isActive ())
							return [] // If this level is not active, nothing should be executed
									  // in it.

						//
					}

				}
			}])

        synchronise ()
	}
}(Spegularo))

