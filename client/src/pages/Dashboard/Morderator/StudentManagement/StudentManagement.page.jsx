import React, { useState } from "react";
import Body from '../../../../components/Body/Body.component';
import Header from '../../../../components/Header/Header.component';
import styles from './StudentManagement.module.scss'
import FilterTable from "../../../../ui/Table/FilterTable/FilterTable.component";
import SMTypeModel from "../../../../models/SMTypeModel";

function StudentManagement() {
    const studentsList = [
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
    ];
    return (
        <div className = {styles['student-management']}>
            <Header>
                <div>
                    <h5>Student Management</h5>
                </div>
            </Header>
            <Body>
                <div className = {styles['filter-table']}>
                    <FilterTable
                        columns = {SMTypeModel}
                        rows = {studentsList}
                    />
                </div>                
            </Body>
            
        </div>
    );
}

export default StudentManagement;