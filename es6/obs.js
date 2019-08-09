//发布者的事件
let pub = {
    publish () {
        dep.notify()
    }
}

//订阅者，多个
let sub1 = { update () { console.log(111) } }
let sub2 = { update () { console.log(222) } }
let sub3 = { update () { console.log(333) } }


//一个主题对象
function Dep() { 
    this.subs = [sub1, sub2, sub3]
}

Dep.prototype.notify = function () { 
    let _sub = this.subs
    for (let i = 0; i < _sub.length; i++) {
        _sub[i].update()
    }
}

//
let dep = new Dep()
pub.publish()