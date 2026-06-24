const db = require('../config/db');

const getAssignments = async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
                a.assignment_id,
                a.title,
                a.description,
                a.due_date,
                c.course_name,
                u.full_name AS teacher_name
            FROM assignments a
            JOIN courses c
                ON a.course_id = c.course_id
            JOIN teachers t
                ON a.teacher_id = t.teacher_id
            JOIN users u
                ON t.user_id = u.user_id
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

const addAssignment = async (req, res) => {

    try {

        const {
            course_id,
            teacher_id,
            title,
            description,
            due_date
        } = req.body;

        await db.query(`
            INSERT INTO assignments
            (
                course_id,
                teacher_id,
                title,
                description,
                due_date
            )
            VALUES (?,?,?,?,?)
        `, [
            course_id,
            teacher_id,
            title,
            description,
            due_date
        ]);

        res.status(201).json({
            message: 'Assignment created successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

module.exports = {
    getAssignments,
    addAssignment
};