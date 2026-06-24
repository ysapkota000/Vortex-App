const db = require('../config/db');

const getSubmissions = async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
                s.submission_id,
                s.content,
                s.grade,
                s.submitted_at,
                a.title AS assignment_title,
                st.enrollment_no
            FROM submissions s
            JOIN assignments a
                ON s.assignment_id = a.assignment_id
            JOIN students st
                ON s.student_id = st.student_id
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

const addSubmission = async (req, res) => {

    try {

        const {
            assignment_id,
            student_id,
            content
        } = req.body;

        await db.query(`
            INSERT INTO submissions
            (
                assignment_id,
                student_id,
                content
            )
            VALUES (?,?,?)
        `, [
            assignment_id,
            student_id,
            content
        ]);

        res.status(201).json({
            message: 'Submission added successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

module.exports = {
    getSubmissions,
    addSubmission
};