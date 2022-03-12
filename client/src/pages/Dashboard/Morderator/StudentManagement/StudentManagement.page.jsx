import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import styles from "./StudentManagement.module.scss";
import FilterTable from "../../../../ui/Table/FilterTable/FilterTable.component";
import SMTypeModel from "../../../../models/SMTypeModel";

function StudentManagement() {
  const [students, setStudents] = useState([
    {
      id: 1,
      fullName: "Truong Dong Huy",
      studentID: "24211206538",
      email: "huydongtruong@gmail.com",
      phoneNumber: "0359352931",
      gpa: 3,
      capstoneType: "Capstone 2",
      codingLevel: "Level 1",
      remainCredits: 0,
      isInternship: true,
    },
    {
      id: 2,
      fullName: "Truong Dong Dat",
      studentID: "24211206538",
      email: "huydongtruong@gmail.com",
      phoneNumber: "0359352931",
      gpa: 3,
      capstoneType: "Capstone 2",
      codingLevel: "Level 1",
      remainCredits: 0,
      isInternship: true,
    },
    // {
    //     id: 3,
    //     fullName: "AAAAAA",
    //     studentID: "24211206538",
    //     email: "huydongtruong@gmail.com",
    //     phoneNumber: "0359352931",
    //     gpa: 3,
    //     capstoneType: "Capstone 2",
    //     codingLevel: "Level 1",
    //     remainCredits: 0,
    //     isInternship: true,
    // },
    // {
    //     id: 4,
    //     fullName: "CCC",
    //     studentID: "24211206538",
    //     email: "huydongtruong@gmail.com",
    //     phoneNumber: "0359352931",
    //     gpa: 3,
    //     capstoneType: "Capstone 2",
    //     codingLevel: "Level 1",
    //     remainCredits: 0,
    //     isInternship: true,
    // },
  ]);

  const [currentRow, setCurrentRow] = useState({});

  const add = () => {
    let newStudents = [
      {
        id: "Untitled",
        fullName: "",
        studentID: "",
        email: "",
        phoneNumber: "",
        gpa: 0,
        capstoneType: "",
        codingLevel: "",
        remainCredits: 0,
        isInternship: true,
      },
    ].concat(students);

    setStudents(newStudents);
    setCurrentRow({
      Untitled: {
        fullName: { value: "" },
        email: { value: "" },
      },
    });
    focusInput();
  };
  const onClose = () =>{
      let newStudents = [...students];
        newStudents.shift();
      setStudents([...newStudents]);
  }
  const onSave = () =>{
    let newStudents = [...students];
    
    newStudents[0] =  {
        id: 'Untiled',
        fullName: currentRow.Untitled.fullName.value,
    }
    setStudents([...newStudents]);
    console.log(newStudents[0]);
  }
  const focusInput = () => {
    setTimeout(() => {
      if (
        document.querySelectorAll(".MuiDataGrid-cell .MuiInputBase-input")
          .length
      ) {
        document
          .querySelectorAll(".MuiDataGrid-cell .MuiInputBase-input")[0]
          .focus();
      }
    }, 1);
  };

  return (
    <div className={styles["student-management"]}>
      <Header>
        <div>
          <h5>Student Management</h5>
        </div>
      </Header>
      <Body>
        <div className={styles["filter-table"]}>
          {/* <RowEditControlGrid></RowEditControlGrid> */}
          <FilterTable
            columns={SMTypeModel(()=>{},()=>{},()=>{},()=>{})}
            rows={students}
            onChange={(model) => setCurrentRow(model)}
            currentRow={currentRow}
            onAdd={add}
            onClose ={onClose}
            onSave = {onSave}
            // onSave
            // onClose
          />
        </div>
      </Body>
    </div>
  );
}

export default StudentManagement;
