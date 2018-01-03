(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.app = {})));
}(this, (function (exports) { 'use strict';

function h(name, props) {
  var node;
  var children = [];

  for (var stack = [], i = arguments.length; i-- > 2;) {
    stack.push(arguments[i]);
  }

  while (stack.length) {
    if (Array.isArray(node = stack.pop())) {
      for (var i = node.length; i--;) {
        stack.push(node[i]);
      }
    } else if (node == null || node === true || node === false) {} else {
      children.push(node);
    }
  }

  return typeof name === "string" ? {
    name: name,
    props: props || {},
    children: children
  } : name(props || {}, children);
}

function app(state, actions, view, container) {
  var patchLock;
  var lifecycle = [];
  var root = container && container.children[0];
  var node = vnode(root, [].map);

  repaint(init([], state = copy(state), actions = copy(actions)));

  return actions;

  function vnode(element, map) {
    return element && {
      name: element.nodeName.toLowerCase(),
      props: {},
      children: map.call(element.childNodes, function (element) {
        return element.nodeType === 3 ? element.nodeValue : vnode(element, map);
      })
    };
  }

  function render(next) {
    patchLock = !patchLock;
    next = view(state, actions);

    if (container && !patchLock) {
      root = patch(container, root, node, node = next);
    }

    while (next = lifecycle.pop()) {
      next();
    }
  }

  function repaint() {
    if (!patchLock) {
      patchLock = !patchLock;
      setTimeout(render);
    }
  }

  function copy(a, b) {
    var target = {};

    for (var i in a) {
      target[i] = a[i];
    }for (var i in b) {
      target[i] = b[i];
    }return target;
  }

  function set(path, value, source, target) {
    if (path.length) {
      target[path[0]] = 1 < path.length ? set(path.slice(1), value, source[path[0]], {}) : value;
      return copy(source, target);
    }
    return value;
  }

  function get(path, source) {
    for (var i = 0; i < path.length; i++) {
      source = source[path[i]];
    }
    return source;
  }

  function init(path, slice, actions) {
    for (var key in actions) {
      typeof actions[key] === "function" ? function (key, action) {
        actions[key] = function (data) {
          slice = get(path, state);

          if (typeof (data = action(data)) === "function") {
            data = data(slice, actions);
          }

          if (data && data !== slice && !data.then) {
            repaint(state = set(path, copy(slice, data), state, {}));
          }

          return data;
        };
      }(key, actions[key]) : init(path.concat(key), slice[key] = slice[key] || {}, actions[key] = copy(actions[key]));
    }
  }

  function getKey(node) {
    return node && node.props ? node.props.key : null;
  }

  function setElementProp(element, name, value, oldValue) {
    if (name === "key") {} else if (name === "style") {
      for (var i in copy(oldValue, value)) {
        element[name][i] = value == null || value[i] == null ? "" : value[i];
      }
    } else {
      try {
        element[name] = value == null ? "" : value;
      } catch (_) {}

      if (typeof value !== "function") {
        if (value == null || value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value);
        }
      }
    }
  }

  function createElement(node, isSVG) {
    var element = typeof node === "string" || typeof node === "number" ? document.createTextNode(node) : (isSVG = isSVG || node.name === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", node.name) : document.createElement(node.name);

    if (node.props) {
      if (node.props.oncreate) {
        lifecycle.push(function () {
          node.props.oncreate(element);
        });
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i], isSVG));
      }

      for (var name in node.props) {
        setElementProp(element, name, node.props[name]);
      }
    }

    return element;
  }

  function updateElement(element, oldProps, props) {
    for (var name in copy(oldProps, props)) {
      if (props[name] !== (name === "value" || name === "checked" ? element[name] : oldProps[name])) {
        setElementProp(element, name, props[name], oldProps[name]);
      }
    }

    if (props.onupdate) {
      lifecycle.push(function () {
        props.onupdate(element, oldProps);
      });
    }
  }

  function removeChildren(element, node, props) {
    if (props = node.props) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i]);
      }

      if (props.ondestroy) {
        props.ondestroy(element);
      }
    }
    return element;
  }

  function removeElement(parent, element, node, cb) {
    function done() {
      parent.removeChild(removeChildren(element, node));
    }

    if (node.props && (cb = node.props.onremove)) {
      cb(element, done);
    } else {
      done();
    }
  }

  function patch(parent, element, oldNode, node, isSVG, nextSibling) {
    if (node === oldNode) {} else if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element);
    } else if (node.name && node.name === oldNode.name) {
      updateElement(element, oldNode.props, node.props);

      var oldElements = [];
      var oldKeyed = {};
      var newKeyed = {};

      for (var i = 0; i < oldNode.children.length; i++) {
        oldElements[i] = element.childNodes[i];

        var oldChild = oldNode.children[i];
        var oldKey = getKey(oldChild);

        if (null != oldKey) {
          oldKeyed[oldKey] = [oldElements[i], oldChild];
        }
      }

      var i = 0;
      var j = 0;

      while (j < node.children.length) {
        var oldChild = oldNode.children[i];
        var newChild = node.children[j];

        var oldKey = getKey(oldChild);
        var newKey = getKey(newChild);

        if (newKeyed[oldKey]) {
          i++;
          continue;
        }

        if (newKey == null) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChild, newChild, isSVG);
            j++;
          }
          i++;
        } else {
          var recyledNode = oldKeyed[newKey] || [];

          if (oldKey === newKey) {
            patch(element, recyledNode[0], recyledNode[1], newChild, isSVG);
            i++;
          } else if (recyledNode[0]) {
            patch(element, element.insertBefore(recyledNode[0], oldElements[i]), recyledNode[1], newChild, isSVG);
          } else {
            patch(element, oldElements[i], null, newChild, isSVG);
          }

          j++;
          newKeyed[newKey] = newChild;
        }
      }

      while (i < oldNode.children.length) {
        var oldChild = oldNode.children[i];
        if (getKey(oldChild) == null) {
          removeElement(element, oldElements[i], oldChild);
        }
        i++;
      }

      for (var i in oldKeyed) {
        if (!newKeyed[oldKeyed[i][1].props.key]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1]);
        }
      }
    } else if (node.name === oldNode.name) {
      element.nodeValue = node;
    } else {
      element = parent.insertBefore(createElement(node, isSVG), nextSibling = element);
      removeElement(parent, nextSibling, oldNode);
    }
    return element;
  }
}

