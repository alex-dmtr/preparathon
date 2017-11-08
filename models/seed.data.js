const fields = {
  users: [ "username", "email", "password" ],
  stories: [ "title", "content" ]
}

const data = {
  users: [
    [ "alexd", "alexadrian.dmtr@gmail.com", "shh" ],
    [ "darth.vader", "vader@empire.com", "secret" ]
  ],

  stories: [
	["Xargath", `The Xargath, Lethoids, and all of the other alien races laughed at us, they felt that personalizing a matter of numbers and logistics was inefficient. In most conventional terms and conditions of fighting, they were correct. Carpetbomb your enemies, assassinate their leaders, and take hold of the population to integrate into your own empire.

	Then, a breakthrough in military technology took place. We achieved the greatest daydream of a young engineer. Giant robots for piloting. Kids who were raised on old holovids of Macross, Battletech, Gundam, Voltron, and others of ages past.

	What was the point of this technology? The aliens continued laughing at the waste of resources. Huge fusion engines, nanoscale wiring and artificial muscles, and layers upon layers of neutrotitanium triadamant armor. Why bother miniaturizing the technology to a point of uselessness? Scanners were better for sweeping entire planets and systems! Lasers, plasma, and other weapons were better at destroying entire asteroids or other astral bodies!

	We trained soldiers, we built mechs, and in squads of 3 lances of 4 soldiers each, went to demonstrate our advancement to each alien race on their capital planet. "Look what we can do! Look what we did! Isn't this awesome?!"

	An order echoed through the comms link of each mech. "I've always wanted to say this... and you've always wanted to hear it, ladies and gentlemen. Execute Order 66."`],

	["50 years", `I remember the day the aliens first arrived.
	Some fought, some ran, while I just sat on my chair, sipping a nice cool beer.
	Thing is, he who aims with his hand has clearly forgotten the comfort of his foldable recliner. I aim with my machines.
	I am an Engineer. And I solve practical problems. Such as how am I gonna stop some big mean green alien from ripping me into pieces?
	The answer: Use a gun. And apparently a shitload of beer.
	After we shot down one of them UFOs, or Useless Fucking Objects, we found out that the aliens got drunk easily.
	So I built the BEER-a-Tron, a Sentry designed to shoot beer at 128 BPM. With little to no effort we drove the aliens away.
	In order to thank me and my team, I got a landline hooked directly to the Square... wait, no. It's the Pentagon. A phone that went straight to them.
	And today, 50 years after the first aliens arrived, the phone rang again.
	Ah hell.`]
  ]
}



let returnData = {}

Object.keys(data).forEach(model => {

  let modelData = data[model].map(instance => {
    let obj = {}
    
    fields[model].forEach((field, index) => {
      if (index < instance.length && instance[index] != null) 
        obj[field] = instance[index]
    })

    return obj
  })
  
  returnData[model] = modelData
})

module.exports = returnData
