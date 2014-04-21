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


(function (Spegularo){

	// Add to the object “Spegularo” the set of objects given as argument
	// (as an array of { n: function name (string), o: function }).
	function addToContainer (functions){
		iterArray (functions, function (f){
				if (f.n in Spegularo)
					Spegularo.internalError ("addToContainer",
						"“" + f.n + "” already in object “Spegularo”.")

				Spegularo[f.n] = f.o
			})
	}

	// Iter on the array given as first argument the function given as
	// second argument.  This function can also take a second argument, passed
	// on all along the array, with initial value given as third
	// (facultative) argument of this function.  The given function can also
	// take a third argument, the current index.
	function iterArray (tab, f, accumulator){
		for (var i = 0; i < tab.length; i++)
			accumulator = f (tab[i], accumulator, i)

		return accumulator
	}

	// Returns a new array of the same size than the first argument, where
	// every cell are results of the call of the function given as a second
	// argument with the corresponding value in the initial array, and the
	// current index.
	function mapArray (tab, f){
		return iterArray (tab, function (v, t, i){
				t[i] = f (v, i)
				return t
			}, [])
	}

	// This function is the same than “mapArray”, but with a two
	// dimensional array.  The function given as argument will be given the
	// current value, and its two coordinates as two additional arguments.
	function mapArray2 (tab, f){
		return mapArray (tab, function (t, x){
				return mapArray (t, function (v, y){
						return f (v, x, y)
					})
			})
	}

	// Create an array of the given size, filling it with the second argument.
	// If the second argument is actually a function, it calls it with the
	// current index and initialize the array with these values.  To cancel
	// this additional behaviour (i.e. to put the function in every cell), add
	// a third argument to “true”.
	function createArray (size, f, identical){
		var tab = []

		if (typeof f !== "function" || identical){
			var c = f
			f = function (){ return c }
		}

		for (var i = 0; i < size; i++){
			tab[i] = f (i)
		}

		return tab
	}

	// This function is the same than “createArray”, but with a two
	// dimensional array.  The size should be given through a { x: integer,
	// y: integer } object.
	function createArray2 (size, f, identical){
		if (typeof f !== "function" || identical){
			var c = f
			f = function (){ return c }
		}

		return createArray (size.x, function (x){
			createArray (size.y, function (y){ return f (x, y) })})
	}

	// Returns the minimum value in the given array.  A comparable function can
	// be given as an optional second argument (returning true is the first
	// argument is smaller than the second one).  A third optional argument can
	// also be given to specify what to return in case the array is empty.
	function getMin (tab, compare, defaultRes){
		if (compare === undefined){
			compare = function (a, b){ return a < b }
		}

		if (tab.length === 0)
			return defaultRes

		iterArray (tab, function (v, res){
				if (compare (v, res))
					return v
				else
					return res
			}, tab[0])
	}

	// This function is the same than “getMin”, but returns the maximum
	// value instead of the minimum one.
	function getMax (tab, compare, defaultRes){
		return getMin (tab, function (a, b){ return compare (b, a) }, defaultRes)
	}

	// Returns a new empty object whose prototype is the object given as
	// argument.
	function extend (obj){
		var c = function (){}
		c.prototype = obj
		return new c
	}

	// This function takes an object and a “prototype” object.  It returns
	// an object whose prototype is this second object and whose every field
	// has been copied (not cloned: this function is not recursive) from the
	// first object given as argument.  Note that if some fields from the
	// initial argument are not enumerable, they won’t be copied in the
	// returned object.
	function extendCopy (obj, proto){
		var o = extend (proto)

		for (var i in obj)
			o[i] = obj[i]

		return o
	}

	{ // Wrapping up everything.
		addToContainer ([
				{ n: "addToContainer", o: addToContainer },
				{ n: "iterArray", o: iterArray },
				{ n: "mapArray", o: mapArray },
				{ n: "mapArray2", o: mapArray2 },
				{ n: "createArray", o: createArray },
				{ n: "createArray2", o: createArray2 },
				{ n: "getMin", o: getMin },
				{ n: "getMax", o: getMax },
				{ n: "extend", o: extend },
				{ n: "extendCopy", o: extendCopy }
			])
	}

}(Spegularo))

