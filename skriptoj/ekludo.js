// Ekludo
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
// This file launches every functions needed to play.


(function (Spegularo){
	with (Spegularo){

		{ // Setting up the interface.
			var lang = LangObj

			Messages.init (lang)
			Level.init (lang)
			Inventary.init (lang)
			Code.init (lang)
			Events.init (lang)
		}

		{ // Starting up the game.
			var map = new Map

			// TODO
			// SetInterval (function (){
			//	while (!Spegularo.player.canPlay ())
			//	 map.play ()
			//	, interval)
		}

	}
}(Spegularo))

// This file is the last introduced in “Spegularo.js” and thus the last
// to be executed.  Furthermore, we want this object to be hidden to any
// further call (to avoid being hacked by a level o player code).
Spegularo = undefined

