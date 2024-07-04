const database = require('./controllerDatabase');


const listQuerysProducts = {
    dataProducts: "SELECT productos.*, categorias.categoria FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id",
    dataidProducts: "SELECT * FROM productos WHERE id = ?",
    insertProducts: 'INSERT INTO productos (codigo, producto, categoria_id, existencia_actual, precio) VALUES (?, ?, ?, ?, ?)',
    deleteProducts: 'DELETE FROM productos WHERE id = ?',
    editProducts: 'UPDATE productos SET codigo = ?, producto = ?, categoria_id = ?, existencia_actual = ?, precio = ? WHERE id = ?'
};

const listQuerysCategorys = {
    insertCategorys: 'INSERT INTO categorias (categoria) VALUES (?)',
    countsCategorys: 'SELECT COUNT(*) as count FROM categorias',
    deleteCategorys: 'DELETE FROM categorias WHERE id = ?',
    deleteCheckCategorys: 'SELECT COUNT(*) as count FROM productos WHERE categoria_id = ?',
    editCategorys: 'UPDATE categorias SET categoria = ? WHERE id = ?',
    checkCategorysExist: 'SELECT * FROM categorias WHERE categoria = ?',
    dataCategorys: 'SELECT * FROM categorias',
    dataidCategory: "SELECT * FROM categorias WHERE id = ?",
};

database.db.run("CREATE TABLE IF NOT EXISTS categorias (id INTEGER PRIMARY KEY AUTOINCREMENT,categoria TEXT NOT NULL);")
database.db.run("CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY AUTOINCREMENT,codigo TEXT NOT NULL,producto TEXT NOT NULL,categoria_id INTEGER NOT NULL,existencia_actual INTEGER NOT NULL,precio REAL NOT NULL,FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE);")


function getDataProducts() {
    return new Promise((resolve, reject) => {
        database.db.all(listQuerysProducts.dataProducts, (error, rows) => {
            if (error) {
                return reject(error);
            }
            resolve(rows);
        });
    });
}

function getCategorys() {
    return new Promise((resolve, reject) => {
        database.db.all(listQuerysCategorys.dataCategorys, (error, rows) => {
            if (error) {
                return reject(error);
            }
            resolve(rows);
        });
    });
}


function insertProduct(codigo, producto, categoria_id, existencia_actual, precio) {
    return new Promise((resolve, reject) => {
        database.db.run(listQuerysProducts.insertProducts, [codigo, producto, categoria_id, existencia_actual, precio], function(error) {
            if (error) {
                return reject(error);
            }
            resolve({ id: this.lastID });
        });
    });
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        database.db.run(listQuerysProducts.deleteProducts, [id], function(error) {
            if (error) {
                return reject(error);
            }
            resolve({ changes: this.changes });
        });
    });
}

function editProduct(id, codigo, producto, categoria_id, existencia_actual, precio) {
    return new Promise((resolve, reject) => {
        database.db.run(listQuerysProducts.editProducts, [codigo, producto, categoria_id, existencia_actual, precio, id], function(error) {
            if (error) {
                return reject(error);
            }
            resolve({ changes: this.changes });
        });
    });
}

function insertCategory(categoria) {
    return new Promise((resolve, reject) => {
        database.db.run(listQuerysCategorys.insertCategorys, [categoria], function(error) {
            if (error) {
                return reject(error);
            }
            resolve({ id: this.lastID });
        });
    });
}

function countCategories() {
    return new Promise((resolve, reject) => {
        database.db.get(listQuerysCategorys.countsCategorys, (error, row) => {
            if (error) {
                return reject(error);
            }
            resolve(row.count);
        });
    });
}

function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        database.db.run(listQuerysCategorys.deleteCategorys, [id], function(error) {
            if (error) {
                return reject(error);
            }
            resolve({ changes: this.changes });
        });
    });
}

function deleteCheckCategory(id) {
    return new Promise((resolve, reject) => {
        database.db.get(listQuerysCategorys.deleteCheckCategorys, [id], (error, row) => {
            if (error) {
                return reject(error);
            }
            resolve(row.count);
        });
    });
}

function editCategory(id, categoria) {
    return new Promise((resolve, reject) => {
        database.db.run(listQuerysCategorys.editCategorys, [categoria, id], function(error) {
            if (error) {
                return reject(error);
            }
            resolve({ changes: this.changes });
        });
    });
}

function checkCategoryExists(categoria) {
    return new Promise((resolve, reject) => {
        database.db.all(listQuerysCategorys.checkCategorysExist, [categoria], (error, rows) => {
            if (error) {
                return reject(error);
            }
            resolve(rows.length > 0);
        });
    });
}

function idCategory(id) {
    return new Promise((resolve, reject) => {
        database.db.get(listQuerysCategorys.dataidCategory, [id], (error, rows) => {
            if (error) {
                return reject(error);
            }
            resolve(rows);
        });
    });
}

function idProduct(id) {
    return new Promise((resolve, reject) => {
        database.db.get(listQuerysProducts.dataidProducts, [id], (error, rows) => {
            if (error) {
                return reject(error);
            }
            resolve(rows);
        });
    });
}



module.exports = {
    getDataProducts,
    insertProduct,
    deleteProduct,
    editProduct,
    insertCategory,
    countCategories,
    deleteCategory,
    deleteCheckCategory,
    editCategory,
    checkCategoryExists,
    getCategorys,
    idCategory,
    idProduct,
};