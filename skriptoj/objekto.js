// Objekto
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
// This file defines the object prototype and its methods.


(function (Spegularo){

	Spegularo.addToContainer ([
		{ n: "ObjectPrototype", o: {

				// The character that should be used to represent the object on screen.
				character: " ",

				// The color that should be used to represent the object on screen.
				color: Spegularo.colors.Aluminium (0),

				// The depth corresponds to the priority to be displayed: if more than
				// one object is present in a given cell, only the one with the lesser
				// depth is displayed.
				// Here follows some order of magnitude values for usual objects:
				//  — -1000: big objects that are usually drawn on other objects, or
				//	 immaterial objects occulting vision such as fog or fire.
				//	— 0: people or concrete objects.
				//	— 1000: normal small objects.
				//	— 10000: scenery.
				depth: 1000,

				// All objects transported by the object (note: create a new one each
				// time an object is created!).
				inventary: [],

				collisionConcrete: 0,
				collisionTransportable: 1,
				collisionScenery: 2,

				// The three possibles types are:
				//	— “static”: the object never moves.
				//	— “dynamic”: the object only moves when its level is active.
				//	— “active”: the object makes its level active.
				typeStatic: 0,
				typeDynamic: 1,
				typeActive: 2,
				type: 0,

				// The speed corresponds to the frequency the behaviour function (see
				// below) shall be called: a speed of 100 means that it would be called
				// only every 100 turns.  100 is the default value, smaller values
				// represent objects that moves faster.
				speed: 100,

				// This function is called every time the object “moves” (see the
				// definition of the possibles types above).
				// It should return action objects (see below), or undefined.
				// This function can return an exception, which should be catched
				// immediately, eventually adding some additionnal (bad) effects on the
				// faulting object.
				// By default, it naturally does nothing.
				behaviour: function (){},

				// Returns an action object to move the current object in the direction
				// (“up”, “upleft”, “left”, “downleft”, “down”, “downright”, “right” or “upright”) given as argument.
				move: function (dir){
						return {
								type: "move",
								direction: dir
							}
					}

			}
		}])

}(Spegularo))

