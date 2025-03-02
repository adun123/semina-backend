const Categories = require('../../api/v1/categories/model');
const {BadRequestError, NotFoundError} = require('../../errors')
const getAllCategories = async ()=> {
    const result = await Categories.find();

    return result;
};

const createCategories = async (req)=> {
    const {name }= req.body;
    //cari category dengan field name
    const check = await Categories.findOne({name});

    //kalau ketemu data categories duplikat maka akan menampilkan pesan
    if(check) throw new BadRequestError('Kategori nama duplikat');

    const result = await Categories.create({name});
    
    return result;
};

const updateCategories = async (req) => {
    const {id} = req.params;
    const {name} = req.body;

    // cari categories dengan field name dan id selain dari yang dikirim dari params
    const check = await Categories.findOne({name, _id: {$ne: id}});

    // apabila check for true data categories sudah ada maka kita tampilkan error bad rquest
    if(check) throw new BadRequestError('Kategori nama duplikat');

    const result = await Categories.findByIdAndUpdate(
        {_id: id},
        {name},
        {new : true, runValidators: true}
    );
    // jika ida result false maka akan menampilkan error ' tidak ada kategori dengan id '
    if(!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

    return result;
};

const getOneCategories = async (req) => {
    const {id} = req.params;
    
    const result = await Categories.findOne({_id: id});

    if(!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

    return result;


};

// Use deleteOne or findByIdAndDelete
const deleteCategories = async (req) => {
    const { id } = req.params;

    // Use the correct model name (Categories) for deletion
    const result = await Categories.findByIdAndDelete(id);

    if (!result) {
        throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);
    }

    return result;
};




module.exports = {
    getAllCategories, 
    createCategories,
    updateCategories,
    getOneCategories,
    deleteCategories};