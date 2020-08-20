import { text } from 'hyperapp';
import { header, h1 } from '@hyperapp/html';

export default () => header({ class: 'header' }, [h1({}, text('todos'))]);
