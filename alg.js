function Stack() {
    this.items = []

    Stack.prototype.push = function (ele) {
        this.items.push(ele)
    }
    Stack.prototype.pop = function () {
        return this.items.pop()
    }
    Stack.prototype.peek = function () {
        return this.items[this.items.length-1]
    }
    Stack.prototype.isEmpty = function () {
        return this.items.length == 0
    }
    Stack.prototype.size = function () {
        return this.items.length
    }
    Stack.prototype.toString = function () {
        let res = ''
        for (let i = 0; i < this.items.length; i++) {
            res += this.items[i] + ' '
        }
        return res
    }
}

/* let s = new Stack()
s.push(20)
s.push(10)
s.push(200)
s.push(2000)
s.pop()
console.log(s.peek())
console.log(s.isEmpty())
console.log(s.size()) */

function Queue() {    
    this.items = []

    Queue.prototype.enqueue = function (ele) {
        this.items.push(ele)
    }
    Queue.prototype.dequeue = function () { 
        return this.items.shift()
    }
    Queue.prototype.front = function () {
        return this.items[0]
    }
    Queue.prototype.isEmpty = function () {
        return this.items.length == 0
    }
    Queue.prototype.size = function () {
        return this.items.length
    }
    Queue.prototype.toString = function () {
        let res = ''
        for (let i = 0; i < this.items.length; i++) {
            res += this.items[i] + ''
        }
        return res
    }
}

/* let queue = new Queue()
queue.enqueue('abc')
queue.enqueue('bnm')
queue.enqueue('asd')
console.log(queue.front())
console.log(queue.isEmpty())
console.log(queue.size())
console.log(queue.toString()) */

// 十进制转二进制,循环除2取余数
function dec2bin(decNum) {
    let stack = new Stack()

    while (decNum > 0) {
        stack.push(decNum % 2)
        decNum = Math.floor(decNum / 2)
    }
    let binStr = ''
    while (!stack.isEmpty()) {
        binStr += stack.pop()
    }

    return binStr
}

// console.log(dec2bin(10))

// 击鼓传花
function passGame(nameList, num) {
    let queue = new Queue()
    
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i])
    }
    while(queue.size() > 1) {
        for (let i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue()
    }
}

// passGame(['haha','hehe','xixi','huhu','lala'], 3)

// 优先级队列
function PriorQueue() {
    function QueueElement(element, priorty) { 
        this.element = element
        this.priorty = priorty
    }

    this.items = []

    PriorQueue.prototype.enqueue = function (element, priorty) {
        let queueElement = new QueueElement(element, priorty)
        if (this.items.length === 0) {
            this.items.push(queueElement)
        } else {
            let added = false
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].priorty < queueElement.priorty) {
                    this.items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if (!added) {
                this.items.push(queueElement)
            }
        }
    }
    PriorQueue.prototype.dequeue = function () { 
        return this.items.shift()
    }
    PriorQueue.prototype.front = function () {
        return this.items[0]
    }
    PriorQueue.prototype.isEmpty = function () {
        return this.items.length == 0
    }
    PriorQueue.prototype.size = function () {
        return this.items.length
    }
    PriorQueue.prototype.toString = function () {
        let res = ''
        for (let i = 0; i < this.items.length; i++) {
            res += this.items[i].element + '-' + this.items[i].priorty + ' '
        }
        return res
    }
}
/* let pq = new PriorQueue()
pq.enqueue('abc', 100)
pq.enqueue('bnm', 90)
pq.enqueue('dfg', 110)
pq.enqueue('bnm', 95)
console.log(pq) */

