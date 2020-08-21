import { h, text } from 'hyperapp';

export default () =>
  h('header', { class: 'header' }, [h('h1', {}, text('todos'))]);
