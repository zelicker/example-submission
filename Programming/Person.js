
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
        var friendOfFriends = friendNetwork.filter(function(person) {
            if(notFriendOfFriends.indexOf(person) === -1) {
              return true;
            }            
            return false;
          });       
        return friendOfFriends 
    }  
}

module.exports = Person