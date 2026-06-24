const db = require('../config/db');

const getNotices = async (req, res) => {
    try {

        const [rows] = await db.query(`
            SELECT
                n.notice_id,
                n.title,
                n.content,
                n.audience,
                n.posted_at,
                u.full_name AS posted_by
            FROM notices n
            JOIN users u ON n.posted_by = u.user_id
            ORDER BY n.posted_at DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const addNotice = async (req, res) => {

    try {

        const {
            posted_by,
            title,
            content,
            audience
        } = req.body;

        await db.query(`
            INSERT INTO notices
            (posted_by,title,content,audience)
            VALUES (?,?,?,?)
        `, [
            posted_by,
            title,
            content,
            audience
        ]);

        res.status(201).json({
            message: 'Notice added successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

module.exports = {
    getNotices,
    addNotice
};