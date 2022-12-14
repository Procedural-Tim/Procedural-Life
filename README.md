# Procedural-Life

A hobby project that aims to create an interconnected world via procedural generation and a set of configuration files. From D and D to Computer RPGs the goal is to make your world feel lived in without having to build every npc, knife, town, etc your self.

# To run

1. Install node
1. Download the code from github
1. npm install
1. Make any changes you want to
1. from the command line at the top of the source code execute `npm run start`
1. Click the generate button

# Notes

## Hobby Project

- Decisions are based on what I find interesting, not what would be best in a professional environment.
- Configurations are simplified and best guesses, ie I have simplified sex to only M/F. This is not meant to be commentary but is instead a reflection of my limited time.
- When I say we I am refering to my metaphorical rubber ducky. Said ducky may be my spouse, the cat, or an actual rubber ducky.

## OS Support

I have only my personal laptop (windows) to test on, and so I have opted not work on distributions for other OS options. In theory though an individual could download the code from GitHub and then run make to generate the package for their OS then share it with less code savy friends. I do plan to eventually support other OS options.

## Trouble Shooting

- There is no overwrite protection, if you name two things the same thing they may stomp on each other
- Case matters

# Roadmap

## Version 1 (Pending work)

### The plan

- Attributes
  - Family names
  - profession cleanup/skill alignment
    - guilds
  - Associates
    - Love
    - Like
    - Indifferent
    - Dislike
    - Hate
  - stat cleanup, make it closer to source
  - 4 Blank attributes for customization by user
- CRUD
  - General CRUD
  - Favorites
  - Notes
- Design
  - Change layout
  - Change colors
- Expose root manifest
- Templates
- Pre Release
  - Spellcheck
  - Change to MIT
  - Look into publishing on steam
- Release!
- Post Release
  - Feedback and small fixes

## Version 2

- People have children
- data tags
- weighted data
- Expose datastores
- Expose schema and datastore only properties

## Version 3

- Expose more complex schema props

## Version 4

- Engine type support
- Crude story engine
- More configurable functions
- Expose schema
- Expose some functions

## Version Someday

- Story Engine
- Pic Engine
- Map Engine
- Dungeon Engine
- Quests Engine
- API
- Time

## TODOs
- Consider letting under 18 have some relationships, but then need to filter on their partners

## Technical TODO

- dependency met function
- move data into it's type
- move methods to their type folders
- redo good/evil and law/chaos to a numeric value. Constants make it a headache
- fix case sensative names for those operating systems that are case insensative
- Typescript
- React linter, catch things like useEffect dependencies
- Instance is getting overly complicated and needs a cleanup
- Debugger
- Move most to dynamic imports instead of the complexity of node to fe
- Unit tests
- Better theme
- Fix the folder structure so the build and configs more closely match each other

# Known Issues

- Generate can be spammed and it generates a proc for each
