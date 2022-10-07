// Traits in a subarray garuntee that only one option may ever be selected.
const traits = [
  // Stats
  ["Likes str", "Hates str"],
  ["Likes dex", "Hates dex"],
  ["Likes con", "Hates con"],
  ["Likes wis", "Hates wis"],
  ["Likes cha", "Hates cha"],
  ["Likes int", "Hates int"],
  // 7 Sins/Virtues
  // ["Lustful", "Chaste"], Adult only
  ["Gluttonous", "Modest Appatites"],
  ["Greedy", "Generous"],
  ["Slothfull", "Driven"],
  ["Wrathfull", "Patience"],
  ["Envious", "Empathic"],
  ["Prideful", "Humility"],
  // General
  ["Likes cats", "Hates cats"],
  ["Likes dogs", "Hates dogs"],
  ["Likes nature", "Hates nature"],
  ["Likes reading", "Hates reading"],
  ["Likes magic", "Hates magic"],
  ["Likes painting", "Hates painting"],
  ["Likes music", "Hates music"],
  ["Likes animals", "Hates animals"],
  ["Likes the city", "Hates the city"],
  ["Likes nature", "Hates nature"],
  ["Adventurous", "Cautious"],
  ["Cowardly", "Brave"],
  ["Anxious", "Accepting of Things"],
  ["Cheerful", "Gloomy"],
  ["Cruel", "Loving"],
  ["Introvert", "Extrovert"],
  ["Curious", "Disinterested"],
  ["Dependable", "Not Dependable"],
  ["Demanding", "Chill"],
  ["Determined", "Waffles"],
  ["Focused", "Distractable"],
  ["Honest", "Dishonest"],
  ["Respects Authority", "Hates Authority"],
  ["Bashful", "Shameless"],
  [
    "Friendly Demeanor",
    "Agressive Demeanor",
    "Bored Demeanor",
    "Hostile Demeanor",
  ],
  ["Gentle", "Hamfisted"],
  ["Creative", "Unimaginative"],
  ["Polite", "Rude"],
  ["Loyal", "Disloyal"],
  ["Messy", "Clean"],
  ["Mischevous"],
  ["Niave", "Wordly"],
  ["Mysterous", "Open"],
  ["Quiet", "Loud"],
  ["Serious", "Silly"],
  ["Stubborn"],
]

const adultTraits = [
  ["Drunkard", "Sober"],
  ["Lustful", "Chaste"],
  ["Sadist", "Masocist"],
  ["Sociopath", "Psycopath"],
]

module.exports = { traits, adultTraits }
