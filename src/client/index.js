import { handleSubmit } from './js/application';
import './styles/style.scss';
import img from './media/louvre.jpg';

const imageTag = document.getElementById('image');
imageTag.src = img;

export { handleSubmit };
