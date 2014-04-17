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
// Note that this is the one that loads everything else, and thus can’t use commons’s functions from other files.

// This object is the JavaScript one created by this file, and is the only one to be exported.
var Spegularo

(function (){

	var sizeScreen = { x: 70, y: 30 }

	// Those objects, which will be initialised later on this file, will be used
	// by other files of this project.

	// This object contains the following methods:
	//	— setLevel, which takes a table of size sizeScreen of tainted characters
	//	 ({ t: character (one character-string), c: color (string) }) and prints it.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var updateLevel

	// This object contains the following methods:
	//	— setObjects, takes an arraw of tainted characters and prints it.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var updateInventary

	// This object contains the following methods:
	//	— setCode, which takes an array of code line ({ l: code line (string
	//	 without line-break), e: this line is editable (boolean) }) and set this
	//	 as being the current editable code.
	//	— onCommit, which takes a function of type taking the edited array of
	//	 code line (array of string without line-break) called every time the
	//	 player commits a code.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var editCode


	// Removes every child of a node.
	function clearNode (node){
		var childs = node.childNodes

		for (var i = childs.length - 1; i >= 0; i--)
			node.removeChild (childs[i])
	}


	function initLevel (div){
		// TODO

		return {
			setLevel: function (table){},
			init: function (){},
			quit: function (){}
		}
	}

	function initInventary (main){
		var block = document.createElement ("p")
		var array = document.createElement ("span")

		main.appendChild (block)

		return {
			setObjects: function (objects){
					clearNode (array)

					for (var i = 0; i < objects.length; i++){
						if (i !== 0)
							array.appendChild (document.createTextNode ("\t"))

						var obj = objects[i]
						var node = document.createTextNode (obj.t)
						node.setAttribute ("style", "color: " + obj.c + ";")

						array.appendChild (node)
					}
				},
			init: function (langObj){
					clearNode (node)
					clearNode (array)

					langObj.appendText ("inventary", block)
					block.appendChild (array)
				},
			quit: function (){
					main.removeChild (block)
				}
		}
	}

	function initEdit (div){
		// TODO

		return {
			setCode: function (lines){},
			onCommit: function (continuation){},
			init: function (){},
			quit: function (){}
		}
	}


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

	{ // Enpacking everything into the object “Spegularo”.
		Spegularo.sizeScreen = sizeScreen
		Spegularo.updateLevel = updateLevel
		Spegularo.updateInventary = updateInventary
		Spegularo.editCode = editCode
	}
}())

