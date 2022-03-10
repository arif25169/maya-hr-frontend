import { Button, Card,  Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Checkbox, Typography, Divider} from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

export interface EducationInfoUpdate {
  data?: any;
}

export const EducationInfoUpdate = ({
    data
}: EducationInfoUpdate) => {

    const [form] = Form.useForm();
    const { Option } = Select;
    const [typeConcentrationMajorGroupUpdate , setConcentrationMajorGroupUpdate] = useState<any>(false);
    const [examDegreeTitleShowHideUpdate, setExamDegreeTitleShowHideUpdate] = useState<any>(true);
    const [typeExamDegreeTitleUpdate, setTypeExamDegreeTitleUpdate] = useState<any>(false);
    const [boardShowHideUpdate, setBoardShowHideUpdate] = useState<any>(true);
    const [foreignInstituteShowHideUpdate, setForeignInstituteShowHideUpdate] = useState<any>(false);
    const [cgpaScaleMarksShowHideUpdate, setCgpaScaleMarksShowHideUpdate] = useState<any>(false);
    const [marksShowHideUpdate, setMarksShowHideUpdate] = useState<any>(false);
    const [expectedYearShowHideUpdate, setExpectedYearShowHideUpdate] = useState<any>(false);
    const [yearShowHideUpdate, setYearShowHideUpdate] = useState<any>(true);
    const [examDegreeList, setExamDegreeList] = useState<any>();
    const levelOfEducation = (val) => {
        switch (val) {
            case val = "PSC/5 pass":
                setExamDegreeList(examPscTitle);
                setConcentrationMajorGroupUpdate(false);
                setBoardShowHideUpdate(true);
                setTypeExamDegreeTitleUpdate(false);
                setExamDegreeTitleShowHideUpdate(true);
                setBoardShowHideUpdate(true);
                break;
            case val = "JSC/JDC/8 pass":
                setExamDegreeList(examJscTitle);
                setConcentrationMajorGroupUpdate(false);
                setBoardShowHideUpdate(true);
                setTypeExamDegreeTitleUpdate(false);
                setExamDegreeTitleShowHideUpdate(true);
                setBoardShowHideUpdate(true);
                break;
            case val = "Secondary":
                setExamDegreeList(examSecondaryTitle);
                setConcentrationMajorGroupUpdate(true);
                setBoardShowHideUpdate(true);
                setTypeExamDegreeTitleUpdate(false);
                setExamDegreeTitleShowHideUpdate(true);
                setBoardShowHideUpdate(true);
                break;
            case val = "Higher Secondary":
                setExamDegreeList(examHigherSecondaryTitle);
                setConcentrationMajorGroupUpdate(true);
                setBoardShowHideUpdate(true);
                break;
            case val = "Diploma":
                setExamDegreeList(examDiplomaTitle);
                setConcentrationMajorGroupUpdate(true);
                setBoardShowHideUpdate(false);
                setTypeExamDegreeTitleUpdate(false);
                setExamDegreeTitleShowHideUpdate(true);
                break;
            case val = "Bachelor/Honors":
                setExamDegreeList(examBachelorTitle);
                setConcentrationMajorGroupUpdate(true);
                setTypeExamDegreeTitleUpdate(false);
                setExamDegreeTitleShowHideUpdate(true);
                break;
            case val = "Masters":
                setExamDegreeList(examMasterTitle);
                setConcentrationMajorGroupUpdate(true);
                setBoardShowHideUpdate(false);
                setTypeExamDegreeTitleUpdate(false);
                setExamDegreeTitleShowHideUpdate(true);
                break;
            case val = "PhD (Doctor of Philosophy)":
                setExamDegreeTitleShowHideUpdate(false);
                setConcentrationMajorGroupUpdate(true);
                setBoardShowHideUpdate(false);
                setTypeExamDegreeTitleUpdate(true);
                setExamDegreeTitleShowHideUpdate(false);
                break;
            default:
                break;
        }
    }
    const typeExamDegreeTitleMethod = (val) => {
        if (val == 'Other') {
            setTypeExamDegreeTitleUpdate(true);
        } else {
            setTypeExamDegreeTitleUpdate(false);
        }
    }

    const onChangeForeignInstitute = (val) => {
        if(val.target.checked == true){
            setForeignInstituteShowHideUpdate(true);
        }else{
            setForeignInstituteShowHideUpdate(false);
        }
    }

    const levelOfEducationTitle = [
        { val : "PSC/5 pass" ,title : "PSC/5 pass"},
        { val : "JSC/JDC/8 pass" ,title : "JSC/JDC/8 pass"},
        { val : "Secondary" , title: "Secondary"},
        { val : "Higher Secondary" , title: "Higher Secondary"},
        { val : "Diploma" , title: "Diploma"},
        { val : "Bachelor/Honors" , title: "Bachelor/Honors"},
        { val : "Masters" , title: "Masters"},
        { val : "PhD (Doctor of Philosophy)" , title: "PhD (Doctor of Philosophy)"},
    ]

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
        { val : "First Division/Class" , title : "First Division/Class"},
        { val : "Second  Division/Class" , title : "Second  Division/Class"},
        { val : "Third Division/Class" , title : "Third Division/Class"},
        { val : "Grade" , title : "Grade"},
        { val : "Appeared" , title : "Appeared"},
        { val : "Enrolled" , title : "Enrolled"},
        { val : "Awarded" , title : "Awarded"},
        { val : "Do not mention" , title : "Do not mention"},
        { val : "Pass" , title : "Pass"},
    ]

    useEffect(() => {
        onChangeresultList(data?.result);
        levelOfEducation(data?.levelOfEducation);
        typeExamDegreeTitleMethod(data?.examTitle);
    }, [data])

    const onChangeresultList = (val) => {
        switch (val) {
            case val = "First Division/Class" :
                setMarksShowHideUpdate(true);
                setCgpaScaleMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(false);
                break;
            case val = "Second  Division/Class" :
                setMarksShowHideUpdate(true);
                setCgpaScaleMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(false);
                setYearShowHideUpdate(true);
                break;
            case val = "Third Division/Class" :
                setMarksShowHideUpdate(true);
                setCgpaScaleMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(false);
                setYearShowHideUpdate(true);
                break;
            case val = "Grade" :
                setCgpaScaleMarksShowHideUpdate(true);
                setMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(false);
                setYearShowHideUpdate(true);
                break;
            case val = "Appeared" :
                setMarksShowHideUpdate(false);
                setCgpaScaleMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(true);
                setYearShowHideUpdate(false);
                break;
            case val = "Enrolled" :
                setMarksShowHideUpdate(false);
                setCgpaScaleMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(false);
                setYearShowHideUpdate(true);
                break;
            case val = "Awarded" :
                setMarksShowHideUpdate(false);
                setCgpaScaleMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(false);
                setYearShowHideUpdate(true);
                break;
            case val = "Do not mention" :
                setMarksShowHideUpdate(false);
                setCgpaScaleMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(false);
                setYearShowHideUpdate(true);
                break;
            case val = "Pass" :
                setMarksShowHideUpdate(false);
                setCgpaScaleMarksShowHideUpdate(false);
                setExpectedYearShowHideUpdate(false);
                setYearShowHideUpdate(true);
                break;
            default:
                break;
        }
    } 
    

  return (
    <>
        <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                <Form.Item
                    name="levelOfEducationUpdate"
                    label="Level of Education"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please select Level of Education" },
                    ]}
                >
                    <Select style={{ width: "100%" }} onChange={(e) => levelOfEducation(e)} placeholder="select level of education">
                        {levelOfEducationTitle ? (
                        levelOfEducationTitle.map((type, id) => (
                            <Option key={id} value={type.val}>
                                {type.title}
                            </Option>
                            ))
                        ) : (
                            <Option value="fetching">Fetching Exam/Degree Title</Option>
                        )}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                {examDegreeTitleShowHideUpdate == true ? 
                <Form.Item
                    name="examDegreeTitleUpdate"
                    label="Exam/Degree Title"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please Select Exam/Degree Title" },
                    ]}
                >
                    <Select style={{ width: "100%" }} onChange={(e) => typeExamDegreeTitleMethod(e)} placeholder="select exam/degree title">
                    {examDegreeList ? (
                        examDegreeList.map((type, idx) => (
                        <Option key={uuidv4()} value={type.title}>
                            {type.title}
                        </Option>
                        ))
                    ) : (
                        <Option value="fetching">Fetching Exam/Degree Title</Option>
                    )}
                        
                    </Select>
                </Form.Item>
                : ''}
                {typeExamDegreeTitleUpdate == true ? 
                <Form.Item
                    name="typeExamDegreeTitleUpdate"
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
            {typeConcentrationMajorGroupUpdate == true ? 

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                <Form.Item
                    name="concentrationMajorGroupUpdate"
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
            {boardShowHideUpdate == true ? 
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                <Form.Item
                    name="boardUpdate"
                    label="Education Board"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please Select Education Board" },
                    ]}
                >
                    <Select style={{ width: "100%" }}  placeholder="select education board" >
                        <Option value="Barishal">Barishal</Option>
                        <Option value="Chattogram">Chattogram</Option>
                        <Option value="Cumilla">Cumilla</Option>
                        <Option value="Dhaka">Dhaka</Option>
                        <Option value="Dinajpur">Dinajpur</Option>
                        <Option value="Jashore">Jashore</Option>
                        <Option value="Mymensingh">Mymensingh</Option>
                        <Option value="Rajshahi">Rajshahi</Option>
                        <Option value="Sylhet">Sylhet</Option>
                        <Option value="Madrasah">Madrasah</Option>
                        <Option value="Technical">Technical</Option>
                        <Option value="BOU">BOU</Option>
                    </Select>
                </Form.Item>
            </Col>
            : ''}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                <Form.Item
                    name="instituteNameUpdate"
                    label="Institute Name"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please Write Institute Name" },
                    ]}
                >
                    <Input placeholder="write institute name" />
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                <Form.Item
                    name="examResultTitleUpdate"
                    label="Result"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please Select Result" },
                    ]}
                >
                    <Select style={{ width: "100%" }} placeholder="select result" onChange={(e) => onChangeresultList(e)} >
                    {examResultTitle ? (
                        examResultTitle.map((type, idx) => (
                        <Option key={idx} value={type.val}>
                            {type.title}
                        </Option>
                        ))
                    ) : (
                        <Option value="fetching">Fetching Result</Option>
                    )}
                        
                    </Select>
                </Form.Item>
            </Col>
            {cgpaScaleMarksShowHideUpdate == true ?
                <>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                        <Form.Item
                            name="cgpaUpdate"
                            label="CGPA"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please Write CGPA" },
                            ]}
                        >
                            <Input placeholder="write cgpa" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                        <Form.Item
                            name="scaleUpdate"
                            label="Scale"
                            className="title-Text"
                            rules={[
                                { required: true, message: "Please Write Scale" },
                            ]}
                        >
                            <Input placeholder="write scale " />
                        </Form.Item>
                    </Col>
                </>
            : ''}
            {marksShowHideUpdate == true ? 
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                <Form.Item
                    name="marksUpdate"
                    label="Marks (%)"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please Write Marks" },
                    ]}
                >
                    <Input placeholder="write marks" />
                </Form.Item>
            </Col>
            : '' }
            { yearShowHideUpdate == true ? 
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                <Form.Item
                    name="yearOfPassingUpdate"
                    label="Year of Passing"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please Year of Passing" },
                    ]}
                >
                    <DatePicker picker="year" style={{ width: "100%" }}  />
                </Form.Item>
            </Col>
            : '' }
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12}} lg={{ span: 12}} xl={{ span: 12}}>
                <Form.Item
                    name="yearDurationUpdate"
                    label="Duration (Years)"
                    className="title-Text"
                    rules={[
                        { required: true, message: "Please Write Duration (Years)" },
                    ]}
                >
                    <InputNumber placeholder="write duration" />
                </Form.Item>
            </Col>
        </Row>
    </>
  );
};
