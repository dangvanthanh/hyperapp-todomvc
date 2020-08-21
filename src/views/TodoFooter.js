import { h, text } from 'hyperapp';

export default () =>
  h('footer', { class: 'info' }, [
    h('p', {}, text('Double-click to edit a todo')),
    h('p', {}, [
      h('span', {}, text('Written by ')),
      h('a', { href: 'https://dangthanh.org' }, text('Dang Van Thanh'))
    ]),
    h('p', {}, [
      h('span', {}, text('Part of ')),
      h('a', { href: 'https://todomvc.com' }, text('TodoMVC'))
    ])
  ]);
