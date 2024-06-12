## Running the app and tests

This project runs off of Create React App and all documentation for it can be found in this [readme](./CRA-README.md).

## Technical decisions

### Why Create React App (CRA)

CRA is a very consistent and reliable way to bootstrap a react project. Given the simplicity of the requirements and the fact that I needed to store the data in localstorage I decided it would be the fastest and easiest way to get up and running with this kind of project.

If there had been different requirements I might have considered a different approach, for example if the specification to store data in localstorage hadn't been there I might have used [Remix](https://remix.run/) instead. I would probably have given remix/next more consideration if performance was a greater issue for this task.

In the end though CRA allowed me to keep it simple and get up and running very quickly.

### Testing

I subscribe to the testing trophy approach as defined by Kent C Dodds, see [here](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) for a detailed breakdown.

I opted to write a single unit test for my reducer and a series of integration tests that covered the specific criteria mentioned in the task description.

I chose to write a unit test for my reducer as it's my source of truth for the data and I want to ensure that that is correct as it's the core of how the app works.

When writing my integration tests I wanted to cover two specific things, first that the user interactions met the criteria specified for the task, and also that localstorage matched what was expected as that was a criteria that was specified. It also provided a way to verify that the underlying data structure matched the expected values.

### Styling

I opted to use styled-components over something like tailwind simply because it's more compatible with create react app. If I'd used remix I'd probably would have used tailwind.

I specifically haven't made a lot of effort around the styling as it's not my strength. I've generally just tried to have reasonable spacing around elements.

### Add card form

I added this as a convenience factor and it does not represent how I would actually have a form work. If I were to do this properly I'd use something like [React Hook Form](https://www.react-hook-form.com/) and add validation and error messages.

### Code splitting

I've tried to split the code in two ways.

1. Domain
2. Components

#### Domain

The intent of domain is to hold business logic and to essentially be the source of truth from a data layer perspective. All the business rules from the task are managed here and where necessary they are called in the components. E.G. in the dragging/dropping components they call the domain layer to see if a card can be dragged or dropped.

#### Components

The idea here was to keep these components as simple as possible. Ideally these would all have been purely presentational but I needed to incorporate the React-dnd hooks in so these made them slightly more complex.
