Person = require("./Person.js")
util = require('util')


//create person
var a = new Person("a")
var b = new Person("b")
var c = new Person("c")
var d = new Person("d")

//add friends to 'a' and 'b'
a.addFriends([b,d])
b.addFriends([c,d])

let f_of_f_of_a = a.friendsOfFriends()
console.log("f of f of a: " +util.inspect(f_of_f_of_a))
let f_of_f_of_b = b.friendsOfFriends()
console.log("f of f of b: " +util.inspect(f_of_f_of_b))
let f_of_f_of_c = c.friendsOfFriends()
console.log("f of f of c: " +util.inspect(f_of_f_of_c))
let f_of_f_of_d = d.friendsOfFriends()
console.log("f of f of d: " +util.inspect(f_of_f_of_d))

