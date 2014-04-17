// Spegularo
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
// This file contains the HTML interface with the rest of the JS files.
// Note that this is the one that loads everything else, and thus can’t
// use commons’s functions from other files.

// This object is the JavaScript one created by this file, and is the only
// one to be exported.
var Spegularo

(function (){

	var sizeScreen = { x: 70, y: 30 }

	// Those objects, which will be initialised later on this file, will be used
	// by other files of this project.

	// This object makes the interface with the drawn level.  It contains the
	// following methods:
	//	— setLevel, which takes a table of size sizeScreen of tainted characters
	//	 ({ t: character (one character-string), c: color (string) }) and prints
	//	 it.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var level

	// This object makes the interface with the player’s inventary.  It
	// contains the following methods:
	//	— setObjects, takes an arraw of tainted characters and prints it.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var inventary

	// This object makes the interface with the code editor.  It contains the
	// following methods:
	//	— setCode, which takes an array of code line ({ l: code line (string
	//	 without line-break), e: this line is editable (boolean) }) and set this
	//	 as being the current editable code.  If this array is empty, no code is
	//	 displayed.
	//	— onCommit, which takes a function of type taking the edited array of
	//	 code line (array of string without line-break) called every time the
	//	 player commits a code.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var code

	// This object makes the interface with the event (i.e. game’s actions)
	// display.  It contains the following methods:
	//	— addEvents, taking a set of events ({ d: event description (string),
	//	 s: source of the event (string) }) corresponding to the current turn
	//	 and printing it, eventually removing the previous events of the
	//	 interface.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var events

	// This object makes the interface with the messages (i.e. various errors).
	// It contains the following methods:
	//	— addMessages, taking a set of messages ({ d: message (string),
	//	 s: source of the message (string) }) corresponding to the current turn
	//	 and printing it, eventually removing the previous events of the
	//	 interface.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var messages


	// Removes every child of a node.
	function clearNode (node){
		var childs = node.childNodes

		for (var i = childs.length - 1; i >= 0; i--)
			node.removeChild (childs[i])
	}

	function appendText (node, text){
		node.appendChild (document.createTextNode (text))
	}

	function initLevel (div){
		// TODO

		return {
			setLevel: function (table){},
			init: function (langObj){},
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
						array.appendText ("\t")

						var obj = objects[i]
						var node = document.createTextNode (obj.t)
						node.setAttribute ("style", "color: " + obj.c + ";")

						array.appendChild (node)
					}
				},
			init: function (langObj){
					clearNode (node)
					clearNode (array)

					block.appendText (langObj.getText ("inventary"))
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
			init: function (langObj){},
			quit: function (){}
		}
	}

	function initEvents (div){
		// TODO

		return {
			addEvents: function (events){},
			init: function (langObj){},
			quit: function (){}
		}
	}

	function initEvents (div){
		// TODO

		return {
			addEvents: function (events){},
			init: function (langObj){},
			quit: function (){}
		}
	}

	function initMessages (div){
		// TODO

		return {
			addMessages: function (events){},
			init: function (langObj){},
			quit: function (){}
		}
	}


	var mainId = document.getElementById ("spegularo")

	if (!mainId)
		return	// If this <div> is not present, it’s not worth continuing
				// executing the game.

	{ // Initialising some game areas.
		level = initLevel (mainId)

		inventary = initInventary (mainId)

		code = initEdit (mainId)

		events = initEvents (mainId)

		messages = initMessages (mainId)
	}

	{ // Adding other JavaScript files from the project.
		var directory = "skriptoj/"
		var otherFiles = [
				"utilajxoj",
				"lingvoj"
			]

		for (var i = 0; i < otherFiles; i++){
			var script = document.createElement ("script")

			script.setAttribute ("type", "text/javascript")
			script.setAttribute ("src", directory + otherFiles[i] + ".js")

			mainId.appendChild (script)
		}
	}

	{ // Enpacking everything into the object “Spegularo”.
		Spegularo = {
				sizeScreen: sizeScreen,
				level: level,
				inventary: inventary,
				code: code,
				events: events,
				messages: messages
			}
	}

}())

