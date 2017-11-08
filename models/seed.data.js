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
	Ah hell.`],

	["Notes", `It took me a week to find where you keep your wifi password. A whole week! I was really worried you’d thrown it away, but lo and behold, there it was in the cutlery drawer of all places. Everything about the way you organize things confuses me. I guess because you live on your own now you just put things any old place. I know there was someone else before, I heard you talking about him on the phone. Johnny, I think? Jimmy? Anyway, I know because you said it was tough being alone. But you’re not alone, of course. You have me! There’s a crack in your roof where I can see down onto the street below. Don’t worry about the roof, by the way – yes, it's pretty cramped, but I like my spaces small. I’ve actually stuffed a few things up there to make it smaller (just bits and bobs from the recycling, I don’t think you’ll miss them). I can sit with my face against the wall and see down onto the street. That’s where I saw you meeting up with all those people wearing black. It would have been weird anyway because you never meet anyone, but they were all rubbing your back and holding your hand and stuff. I was scared you were going to bring them in but you just went off together so that was okay. I don’t know what I would have done if the house had filled up with people. You know, it really explains a lot that there was someone else before me. Like the fact you have two sets of drawers in your bedroom, or how you’re living in such a big house all by yourself, and do weird things like leave the wifi in the cutlery drawer or watch the same TV show all day on a weekend. I’m not one to talk, mind. I’m addicted to my toys - like the big lump of blu-tack I found a while back which is great fun to fiddle with but doesn’t taste too good, or the cigarette lighter that’s fun to flick on and off, or the tube that has all the patterns in you can change. I could look down that thing for hours. I often have! That’s what I normally do when you’re home. Or I just sit back and listen to you do the washing or run a shower or something like that. I crawl up the walls and hang there with my ear to the pipes and listen to the water rushing by. That kind of thing makes me happy. Plus you never have anyone around so once I got your schedule memorized I could move around pretty free. I know what we have: It’s a symbiotic relationship. That means you help me by giving me a warm place to stay and wifi, and I help you by eating all the spiders. Of course, there’s no need to thank me! I fell asleep under the towels in your airing cupboard once (before I found the roof) and I saw you trying to get rid of one that was living under your sink with a broom. I have never seen so much ridiculous fuss in my entire life. But it makes no difference to me how many legs something has, so I just eat them up whenever I find one, and any other thing that makes its way into the house without permission (aside from myself, of course!).`],

	["Interjection", `I’d just like to interject for a moment. What you’re refering to as Linux, is in fact, GNU/LInux, or as I’ve recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.

	Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called “Linux”, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.

	There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine’s resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called “Linux” distributions are really distributions of GNU/Linux.`],

	["Marx", ` Freeman and slave, patrician and plebeian, lord and serf, guild-master(3) and journeyman, in a word, oppressor and oppressed, stood in constant opposition to one another, carried on an uninterrupted, now hidden, now open fight, a fight that each time ended, either in a revolutionary reconstitution of society at large, or in the common ruin of the contending classes.

	In the earlier epochs of history, we find almost everywhere a complicated arrangement of society into various orders, a manifold gradation of social rank. In ancient Rome we have patricians, knights, plebeians, slaves; in the Middle Ages, feudal lords, vassals, guild-masters, journeymen, apprentices, serfs; in almost all of these classes, again, subordinate gradations.

	The modern bourgeois society that has sprouted from the ruins of feudal society has not done away with class antagonisms. It has but established new classes, new conditions of oppression, new forms of struggle in place of the old ones.

	Our epoch, the epoch of the bourgeoisie, possesses, however, this distinct feature: it has simplified class antagonisms. Society as a whole is more and more splitting up into two great hostile camps, into two great classes directly facing each other — Bourgeoisie and Proletariat.

	From the serfs of the Middle Ages sprang the chartered burghers of the earliest towns. From these burgesses the first elements of the bourgeoisie were developed. `]

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
