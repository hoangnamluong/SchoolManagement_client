import {
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Document,
  Font,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCourseById } from "../../features/course/courseSlice";
import { selectStudents } from "../../features/grade/gradeSlice";

const ExportGradePDF = () => {
  const { courseId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));

  const students = useSelector(selectStudents);

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
        fontWeight: "bold",
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      padding: "10px",
      fontFamily: "Roboto",
      backgroundColor: "#E4E4E4",
    },
    sectionHeader: {
      display: "block",
      textAlign: "center",
      fontSize: "24px",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    tableHeader: {
      marginTop: "24px",
      color: "#fff",
      fontWeight: "bold",
      backgroundColor: "#4491d6",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
    tableRow: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      fontSize: "12px",
    },
    tableColumn: {
      padding: "5px",
    },
  });

  const StudentRow = ({ student = {} }) => {
    const studentInfo = student.student;
    const marks = student.marks_detail;

    const name = studentInfo.user.first_name.concat(
      " ",
      studentInfo.user.last_name
    );

    const finalMark = marks.find((mark) => mark.is_final === true);
    const midMarks = marks.filter((mark) => mark.is_midterm === true);
    return (
      <View style={styles.tableRow}>
        <Text style={[{ minWidth: "100px" }, styles.tableColumn]}>
          {studentInfo.code}
        </Text>
        <Text style={[{ minWidth: "150px" }, styles.tableColumn]}>{name}</Text>
        <Text style={[{ minWidth: "50px" }, styles.tableColumn]}>
          {finalMark ? finalMark.value : ""}
        </Text>
        <Text style={[{ minWidth: "34px" }, styles.tableColumn]}>
          {midMarks[0] ? midMarks[0].value : ""}
        </Text>
        <Text style={[{ minWidth: "34px" }, styles.tableColumn]}>
          {midMarks[1] ? midMarks[1].value : ""}
        </Text>
        <Text style={[{ minWidth: "34px" }, styles.tableColumn]}>
          {midMarks[2] ? midMarks[2].value : ""}
        </Text>
        <Text style={[{ minWidth: "34px" }, styles.tableColumn]}>
          {midMarks[3] ? midMarks[3].value : ""}
        </Text>
        <Text style={[{ minWidth: "34px" }, styles.tableColumn]}>
          {midMarks[4] ? midMarks[4].value : ""}
        </Text>
        <Text style={[{ minWidth: "60px" }, styles.tableColumn]}>
          {student.mark_s10}
        </Text>
        <Text style={[{ minWidth: "60px" }, styles.tableColumn]}>
          {student.mark_s4}
        </Text>
      </View>
    );
  };

  const DocumentPdf = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page} wrap={true}>
          <View style={styles.sectionHeader}>
            <Text>{course.subject.id + " - " + course.subject.name}</Text>
          </View>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[{ minWidth: "100px" }, styles.tableColumn]}>
              Student ID
            </Text>
            <Text style={[{ minWidth: "150px" }, styles.tableColumn]}>
              Full Name
            </Text>
            <Text style={[{ minWidth: "50px" }, styles.tableColumn]}>
              Final
            </Text>
            <Text style={[{ minWidth: "170px" }, styles.tableColumn]}>
              Midterm
            </Text>
            <Text style={[{ minWidth: "60px" }, styles.tableColumn]}>
              GPA-10
            </Text>
            <Text style={[{ minWidth: "60px" }, styles.tableColumn]}>
              GPA-4
            </Text>
          </View>
          {students.mark_list.map((student) => (
            <StudentRow student={student} key={student.student.code} />
          ))}
        </Page>
      </Document>
    );
  };

  return (
    <PDFDownloadLink
      document={<DocumentPdf />}
      fileName={`${course.subject.id}.pdf`}
      className="d-block px-3 py-1"
    >
      PDF
    </PDFDownloadLink>
  );
};
export default ExportGradePDF;
