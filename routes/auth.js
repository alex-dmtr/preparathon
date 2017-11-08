var User = require('../models').models.user
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

// add endpoint for POST on /api/auth
// should receive username and password
exports.postAuth = async (req, res) => {

  let { username, password } = req.body
  try {
    const query = {
      where: {
        $or: [{ username }, { email: username }],
      }
    };

    const user = await User.findOne(query)

    const passwordOK = await bcrypt.compare(password, user.password)

    if (!passwordOK)
      return res.status(401).json({ message: 'Authentication failed' })

    function sendToken() {
      const token = jwt.sign({
        username: user,
        id: user.id
      }, process.env.JWT_SECRET)

      const d = new Date()
      d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days


      res.cookie('access_token', token, { expires: d })
      res.status(200).json({
        jwt: token, user: {
          id: user.id,
          username: user.username
        }
      })
    }

    return sendToken()
  }
  catch (err) {
    res.status(401).send(err)
    console.error(err)
  }
}

