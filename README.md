Coming from a java background through University, one thing I miss in JavaScript is Enums. The ability to
have a single collection of common constants, with the option of bolting on some functionality cleanly
separates code in to the places it should be.

JavaScript gives developers scant little to start with, but because of the dynamic nature of the language,
we are then free to make things as we want. As such, I have created an Enum class that replicates almost
all of the functionality of Java Enums, with the occasional improvement that dynamic languages such as
JavaScript offer us for use.

Examples
========

    // Introducing JavaScript Enums!
    var Suit = new Enum(['Heart', 'Diamond', 'Spade', 'Club']);

    var mySuit = Suit.Heart;

    // Note the 
    switch (mySuit) {
	    case Suit.Heart: console.log("Hearts!"); break;
	    case Suit.Diamond: console.log("Diamonds!"); break;
	    case Suit.Spade: console.log("Spades!"); break;
	    case Suit.Club: console.log("Clubs!"); break;
    }

Of course, this is boring. There are much better ways of doing this kind of thing:

    // Improved example from above
    var Suit = new Enum({
	    Heart: {symbol: '♥'},
	    Diamond: {symbol: '♦'},
	    Spade: {symbol: '♦'},
	    Club: {symbol: '♣'}
    }, {
	    getSymbol: function() {
		    return this.symbol;
	    },
	    anounce: function() {
		    console.log("I am a " + this.getName() + " and my symbol is " + this.getSymbol());
	    }
    });

    var mySuit = Suit.Diamond;

    mySuit.anounce();

Formatting and logic is completely removed from other parts of the program, in good ole OO fashion.

You can use Enums as a simple replacement for constants, as easy and cheap namespacing, or for more
complex seperation of logic and control. It is up to you.

    var Toy = new Enum({
		DOLL: {
			execute: function() {
				console.log("I'm a doll.");
			}
		},
		SOLDIER: {
			execute: function() { 
				console.log("I'm a soldier."); 
			}
		}
	});

	// Obtained through JSON, user input, or some other programmatic method
	var toyType = 'DOLL';

	Toy[toyType].execute();

API
===

Constructor
-----------

    var MyEnum = new Enum(values, methods);

 - **values** is either an array of values or an object with key-value pairs.
 
 If this is an array, each array value will be taken as the name of an EnumValue. See the first example

 If this is an object, each key-value pair of the object will be used. EnumValues will be named after
 keys. The value of each key-value pair should be another object, with properties and methods specific
 to that EnumValue. See the second and third examples.

 - **methods** is an object of default parameters. Each key-value pair will be added to the EnumValue 
 as a default parameter. These can be extended and overridden by EnumValue specific parameter as 
 explained above.

Enum Methods
------------

 - **getValues** returns an array of all the Enums EnumValues.
 - **toString** returns a string of all the EnumValues.

EnumValue Methods
-----------------
 - **getName** returns the name of the EnumValue. See [Enum.name][name].
 - **getValue** returns a number unique to this EnumValue, within the parent Enum. This is not guaranteed
 to be consitant over time or over browsers, so use with caution. See [Enum.ordinal][ordinal].
 - **getArguments** returns the value half of the key-value pair used to declare this EnumValue.
 - **toString** returns the EnumValues name.

[name]:    http://download.oracle.com/javase/1.5.0/docs/api/java/lang/Enum.html#name%28%29
[ordinal]: http://download.oracle.com/javase/1.5.0/docs/api/java/lang/Enum.html#ordinal%28%29

Limitations
===========

Of course, this being JavaScript, no sort of type safety can be assured, unlike Enums in other languages.
If you code sensibly, this should not be a problem, as comparing Enums of two different types should not
happen in sensible code anyway. If you are looking for strict type safety, JavaScript is not the right
language for you anyway.
