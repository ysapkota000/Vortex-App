    const db = require('../config/db');

    // Get All Students
    const getStudents = async (req, res) => {
        try {
            const [students] = await db.query(`
    SELECT
        s.student_id,
        u.full_name,
        u.email,
        d.dept_name,
        s.enrollment_no,
        s.year_level
    FROM students s
    JOIN users u
        ON s.user_id = u.user_id
    JOIN departments d
        ON s.dept_id = d.dept_id
    `);

            res.status(200).json(students);

        } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
    };

    // Add Student
    const addStudent = async (req, res) => {

        try {

            const {
                user_id,
                dept_id,
                enrollment_no,
                year_level
            } = req.body;

            await db.query(
                `INSERT INTO students
                (user_id, dept_id, enrollment_no, year_level)
                VALUES (?, ?, ?, ?)`,
                [
                    user_id,
                    dept_id,
                    enrollment_no,
                    year_level
                ]
            );

            res.status(201).json({
                message: 'Student added successfully'
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Server Error'
            });

        }
    };

    module.exports = {
        getStudents,
        addStudent
    };