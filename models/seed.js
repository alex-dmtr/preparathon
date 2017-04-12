 
 
 module.exports = function(User, Group, Post) {

    function createRoot()
    {
      return User
        .create({ username: process.env.ROOT_USERNAME, password: process.env.ROOT_PASSWORD, email: 'root@root.com'})
    }

    function seedUsers() {
      return User.bulkCreate([
        { username: 'john.donald', password: 'shh', email: 'user2@user.com'},
        { username: 'galen.erso', password: 'shh', email: 'user3@user.com'},
        { username: 'orson.krennic', password: 'shh', email: 'user4@user.com'},
        { username: 'darth.vader', password: 'shh', email: 'user5@user.com'},
        { username: 'jyn.erso', password: 'shh', email: 'user6@user.com'},
        { username: 'bail.organa', password: 'shh', email: 'user7@user.com'},
        ]).then(function() { return User.findAll()})

    }

    function seedGroups(users) {
      Group.bulkCreate([
        { name: 'Explorers', description: 'Hiking and outdoor activities', avatarUrl: 'http://s.hswstatic.com/gif/how-to-hike-1.jpg', ownerId: users[1].id},
        { name: 'Bikers', description: 'Bike enthusiast? Join in', avatarUrl: 'http://ec2-54-169-79-17.ap-southeast-1.compute.amazonaws.com/images/experiences/photo/947_1455027009.jpg', ownerId: users[2].id},
        { name: 'Metal fans', description: 'Newcomers welcome!', avatarUrl: 'http://www.deathmetal.org/wp-content/uploads/heavy_metal_concert-600x375.jpg', ownerId: users[3].id},
        { name: 'Star Wars fans', description: 'Patiently awaiting The Last Jedi!', 
        avatarUrl: 'https://blogs-images.forbes.com/brandonkatz/files/2016/10/Star-Wars-1200x675.jpg?width=960', ownerId: users[4].id},
      ]).then(function() {
        return Group.findAll()
      }).then(function(groups) {
        this.groups = groups
        var groupTask = groups.map(function(group) {
          return new Promise(function(resolve, reject) {
            group.addUser(users[1]).then(resolve).catch(reject)
          })
        })
        return Promise.all(groupTask)
      })
    }

   function seedPosts() {
      Post.bulkCreate([
        { message: 'Hello World!', ownerId: 2, groupId: 1},
        { message: 'Oh Danny boy', ownerId: 2, groupId: 2},
        { message: 'The pipes, the pipes', ownerId: 2, groupId: 2},
        { message: 'Are calling', ownerId: 2, groupId: 1},
        { message: 'The quick brown fox', ownerId: 2, groupId: 3},
        { message: 'jumps over the lazy dog.', ownerId: 2, groupId: 3},
      ])
   }

    return function() {
      createRoot()
      .then(() => seedUsers())
      .then((users) => seedGroups(users))
      .then(() => seedPosts())
    }
}