// 封装链表类
function LinkedList() {
    function Node(data) {
        this.data = data
        this.next = null
    }

    this.head = null
    this.length = 0

    LinkedList.prototype.append = function (data) {
        let newNode = new Node(data)
        if (this.length == 0) {
            this.head = newNode
        } else {
            let current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = newNode
        }
        this.length += 1
    }
    LinkedList.prototype.toString = function () {
        let current = this.head
        let listString = ""
        while (current) {
            listString += current.data + " "
            current = current.next
        }
        return listString
    }
    LinkedList.prototype.insert = function (position, data) {
        if (position < 0 || position > this.length) return false
        
        let newNode = new Node(data)
        if (position == 0) {
            newNode.next = this.head
            this.head = newNode
        } else {
            let index = 0
            let current = this.head
            let previous = null
            while (index++ < position) {
                previous = current
                current = current.next
            }
            newNode.next = current
            previous.next = newNode
        }

        this.length += 1
        return true
    }
    LinkedList.prototype.get = function (position) {
        if (position < 0 || position >= this.length) return null

        let current = this.head
        let index = 0
        while (index++ < position) {
            current = current.next
        }

        return current.data
    }
    LinkedList.prototype.indexOf = function (data) {
        let current = this.head
        let index = 0
        while (current){
            if (current.data == data) {
                return index
            }
            index += 1
            current = current.next
        }
        return -1
    }
    LinkedList.prototype.update = function (position, newData) {
        if (position < 0 || position >= this.length) return false

        let current = this.head
        let index = 0
        while (index++ < position) {
            current = current.next
        }
        current.data = newData

        return true
    }
    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) return null
        let current = this.head
        if (position === 0) {
            this.head = this.head.next
        } else {
            let previous = null, index = 0
            while (index++ < position) {
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        this.length -= 1
        return current.data
    }
    LinkedList.prototype.remove = function (data) {
        let position = this.indexOf(data)
        return this.removeAt(position)
    }
    LinkedList.prototype.isEmpty = function () {
        return this.length == 0
    }
    LinkedList.prototype.size = function () {
        return this.length
    }
}
/* let list =  new LinkedList()
list.append('aaa')
list.append('bbb')
list.append('ccc')
list.insert(2,'ddd')
console.log(list.get(0))
console.log(list.get(2))
list.update(0, "aa")
list.update(1, "bbbbbbbbbbbbb")
console.log(list.toString())
console.log(list.indexOf('bbb'))
console.log(list.removeAt(1))
console.log(list.toString())
console.log(list.remove("aa"))
console.log(list.toString())
console.log(list.isEmpty())
console.log(list.size()) */

function DoublyLinkedList() {
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }

    this.head = null
    this.tail = null
    this.length = 0

    DoublyLinkedList.prototype.append = function (data) {
        let newNode = new Node(data)

        if (this.length == 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }

        this.length += 1
    }
    DoublyLinkedList.prototype.toString = function () {
        return this.backwardString()
    }
    DoublyLinkedList.prototype.forwardString = function () {
        let current = this.tail
        let resultString = ""

        while (current) {
            resultString += current.data + " "
            current = current.prev
        }

        return resultString
    }
    DoublyLinkedList.prototype.backwardString = function () {
        let current = this.head
        let resultString = ""

        while (current) {
            resultString += current.data + " "
            current = current.next
        }

        return resultString
    }
    DoublyLinkedList.prototype.insert = function (position, data) {
        if (position < 0 || position > this.length) return false
        
        let newNode = new Node(data)
        if (this.length == 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            if (position == 0) {
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            } else if (position == this.length) {
                newNode.prev = this.tail
                this.tail.next = newNode
                this.tail = newNode
            } else {
                let current = this.head, index = 0
                while (index++ < position) {
                    current = current.next
                }
                newNode.prev = current.prev
                newNode.next = current
                current.prev.next = newNode
                current.prev = newNode
            }
        }

        this.length += 1
        return true
    }
    DoublyLinkedList.prototype.get = function (position) {
        if (position < 0 || position >= this.length) return null

        let current
        let range = this.length / 2
        if (position < range) {
            let index = 0
            current = this.head
            while (index++ < position) {
                current = current.next
            }
        } else {     
            let index = this.length - 1       
            current = this.tail
            while (index-- > position) {
                current = current.prev
            }
        }
        return current.data
    }
    DoublyLinkedList.prototype.indexOf = function (data) {
        let current = this.head, index = 0
        while (current) {
            if (current.data == data) {
                return index
            }
            current = current.next
            index += 1
        }
        return -1
    }
    DoublyLinkedList.prototype.update = function (position, newData) {
        if (position < 0 || position >= this.length) return false

        let current
        let range = this.length / 2
        if (position < range) {
            let index = 0
            current = this.head
            while (index++ < position) {
                current = current.next
            }
        } else {     
            let index = this.length - 1       
            current = this.tail
            while (index-- > position) {
                current = current.prev
            }
        }
        current.data = newData
        return true
    }
    DoublyLinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) return null

        let current = this.head

        if (this.length == 1) {
            this.head = null
            this.tail = null
        } else {
            if (position == 0) {
                this.head.next.prev = null
                this.head = this.head.next
            } else if (position == this.length - 1) {
                current = this.tail
                this.tail.prev.next = null
                this.tail = this.tail.prev
            } else {
                let index = 0

                while (index++ < position) {
                    current = current.next
                }

                current.prev.next = current.next
                current.next.prev = current.prev
            }
        }

        this.length -= 1
        return current.data
    }
    DoublyLinkedList.prototype.remove = function (data) {
        let index = this.indexOf(data)
        return this.removeAt(index)
    }
    DoublyLinkedList.prototype.isEmpty = function () {
        return this.length === 0
    }
    DoublyLinkedList.prototype.size = function () {
        return this.length
    }
    DoublyLinkedList.prototype.getHead = function () {
        return this.head.data
    }
    DoublyLinkedList.prototype.getTail = function () {
        return this.tail.data
    }
}

