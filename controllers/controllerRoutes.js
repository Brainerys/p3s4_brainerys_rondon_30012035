
const controllers = require('./controllerPromises');


exports.dataProducts = async (req, res) => {
    const productos = await controllers.getDataProducts();
    const countCategories = await controllers.countCategories();
    const categoria = await controllers.getCategorys();
    const hasCategories = countCategories > 0;
    res.render('productos', {
        products: productos,
        hasCategories: hasCategories,
        categorias:categoria,
    })
}

exports.dataCategorys = async (req, res) => {
    const categorias = await controllers.getCategorys();
    const countCategories = await controllers.countCategories();
    const hasCategories = countCategories > 0;
    res.render('categorias', {
        categorias: categorias,
        hasCategories: hasCategories,
    })
}


exports.insertCategorys = async (req, res) => {
    const { categoria } = req.body;
    console.log(categoria)
    const checkCategoryExists = await controllers.checkCategoryExists(categoria);
    if (checkCategoryExists) {
        return res.send('Esta categoria ya existe!!')
    }
    else {
        await controllers.insertCategory(categoria);
        return res.redirect('/categorias')
    }
}


exports.insertProducts = async (req, res) => {
    const { codigo, producto, categoria_id, existencia_actual, precio } = req.body;
    await controllers.insertProduct(codigo, producto, categoria_id, existencia_actual, precio);
    res.redirect('/productos')
}


exports.editCategorys = async(req,res) => {
    const { id } = req.params;
    const categoria = await controllers.idCategory(id);
    res.render('editcategory',{
        categoria:categoria
    })
}

exports.editProducts = async(req,res) => {
    const { id } = req.params;
    const productos = await controllers.idProduct(id);
    const categorias = await controllers.getCategorys();
    res.render('editproduct',{
        productos:productos,
        categorias:categorias
    })
}

exports.editProductPost = async(req,res) => {
    const { id } = req.params;
    const { codigo, producto, categoria_id, existencia_actual, precio } = req.body;
    await controllers.editProduct(id,codigo, producto, categoria_id, existencia_actual, precio);
    res.redirect('/productos');

}

exports.deleteProduct = async(req,res) => {
    const { id } = req.params;
    await controllers.deleteProduct(id);
    res.redirect('/productos');
}


exports.setEditCategory = async(req,res) => {
    const { categoria } = req.body;
    const { id } = req.params;
    await controllers.editCategory(id,categoria);
    res.redirect('/categorias');
}


exports.deleteCategory = async(req,res) => {
    const { id } = req.params;
    await controllers.deleteCategory(id);
    res.redirect('/categorias')
}



