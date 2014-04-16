// Spegularo.js

// This file is part of Spegularo.
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

// This file is meant to be the HTML interface with the rest of the JS files.


var sizeScreen = { x: 70, y: 30 }

// Those objects, which will be initialised later on this file, will be used
// by other files of this project.

// This object contains the following methods:
//	— setLevel, which takes a table of size sizeScreen of tainted characters
//	 ({ t: character (one character-string), c: color (string) }) and prints it.
var updateLevel

// This object contains the following methods:
//	— setObjects, takes an arraw of tainted characters and prints it.
var updateInventary

// This object contains the following methods:
//	— setCode, which takes an array of code line ({ l: code line (string
//	 without line-break), e: this line is editable (boolean) }) and set this
//	 as being the current editable code.
//	— onCommit, which takes a function of type taking the edited array of
//	 code line (array of string without line-break) called every time the
//	 player commits a code.
var editCode

function initLevel (div){
	// TODO
	
	return {
		setLevel: function (table){}
	}
}

function initInventary (div){
	// TODO
	
	return {
		setObjects: function (objects){}
	}
}

function initEdit (div){
	// TODO
	
	return {
		setCode: function (lines){},
		onCommit: function (continuation){}
	}
}


(function (){
	var mainId = document.getElementById ("spegulo")

	if (!mainId)
		return	// If this <div> is not present, it’s not worth continuing
				// executing the game.

	{ // Initialising some game areas.
		updateLevel = initLevel (mainId)

		updateInventary = initInventary (mainId)

		editCode = initEdit (mainId)
	}

	{ // Adding other JavaScript files from the project.
		var directory = "skriptoj/"
		var otherFiles = [ ]

		for (var i = 0; i < otherFiles; i++){
			var script = document.createElement ("script")

			script.setAttribute ("type", "text/javascript")
			script.setAttribute ("src", directory + otherFiles[i])

			mainId.appendChild (script)
		}
	}
}())

