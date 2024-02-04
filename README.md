## Sirma Solutions interview task (Employees)

Running the app:

### `npm install`

### `npm start`

I decided to use React with Typescript for the task, since I am most familiar with React as view library, but I am open to learning anything new :) I initially created the app with CRA, and then ejected it deciding to integrate build tool Vite JS. 

The jist functions and utils to the solution of the task are located in the utils/ folder. I will go through them and explain what they each do. I have also added a mock/employees.csv file as to what the app would expect for input (the same as in project requirements).

- `readCsv` - Parses a given csv file which is selected from the browser file picker, I decided to use papaparse a (third party lib) for the task.
- `parseDate` - Parses the dates from a the already parsed csv file. takes into consideration a value of NULL to express the current date.
- `isLonger` - Takes two date ranges ( 2 x { dateTo, dateFrom } ) and compares to see which is longer.
- `getDuration` - Finds the duration between two dates and returns the days, roundest to the nearest tenth.
- `calculateOverlap` - Calculates the overlap between two date ranges. For example, if employee1 has worked from year 2000 to year 2010 and employee2 has worked from year 2002 to year 2008. I first get the Math.max of both of the date ranges dateFrom and the Math.min of both of the date ranges dateTo. This will give me the overlap of the employees time working together (on a project). Hence, the result in the example will be 2002 -> 2008.
- `findLongestPair` - This is the heart of the algorithm. It returns a promise, in case the file to be parsed is long and will be expensive to calculate. First, I take the results of the parsed csv file (from papaparse), and add each row of the parsed result to an object which has keys as employee id's and values as an array of objects which has properties `{projectId, dateFrom, dateTo}`, this creates an easy to use object of `{ [empId]: [{project1, dateTo, dateFrom}...] }`. Continuing on I obtain the keys of the object, being all employee ids. Then I iterate over them, needing to compare all of the empId with the other employee ids, (to find the longest running overlap between the employees). I do this with two loops, outer loop starting from `i = 0` and running to `i < keys.length - 1`, inner loop starting from `j = i + 1` and running to `j < keys.length`, such that no two already compared employees will be checked again (for optimisation purposes). In the loop, I get all of the current iterations two employee projects, then filter them out to return only the common projects. After this for all of the common projects which were obtained I use them to get each individual employees stats for those projects (I do this in consideration that there are row entries which are for the same project but with different date ranges). I then run these through another util `findLongestRunningOverlap` this utils goes through all entries of each empoloyees common project rows and uses `calculateOverlap`, `isLonger`, and `getDuration` to find the longest overlapping range which they have between the iteration project. I store this value, and in the case in which a project with a longer duration is returned between two employees I store the newest longest duration between two employees, the two employees, and the project Id. Once these utils are ran for all of the employes which were parse I resolve the promise with the object, or rather catch and reject the promise with an error if something goes wrong along the way.


 As for the UI components, they are pretty basic. I have a `FileInput` component to obtain the file from the browser file picker. I have `Table` component to display the data obtained from the utils. I have a `Landing` page to be initial and only page in the app. For styling, I decided to go with css modules, structured as `Component.module.css`. The structure of my app is as follows:

```
.
├── components
│   ├── FileInput
│   │   ├── FileInput.module.css
│   │   └── FileInput.tsx
│   └── Table
│       ├── Table.module.css
│       └── Table.tsx
├── fonts
│   └── Rubik.ttf
├── mock
│   └── employees.csv
├── pages
│   └── Landing
│       ├── Landing.module.css
│       └── Landing.tsx
├── types
│   └── index.ts
├── utils
│   ├── calculateOverlap.ts
│   ├── findLongestPair.ts
│   ├── findLongestRunningOverlap.ts
│   ├── getDuration.ts
│   ├── isLonger.ts
│   ├── parseDate.ts
│   └── readCsv.ts
├── index.css
├── index.tsx
├── App.tsx
├── reportWebVitals.ts
├── setupTests.ts
└── vite-env.d.ts
```