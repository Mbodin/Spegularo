// Koloroj
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
// This file contains every functions about colors.

(function (Spegularo){

	var colors = {}

	// Add to colors an array of 7 colors with the given name, the 0 being the
	// darker and 6 the lighter.  Colors are given by an array of hexadecimal
	// codes (in strings) whose size should be 1, 3 or 7.
	// This generates a function of the given name, taking a facultative number
	// from 0 to 6 and returning the corresponding color (ready to be used in
	// CSS code).
	function addColor (name, init){
		var values

		switch (init.length){
			case 1:
				values = Spegularo.createArray (7, init[0])
				break
			case 3:
				values = Spegularo.createArray (7, init[1])
				for (var i = 0; i < 2; i++){
					values[i] = init[0]
					values[6 - i] = init[2]
				}
				break
			case 7:
				values = init
				break
		}

		var arrayName = "array" + name

		colors[arrayName] = values

		colors[name] = function (i){
				if (i === undefined)
					i = 3

				return values[i]
			}
	}

	// These are the colors from the extended color theme.
	addColor ("Aluminium",
		["2e3436", "555753", "888a85", "babdb6", "d3d7cf", "ecf0eb", "f7f8f5"])
	addColor ("Butter",
		["291e00", "725000", "c4a000", "edd400", "fce94f", "fffc9c", "feffd0"])
	addColor ("Orange",
		["301700", "8c3700", "ce5c00", "f57900", "fcaf3e", "ffd797", "fff0d7"])
	addColor ("Chocolate",
		["271700", "503000", "8f5902", "c17d11", "e9b96e", "efd0a7", "faf0d7"])
	addColor ("Chameleon",
		["173000", "2a5703", "4e9a06", "73d216", "8ae234", "b7f774", "e4ffc7"])
	addColor ("SkyBlue",
		["00202a", "0a3050", "204a87", "3465a4", "729fcf", "97c4f0", "daeeff"])
	addColor ("Plum",
		["170720", "371740", "5c3566", "75507b", "ad7fa8", "e0c0e4", "fce0ff"])
	addColor ("ScarletRed",
		["270000", "600000", "a40000", "cc0000", "ef2929", "f78787", "ffcccc"])

	{ // Wrapping up everything.
		Spegularo.addToContainer ([
				{ n: "colors", o: colors }
			])
	}

}(Spegularo))