/* let list = new DoublyLinkedList()
list.append("hh")
list.append("jj")
list.append("kk")
list.append("ll")
console.log(list)
console.log(list.backwardString())
console.log(list.forwardString())
console.log(list.insert(0, "aaa"))
console.log(list.insert(2, "bbb"))
console.log(list.insert(6, "ccc"))
console.log(list.update(7, "vvv"))
console.log(list.toString())
console.log(list.removeAt(5))
console.log(list.toString())
console.log(list.remove("aaa"))
console.log(list.toString())
console.log(list.isEmpty())
console.log(list.size())
console.log(list.getHead())
console.log(list.getTail())
console.log(list.remove("kk"))
console.log(list.toString())
console.log(list.remove("bbb"))
console.log(list.toString())
console.log(list.get(6))
console.log(list.indexOf("d")) */

/* 封装集合类 */
function Set() {
    this.items = {}
    Set.prototype.add = function (value) {
        if (this.has(value)) return false
        this.items[value] = value
        return true
    }
    Set.prototype.has = function (value) {
        return this.items.hasOwnProperty(value)
    }
    Set.prototype.remove = function (value) {
        if (!this.has(value)) return false
        delete this.items[value]
        return true
    }
    Set.prototype.clear = function () {
        this.items = {}
    }
    Set.prototype.size = function () {
        return Object.keys(this.items).length
    }
    Set.prototype.values = function () {
        return Object.keys(this.items)
    }
    Set.prototype.union = function (otherSet) {
        let unionSet = new Set()

        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        values = otherSet.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        return unionSet
    }
    Set.prototype.intersect = function (otherSet) {
        let intersect = new Set()

        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersect.add(values[i])
            }
        }

        return intersect
    }
    Set.prototype.difference = function (otherSet) {
        let difference = new Set()

        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                difference.add(values[i])
            }
        }

        return difference
    }
    Set.prototype.subset = function (otherSet) {
        let values = this.values()

        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) return false
        }

        return true
    }
}

/* let set1 = new Set()
set1.add("hhh")
set1.add("rrr")
// set1.add("yyy")
console.log(set1)
let set2 = new Set()
set2.add("hhh")
set2.add("rrr")
set2.add("eee")
set2.add("rr")
console.log(set2)

let unionset = set1.union(set2)
console.log(unionset.values())

let intersect = set1.intersect(set2)
console.log(intersect.values())

let subset = set1.subset(set2)
console.log(subset)
// console.log(set.remove("yyy"))
// console.log(set.remove("yyy"))
// console.log(set.values())
// console.log(set.has('hhh'))
// console.log(set.size())
// set.clear()
// console.log(set.size()) */

