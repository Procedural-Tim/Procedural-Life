# Design

- value: The literal value for the property, currently also serves as the label
- weight: Going forward `getRandomValue` is deprecated in favor of `getWeightedRandomValue` so we can pass the raw datastore and have the stored weight adjust probabilities
- tags: Currently unused, but the plan is to allow filtering based on tags
