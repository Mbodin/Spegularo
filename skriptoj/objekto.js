// Objekto
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
// This file defines the object prototype and its methods.


(function (Spegularo){

	Spegularo.addToContainer ([
		{ n: "objects", o: {
				// This object contains every objects that can be use in any level.
			} },
		{ n: "createObject", o: function (name, constructor){
				// This function creates and add a constant object in
				// “Spegularo.objects”.  In this most general case, objects are
				// given by a function returning a new object.  This function takes care
				// that the prototype of this object is to be well set.
				// It takes as argument the name of the object to be created and an
				// initiator function, returning an object.
				if (name in Spegularo.objects)
					Spegularo.internalError ("createObject",
						"“" + name + "” already in object “Spegularo.objects”.")

				Spegularo.objects[name] = function (){
						return Spegularo.extendCopy
							(constructor (), Spegularo.ObjectPrototype)
					}
			} },
		{ n: "createSimpleObject", o: function (name, obj){
				// In most cases, objects are not complex enough to need to be generated
				// by a function.  This function thus creates and add a constant object
				// in “Spegularo.objects”.
				// It takes as argument the name of the object to be created and an
				// object that will be used at each request of such an object.
				Spegularo.createObject (name, Spegularo.constant (obj))
			} },
		{ n: "ObjectPrototype", o: {
				// This object is the prototype of every object present in any level.

				// The character that should be used to represent the object on screen.
				character: " ",

				// The color that should be used to represent the object on screen.
				// It can either be a color function (of the form
				// “Spegularo.colors.ColorName”) or a color string (i.e. the result
				// of such a function).  If it is a function, it will be called while
				// displaying it (if it is displayed) with the cell’s luminosity as
				// an argument, returning the corresponding color string.
				color: Spegularo.colors.Aluminium,

				// The depth corresponds to the priority to be displayed: if more than
				// one object is present in a given cell, only the one with the lesser
				// depth is displayed.
				// Here follows some order of magnitude values for usual objects:
				//  — -1000: big objects that are usually drawn on other objects, or
				//	 immaterial objects occulting vision such as fog or fire.
				//	— 0: people or concrete objects.
				//	— 1000: normal small objects.
				//	— 10000: scenery.
				depth: 1000,

				// All objects transported by the object (note: create a new one each
				// time an object is created!).
				inventary: [],

				// Describes how the object behaves when getting in contact with another
				// object.  There can be three values for this field (the default is
				// “scenery”):
				//	— “concrete”: no two such objects can be in the same cell.  If
				//	 one tries to get in while another is already there, this last one is
				//	 refused to enter the cell.
				//	— “transportable”: two such objects can be in the same cell,
				//	 but if a concrete object gets into the cell, every such
				//	 obects gets into its inventory.
				//	— “scenery”: any such objects can be present in a cell,
				//	 whatever the other objects are.  This does not mean that those
				//	 objects do not interact with the other objects—they can even be in
				//	 an inventory—it just means that there is no automatic action taken
				//	 by the level when another object appears.  Don’t be mistaken
				//	 because of the name!
				collision: Spegularo.addConstruction ("collision", [
						"collisionConcrete",
						"collisionTransportable",
						"collisionScenery"],
					"collisionScenery"),

				// The three possibles types are (the default is “static”):
				//	— “static”: the object never moves.
				//	— “dynamic”: the object only moves when its level is active.
				//	— “active”: the object makes its level active.
				type: Spegularo.addConstruction ("objectType", [
						"static",
						"dynamic",
						"active"],
					"static"),

				// The speed corresponds to the frequency the behaviour function (see
				// below) shall be called: a speed of 100 means that it would be called
				// only every 100 turns.  100 is the default value, smaller values
				// represent objects that moves faster.
				speed: 100,

				// This function is called every time the object “moves” (see the
				// definition of the constructors below).
				// It should return action objects (see below), or undefined.
				// This function can return an exception, which should be catched
				// immediately, eventually adding some additionnal (bad) effects on the
				// faulting object.
				// By default, it naturally does nothing.
				behaviour: function (){},

				// Returns an action object to move the current object in the direction
				// (“up”, “upleft”, “left”, “downleft”, “down”, “downright”, “right” or “upright”) given as argument.
				move: function (dir, cancel){
						if (cancel === undefined)
							cancel = Spegularo.constructions.cancel.noCancel

						return {
								type: "move",
								direction: dir,
								shouldCancel: cancel
							}
					}

			}
		}])

	{ // Other construction definitions.
		// In case the neighbourhood changed in between an action was asked and the
		// action was performed (i.e. a change of an object in the initial cell or
		// the destination), some precise actions could want to be cancelled (such
		// as if the neighbourhood is dangerous if the object would do something a
		// little different from what expected).
		// Actions can specify a specific value for such subtleties in the actions.
		// The cancel value can be the followings:
		//	— “noCancel”: the action won’t be cancelled, whatever happened.
		//	— “cancelIfCellChanged”: the action will be cancelled if the
		//	 current cell or the target cell changed (though the addition or
		//	 deletion of an object).
		//	— “cancelIfAnObjectChanged”: the action will be cancelled if the
		//	 current cell or the target cell have an object that changed.
		//	— “cancelIfObjectChanged”: cancels if the current object changed.
		Spegularo.addConstruction ("cancel", [
				"no",
				"ifCellChanged",
				"ifAnObjectChanged",
				"ifObjectChanged"])
	}

}(Spegularo))

