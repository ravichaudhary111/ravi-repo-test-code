const fs = require('fs');
const csv = require('csv-parser');
const User = require('../model/user.model');

exports.uploadUserFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded, Please upload the file');
    }
    try {
        const usersData = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (row) => {
                const user = {
                    name: row.name || undefined,
                    age: row.age ? parseInt(row.age, 10) : undefined,
                    email: row.email || undefined
                };
                usersData.push(user);
            })
            .on('end', async () => {
                try {
                    const result = await User.insertMany(usersData);
                    fs.unlinkSync(req.file.path);
                    res.status(200).send({ status: 200, message: 'file upload successfully' });
                } catch (err) {
                    res.status(500).send({ status: 500, message: 'Internal server error', error: err });
                } finally {
                    await client.close();
                }
            });
    } catch (err) {
        res.status(500).send({ status: 500, message: 'Internal server error', error: err });
    }
};


exports.getUser = async (req, res) => {
    const { page = 0, size = 20 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(size, 10);

    if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 0 || pageSize <= 0) {
        return res.status(400).send({ status: 400, message: 'Invalid pagination parameters' });
    }

    let skip = pageNumber * pageSize;

    try {
        const userData = await User.find({ age: { $gte: 25 } }).skip(skip).limit(pageSize);
        if (userData && userData.length)
            res.status(200).send({ status: 200, message: 'ok', data: userData });
        else
            res.status(200).send({ status: 200, message: 'No result found' });
    } catch (err) {
        res.status(500).send({ status: 500, message: 'Internal server error', error: err });

    }
}