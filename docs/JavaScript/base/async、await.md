---
theme: v-green
---
### async
**async**其实是Promise的语法糖🍬，**async**函数总是返回一个Promise对象

```js
function fn() {
  return 1;
}
fn()
// 输出结果
// Promise {<fulfilled>: 1}
```
上面代码等价于

```js
async function fn() {
  return Promise.resolve(1);
}
```

### await
1. **await**必须在**async**函数内使用
2. **await**会暂停函数的执行，直到**await**后面跟着的Promise被resolved或rejected后将**await xxxx**后面的代码推入微任务队列
3. **await**可以理解为**then**的语法糖，因为await只会返回resolve的结果。看下面👇

```js
// 建议在使用async/await时加上try/catch来捕获报错
try {
    // 这里res只会拿到resolve的结果
    const res = await getSetupScoreAPI({
            classid,
            wallId,
            userScore: userRate.value
    })
    closeRatePopup()
} catch(err) {
    // 处理请求报错等reject行为
    console.log(err);
}
// 这里也是等待await有结果后执行
   ...
```
### 练习
good～看一下这个🌰吧：

```js
async function async1() {
	console.log(1);
	await async2();
	console.log(2);
}
async function async2() {
	console.log(3);
}
console.log(4);
setTimeout(() => {
	console.log(5);
}, 0);
async1();
new Promise(function (reslove) {
	console.log(6);
	reslove();
}).then(function () {
	console.log(7);
})
console.log(8);

// 正确输出结果：4、1、3、6、8、2、7、5
```
执行步骤如下
1. 执行同步代码，**输出4**
2. 遇到setTimeout，交由定时器线程处理，0秒后被`推入宏任务队列`等待执行，继续执行同步代码
3. 执行async1函数，**输出1**
4. 执行async2函数，**输出3**，这里的async2虽然没有返回值但等价于`return Promise.resolve(undefined)`，
5. `await async2();`中的async2执行完毕有结果了，所以将下面的代码 `console.log(2);` `推入微任务队列`等待执行
6. 执行 new Promise() 里的同步代码 **输出6**，将Promise状态设置为resolved
7. 将.then回调函数`推入微任务队列`等待执行
8. 执行同步代码 **输出8**
9. 同步代码执行完毕，执行栈为空，取出所有微任务依次执行，依次 **输出2、7**
10. 微任务队列清空后，执行下一轮事件循环♻️，取出一个宏任务放入执行栈执行，即 **输出5**

> ps：对于事件循环不清楚的，建议看一下前面的文章。
