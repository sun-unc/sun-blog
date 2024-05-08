---
theme: v-green
---

上篇文章中说了执行上下文包含词法环境、变量环境、this 绑定，下面就来逐个看一下

```javascript
ExecutionContext = {
  LexicalEnvironment = { ... },
  VariableEnvironment = { ... },
  ThisBinding = <this value>,
}
```

### 1、词法环境

简单来说，词法环境是保存标识符变量映射的结构。由**环境记录**和**对外部词法环境的引用**（可能为空）组成。可以抽象成这样 👇

```javascript
GlobalExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
    }
    outer: <null>
  }
}
FunctionExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
    }
    outer: <Global or outer function environment reference>
  }
}
```

**EnvironmentRecord（环境记录）**：环境记录存储了在当前上下文中声明的变量和函数的实际绑定（例如变量的名称和它的值）

**outer（外部词法环境引用）**：可以理解为上级作用域，是实现作用域链的关键部分

### 2、变量环境

变量环境也是一个词法环境，具有和词法环境相同的组成。

区别是：在 ES6 中**词法环境**是用来存储函数声明和变量（let & const）绑定；**变量环境**只存储变量（var）绑定

> Talk is cheap, show me the code 😄

```javascript
let a = 20;
const b = 30;
var c;
function multiply(e, f) {
  var g = 20;
  return e * f * g;
}
c = multiply(20, 30);
```

上面代码对应的执行上下文 👇

```javascript
GlobalExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    },
    outer: <null>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      c: undefined,
    },
    outer: <null>
  },
  ThisBinding: <Global Object>
}
```

`multiply(20, 30)`函数调用时，创建函数执行上下文 👇

```javascript
FunctionExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>
  },
  ThisBinding: <Global Object or undefined>
}
```

### 3、this 绑定

在日常开发中经常能用到 this，弄清楚 this 的指向是很有必要的。

1. 全局执行上下文中，this 指向全局对象
2. 函数执行上下文中，this 的值取决于函数是如何被调用的。如果是通过对象引用调用，则 this 指向该对象，否则，this 指向全局对象或 undefined(严格模式下)
3. 箭头函数没有 this 绑定，**箭头函数中的 this 是在定义时捕获了外层执行上下文中的 this 绑定，而不是在箭头函数执行时**

```javascript
globalThis.a = 100;
function fn() {
  return {
    a: 200,
    b: () => {
      // 这里的箭头函数中的this定义时指向了fn的执行上下文，所以说是在fn被调用时确定的
      console.log(this.a);
    },
    c: function () {
      console.log(this.a);
    },
    d: function () {
      return function () {
        console.log(this.a);
      };
    },
  };
}
const m = fn();
m.b(); // 100 this指向全局对象
m.c(); // 200 对象引用调用，this指向m
m.d()(); //100 相当于独立函数调用 this指向全局对象或undefined
```

```js
const obj = {
  fn() {
    // 这里的箭头函数是在函数fn里面定义的，而不是在setTimeout内部
    // 所以这里的this捕获了函数fn的执行上下文中的this绑定，即取决于fn如何被调用的
    setTimeout(() => {
      console.log(this);
    });
  },
};
obj.fn(); //this指向obj

const a = obj.fn;
a(); //this指向window
```

### 总结

#### 词法环境和变量环境

1. 词法环境用于定义变量和函数的标识符与其具体实例的映射，由环境记录（Environment Record）和外部词法环境引用（outer）组成。变量环境也是一个词法环境
2. `let`和`const`变量绑定存储在词法环境，`var`变量绑定存储在变量环境。
3. 环境记录存储了在作用域内的所有局部变量与函数声明的实际绑定。
4. 外部词法环境引用（outer）指向了外部的词法环境（即作用域），这样就形成了一个作用域链。

#### 执行上下文、词法环境、作用域链之间的关系

1. 执行上下文为代码的执行提供了环境，在这个环境中，词法环境决定了变量的访问范围，即作用域。
2. 当执行流进入一个块或函数时，它的执行上下文被创建，包括了一个与这个块或函数相关的词法环境和 this 绑定。
3. 词法环境会通过它的外部引用连接到外层的词法环境，这样就形成了一条链，即所谓的作用域链，它决定了如何查找变量。

简单理解，当代码执行时，执行上下文定义了词法环境，词法环境定义了变量和函数的作用域。这三者共同工作，确保代码正确地访问变量和函数。

#### this 指向问题

1. 全局执行上下文中，this 指向全局对象
2. 函数执行上下文中，this 的值取决于函数是如何被调用的。如果是通过对象引用调用，则 this 指向该对象，否则，this 指向全局对象或 undefined(严格模式下)
3. 箭头函数没有 this 绑定，箭头函数的 this 捕获了外层执行上下文中的 this 绑定

### 参考资料

- [ECMAScript® 2015 Language Specification](https://262.ecma-international.org/6.0/#sec-executable-code-and-execution-contexts)
- [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
