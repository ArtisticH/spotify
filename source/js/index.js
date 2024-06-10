import { Intro, Header, RelTools, View, Spotlight, Inbox, Footer } from '../js/app';
import css from '../css/style.css';

const intro = new Intro();
new Header();
new RelTools();
new View();
const spotlight = new Spotlight();
const inbox = new Inbox();
const footer = new Footer();

document.addEventListener('DOMContentLoaded', intro.init);
document.body.addEventListener('keydown', spotlight.keydown);
window.addEventListener('scroll', spotlight.resize);
window.addEventListener('scroll', inbox.scroll);
footer.time();
setInterval(() => {
  footer.time();
}, 1000);

