/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
  if (Array.isArray(student) || student === null) {
    return null;
  } else {
    const studentName = student.name;
    const studentMarks = student.marks;
    if ( studentMarks === null  || typeof studentName !== 'string' || studentName.length <= 0 || Array.isArray(studentMarks)
      || Object.keys(student).includes(null)) {

      return null;
    } else {
      if ( !studentMarks || Object.keys(studentMarks).length <= 0 ) {
        return null;

      } else {

        const studentSubjectMarks = Object.values(student.marks);
        const studentSubjects = Object.keys(student.marks);
        const hasStudentMarksValid = studentSubjectMarks.some((e) => e < 0 || e > 100 || !(Number.isInteger(e)));
        if (!hasStudentMarksValid) {
          const studentEntries = Object.entries(student.marks);
          let maxMarks = 0;
          let maxSubjects = '';


          let minMarks = studentEntries[0][1];
          let minSubjects = '';


          const totalMarks = studentSubjectMarks.reduce((acc, curr) => acc + curr, 0);
          const percentage = parseFloat(((totalMarks / (studentSubjects.length * 100)) * 100).toFixed(2));
          let grade = '';


          for (let [key, values] of studentEntries) {
            if (maxMarks <= values) {
              maxMarks = values;
              maxSubjects = key;
            }
          }
          for (let [key, values] of studentEntries) {
            if (values <= minMarks) {
              minMarks = values;
              minSubjects = key;
            }
          }

          const passedSubjects = studentEntries.filter((e) => {
            if (e[1] >= 40) {
              return e;
            }
          })
          const studentPassedSubjects = Object.keys(Object.fromEntries(passedSubjects));


          const failSubjects = studentEntries.filter((e) => {
            if (e[1] < 40) {
              return e;
            }
          })
          const studentFailedSubjects = Object.keys(Object.fromEntries(failSubjects));

          `"A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)`

          if (percentage >= 90) {
            grade = "A+";
          }
          else if (percentage >= 80) {
            grade = "A";
          }
          else if (percentage >= 70) {
            grade = "B";
          }
          else if (percentage >= 60) {
            grade = "C";
          }
          else if (percentage >= 40) {
            grade = "D";
          }
          else if (percentage < 40) {
            grade = "F";
          }

          return ({ name: student.name, totalMarks: totalMarks, percentage: percentage, grade: grade, highestSubject: maxSubjects, lowestSubject: minSubjects, passedSubjects: studentPassedSubjects, failedSubjects: studentFailedSubjects, subjectCount: studentSubjects.length });

        } else {
          return null;
        }

      }

    }
  }
}
