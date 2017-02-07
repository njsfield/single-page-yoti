# Childline - Report explicit online content

A web app for reporting explicit online images to the (IWF)[https://www.iwf.org.uk/] (Internet Watch Foundation).


## Current Approach

Under 18s can report explicit online content to a Childline counsellor. However, they can olny help on condition
that the young person emails them their passport to prove their age. This is an outdated and cumbersome process.
This process can deter young people from reporting explicit images. Either they can feel uncomfortable to reveal their identity, or they think the process is too complicated.

For further reading visit the [Childline website](https://www.childline.org.uk/info-advice/bullying-abuse-safety/online-mobile-safety/sexting/)

## How our app can help

Our app uses YOTI for identifications and login.

**Why it beneficial to use YOTI**
The app uses YOTI to:
- prove that the young person is under 18
- prove the young persons identity while protecting their anonimity. The app would only store their
remember me id, which is a unique identifier. So we only check that they have an accepted personal identification document on their YOTI account, but the app doesn't require access to any of their personal details.

## Development Resources & Notes

### Websites

- [Childline website](https://www.childline.org.uk/info-advice/bullying-abuse-safety/online-mobile-safety/sexting/) - Use for colour schemes as it is already 'proven for use case'.
  * Colours:
```css
  #00a1d0
  #73cfe8
  #234f62
  #632c7a
  #eb5857
```
- [IWF online form](https://www.iwf.org.uk/) - This form takes a minimum of 5 interactions with Childline website. It is very difficult to find...

### Libraries

- [animate css](https://daneden.github.io/animate.css/) - include *simple* animations for smooth page transitions, however keeping it basic to ensure the user feels taken seriously.
- [materialize css](http://materializecss.com/buttons.html) - css library for key components.

### Prototype tech stack

- Node Hapi.js server
- client side rendering

### Future tech stack
