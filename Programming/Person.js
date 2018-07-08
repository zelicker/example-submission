
const util = require('util')

class Person {

    constructor(name) {        
        this.name = name
        this.friends = []
        // variable เพิ่มเติม(ถ้ามี) ...
    }

    addFriends(friends) {
        //check for dup name and not self

        //add friends
        var currentFriends = (me,friends) => [...me.friends,friends]

        // this.friends = currentFriends(this,friends)
        this.friends = this.friends.concat(friends)

        for(let f of friends){
            // console.log(f.name + ": " +f.friends)
            f.friends = currentFriends(f,this)
        }
    }
  
    friendsOfFriends() {
        var friendNetwork = []
        var friends = this.friends

        for (let f of friends){
            friendNetwork = friendNetwork.concat(f.friends)
        }

        // array ชื่อเพื่อนและตัวเอง
        var notFriendOfFriends = friends.concat(this)
        
        // array ชื่อเพื่อนของเพื่อนทั้งหมด
        var riendOfFriends = friendNetwork.filter(function(person) {
            if(notFriendOfFriends.indexOf(person) === -1) {
              return true;
            }            
            return false;
          });       
        return friendOfFriends 
    }  
}


var a = new Person("a")
var b = new Person("b")
var c = new Person("c")
var d = new Person("d")

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

