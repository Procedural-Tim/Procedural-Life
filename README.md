# Procedural-Life

A hobby project that aims to create an interconnected world via procedural generation and a set of configuration files. From D and D to RPGs the goal is to make your world feel lived in without having to build every npc, knife, town, etc your self.

# Notes
As a hobby project certain things should be noted.
* Decisions are based on what I find interesting, not what would be best in a professional environment.
* Configurations are very simplified, ie I have simplified sex to only M/F. This is not meant to be commentary but is instead a reflection of my limited time.

# Components
## Core
The engine that builds the graph of procedurally generated nodes
## Nodes
The different things you configure to generate your data
### Node
The single configured node export by the files. Exported as a named property.
### functions
Utility functions used by the node, functions always get dependencies passed as the first parameter, they should not be exported.

## Static
Static resources

Each type in nodes shoulder return a JSON object.
## Generated
Where it all gets put
## Story
Turns all that data into story elements
Long term goal
## Quest
Generates a set of quests based on the data
Long term goal
## API
For connecting other programs to the data
Long term goal
## Time
For advancing time, basically adds a layer of simulation on top of everything.
Long term goal
