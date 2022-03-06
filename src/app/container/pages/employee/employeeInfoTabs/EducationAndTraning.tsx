import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Checkbox} from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { userStore } from '../../../../store/states/user/user';

export default function EducationAndTraning() {

    const { TabPane } = Tabs;
    const [form] = Form.useForm();
    const { Option } = Select;
    const [examDegreeList, setExamDegreeList] = useState<any>();
    const [examDegreeTitleShowHide, setExamDegreeTitleShowHide] = useState<any>(true);
    const [typeExamDegreeTitle, setTypeExamDegreeTitle] = useState<any>(false);
    const [typeConcentrationMajorGroup , setConcentrationMajorGroup] = useState<any>(false);
    const [foreignInstituteShowHide, setForeignInstituteShowHide] = useState<any>(false);
    const [cgpaScaleMarksShowHide, setCgpaScaleMarksShowHide] = useState<any>(false);
    const callback = (key) => {
        console.log(key);
    }

    const levelOfEducation = (val) => {
        console.log(val);
        switch (val) {
            case val = "-1":
                setExamDegreeList(examPscTitle);
                break;
            case val = "-2":
                setExamDegreeList(examJscTitle);
                break;
            case val = "1":
                setExamDegreeList(examSecondaryTitle);
                setConcentrationMajorGroup(true);
                break;
            case val = "2":
                setExamDegreeList(examHigherSecondaryTitle);
                setConcentrationMajorGroup(true);
                break;
            case val = "3":
                setExamDegreeList(examDiplomaTitle);
                setConcentrationMajorGroup(true);
                break;
            case val = "4":
                setExamDegreeList(examBachelorTitle);
                setConcentrationMajorGroup(true);
                break;
            case val = "5":
                setExamDegreeList(examMasterTitle);
                setConcentrationMajorGroup(true);
                break;
            case val = "6":
                setExamDegreeTitleShowHide(false);
                setConcentrationMajorGroup(true);
                break;
            default:
                break;
        }
        
    }
    const typeExamDegreeTitleMethod = (val) => {
        if (val == 'Other') {
            setTypeExamDegreeTitle(true);
        } else {
            setTypeExamDegreeTitle(false);
        }
    }

    const onChangeForeignInstitute = (val) => {
        if(val.target.checked == true){
            setForeignInstituteShowHide(true);
        }else{
            setForeignInstituteShowHide(false);
        }
    }


    const examPscTitle = [
        { title : "PSC" , val : "PSC"},
        { title : "Ebtedayee (Madrasah)" , val : "Ebtedayee (Madrasah)"},
        { title : "5 Pass" , val : "5 Pass"},
        { title : "Other" , val : "Other"},
    ];

    const examJscTitle = [
        { title : "JSC" , val : "JSC"},
        { title : "JDC (Madrasah)" , val : "JDC (Madrasah)"},
        { title : "8 Pass" , val : "8 Pass"},
        { title : "Other" , val : "Other"},
    ]

    const examSecondaryTitle = [
        { title : "SSC" , val : "SSC"},
        { title : "O Level" , val : "O Level"},
        { title : "Dakhil (Madrasah)" , val : "Dakhil (Madrasah)"},
        { title : "SSC (Vocational)" , val : "SSC (Vocational)"},
        { title : "Other" , val : "Other"},
    ]

    const examHigherSecondaryTitle = [
        { title : "HSC" , val : "HSC"},
        { title : "A Level" , val : "A Level"},
        { title : "Alim (Madrasah)" , val : "Alim (Madrasah)"},
        { title : "HSC (Vocational)" , val : "HSC (Vocational)"},
        { title : "Other" , val : "Other"},
    ]

    const examDiplomaTitle = [
        { title : "Diploma in Engineering" , val : "Diploma in Engineering"},
        { title : "Diploma in Medical Technology" , val : "Diploma in Medical Technology"},
        { title : "Diploma in Nursing" , val : "Diploma in Nursing"},
        { title : "Diploma in Commerce" , val : "Diploma in Commerce"},
        { title : "Diploma in Business Studies" , val : "Diploma in Business Studies"},
        { title : "Post Graduate Diploma (PGD)" , val : "Post Graduate Diploma (PGD)"},
        { title : "Diploma in Pathology" , val : "Diploma in Pathology"},
        { title : "Diploma (Vocational)" , val : "Diploma (Vocational)"},
        { title : "Diploma in Hotel Management" , val : "Diploma in Hotel Management"},
        { title : "Diploma in Computer" , val : "Diploma in Computer"},
        { title : "Diploma in Mechanical" , val : "Diploma in Mechanical"},
        { title : "Diploma in Refrigeration and air Conditioning" , val : "Diploma in Refrigeration and air Conditioning"},
        { title : "Diploma in Electrical" , val : "Diploma in Electrical"},
        { title : "Diploma in Automobile" , val : "Diploma in Automobile"},
        { title : "Diploma in Power" , val : "Diploma in Power"},
        { title : "Diploma in Electronics" , val : "Diploma in Electronics"},
        { title : "Diploma in Architecture" , val : "Diploma in Architecture"},
        { title : "Diploma in Electro medical" , val : "Diploma in Electro medical"},
        { title : "Diploma in Civil" , val : "Diploma in Civil"},
        { title : "Diploma in Marine" , val : "Diploma in Marine"},
        { title : "Diploma in Medical" , val : "Diploma in Medical"},
        { title : "Diploma in Midwifery" , val : "Diploma in Midwifery"},
        { title : "Other" , val : "Other"},
    ]

    const examBachelorTitle = [
        { title : "Bachelor of Science (BSc)" , val : "Bachelor of Science (BSc)"},
        { title : "Bachelor of Arts (BA)" , val : "Bachelor of Arts (BA)"},
        { title : "Bachelor of Commerce (BCom)" , val : "Bachelor of Commerce (BCom)"},
        { title : "Bachelor of Commerce (Pass)" , val : "Bachelor of Commerce (Pass)"},
        { title : "Bachelor of Business Administration (BBA)" , val : "Bachelor of Business Administration (BBA)"},
        { title : "Bachelor of Medicine and Bachelor of Surgery(MBBS)" , val : "Bachelor of Medicine and Bachelor of Surgery(MBBS)"},
        { title : "Bachelor of Dental Surgery (BDS)" , val : "Bachelor of Dental Surgery (BDS)"},
        { title : "Bachelor of Architecture (B.Arch)" , val : "Bachelor of Architecture (B.Arch)"},
        { title : "Bachelor of Pharmacy (B.Pharm)" , val : "Bachelor of Pharmacy (B.Pharm)"},
        { title : "Bachelor of Education (B.Ed)" , val : "Bachelor of Education (B.Ed)"},
        { title : "Bachelor of Physical Education (BPEd)" , val : "Bachelor of Physical Education (BPEd)"},
        { title : "Bachelor of Law (LLB)" , val : "Bachelor of Law (LLB)"},
        { title : "Doctor of Veterinary Medicine (DVM)" , val : "Doctor of Veterinary Medicine (DVM)"},
        { title : "Bachelor of Social Science (BSS)" , val : "Bachelor of Social Science (BSS)"},
        { title : "Bachelor of Fine Arts (B.F.A)" , val : "Bachelor of Fine Arts (B.F.A)"},
        { title : "Bachelor of Business Studies (BBS)" , val : "Bachelor of Business Studies (BBS)"},
        { title : "Bachelor of Computer Application (BCA)" , val : "Bachelor of Computer Application (BCA)"},
        { title : "Fazil (Madrasah)" , val : "Fazil (Madrasah)"},
        { title : "Bachelor in Engineering (BEngg)" , val : "Bachelor in Engineering (BEngg)"},
        { title : "Other" , val : "Other"},
    ]

    const examMasterTitle = [
        { title : "Master of Science (MSc)" , val : "Master of Science (MSc)"},
        { title : "Master of Arts (MA)" , val : "Master of Arts (MA)"},
        { title : "Master of Commerce (MCom)" , val : "Master of Commerce (MCom)"},
        { title : "Master of Business Administration (MBA)" , val : "Master of Business Administration (MBA)"},
        { title : "Master of Architecture (M.Arch)" , val : "Master of Architecture (M.Arch)"},
        { title : "Master of Pharmacy (M.Pharm)" , val : "Master of Pharmacy (M.Pharm)"},
        { title : "Master of Education (M.Ed)" , val : "Master of Education (M.Ed)"},
        { title : "Master of Law (LLM)" , val : "Master of Law (LLM)"},
        { title : "Master of Social Science (MSS)" , val : "Master of Social Science (MSS)"},
        { title : "Master of Fine Arts (M.F.A)" , val : "Master of Fine Arts (M.F.A)"},
        { title : "Master of Philosophy (M.Phil)" , val : "Master of Philosophy (M.Phil)"},
        { title : "Master of Business Management (MBM)" , val : "Master of Business Management (MBM)"},
        { title : "Master of Development Studies (MDS)" , val : "Master of Development Studies (MDS)"},
        { title : "Master of Business Studies (MBS)" , val : "Master of Business Studies (MBS)"},
        { title : "Masters in Computer Application (MCA)" , val : "Masters in Computer Application (MCA)"},
        { title : "Executive Master of Business Administration (EMBA)" , val : "Executive Master of Business Administration (EMBA)"},
        { title : "Fellowship of the College of Physicians and Surgeons (FCPS)" , val : "Fellowship of the College of Physicians and Surgeons (FCPS)"},
        { title : "Kamil (Madrasah)" , val : "Kamil (Madrasah)"},
        { title : "Masters in Engineering (MEngg)" , val : "Masters in Engineering (MEngg)"},
        { title : "Masters in Bank Management (MBM)" , val : "Masters in Bank Management (MBM)"},
        { title : "Masters in Information Systems Security (MISS)" , val : "Masters in Information Systems Security (MISS)"},
        { title : "Master of Information & Communication Technology (MICT)" , val : "Master of Information & Communication Technology (MICT)"},
        { title : "Other" , val : "Other"},
    ]

    const examResultTitle = [
        { val : "15" , title : "First Division/Class"},
        { val : "14" , title : "Second  Division/Class"},
        { val : "13" , title : "Third Division/Class"},
        { val : "11" , title : "Grade"},
        { val : "12" , title : "Appeared"},
        { val : "10" , title : "Enrolled"},
        { val : "9" , title : "Awarded"},
        { val : "0" , title : "Do not mention"},
        { val : "8" , title : "Pass"},
    ]

    const onChangeCgpaScaleMarks = (val) => {
        // switch (val) {
        //     case value :
                
        //         break;
        
        //     default:
        //         break;
        // }
    }
    
    return (
        <>
            <Card title="Employee Information">
                <Form
                    layout="vertical"
                    id="employeeListSearch"
                    form={form}
                    // onFinish={submitFrom}
                >
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="levelOfEducation"
                                label="Level of Education"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select Level of Education" },
                                ]}
                            >
                                <Select style={{ width: "100%" }} onChange={(e) => levelOfEducation(e)} placeholder="select level of education">
                                    <Option value="-1">PSC/5 pass</Option>
                                    <Option value="-2">JSC/JDC/8 pass</Option>
                                    <Option value="1">Secondary</Option>
                                    <Option value="2">Higher Secondary</Option>
                                    <Option value="3">Diploma</Option>
                                    <Option value="4">Bachelor/Honors</Option>
                                    <Option value="5">Masters</Option>
                                    <Option value="6">PhD (Doctor of Philosophy)</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            {examDegreeTitleShowHide == true ? 
                            <Form.Item
                                name="examDegreeTitle"
                                label="Exam/Degree Title"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Select Exam/Degree Title" },
                                ]}
                            >
                                <Select style={{ width: "100%" }} onChange={(e) => typeExamDegreeTitleMethod(e)} placeholder="select exam/degree title">
                                {examDegreeList ? (
                                    examDegreeList.map((type, idx) => (
                                    <Option key={idx} value={type.title}>
                                        {type.title}
                                    </Option>
                                    ))
                                ) : (
                                    <Option value="fetching">Fetching Exam/Degree Title</Option>
                                )}
                                    
                                </Select>
                            </Form.Item>
                            : ''}
                            {typeExamDegreeTitle == true ? 
                            <Form.Item
                                name="typeExamDegreeTitle"
                                className="title-Text"
                                label="Please Write Type Exam/Degree Title"
                                rules={[
                                    { required: true, message: "Please Write Type Exam/Degree Title" },
                                ]}
                            >
                                <Input placeholder="select type exam/degree title" />
                            </Form.Item>
                            : '' }
                        </Col>
                        {typeConcentrationMajorGroup == true ? 

                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="concentrationMajorGroup"
                                label="Concentration/ Major/Group"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Select Concentration/ Major/Group" },
                                ]}
                            >
                                <Input placeholder="write Concentration/Major/Group" />
                            </Form.Item>
                        </Col>

                         : ''}
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="board "
                                label="Education Board"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Select Education Board" },
                                ]}
                            >
                                <Select style={{ width: "100%" }} onChange={(e) => levelOfEducation(e)} placeholder="select education board">
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>
                                        Disabled
                                    </Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="instituteName "
                                label="Institute Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Write Institute Name" },
                                ]}
                            >
                                <Input placeholder="write institute name" />
                            </Form.Item>
                            <Checkbox onChange={onChangeForeignInstitute}>This is a foreign institute</Checkbox>
                        </Col>
                        {foreignInstituteShowHide == true ? 
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                    <Form.Item
                                        name="instituteNameForeign"
                                        label="Country of Foreign University"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please Write Institute Name" },
                                        ]}
                                    >
                                        <Input placeholder="write country of foreign university" />
                                    </Form.Item>
                            </Col>
                        : ''}
                    </Row>
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="examResultTitle"
                                label="Result"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Select Result" },
                                ]}
                            >
                                <Select style={{ width: "100%" }} placeholder="select result">
                                {examResultTitle ? (
                                    examResultTitle.map((type, idx) => (
                                    <Option key={idx} value={type.title}>
                                        {type.title}
                                    </Option>
                                    ))
                                ) : (
                                    <Option value="fetching">Fetching Result</Option>
                                )}
                                    
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="cgpa"
                                label="CGPA"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Write CGPA" },
                                ]}
                            >
                                <Input placeholder="write cgpa" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="scale"
                                label="Scale"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Write Scale" },
                                ]}
                            >
                                <Input placeholder="write scale " />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="marks"
                                label="Marks (%)"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Write Marks" },
                                ]}
                            >
                                <Input placeholder="write marks" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="yearOfPassing"
                                label="Year of Passing"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Year of Passing" },
                                ]}
                            >
                                <Select style={{ width: "100%" }}  placeholder="select year of passing">
                                    <Option value="-1" selected="">Year</Option>
                                    <Option value="2027">2027</Option>
                                    <Option value="2026">2026</Option>
                                    <Option value="2025">2025</Option>
                                    <Option value="2024">2024</Option>
                                    <Option value="2023">2023</Option>
                                    <Option value="2022">2022</Option>
                                    <Option value="2021">2021</Option>
                                    <Option value="2020">2020</Option>
                                    <Option value="2019">2019</Option>
                                    <Option value="2018">2018</Option>
                                    <Option value="2017">2017</Option>
                                    <Option value="2016">2016</Option>
                                    <Option value="2015">2015</Option>
                                    <Option value="2014">2014</Option>
                                    <Option value="2013">2013</Option>
                                    <Option value="2012">2012</Option>
                                    <Option value="2011">2011</Option>
                                    <Option value="2010">2010</Option>
                                    <Option value="2009">2009</Option>
                                    <Option value="2008">2008</Option>
                                    <Option value="2007">2007</Option>
                                    <Option value="2006">2006</Option>
                                    <Option value="2005">2005</Option>
                                    <Option value="2004">2004</Option>
                                    <Option value="2003">2003</Option>
                                    <Option value="2002">2002</Option>
                                    <Option value="2001">2001</Option>
                                    <Option value="2000">2000</Option>
                                    <Option value="1999">1999</Option>
                                    <Option value="1998">1998</Option>
                                    <Option value="1997">1997</Option>
                                    <Option value="1996">1996</Option>
                                    <Option value="1995">1995</Option>
                                    <Option value="1994">1994</Option>
                                    <Option value="1993">1993</Option>
                                    <Option value="1992">1992</Option>
                                    <Option value="1991">1991</Option>
                                    <Option value="1990">1990</Option>
                                    <Option value="1989">1989</Option>
                                    <Option value="1988">1988</Option>
                                    <Option value="1987">1987</Option>
                                    <Option value="1986">1986</Option>
                                    <Option value="1985">1985</Option>
                                    <Option value="1984">1984</Option>
                                    <Option value="1983">1983</Option>
                                    <Option value="1982">1982</Option>
                                    <Option value="1981">1981</Option>
                                    <Option value="1980">1980</Option>
                                    <Option value="1979">1979</Option>
                                    <Option value="1978">1978</Option>
                                    <Option value="1977">1977</Option>
                                    <Option value="1976">1976</Option>
                                    <Option value="1975">1975</Option>
                                    <Option value="1974">1974</Option>
                                    <Option value="1973">1973</Option>
                                    <Option value="1972">1972</Option>
                                    <Option value="1971">1971</Option>
                                    <Option value="1970">1970</Option>
                                    <Option value="1969">1969</Option>
                                    <Option value="1968">1968</Option>
                                    <Option value="1967">1967</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="yearDuration"
                                label="Duration (Years)"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Write Duration (Years)" },
                                ]}
                            >
                                <InputNumber placeholder="write duration" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                            <Form.Item
                                name="yearDuration"
                                label="Achievement"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please Write Achievement" },
                                ]}
                            >
                                <Input placeholder="write achievement" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}