// 字典封装类
function Dictionary () {
    this.items = {}

    Dictionary.prototype.set = function (key, value) {
        this.items[key] = value
    }
    Dictionary.prototype.has = function (key) {
        return this.items.hasOwnProperty(key)
    }
    Dictionary.prototype.remove = function (key) {
        if (!this.has(key)) return false
        delete this.items[key]
        return true
    }
    Dictionary.prototype.get = function (key) {
        return this.items.has(key) ? this.items[key] : undefined
    }
    Dictionary.prototype.keys = function (key, value) {
        return Object.keys(this.items)
    }
    Dictionary.prototype.values = function (key, value) {
        return Object.values(this.items)
    }
    Dictionary.prototype.size = function (key, value) {
        return this.keys().length
    }
    Dictionary.prototype.clear = function (key, value) {
        this.items = {}
    }
}



// 封装哈希表类
function HashTable() {
    this.storage = []
    this.count = 0
    this.limit = 7
    
    
    // 设计哈希函数
    HashTable.prototype.hashFunc = function (str, size) {
        let hashCode = 0

        for (let i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }

        let index = hashCode % size

        return index
    }
    // 插入&修改操作
    HashTable.prototype.put = function (key, value) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index]

        if (bucket == null) {
            bucket = []
            this.storage[index] = bucket
        }

        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0]) {
                tuple[1] = value
                return
            }
        }

        bucket.push([key, value])
        this.count += 1

        if (this.count > this.limit * 0.75) {
            let newSize = this.limit * 2
            let newPrime = this.getPrime(newSize)
            this.resize(newPrime)
        }
    }
    HashTable.prototype.get = function (key) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index]

        if (bucket == null) {
            return null
        }

        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] == key) {
                return tuple[1]
            }
        }

        return null
    }
    HashTable.prototype.remove = function (key) {
        let index = this.hashFunc(key, this.limit)
        let bucket = this.storage[index]

        if (bucket == null) {
            return null
        }

        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] == key) {
                bucket.splice(i, 1)
                this.count--
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    let newSize = Math.floor(this.limit / 2)
                    let newPrime = tshi.getPrime(newSize)
                    this.resize(newPrime)
                }
                return tuple[1]
            }
        }

        return null
    }
    HashTable.prototype.isEmpty = function () {
        return this.count == 0
    }
    HashTable.prototype.size = function () {
        return this.count
    }
    HashTable.prototype.resize = function (newLimit) {
        let oldStorage = this.storage
        
        this.storage = []
        this.count = 0
        this.limit = newLimit

        for (let i = 0; i < oldStorage.length; i++) {
            let bucket = oldStorage[i]

            if (bucket == null) {
                continue
            }

            for (let i = 0; i < bucket.length; i++) {
                let tuple = bucket[i]
                this.put(tuple[0], tuple[1])
            }
        }
    }
    HashTable.prototype.isPrime = function(num) {
        let temp = parseInt(Math.sqrt(num))
    
        for (let i = 2; i <= temp; i++) {
            if (num % i == 0) {
                return false
            }
        }
    
        return true
    }
    HashTable.prototype.getPrime = function(num) {
        while (!this.isPrime(num)) {
            num += 1
        }
        return num
    }
}

/* let hash = new HashTable()
hash.put('abc',123)
hash.put('cba',321)
hash.put('nba',521)
hash.put('mba',520)

console.log(hash.get('abc'))
hash.put('abc',111)
console.log(hash.get('abc'))
hash.remove('abc')
console.log(hash.get('abc'))
console.log(hash.isEmpty())
console.log(hash.size()) */