var FILTERINFO = { All: 0, Active: 1, Completed: 2 };

var uuid = function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

var assignTodoById = function assignTodoById(todos, id) {
  var todoItem = arguments.length <= 2 ? undefined : arguments[2];
  return todos.map(function (t) {
    return id === t.id ? Object.assign({}, t, todoItem) : t;
  });
};

var STORAGE_KEY = 'todos-hyperapp';

var store = {
  fetch: function fetch() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save: function save(todos) {
    return localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

var actions = {
  input: function input(_ref) {
    var value = _ref.value;
    return function (state) {
      return {
        input: value
      };
    };
  },
  add: function add() {
    return function (state) {
      var todos = state.todos.concat({
        id: uuid(),
        done: false,
        editing: false,
        value: state.input
      });
      store.save(todos);
      return {
        input: '',
        todos: todos
      };
    };
  },
  editUpdate: function editUpdate(_ref2) {
    var uuid$$1 = _ref2.uuid,
        value = _ref2.value;
    return function (state, actions) {
      var todos = assignTodoById(state.todos, uuid$$1, {
        editing: false,
        value: value
      });
      store.save(todos);
      return {
        todos: todos
      };
    };
  },
  editEnter: function editEnter(_ref3) {
    var uuid$$1 = _ref3.uuid,
        e = _ref3.e;
    return function (state, actions) {
      actions.editEnterDbClick(uuid$$1);
      actions.editEnterFocus(e);
    };
  },
  editEnterDbClick: function editEnterDbClick(uuid$$1) {
    return function (state, actions) {
      var todos = assignTodoById(state.todos, uuid$$1, { editing: true });
      store.save(todos);
      return {
        todos: todos
      };
    };
  },
  editEnterFocus: function editEnterFocus(e) {
    return function (state, actions) {
      var input = e.target.parentNode.parentNode.querySelector('.edit');
      input.focus();
    };
  },
  remove: function remove(_ref4) {
    var uuid$$1 = _ref4.uuid;
    return function (state, actions) {
      var todos = state.todos.filter(function (t) {
        return uuid$$1 !== t.id;
      });
      store.save(todos);
      return {
        todos: todos
      };
    };
  },
  toggle: function toggle(_ref5) {
    var uuid$$1 = _ref5.uuid;
    return function (state, actions) {
      var todos = state.todos.map(function (t) {
        return uuid$$1 === t.id ? Object.assign({}, t, { done: !t.done }) : t;
      });
      store.save(todos);
      return {
        todos: todos
      };
    };
  },
  toggleAll: function toggleAll(e) {
    return function (state, actions) {
      var isCheckedAll = e.target.previousSibling.checked;
      isCheckedAll = !isCheckedAll;
      var todos = state.todos.map(function (t) {
        t.done = isCheckedAll;
        return t;
      });
      store.save(todos);
      return {
        todos: todos
      };
    };
  },
  filter: function filter(_ref6) {
    var value = _ref6.value;
    return function (state, actions) {
      return { filter: value };
    };
  },
  clearCompleted: function clearCompleted() {
    return function (state) {
      var todos = state.todos.filter(function (t) {
        return !t.done;
      });
      store.save(todos);
      return {
        todos: todos
      };
    };
  }
};

var state = {
  input: '',
  placeholder: 'What needs to be done?',
  todos: [],
  filter: FILTERINFO.All
};

var TodoHeader = (function () {
  return h(
    "header",
    { className: "header" },
    h(
      "h1",
      null,
      "todos"
    )
  );
});

var TodoFooter = (function () {
  return h(
    "footer",
    { className: "info" },
    h(
      "p",
      null,
      "Double-click to edit a todo"
    ),
    h(
      "p",
      null,
      "Written by ",
      h(
        "a",
        { href: "http://dangthanh.org" },
        "Dang Van Thanh"
      )
    ),
    h(
      "p",
      null,
      "Part of ",
      h(
        "a",
        { href: "http://todomvc.com" },
        "TodoMVC"
      )
    )
  );
});

var TodoInput = (function (props) {
  return h(
    "div",
    null,
    h("input", {
      type: "text",
      "class": "new-todo",
      onkeyup: function onkeyup(e) {
        return e.keyCode === 13 && e.target.value !== '' ? props.actions.add() : null;
      },
      oninput: function oninput(e) {
        return props.actions.input({ value: e.target.value });
      },
      value: props.state.input,
      placeholder: props.state.placeholder,
      autofocus: true })
  );
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function cc(classes, prefix) {
  var value;
  var className = "";
  var type = typeof classes === "undefined" ? "undefined" : _typeof(classes);

  if (classes && type === "string" || type === "number") {
    return classes;
  }

  prefix = prefix || " ";

  if (Array.isArray(classes) && classes.length) {
    for (var i = 0, len = classes.length; i < len; i++) {
      if (value = cc(classes[i], prefix)) {
        className += (className && prefix) + value;
      }
    }
  } else {
    for (var i in classes) {
      if (classes.hasOwnProperty(i) && (value = classes[i])) {
        className += (className && prefix) + i + ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? cc(value, prefix + i) : "");
      }
    }
  }

  return className;
}

var TodoItem = (function (props) {
  return h(
    'li',
    {
      'class': cc(['todo', { completed: props.todo.done, editing: props.todo.editing }]),
      key: props.todo.id },
    h(
      'div',
      { className: 'view' },
      h('input', {
        type: 'checkbox',
        'class': 'toggle',
        checked: props.todo.done ? true : false,
        onclick: function onclick(e) {
          return props.actions.toggle({ uuid: props.todo.id });
        }
      }),
      h(
        'label',
        {
          ondblclick: function ondblclick(e) {
            return props.actions.editEnter({ uuid: props.todo.id, e: e });
          } },
        props.todo.value
      ),
      h('button', {
        'class': 'destroy',
        onclick: function onclick(e) {
          return props.actions.remove({ uuid: props.todo.id });
        }
      })
    ),
    h('input', {
      type: 'text',
      'class': 'edit',
      onkeyup: function onkeyup(e) {
        return e.keyCode === 13 ? props.actions.editUpdate({
          uuid: props.todo.id,
          value: e.target.value
        }) : null;
      },
      onblur: function onblur(e) {
        return props.actions.editUpdate({ uuid: props.todo.id, value: e.target.value });
      },
      value: props.todo.value
    })
  );
});

var TodoList = (function (props) {
  return h(
    'ul',
    { 'class': 'todo-list' },
    props.todos.filter(function (t) {
      return props.filter === FILTERINFO.Completed ? t.done : props.filter === FILTERINFO.Active ? !t.done : props.filter === FILTERINFO.All;
    }).map(function (todo) {
      return h(TodoItem, { todo: todo, actions: props.actions });
    })
  );
});

var TodoClearButton = (function (props) {
  return h(
    "button",
    { className: "clear-completed", onclick: props.clearCompleted },
    "Clear completed"
  );
});

var TodoFilter = (function (props) {
  return h(
    'footer',
    { className: 'footer' },
    h(
      'span',
      { className: 'todo-count' },
      props.state.todos.filter(function (t) {
        return !t.done;
      }).length,
      ' item left'
    ),
    h(
      'ul',
      { className: 'filters' },
      Object.keys(FILTERINFO).map(function (key) {
        return h(
          'li',
          null,
          h(
            'a',
            {
              href: '#',
              'class': props.state.filter === FILTERINFO[key] ? 'selected' : '',
              onclick: function onclick() {
                return props.actions.filter({ value: FILTERINFO[key] });
              } },
            key
          )
        );
      })
    ),
    props.state.todos.filter(function (t) {
      return t.done;
    }).length > 0 ? h(TodoClearButton, { clearCompleted: props.actions.clearCompleted }) : ''
  );
});

var TodoToggleAll = (function (props) {
  return h(
    "div",
    null,
    h("input", { type: "checkbox", className: "toggle-all", id: "toggle-all" }),
    h(
      "label",
      { htmlFor: "toggle-all", onclick: function onclick(e) {
          return props.toggleAll(e);
        } },
      "Mark all as complete"
    )
  );
});

var view = (function (state, actions) {
  return h(
    'div',
    { 'class': 'container' },
    h(
      'section',
      { 'class': 'todoapp' },
      h(TodoHeader, null),
      h(TodoInput, { state: state, actions: actions }),
      h(
        'section',
        { className: 'main' },
        state.todos.filter(function (t) {
          return !t.done;
        }).length > 0 ? h(TodoToggleAll, { toggleAll: actions.toggleAll }) : '',
        h(TodoList, { todos: state.todos, actions: actions, filter: state.filter })
      ),
      h(TodoFilter, { state: state, actions: actions })
    ),
    h(TodoFooter, null)
  );
});

state.todos = store.fetch();
state.todos = state.todos.map(function (todo) {
  todo.editing = false;
  return todo;
});

var main = app(state, actions, view, document.getElementById('app'));

exports.main = main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=app.js.map
