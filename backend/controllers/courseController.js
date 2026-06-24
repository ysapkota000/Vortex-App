const db = require('../config/db');

// Get All Courses
const getCourses = async (req, res) => {
    try {

        const [courses] = await db.query(`
        SELECT
            c.course_id,
            c.course_name,
            c.course_code,
            c.credit_hours,
            d.dept_name,
            u.full_name AS teacher_name
        FROM courses c
        JOIN departments d
            ON c.dept_id = d.dept_id
        JOIN teachers t
            ON c.teacher_id = t.teacher_id
        JOIN users u
            ON t.user_id = u.user_id
        `);

        res.status(200).json(courses);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};

// Add Course
const addCourse = async (req, res) => {

    try {

        const {
            dept_id,
            teacher_id,
            course_name,
            course_code,
            credit_hours
        } = req.body;

        await db.query(
            `INSERT INTO courses
            (dept_id, teacher_id, course_name, course_code, credit_hours)
            VALUES (?, ?, ?, ?, ?)`,
            [
                dept_id,
                teacher_id,
                course_name,
                course_code,
                credit_hours
            ]
        );

        res.status(201).json({
            message: 'Course added successfully'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getCourses,
    addCourse
};