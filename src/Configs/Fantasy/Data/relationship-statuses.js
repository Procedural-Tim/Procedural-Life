// TODO: Poly types, but that makes the partner function much more complicated so leaving it out
const relationshipStatusValues = {
    NA: "NA",
    SINGLE: "Single",
    WIDOWED: "Widowed",
    DATING: "Dating",
    COMPLICATED: "It's complicated",
    ENGAGED: "Engaged",
    MARRIED: "Married"
}

// Totally made up odds
const relationshipStatuses = [
    {
        value: relationshipStatusValues.SINGLE,
        weight: 30
    },{
        value: relationshipStatusValues.WIDOWED,
        weight: 5
    },{
        value: relationshipStatusValues.DATING,
        weight: 20
    },{
        value: relationshipStatusValues.COMPLICATED,
        weight: 10
    },{
        value: relationshipStatusValues.ENGAGED,
        weight: 5
    },{
        value: relationshipStatusValues.MARRIED,
        weight: 30
    },
] 

module.exports = { relationshipStatuses, relationshipStatusValues }
