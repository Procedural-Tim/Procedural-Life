# Procedural-Life

A hobby project that aims to create an interconnected world via procedural generation and a set of configuration files. From D and D to Computer RPGs the goal is to make your world feel lived in without having to build every npc, knife, town, etc your self.

# Notes

## Hobby Project

- Decisions are based on what I find interesting, not what would be best in a professional environment.
- Configurations are simplified and best guesses, ie I have simplified sex to only M/F. This is not meant to be commentary but is instead a reflection of my limited time.
- When I say we I am refering to my metaphorical rubber ducky. Said ducky may be my spouse, the cat, or an actual rubber ducky.

## Trouble Shooting

- There is a debug flag in core, right now it's hardcoded to off. Flip it on to get extra logging on generation for debugging purposes.
- There is no overwrite protection, if you name two things the same thing they may stomp on each other
- Case matters

# To run

1. Install node
1. Download the code from github
1. npm install
1. Make any changes you want to
1. from the command line at the top of the source code execute `npm run start`
1. Click the generate button 

# Roadmap (Very rough)

1. Templates
1. Friends
1. Close Friends
1. Enemies
1. Crude story module
1. Spellcheck literals
1. Consider using a database
1. Expose static variables so things like gender ratio can be more easily adjusted.

## Technical Stuff

1. Proper templating engine, probaly after eletron since that will drive a bunch of the ui
1. Typescript
1. Cleanup data so it fits a standard, including switching to all having weights just a weight of 1 if not supplied
1. Support weight 0
1. Debugger
1. Consider supporting Deno

## Beyond the Roadmap

- More sophisticated story generation
- Pic generation
- Map generation
- Dungeon generation
- Quests
- API
- Time

# Components

## Core

The engine that builds the graph of procedurally generated nodes

The manifest file points to a folder in configs to use.

## src/Configs

A collection of different pre made configs to use to generate data, or as an example to build your own from.

The manifest points to a specific file in types, note this is the FILE name not the export name.

Currently this only contains a D and D friendly config.

### src/Configs/<Name>/Type

A configuration that defines what a thing can be. Each type should have a single exported configuration. The generator will ignore every export except the first. Properties should never start with "_". "_" is used internally for things like "\_id". It also does not support sub folders at this point.

### src/Configs/<Name>/Functions

Utility functions to be used internally to the config.

When a function is invoked as a property of a type it is passed the dependency values in an array as the first parameter.

### src/Configs/<Name>/Data

Static resources, currently contains some internal functions, the plan is to remove or simplify this.

## ./Generated

Where it all gets put, contains a sample of the current generation. Currently uses your location in the console.
