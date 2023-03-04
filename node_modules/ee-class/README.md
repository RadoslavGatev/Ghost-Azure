# ee-class

A fast prototype based Javascript Class implementation


[![npm](https://img.shields.io/npm/dm/ee-class.svg?style=flat-square)](https://www.npmjs.com/package/ee-class)
[![Travis](https://img.shields.io/travis/eventEmitter/ee-class.svg?style=flat-square)](https://travis-ci.org/eventEmitter/ee-class)
[![node](https://img.shields.io/node/v/ee-class.svg?style=flat-square)](https://nodejs.org/)





## Browser compatibility

Desktop Browsers:

- Chrome 5+
- Firefox 4+
- Safari 5+
- IE 9+
- Edge 25+

Mobile Browsers:

- Safari iOS 3.2+
- Chrome for Android 38+
- Android Browser 4.4.4+






## Installation 

using npm

    npm i ee-class

using bower

    bower i ee-class

## Importing

node

    let Class = require('ee-class');



require.js

you have to configure require.js to point the bower prefix
to the bower_components folder. this is optional, but if you 
are using any other components of this author they will depend
on this config for requiring other dependencies.

    
    requirejs.config({
        paths: {
            'bower': '/js/bower_components/'
        }
    });



and finally load the component

    require(['bower/ee-class/dist/ee-class.min'], function(Class) {
        
    });



Browser & Vanilla
    
    <script src="bower/ee-class/dist/ee-class.min" />

    var Class = window.ee.Class;





## API

The Class implementation is built on top of javascript prototype based inheritance and ECMA Script property descriptors.

### Constructor
    
Classes can be created using the Class function. The function expects exactly one argument, the class definition.

    var MyClass = new Class();

### Class Definition

#### «inherits» property

Objects & Functions on this property are handled as the prototype for the prototype of the class you are creating.

    var MyClass = new Class({
        inherits: Array
    }); 

    // { // MyClass instance
    //      __proto__: { // MyClass protoype (where your items from the classdefinition are placed)
    //         __proto__: { // the Array prototype
    //              __proto__: {} // the prototype of the array prototype («[Object object]»)
    //          }
    //      }
    // }


#### «function type» properties

Functions will be placed on the Classes prototype object, they are by default not configurable, 
not writeable and enumerable (except for properties starting with an «_». If the property has 
the name «init» it is treated as the classes constructor.

    var MyClass = new Class({
        init: function(){
            console.log('im executed when the class is instantiated');
        }
    });

    var instance = new MyClass(); // im executed when the class is instantiated

    console.dir(instance); // {} -> the init function is placed on the instances
                           // prototype
    console.log(intance.init); // { [Function: init] super: [Function] }
    console.log(instance instanceof MyClass); // true
    console.log(instance instanceof Object); // true
    console.log(instance instanceof Date); // false


Note the super property on the init function, it can be used to call the constructor of the next 
constructor function in the prototype chain.


#### Property Descriptors

The Class definition may contain property descriptor objects. You are able to create 
configure each of the properties exactly as you like. You can create getters and setters
and configure the configurability, the writability and the enumerability.


    var Person = new Class({
        init: function(options){
            if (options && options.name !== undefined)  this.name = options.name;
            if (options && options.age !== undefined)   this.age = options.age;
        }   

        // the private storage for the age value
        , _storage: {
            value: {
                age: null
            }
        }

        , name: '' // enumerable, writable, not configurable

        , age: {
              get: function(){ return this._storage.age; }
            , set: function(value) {
                if (value < 0) throw new Error('Please provide an age >= 0!');
                else if (value > 150) throw new Error('You are too old, sorry!');
                else this._storage.age = value;
            }
            , enumerable: true
            /* , configurable: false */ // defaults to false
            /* , writable: false */ // defaults to false
        }

        , sayHelloTo: {
            value: function(name){
                console.log('Hello %s, my name is %s and im %s years old :)'
                    , name, this.name, this.age);
            }
        }
    });
    
    var instance = new Person({name: 'Michael', age: 30});
    instance.sayHelloTo('Tobias'); // Hello Tobias, my name is Michael and im 30 
                                   // years old :)

    // Object keys hets all enumerable keys from the instance but not its 
    // prototypes
    console.log(Object.keys(instance)); // [ 'name' ]

    // Class.keys() gets all enumerable keys from the instance and all its 
    // prototypes
    // Class.keys -> for (var key in instance) keys.push(key);
    console.log(Class.keys(instance)); // [ 'name', 'init', 'age' ]


    // internal structure of the Person instance
    {
          name: 'Michael'   // this was set from inside the constructor function
        , __proto__: {      // the Person prototype
              init: function(){ ... }
            , _storage: {
                age: 30     // set by the constructor, ATTENTION: this is shared 
                            // across all «Person» instances
            }
            , name: ''      // deafult wont be changed anytime
            , age: [Getter / Setter]
            , sayHelloTo: function(){ ... }
            , __proto__: {} // default prototype 
        }
    }


The example above has one problem. All instances of the «Person» class are going to share the «_storage» property.
This is because it's a property which will not be set on the instance itself but only once on the prototype. 
A Better solution would be the follwoing:

     var Person = new Class({
        init: function(options){
            Object.defineProperty(this, '_storage', {value: {}});
            Class.define(this, '_storage', {value: {}}); // alternative syntax
            Class.define(this, '_storage', Class({})) // alternatove syntax

           ....
        }   

        ...
    });




### Inheritance

Any class may inherit from any oter class or builtin types.
    
    var LifeForm = new Class({
        init: function(isAlive) {
            Class.define(this, 'isAlive', Class(isAlive).Enumerable().Writable());
        }

        , isAlive: Class(false).Enumerable().Writable()
        , die: function(){}
    });


    var Person = new Class({
        inherits: LifeForm

        , talk: function(){
            console.log('Hi my name is %s, i\'m '+(this.isAlive ? 'alive :)' 
                : 'dead :('), this.name);
        }

        , sing: function() {}
    });


    var Boy = new Class({
        inherits: Person

        , init: function constructor(name, alive) {
            // you need to give the function a name in order to be able to call 
            // its super. you must «call» or «apply» the super function to give
            // it the correct context
            constructor.super.call(this, alive);

            this.name = Class.define(this, 'name', Class(name).Enumerable());
        }


        , run: function(){}
        , jump: function(){}
    });


    var dylan = new Boy('Dylan', true);
    dylan.talk(); // Hi my name is Dylan, i'm alive :)


    // internal structure of the «dylan» Boy instanc
    {
          isAlive: true            // defined by the LifeForm Class constructor
        , name: 'Dylan'                     // defined by the Boy constructor
        , __proto__: {                      // Boy prototype
            init: function init(){ ... }    
            , __proto__: {                  // Person prototype
                __proto__: {                // LifeForm prototype
                    isAlive: false     // property defined on the LifeForm class
                    , init: function(){ ... }   
                    , __proto__: {}         // defualt object prototype
                }
            }
        }
    }



    console.log(dylan instanceof Boy);       // true
    console.log(dylan instanceof Person);    // true
    console.log(dylan instanceof LifeForm);  // true
    console.log(dylan instanceof Object);    // true
    console.log(dylan instanceof Array);     // false


If a class inherits from another class and the top class overwrites a method of the inherited class and you need to access the method in the inherited class from within a method on the inherited class you can now do this via the function.local variable.


    var BaseClass = new Class({
        sayHi: function() {
            console.log('base!');
        }

        , doSayHi: function doSayHi(localVersion) {
            if (localVersion) doSayHi.local.sayHi();
            else this.sayHi();
        }
    });



    var TopClass = new Class({
        inherits: BaseClass

        , sayHi: function() {
            console.log('top!');
        }
    });



    var instance = new TopClass();

    instance.sayHi(0); // top!
    instance.sayHi(1); // base!



### Static Methods

#### Class()

if the Class constructor is called without the new Keyword it doesnt create an instance of the class, it does instead return
a class property definition which can be used by the Class.define or Object.defineProperty method.

    Class(234) // {value: 234}
    Class(true).enumerable() // {value: true, enumerable: true}
    Class('yeah').writable() // {value: 'yeah', writable: true}
    Class(new Error('nope')).configurable() // {value: Error, configurable: true} 
    Class(234).enumerable().writable().configurable() // {value: 234, enumerable: true, writable: true, configurable: true}


#### Class.define()

This can be used oin playe of the Object.defineProperty method.

    Class.define({}, 'property_name', {value:3});

#### Class.proto()

Returns the prototype of a class instance

    var prototype = Class.proto(instance);

#### Class.keys()

Returns all enumerable properties of a class instance and of all its prototypes. Object.keys does the same for only the class instance.

    var keys = Class.keys(instance);


#### Class.implement()

Implements methods and properties from a classinstance on another object.

    var myObject = {};

    var MyClass = new Class({
        test: function(){

        }
    });

    Class.implement(new MyClass(), myObject);

    console.log(myObject); // {test: function(){}}


#### Class.inspect()

Inspects the internal structure of the class, returns it. Is helpful for debugging.


    // inspecting the class instance created in the inheritnace example above
    var description = Class.inspect(dylan);

    log(description);

    // { isAlive: true,
    //  name: 'Dylan',
    //  super: 
    //   { init: [Function],
    //     jump: [Function],
    //     run: [Function],
    //     super: 
    //      { sing: [Function],
    //        talk: [Function],
    //        super: 
    //         { die: [Function],
    //           init: [Function],
    //           isAlive: false,
    //           super: 
    //            { super: 
    //               { __defineGetter__: [Function],
    //                 __defineSetter__: [Function],
    //                 __lookupGetter__: [Function],
    //                 __lookupSetter__: [Function],
    //                 constructor: [Function],
    //                 hasOwnProperty: [Function],
    //                 isPrototypeOf: [Function],
    //                 propertyIsEnumerable: [Function],
    //                 toLocaleString: [Function],
    //                 toString: [Function],
    //                 valueOf: [Function] } } } } } }



# Version History

- 0.1.0: initial version
- 0.1.3: fixed integration with eventemitter objects
- 0.2.0: Added proper implementation for calling super functions, deprecated the «parent» property
- 0.2.1: Bugfix for the «super implementation»
- 0.2.2: Deprecated the «super» property and replaced it with the «parent» property beacuse super is a javascript reserved keyword
- 0.2.3: The constructor takes now n instead of 1 arguments
- 0.2.4: The constructor may now return a function when overriding the class implementation
- 0.2.6: Classes expose their defintion now via the «Class.definition» proroperty
- 0.2.7: Added support fo Object.defineProperties()
- 0.2.8: Removed all occurences of __proto__ in th eclass implementation, replaced the by Object.getPrototypeOf()
- 0.3.0: Removed the deprecated «parent» property
- 0.4.0: Removed the default value passed to a class constructor
- 1.0.0: Complete rewrite, the implementation is now simpler, faster and more JS like. The api is not 100% compaitble with the old api.
- 1.0.1: Added more test & docs
- 1.0.2: Fixed docs
- 1.0.5: The class contructor function can now return an object as its instance
- 1.0.6: The class contructor function can now return any type that is not undefined as its instance
- 1.0.7: If the class inherits from a native javascript object it will map the super of the init function to it
- 1.0.8: If a class is instantiated without the new keyword it now throws a menaingful error
- 1.0.9: Added the Class.inspect method
- 1.1.0: Functions on inherited classes have now access to the local scope via the function.local variable