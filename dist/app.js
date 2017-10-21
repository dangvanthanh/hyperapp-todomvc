(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var i;
var stack = [];

function h(type, props) {
  var node;
  var children = [];

  for (i = arguments.length; i-- > 2;) {
    stack.push(arguments[i]);
  }

  while (stack.length) {
    if (Array.isArray(node = stack.pop())) {
      for (i = node.length; i--;) {
        stack.push(node[i]);
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(typeof node === "number" ? node = node + "" : node);
    }
  }

  return typeof type === "string" ? { type: type, props: props || {}, children: children } : type(props || {}, children);
}

function app(props, container) {
  var root = (container = container || document.body).children[0];
  var node = toVNode(root, [].map);
  var callbacks = [];
  var skipRender;
  var globalState;
  var globalActions;

  repaint(flush(init(props, globalState = {}, globalActions = {})));

  return globalActions;

  function repaint() {
    if (props.view && !skipRender) {
      requestAnimationFrame(render, skipRender = !skipRender);
    }
  }

  function render() {
    flush(root = patchElement(container, root, node, node = props.view(globalState, globalActions), skipRender = !skipRender));
  }

  function flush(cb) {
    while (cb = callbacks.pop()) {
      cb();
    }
  }

  function toVNode(element, map) {
    return element && h(element.tagName.toLowerCase(), {}, map.call(element.childNodes, function (element) {
      return element.nodeType === 3 ? element.nodeValue : toVNode(element, map);
    }));
  }

  function init(module, state, actions) {
    if (module.init) {
      callbacks.push(function () {
        module.init(state, actions);
      });
    }

    assign(state, module.state);

    initActions(state, actions, module.actions);

    for (var i in module.modules) {
      init(module.modules[i], state[i] = {}, actions[i] = {});
    }
  }

  function initActions(state, actions, source) {
    Object.keys(source || {}).map(function (i) {
      if (typeof source[i] === "function") {
        actions[i] = function (data) {
          return typeof (data = source[i](state, actions, data)) === "function" ? data(update) : update(data);
        };
      } else {
        initActions(state[i] || (state[i] = {}), actions[i] = {}, source[i]);
      }
    });

    function update(data) {
      return typeof data === "function" ? update(data(state)) : data && repaint(assign(state, data)), state;
    }
  }

  function assign(target, source) {
    for (var i in source) {
      target[i] = source[i];
    }
    return target;
  }

  function merge(target, source) {
    return assign(assign({}, target), source);
  }

  function createElement(node, isSVG) {
    if (typeof node === "string") {
      var element = document.createTextNode(node);
    } else {
      var element = (isSVG = isSVG || node.type === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", node.type) : document.createElement(node.type);

      if (node.props && node.props.oncreate) {
        callbacks.push(function () {
          node.props.oncreate(element);
        });
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i], isSVG));
      }

      for (var i in node.props) {
        setElementProp(element, i, node.props[i]);
      }
    }
    return element;
  }

  function setElementProp(element, name, value, oldValue) {
    if (name === "key") {} else if (name === "style") {
      for (var name in merge(oldValue, value = value || {})) {
        element.style[name] = value[name] || "";
      }
    } else {
      try {
        element[name] = value;
      } catch (_) {}

      if (typeof value !== "function") {
        if (value) {
          element.setAttribute(name, value);
        } else {
          element.removeAttribute(name);
        }
      }
    }
  }

  function updateElement(element, oldProps, props) {
    for (var i in merge(oldProps, props)) {
      var value = props[i];
      var oldValue = i === "value" || i === "checked" ? element[i] : oldProps[i];

      if (value !== oldValue) {
        value !== oldValue && setElementProp(element, i, value, oldValue);
      }
    }

    if (props && props.onupdate) {
      callbacks.push(function () {
        props.onupdate(element, oldProps);
      });
    }
  }

  function removeElement(parent, element, props) {
    if (props && props.onremove && typeof (props = props.onremove(element)) === "function") {
      props(remove);
    } else {
      remove();
    }

    function remove() {
      parent.removeChild(element);
    }
  }

  function getKey(node) {
    if (node && node.props) {
      return node.props.key;
    }
  }

  function patchElement(parent, element, oldNode, node, isSVG, nextSibling) {
    if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element);
    } else if (node.type != null && node.type === oldNode.type) {
      updateElement(element, oldNode.props, node.props);

      isSVG = isSVG || node.type === "svg";

      var len = node.children.length;
      var oldLen = oldNode.children.length;
      var oldKeyed = {};
      var oldElements = [];
      var keyed = {};

      for (var i = 0; i < oldLen; i++) {
        var oldElement = oldElements[i] = element.childNodes[i];
        var oldChild = oldNode.children[i];
        var oldKey = getKey(oldChild);

        if (null != oldKey) {
          oldKeyed[oldKey] = [oldElement, oldChild];
        }
      }

      var i = 0;
      var j = 0;

      while (j < len) {
        var oldElement = oldElements[i];
        var oldChild = oldNode.children[i];
        var newChild = node.children[j];

        var oldKey = getKey(oldChild);
        if (keyed[oldKey]) {
          i++;
          continue;
        }

        var newKey = getKey(newChild);

        var keyedNode = oldKeyed[newKey] || [];

        if (null == newKey) {
          if (null == oldKey) {
            patchElement(element, oldElement, oldChild, newChild, isSVG);
            j++;
          }
          i++;
        } else {
          if (oldKey === newKey) {
            patchElement(element, keyedNode[0], keyedNode[1], newChild, isSVG);
            i++;
          } else if (keyedNode[0]) {
            element.insertBefore(keyedNode[0], oldElement);
            patchElement(element, keyedNode[0], keyedNode[1], newChild, isSVG);
          } else {
            patchElement(element, oldElement, null, newChild, isSVG);
          }

          j++;
          keyed[newKey] = newChild;
        }
      }

      while (i < oldLen) {
        var oldChild = oldNode.children[i];
        var oldKey = getKey(oldChild);
        if (null == oldKey) {
          removeElement(element, oldElements[i], oldChild.props);
        }
        i++;
      }

      for (var i in oldKeyed) {
        var keyedNode = oldKeyed[i];
        var reusableNode = keyedNode[1];
        if (!keyed[reusableNode.props.key]) {
          removeElement(element, keyedNode[0], reusableNode.props);
        }
      }
    } else if (element && node !== element.nodeValue) {
      if (typeof node === "string" && typeof oldNode === "string") {
        element.nodeValue = node;
      } else {
        element = parent.insertBefore(createElement(node, isSVG), nextSibling = element);
        removeElement(parent, nextSibling, oldNode.props);
      }
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
  input: function input(state, actions, _ref) {
    var value = _ref.value;
    return {
      input: value
    };
  },
  add: function add(state) {
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
  },
  editUpdate: function editUpdate(state, actions, _ref2) {
    var uuid$$1 = _ref2.uuid,
        value = _ref2.value;

    var todos = assignTodoById(state.todos, uuid$$1, { editing: false, value: value });
    store.save(todos);
    return {
      todos: todos
    };
  },
  editEnter: function editEnter(state, actions, _ref3) {
    var uuid$$1 = _ref3.uuid,
        e = _ref3.e;

    actions.editEnterDbClick(uuid$$1);
    actions.editEnterFocus(e);
  },
  editEnterDbClick: function editEnterDbClick(state, actions, uuid$$1) {
    var todos = assignTodoById(state.todos, uuid$$1, { editing: true });
    store.save(todos);
    return {
      todos: todos
    };
  },
  editEnterFocus: function editEnterFocus(state, actions, e) {
    var input = e.target.parentNode.parentNode.querySelector('.edit');
    input.focus();
  },
  remove: function remove(state, actions, _ref4) {
    var uuid$$1 = _ref4.uuid;

    var todos = state.todos.filter(function (t) {
      return uuid$$1 !== t.id;
    });
    store.save(todos);
    return {
      todos: todos
    };
  },
  toggle: function toggle(state, actions, _ref5) {
    var uuid$$1 = _ref5.uuid;

    var todos = state.todos.map(function (t) {
      return uuid$$1 === t.id ? Object.assign({}, t, { done: !t.done }) : t;
    });
    store.save(todos);
    return {
      todos: todos
    };
  },
  toggleAll: function toggleAll(state, actions, e) {
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
  },
  filter: function filter(state, actions, _ref6) {
    var value = _ref6.value;
    return { filter: value };
  },
  clearCompleted: function clearCompleted(state) {
    var todos = state.todos.filter(function (t) {
      return !t.done;
    });
    store.save(todos);
    return {
      todos: todos
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





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

function wrap(classes, prefix) {
  var value;
  var className = "";
  var type = typeof classes === "undefined" ? "undefined" : _typeof(classes);

  if (classes && type === "string" || type === "number") {
    return classes;
  }

  prefix = prefix || " ";

  if (Array.isArray(classes) && classes.length) {
    for (var i = 0, l = classes.length; i < l; i++) {
      if (value = wrap(classes[i], prefix)) {
        className += (className && prefix) + value;
      }
    }
  } else {
    for (var i in classes) {
      if (classes.hasOwnProperty(i) && (value = classes[i])) {
        className += (className && prefix) + i + ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? wrap(value, prefix + i) : "");
      }
    }
  }

  return className;
}

var TodoItem = (function (props) {
  return h(
    'li',
    { 'class': wrap(['todo', { 'completed': props.todo.done, 'editing': props.todo.editing }]),
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
        } }),
      h(
        'label',
        { ondblclick: function ondblclick(e) {
            return props.actions.editEnter({ uuid: props.todo.id, e: e });
          } },
        props.todo.value
      ),
      h('button', { 'class': 'destroy', onclick: function onclick(e) {
          return props.actions.remove({ uuid: props.todo.id });
        } })
    ),
    h('input', {
      type: 'text',
      'class': 'edit',
      onkeyup: function onkeyup(e) {
        return e.keyCode === 13 ? props.actions.editUpdate({ uuid: props.todo.id, value: e.target.value }) : null;
      },
      onblur: function onblur(e) {
        return props.actions.editUpdate({ uuid: props.todo.id, value: e.target.value });
      },
      value: props.todo.value })
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

var init = function init(state$$1) {
  state$$1.todos = store.fetch();
  state$$1.todos = state$$1.todos.map(function (todo) {
    todo.editing = false;
    return todo;
  });
};

app({ init: init, state: state, actions: actions, view: view }, document.getElementById('app'));

})));
//# sourceMappingURL=app.js.map
