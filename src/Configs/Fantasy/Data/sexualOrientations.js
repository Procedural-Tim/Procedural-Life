const sexualOrientationValues = {
    HOMOSEXUAL: "homosexual",
    BISEXUAL: "bisexual",
    OTHER: "other",
    HETEROSEXUAL: "heterosexual",
}

// Over simplefying for now to reduce the cascade affect this has on other calculated attributes
const sexualOrientations = [
    {
        value: sexualOrientationValues.HOMOSEXUAL,
        weight: 3,
    },{
        value: sexualOrientationValues.BISEXUAL,
        weight: 2,
    },
    {
        // When used in other attributes treated as accepting all types. This is a way over simplification
        // and is not fair to asexuals/aromantics. Fixing this would add a bunch more work though, 
        // since I would need something like asexual homoromantic, asexual biromantic... aromantic homosexual... etc.
        value: sexualOrientationValues.OTHER, 
        weight: 1
    },
    {
        value: sexualOrientationValues.HETEROSEXUAL,
        weight: 14
    }
  ]
  
  module.exports = { sexualOrientations, sexualOrientationValues }
  