function BinarySearchTree() {
    function Node(key) {
        this.key = key
        this.left = null
        this.right = null
    }
    this.root = null

    BinarySearchTree.prototype.insert = function (key) {
        let newNode = new Node(key)
        if (this.root == null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left == null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right == null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    // 先序遍历
    BinarySearchTree.prototype.preOrderTraversal = function (handler) {
        this.preOrderTraversalNode(this.root, handler)
    }
    BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
        if (node != null) {
            handler(node.key)
            this.preOrderTraversalNode(node.left, handler)
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    // 中序遍历
    BinarySearchTree.prototype.midOrderTraversal = function (handler) {
        this.midOrderTraversalNode(this.root, handler)
    }
    BinarySearchTree.prototype.midOrderTraversalNode = function (node, handler) {
        if (node != null) {
            this.midOrderTraversalNode(node.left, handler)
            handler(node.key)
            this.midOrderTraversalNode(node.right, handler)
        }
    }

    // 后序遍历
    BinarySearchTree.prototype.postOrderTraversal = function (handler) {
        this.postOrderTraversalNode(this.root, handler)
    }
    BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler) {
        if (node != null) {
            this.postOrderTraversalNode(node.left, handler)
            this.postOrderTraversalNode(node.right, handler)
            handler(node.key)
        }
    }
    
    BinarySearchTree.prototype.min = function () {
        let node = this.root
        if (node == null) return
        while (node.left) {
            node = node.left
        }
        return node.key
    }
    
    BinarySearchTree.prototype.max = function () {
        let node = this.root
        if (node == null) return
        while (node.right) {
            node = node.right
        }
        return node.key
    }
    // 递归实现查找
    // BinarySearchTree.prototype.search = function (key) {
    //     this.searchNode(this.root, key)
    // }
    // BinarySearchTree.prototype.searchNode = function (node, key) {
    //     if (node == null) return false
    //     if (node.key > key) {
    //         return this.searchNode(node.left, key)
    //     } else if (node.key < key) {
    //         return this.searchNode(node.right, key)
    //     } else {
    //         return true
    //     }
    // }

    // 非递归实现查找
    BinarySearchTree.prototype.search = function (key) {
        let node = this.root

        while(node != null) {
            if (key < node.key) {
                node = node.left
            } else if (key > node.key) {
                node = node.right
            } else {
                return true
            }
        }

        return false
    }

    BinarySearchTree.prototype.remove = function (key) {
        let current = this.root
        let parent = null
        let isLeftChild = true

        // 寻找删除节点
        while (current.key != key) {
            if (key < current.key) {
                isLeftChild = true
                current = current.left
            } else {
                isLeftChild = false
                current = current.right
            }

            if (current == null) return false
        }

        // 删除的结点是叶子结点
        if (current.left == null && current.right == null) {
            if (current == this.root) {
                this.root = null
            } else if (isLeftChild) {
                current.left = null
            } else {
                current.right = null
            }
        }
        // 删除的结点只有一个子结点
        else if (current.left == null) {
            if (current == this.root) {
                this.root = current.right
            } else if (isLeftChild) {
                parent.left = current.right
            } else {
                parent.right = current.right
            }
        } else if (current.right == null) {
            if (current == this.root) {
                this.root = current.left
            } else if (isLeftChild) {
                parent.left = current.left
            } else {
                parent.right = current.left
            }
        }
        // 删除的结点有两个子结点
        else {
            let successor = this.getSuccessor(current)

            if (current == this.root) {
                this.root = successor
            } else if (isLeftChild) {
                parent.left = successor
            } else {
                parent.right = successor
            }

            successor.left = current.left
        }
    }

    BinarySearchTree.prototype.getSuccessor = function (delNode) {
        let successor = delNode
        let successorParent = delNode
        let current = successor.right

        while(current.right != null) {
            successorParent = successor
            successor = current
            current = current.left
        }

        // 判断寻找的后继结点是否是直接右子节点
        if (successor != delNode.right) {
            successorParent.left = successor.right
            successor.right = delNode.right
        }

        return successor
    }
}
let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)
let res = ''
bst.preOrderTraversal(function(key){
    res += key+' '
})
console.log(res)
res = ''
bst.midOrderTraversal(function(key){
    res += key+' '
})
console.log(res)
res = ''
bst.postOrderTraversal(function(key){
    res += key+' '
})
console.log(res)
console.log(bst.min())
console.log(bst.max())
console.log(bst.search(2))


function BinarySearchTree() {
    function Node(key) {
        this.key = key
        this.color = 'red'
        this.left = null
        this.right = null
    }
    this.root = null

    BinarySearchTree.prototype.insertAvl = function (key) {
        let newNode = new Node(key)
        if (this.root == null) {
            let newNode = new Node(key)
            this.root = newNode
            this.root.color = 'black'
        } else {
            this.insertAvlNode(this.root, newNode)
        }
    }

    BinarySearchTree.prototype.situation = function (pnode, unode, gnode) {
        if (pnode.color == 'red' && unode.color == 'red' && gnode.color == 'black') {
            
        }
    }

    BinarySearchTree.prototype.insertAvlNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left == null ) {
                if (node.color != 'red') {
                    node.left = newNode
                } else {

                }
                
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right == null && node.color != 'red') {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }
}