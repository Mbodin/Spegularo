// Niveloj
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
// This file defines some levels of the game.


(function (Spegularo){
	with (Spegularo){

	createLevel ("testLevel", {
			// TODO: This is just a test…
			generate: function (){
					Spegularo.LevelPrototype.generate.call (this)

					for (var x = 10; x < 42; x++)
						for (var y = 10; y < 12; y++)
							this.map [x][y].o.push (Spegularo.objects.road ())
				}
		})

	}
}(Spegularo))

