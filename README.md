# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Links

- Solution URL: [github repo](https://github.com/karthik2265/restcountries-fm-challenge)
- Live Site URL: [start](https://countries-tau-indol.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Desktop-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Scoped css

### What I learned

* Building static pages on server side using next.js
* getStaticPaths and getStaticProps don't work when you have a dependency on api in the next app because the build fails due to circular dependancy, i.e the build should be completed for the next app/server(api) to run -> the build can't be completed because getStaticPaths/getStaticProps has a dependancy on api which has not been deployed yet

### Continued development

* Started to learn design patterns in react
* Improving perfomance of react apps

## Author

- Frontend Mentor - [@karthik2265](https://www.frontendmentor.io/profile/karthik2265)
- Twitter - [@karthiksuryade2](https://twitter.com/karthiksuryade2)

### Questions

1) why type checking is not happening in getStaticProps

```js
export async function getStaticProps(context: any) {
  const countryName = context.params.countryName;
  const response = await fetch(`${server}/api/${countryName}`);
  const data = await response.json();
  return {
    props: { countryDetails: data },
  };
}
```

the data could be of any type and there are defined types for props in the component receiving the props

2) Is there a better way to do themeing?

