import { text } from 'hyperapp';
import { footer, p, a } from '@hyperapp/html';

export default () =>
  footer({ class: 'info' }, [
    p({}, text('Double-click to edit a todo')),
    p({}, [
      text('Written by '),
      a({ href: 'http://dangthanh.org' }, text('Dang Van Thanh')),
    ]),
    p({}, [
      text('Part of '),
      a({ href: 'http://todomvc.com' }, text('TodoMVC')),
    ]),
  ]);
