const db = require('../config/db');

// Get Attendance Records
const getAttendance = async (req, res) => {

    try {

        const [attendance] = await db.query(`
        SELECT
            a.attendance_id,
            u.full_name AS student_name,
            c.course_name,
            tu.full_name AS teacher_name,
            a.class_date,
            a.status
        FROM attendance a

        JOIN students s
            ON a.student_id = s.student_id

        JOIN users u
            ON s.user_id = u.user_id

        JOIN courses c
            ON a.course_id = c.course_id

        JOIN teachers t
            ON a.teacher_id = t.teacher_id

        JOIN users tu
            ON t.user_id = tu.user_id
        `);

        res.status(200).json(attendance);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};

// Add Attendance
const addAttendance = async (req, res) => {

    try {

        const {
            student_id,
            course_id,
            teacher_id,
            class_date,
            status
        } = req.body;

        await db.query(
            `INSERT INTO attendance
            (student_id, course_id, teacher_id, class_date, status)
            VALUES (?, ?, ?, ?, ?)`,
            [
                student_id,
                course_id,
                teacher_id,
                class_date,
                status
            ]
        );

        res.status(201).json({
            message: 'Attendance added successfully'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getAttendance,
    addAttendance
};