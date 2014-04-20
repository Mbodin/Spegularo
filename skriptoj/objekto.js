// Mapo
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
				color: "black", // TODO:  Make color functions to avoid using such raw command for colors (and to easily use Tango theme ☺).

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

				// TODO
				type: ""

			}
		}])

}(Spegularo))

