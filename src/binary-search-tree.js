const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {

    constructor() {
        this.headNode = null;
    }

    root() {
        return this.headNode;
    }

    add(data) {
        this.headNode = addNode(this.headNode, data);

        function addNode(node, data) {
            /* check if our tree is empty */
            if (!node) {
                return new Node(data);
            }
            /* if tree is not empty - check if new data is equal to our top node */
            if (node.data === data) {
                return node;
            }
            /* check if data is less or more than top node and start recursion */
            if (data < node.data) {
                node.left = addNode(node.left, data);
            } else {
                node.right = addNode(node.right, data);
            }
            return node;
        }
    }

    has(data) {
        return searchHas(this.headNode, data);

        function searchHas(node, value) {
            if (!node) {
                return false;
            }
            if (node.data === value) {
                return true;
            }
            return value > node.data ? searchHas(node.right, value) : searchHas(node.left, value);
        }
    }

    find(data) {
        return searchFind(this.headNode, data);
        function searchFind(node, value) {
            if (!node) {
                return null;
            }
            if (node.data === value) {
                return node;
            }
            return value > node.data ? searchFind(node.right, value) : searchFind(node.left, value);
        }
    }

    remove(data) {
        this.headNode = removeNode(this.headNode, data);

        function removeNode(node, data) {
            if (!node) {
                return null;
            }
            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (node.data < data) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                if (!node.left && !node.right) {
                    return null;
                }
                if (!node.left) {
                    node = node.right;
                    return node;
                }
                if (!node.right) {
                    node = node.left;
                    return node;
                }
                let maxFromLeft = node.left;
                while (maxFromLeft.right) {
                    maxFromLeft = maxFromLeft.right;
                }
                node.data = maxFromLeft.data;

                node.left = removeNode(node.left, maxFromLeft.data);

                return node;
            }
        }
    }

    min() {
        if (!this.headNode) {
            return;
        }
        let node = this.headNode;
        while (node.left) {
            node = node.left;
        }
        return node.data;
    }

    max() {
        if (!this.headNode) {
            return;
        }
        let node = this.headNode;
        while (node.right) {
            node = node.right;
        }
        return node.data;
    }

}


