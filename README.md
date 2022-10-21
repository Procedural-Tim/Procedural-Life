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

1. Family pets
1. Typescript
1. data tags
1. weighted data
1. Templates
1. Expose root manifest
1. Expose datastores
1. organizations
1. racial names
1. racial family names
1. Friends
1. Close Friends
1. Enemies
1. Spellcheck
1. Consider lincse change to MIT
1. Look into publishing on steam
1. Release!

## Version 2

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

## Technical TODO

- Instance is getting overly complicated and needs a cleanup
- Debugger
- Unit tests
