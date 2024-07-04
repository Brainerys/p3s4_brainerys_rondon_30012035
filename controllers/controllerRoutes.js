
const controllers = require('./controllerPromises');


exports.dataProducts = async (req, res) => {
    const productos = await controllers.getDataProducts();
    const countCategories = await controllers.countCategories();
    const categoria = await controllers.getCategorys();
    const hasCategories = countCategories > 0;
    res.render('productos', {
        products: productos,
        hasCategories: hasCategories,
        categorias: categoria,
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
    try {
        const checkCategoryExists = await controllers.checkCategoryExists(categoria);
        if (checkCategoryExists) {
            return res.json({ success: false, message: 'Esta categoría ya existe!!' });
        } else {
            await controllers.insertCategory(categoria);
            return res.json({ success: true, message: 'Categoría agregada exitosamente!' });
        }
    } catch (error) {
        return res.json({ success: false, message: 'Error agregando la categoría.' });
    }
}


exports.insertProducts = async (req, res) => {
    const { codigo, producto, categoria_id, existencia_actual, precio } = req.body;
    try {
        await controllers.insertProduct(codigo, producto, categoria_id, existencia_actual, precio);
        return res.json({ success: true, message: 'Producto agregado exitosamente!' });
    } catch (error) {
        return res.json({ success: false, message: 'Error agregando el producto.' });
    }
    
    
}


exports.editCategorys = async (req, res) => {
    const { id } = req.params;
    const categoria = await controllers.idCategory(id);
    res.render('editcategory', {
        categoria: categoria
    })
}

exports.editProducts = async (req, res) => {
    const { id } = req.params;
    const productos = await controllers.idProduct(id);
    const categorias = await controllers.getCategorys();
    res.render('editproduct', {
        productos: productos,
        categorias: categorias
    })
}

exports.editProductPost = async (req, res) => {
    const { id } = req.params;
    const { codigo, producto, categoria_id, existencia_actual, precio } = req.body;
    await controllers.editProduct(id, codigo, producto, categoria_id, existencia_actual, precio);
    return res.json({ success: true, message: 'El producto ha sido actualizado exitosamente.' });

}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await controllers.deleteProduct(id);
    return res.json({ success: true, message: 'Producto eliminado exitosamente!' });

}


exports.setEditCategory = async (req, res) => {
    const { categoria } = req.body;
    const { id } = req.params;
    await controllers.editCategory(id, categoria);
    return res.json({ success: true, message: 'La categoria ha sido actualizado exitosamente.' });
}


exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    const { deleteProducts } = req.body;

    try {
        const checkCategory = await controllers.deleteCheckCategory(id);
        if (checkCategory > 0) {
            res.json({ success: true, hasProducts: true, message: 'Esta categoría tiene productos asociados y podrias eliminar esos productos. ¿Estás seguro de que deseas eliminarla?' });
            if (deleteProducts) {
                await controllers.deleteCategory(id);
            }
        }

        else {
            await controllers.deleteCategory(id);
            res.json({ success: true, message: 'Categoría eliminada exitosamente!' });
        }

    } catch (error) {
        return res.json({ success: false, message: 'Error al eliminar la categoría.' });
    }
}



