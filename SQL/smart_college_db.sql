-- ============================================================
--  Smart College Management System
--  Team Vortex | PRG 100 | Westcliff University
--  Compatible with: MySQL 5.7+ / XAMPP phpMyAdmin
-- ============================================================

CREATE DATABASE IF NOT EXISTS smart_college_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE smart_college_db;

-- ------------------------------------------------------------
-- 1. USERS  (central auth table; role determines which
--            profile table gets a linked row)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  user_id       INT           NOT NULL AUTO_INCREMENT,
  full_name     VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  role          ENUM('student','teacher','admin') NOT NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);

-- ------------------------------------------------------------
-- 2. DEPARTMENTS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS departments (
  dept_id     INT          NOT NULL AUTO_INCREMENT,
  dept_name   VARCHAR(100) NOT NULL,
  description TEXT,
  PRIMARY KEY (dept_id)
);

-- ------------------------------------------------------------
-- 3. STUDENTS  (profile linked to USERS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
  student_id    INT         NOT NULL AUTO_INCREMENT,
  user_id       INT         NOT NULL UNIQUE,
  dept_id       INT         NOT NULL,
  enrollment_no VARCHAR(30) NOT NULL UNIQUE,
  year_level    TINYINT     NOT NULL DEFAULT 1,
  PRIMARY KEY (student_id),
  FOREIGN KEY (user_id)  REFERENCES users(user_id)       ON DELETE CASCADE,
  FOREIGN KEY (dept_id)  REFERENCES departments(dept_id) ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- 4. TEACHERS  (profile linked to USERS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS teachers (
  teacher_id  INT         NOT NULL AUTO_INCREMENT,
  user_id     INT         NOT NULL UNIQUE,
  dept_id     INT         NOT NULL,
  designation VARCHAR(80),
  PRIMARY KEY (teacher_id),
  FOREIGN KEY (user_id)  REFERENCES users(user_id)       ON DELETE CASCADE,
  FOREIGN KEY (dept_id)  REFERENCES departments(dept_id) ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- 5. ADMINS  (profile linked to USERS)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  admin_id    INT         NOT NULL AUTO_INCREMENT,
  user_id     INT         NOT NULL UNIQUE,
  admin_level VARCHAR(50) DEFAULT 'standard',
  PRIMARY KEY (admin_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 6. COURSES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
  course_id   INT         NOT NULL AUTO_INCREMENT,
  dept_id     INT         NOT NULL,
  teacher_id  INT         NOT NULL,
  course_name VARCHAR(120) NOT NULL,
  course_code VARCHAR(20)  NOT NULL UNIQUE,
  credit_hours TINYINT    NOT NULL DEFAULT 3,
  PRIMARY KEY (course_id),
  FOREIGN KEY (dept_id)    REFERENCES departments(dept_id) ON DELETE RESTRICT,
  FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- 7. ENROLLMENTS  (students <-> courses)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS enrollments (
  enrollment_id INT         NOT NULL AUTO_INCREMENT,
  student_id    INT         NOT NULL,
  course_id     INT         NOT NULL,
  enrolled_on   DATE        NOT NULL DEFAULT (CURRENT_DATE),
  status        ENUM('active','dropped','completed') NOT NULL DEFAULT 'active',
  PRIMARY KEY (enrollment_id),
  UNIQUE KEY uq_enrollment (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (course_id)  REFERENCES courses(course_id)   ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 8. ATTENDANCE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS attendance (
  attendance_id INT  NOT NULL AUTO_INCREMENT,
  student_id    INT  NOT NULL,
  course_id     INT  NOT NULL,
  teacher_id    INT  NOT NULL,
  class_date    DATE NOT NULL,
  status        ENUM('present','absent','late') NOT NULL DEFAULT 'present',
  PRIMARY KEY (attendance_id),
  UNIQUE KEY uq_attendance (student_id, course_id, class_date),
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (course_id)  REFERENCES courses(course_id)   ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- 9. ASSIGNMENTS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS assignments (
  assignment_id INT          NOT NULL AUTO_INCREMENT,
  course_id     INT          NOT NULL,
  teacher_id    INT          NOT NULL,
  title         VARCHAR(200) NOT NULL,
  description   TEXT,
  due_date      DATETIME     NOT NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (assignment_id),
  FOREIGN KEY (course_id)  REFERENCES courses(course_id)   ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- 10. SUBMISSIONS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS submissions (
  submission_id INT     NOT NULL AUTO_INCREMENT,
  assignment_id INT     NOT NULL,
  student_id    INT     NOT NULL,
  content       TEXT,
  submitted_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  grade         DECIMAL(5,2),
  PRIMARY KEY (submission_id),
  UNIQUE KEY uq_submission (assignment_id, student_id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id) ON DELETE CASCADE,
  FOREIGN KEY (student_id)    REFERENCES students(student_id)       ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 11. NOTICES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notices (
  notice_id INT          NOT NULL AUTO_INCREMENT,
  posted_by INT          NOT NULL,
  title     VARCHAR(200) NOT NULL,
  content   TEXT         NOT NULL,
  audience  ENUM('all','students','teachers') NOT NULL DEFAULT 'all',
  posted_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (notice_id),
  FOREIGN KEY (posted_by) REFERENCES users(user_id) ON DELETE RESTRICT
);

-- ============================================================
--  SAMPLE DATA  (remove before production)
-- ============================================================

INSERT INTO departments (dept_name, description) VALUES
  ('Computer Science', 'CS & Software programs'),
  ('Business Administration', 'BBA & MBA programs'),
  ('Information Technology', 'IT & Networking programs');

-- Password hash below represents 'password123' (bcrypt placeholder)
INSERT INTO users (full_name, email, password_hash, role) VALUES
  ('Admin User',     'admin@college.edu',    '$2b$10$examplehashADMIN',   'admin'),
  ('Rahul Rimal',    'rahul@college.edu',    '$2b$10$examplehashSTU1',    'student'),
  ('Bilakshana N.',  'bilakshana@college.edu','$2b$10$examplehashSTU2',   'student'),
  ('Yugal Sapkota',  'yugal@college.edu',    '$2b$10$examplehashTCH1',    'teacher'),
  ('Prasun Rimal',   'prasun@college.edu',   '$2b$10$examplehashSTU3',    'student');

INSERT INTO admins  (user_id, admin_level) VALUES (1, 'super');
INSERT INTO teachers(user_id, dept_id, designation) VALUES (4, 1, 'Lecturer');
INSERT INTO students(user_id, dept_id, enrollment_no, year_level) VALUES
  (2, 1, 'CS2024001', 1),
  (3, 1, 'CS2024002', 1),
  (5, 1, 'CS2024003', 1);

INSERT INTO courses (dept_id, teacher_id, course_name, course_code, credit_hours) VALUES
  (1, 1, 'Systems Analysis & Design', 'PRG100', 3),
  (1, 1, 'Database Management',       'PRG201', 3);

INSERT INTO enrollments (student_id, course_id, status) VALUES
  (1,1,'active'),(2,1,'active'),(3,1,'active'),
  (1,2,'active'),(2,2,'active');

-- ============================================================
--  END OF SCRIPT
-- ============================================================
