// Lingvoj
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
// This file contains every language functions.

(function (Spegularo){
	with (Spegularo){

		// TODO:  For now this is temporary, just to make it work.
		var lang = "en"

		// This function takes an identifer (as a text form) and some eventual
		// additionnal arguments (strings).  It returns a string representing the
		// corresponding text, eventually evaluated with the additionnal arguments,
		// which correspond to hole in the translation.
		function getText (id){
			// TODO:  For now this is temporary, just to make this module work.
			switch (id){
				case "inventary":
					return "Inventary:"
				case "colon":
					return ":"
                default:
                    internalError ("getText",
                        "Unkown identifier “" + id + "”.")
			}
		}

		{ // Wrapping up everything.
			addToContainer ([
					{ n: "LangObj", o: {
							getText: getText
						} }
				])
		}

        synchronise ()
	}
}(Spegularo))

