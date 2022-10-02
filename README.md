# Procedural-Life

A hobby project that aims to create an interconnected world via procedural generation and a set of configuration files. From D and D to RPGs the goal is to make your world feel lived in without having to build every npc, knife, town, etc your self.

# Notes

As a hobby project certain things should be noted.

- Decisions are based on what I find interesting, not what would be best in a professional environment.
- Configurations are very simplified, ie I have simplified sex to only M/F. This is not meant to be commentary but is instead a reflection of my limited time.

# To run

1. Install node
2. Download the code from github
3. Make any changes you want to
4. from the command line at the top of the source code run `node index.js`

# Roadmap (Very rough)

1. Config packages, ie Fantasy package
1. Spellcheck literals
1. Crude story module
1. Multiple node types
1. Dependencies between nodes
1. Electron
1. Templates
1. Consider using a database
1. Expose static variables so things like gender ratio can be more easily adjusted.

Technical List

1. Flesh out formatter
1. Add linter
1. Consider yarn
1. Consider supporting Deno

# Components

## Core

The engine that builds the graph of procedurally generated nodes

## Nodes

The different things you configure to generate your data

### Node

The single configured node export by the files. Exported as a named property.
This is currently a D&D friendly npc as a sample
Currently we only support working within the node and a single node

#### Planned functionality:

- Multiple node generation at once
- - Have one node use another node
- Multiple sample sets

### functions

Utility functions used by the node, functions always get dependencies passed as the first parameter, they should not be exported.

## Static

Static resources

## Generated

Where it all gets put

### Planned functionality:

- Make it relative to the app
- Make it configurable

## Story (Planned)

Turns all that data into story elements
Long term goal

## Templates (Planned)

Turn the generated file into html files for more human readable interaction

## Pics (Planned)

## GUI (Planned)

Turn it all into a package

## Quest (Planned)

Generates a set of quests based on the data
Long term goal

## API (Planned)

For connecting other programs to the data
Long term goal

## Time (Planned)

For advancing time, basically adds a layer of simulation on top of everything.
Long term goal
