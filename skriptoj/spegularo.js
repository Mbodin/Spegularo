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

// This object is the one created by this file, and is the only object use
// to communicate between the different scripts of this project.
// This object will also be hidden in the end of the file “ekludo”: every
// other file of this project will add it to a local closure to be able to
// use it after the hiding.
var Spegularo = (function (){
	var Spegularo

	var sizeScreen = { x: 70, y: 30 }

	// Those objects, which will be initialised later on this file, will be used
	// by other files of this project.

	// This object makes the interface with the drawn level.  It contains the
	// following methods:
	//	— setLevel, which takes a table (x first) of size sizeScreen of
	//	tainted characters ({ t: character (one character-string), c: color
	//	(facultative string) }) and prints it.
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
	//	— addEvents, taking a set of events ({ d: event description
	//	(string) }) corresponding to the current turn and printing it,
	//	eventually removing the previous events of the interface.
	//	— init, taking a language object and initialising the interface.
	//	— quit, that removes the level from the HTML interface.  Any further
	//	 call to any method of this object will then be invalid.
	var events

	// This object makes the interface with the messages (i.e. various errors).
	// It contains the following methods:
	//	— addMessages, taking a set of messages ({ d: message (string),
	//	 s: source of the message (facultative string) }) corresponding to the
	//	 current turn and printing it, eventually removing the previous events of
	//	 the interface.
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

	// Adds a new text node to its first argument, with the text of the second.
	function appendText (node, text){
		node.appendChild (document.createTextNode (text))
	}

	function initLevel (main){
		var level = document.createElement ("table")
		var levelRef = []

		for (var y = 0; y < sizeScreen.y; y++){
			var line = document.createElement ("tr")
			var lineRef = []

			for (var x = 0; x < sizeScreen.x; x++){
				var block = document.createElement ("td")

				appendText (block, " ") // This is a non-breakable space.

				line.appendChild (block)
				lineRef[x] = block
			}

			level.appendChild (line)
			levelRef[y] = lineRef
		}
		
		level.setAttribute ("style",
				"font-family: monospace;"
				+ "border-collapse: collapse;"
				+ "border: 1px;")
		main.appendChild (level)

		return {
			setLevel: function (table){
					var error

					for (var y = 0; y < sizeScreen.y; y++){
						for (var x = 0; x < sizeScreen.x; x++){
							var block = levelRef[y][x]
							var tc = table[x][y]

							clearNode (block)

							if (tc){
								if (tc.t === " ") // This is a normal space.
									tc.t = " " // This is a non-breakable space.

								var node = document.createTextNode (tc.t)
								if (tc.c)
									node.setAttribute ("style", "color: " + tc.c + ";")
								block.appendChild (node)
							} else error = { x: x, y: y }
						}
					}

					if (error)
						Spegularo.internalError ("setLevel",
							"Giving a table without (" + error.x + ", " + error.y + ") coordinates.")
				},
			init: function (langObj){},
			quit: function (){
					main.removeChild (level)
				}
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
						appendText (array, "\t")

						var obj = objects[i]
						var node = document.createTextNode (obj.t)
						node.setAttribute ("style", "color: " + obj.c + ";")

						array.appendChild (node)
					}
				},
			init: function (langObj){
					clearNode (block)
					clearNode (array)

					appendText (block, langObj.getText ("inventary"))
					block.appendChild (array)
				},
			quit: function (){
					main.removeChild (block)
				}
		}
	}

	function initEdit (main){
		// TODO

		return {
			setCode: function (lines){},
			onCommit: function (continuation){},
			init: function (langObj){},
			quit: function (){}
		}
	}

	function initEvents (main){
		var events = document.createElement ("ul")

		main.appendChild (events)

		return {
			addEvents: function (events){
					clearNode (messages)

					Spegularo.iterArray (msgs, function(msg){
							var node = document.createElement ("li")

							messages.appendChild (node)

							node.appendText (msg.d)
						})
				},
			init: function (langObj){},
			quit: function (){
					main.removeChild (messages)
				}
		}
	}

	function initMessages (main){
		var lang

		var messages = document.createElement ("ul")
		var errors = document.createElement ("ul")

		main.appendChild (messages)
		main.appendChild (errors)

		return {
			addMessages: function (msgs){
					clearNode (messages)

					Spegularo.iterArray (msgs, function(msg){
							var node = document.createElement ("li")

							messages.appendChild (node)

							if (msg.s){
								node.appendText (msg.s)
								node.appendText (lang.getText ("colon"))
								node.appendText ("\t")
							}
							node.appendText (msg.d)
						})
				},
			init: function (langObj){
					lang = langObj

					Spegularo.addToContainer ([
							{ n: "internalError", o: function (f, msg){
										var node = document.createElement ("li")
				
										errors.appendChild (node)
										node.appendText (f)
										node.appendText (lang.getText ("colon"))
										node.appendText ("\t")
										appendText (node, msg)
									} }
						])
				},
			quit: function (){
					main.removeChild (messages)
				}
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
				"utilajxoj", // This file should always be the first one.
				"lingvoj",
				"mapo",
				"nivelo",
				"ekludo" // This file should always be the last one.
			]

		// We want each of those scripts to be added and executed in order.
		// We make use of the function “onload” to force execution of the
		// additional scripts in order.
		function addScriptsFrom (i){
			var script = document.createElement ("script")

			script.setAttribute ("type", "text/javascript")
			script.setAttribute ("src", directory + otherFiles[i] + ".js")

			if (i + 1 < otherFiles.length){
				script.onload = function (){
						addScriptsFrom (i + 1)
					}
			}

			mainId.appendChild (script)
		}

		addScriptsFrom (0)
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

	return Spegularo
}())

