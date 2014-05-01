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
// This file defines the map and its methods.


(function (Spegularo){
	with (Spegularo){

		addToContainer ([
			{ n: "Map", o: function (){
					// This function is the constructor of map.

					var initialLevel = levels.testLevel // TODO: this is just temporary…

					initialLevel.generate ()

					this.levels = [initialLevel]
					this.allActiveLevels = [initialLevel]

					// TODO
					initialLevel.display ()
				}
			}])

	}
}(Spegularo))

