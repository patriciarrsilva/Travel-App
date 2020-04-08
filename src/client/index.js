import { checkForName } from './js/nameChecker';
import { handleSubmit } from './js/formHandler';
import './styles/style.scss';
import img from './img/louvre.jpg';

const imageTag = document.getElementById('image');
imageTag.src = img;

export { checkForName, handleSubmit };
