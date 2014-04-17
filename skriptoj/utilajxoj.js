// Utilajxoj
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
// This file contains every useful functions without precise function used
// in the project.


(function (){

	// Add to the object “Spegularo” the set of objects given as argument
	// (as an array of { n: function name (string), o: function }).
	function addToContainer (functions){
		iterTab (functions, function (f){
				if (f.n in Spegularo)
					Spegularo.internalError ("“" + f.n + "” already in object “Spegularo”.")

				Spegularo[f.n] = f.o
			})
	}

	// Iter on the array given as first argument the function given as
	// second argument.  This function can also take a second argument, passed
	// on all along the array, with initial value given as third
	// (facultative) argument of this function.
	function iterTab (tab, f, accumulator){
		for (var i = 0; i < tab.length; i++)
			accumulator = f (tab[i], accumulator)

		return accumulator
	}

	{ // Wrapping up everything.
		addToContainer ([
				{ n: "addToContainer", o: addToContainer },
				{ n: "iterTab", o: iterTab}
			])
	}
}())

