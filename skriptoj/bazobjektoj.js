// Bazobjekto
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
// This file defines useful objects that can be added and useful in
// basically every level.


(function (Spegularo){

	Spegularo.createObject ("road", {
			// This object represents a simple road.

			character: ".",
			color: Spegularo.colors.Aluminium,
			depth: 10000,
			collision: Spegularo.ObjectPrototype.collisionScenery,
			type: Spegularo.ObjectPrototype.typeStatic,
			speed: 10000 // Roads are not updated often… but that doesn’t mean
						 // they should never be update: water falling on them may change
						 // their state (for instance).

		})

}(Spegularo))

