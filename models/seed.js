 
 
 module.exports = function(User, Group, Post) {

    function createRoot()
    {
      return User
        .create({ username: process.env.ROOT_USERNAME, password: process.env.ROOT_PASSWORD, email: 'root@root.com'})
    }

    function seedUsers() {
      return User.bulkCreate([
        { username: 'user2', password: 'shh', email: 'user2@user.com'},
        { username: 'user3', password: 'shh', email: 'user3@user.com'},
        { username: 'user4', password: 'shh', email: 'user4@user.com'},
        { username: 'user5', password: 'shh', email: 'user5@user.com'},
        { username: 'user6', password: 'shh', email: 'user6@user.com'},
        { username: 'user7', password: 'shh', email: 'user7@user.com'},
        ]).then(function() { return User.findAll()})

    }

    function seedGroups(users) {
      Group.bulkCreate([
        { name: 'group1', description: 'group1', avatarUrl: 'group1'},
        { name: 'group2', description: 'group2', avatarUrl: 'group2'},
        { name: 'group3', description: 'group3', avatarUrl: 'group3'},
        { name: 'group4', description: 'group4', avatarUrl: 'group4'},
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
