import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import { Button, Card,  Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs, Checkbox, Typography, Divider} from 'antd'
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { userStore } from '../../../../store/states/user/user';
import { v4 as uuidv4 } from "uuid";
import Modal from 'antd/lib/modal/Modal';
import { EducationInfoUpdate } from './EducationInfoUpdate';
export default function EducationAndTraning() {

    const { Title } = Typography;
    const { TabPane } = Tabs;
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    const { Option } = Select;
    const [examDegreeList, setExamDegreeList] = useState<any>();
    const [examDegreeTitleShowHide, setExamDegreeTitleShowHide] = useState<any>(true);
    const [typeExamDegreeTitle, setTypeExamDegreeTitle] = useState<any>(false);
    const [typeConcentrationMajorGroup , setConcentrationMajorGroup] = useState<any>(false);
    const [foreignInstituteShowHide, setForeignInstituteShowHide] = useState<any>(false);
    const [boardShowHide, setBoardShowHide] = useState<any>(true);
    const [marksShowHide, setMarksShowHide] = useState<any>(false);
    const [cgpaScaleMarksShowHide, setCgpaScaleMarksShowHide] = useState<any>(false);
    const [expectedYearShowHide, setExpectedYearShowHide] = useState<any>(false);
    const [yearShowHide, setYearShowHide] = useState<any>(true);
    const [educationFromShowHide, setEducationFromShowHide] = useState<any>(false);
    const [addButtonDisable, setAddButtonDisable] = useState<any>(false);
    const saveEmployeeEducationInfo = useStoreActions((state) => state.hr.saveEmployeeEducationInfo);
    const fetchEmployeeEducationList = useStoreActions((state) => state.hr.fetchEmployeeEducationList);
    const employeeEducationList = useStoreState((state) => state.hr.employeeEducationList);
    const deleteEmployeeEducationInfo = useStoreActions((state) =>  state.hr.deleteEmployeeEducationInfo);
    const updateEmployeeEducationInfo = useStoreActions((state) => state.hr.updateEmployeeEducationInfo);
    const [employeeEducationListData, setEmployeeEducationListData] = useState<any>();
    const [employeeEducationListRefineData, setEmployeeEducationListRefineData] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const callback = (key) => {
        console.log(key);
    }

    useEffect(() => {
        let id = localStorage.getItem('employeeId');
        fetchEmployeeEducationList(id);
    },[]);

    useEffect(() => {
        setEmployeeEducationListData(employeeEducationList);
        employeeEducationList ?
        employeeEducationList.map((item, index) => {
            dataRefineMethod(item);
        })
        : '';
    },[employeeEducationList])

    const dataRefineMethod = (item) => {
        let levelEducation;
        let educationId;
        levelOfEducationTitle.map((it, ndex) => {
            if (item.levelOfEducation == it.val) {
                levelEducation = it.title;
            }
        });
        levelOfEducationTitle.map((it, ndex) => {
            if (item.levelOfEducation == it.val) {
                levelEducation = it.title;
            }
        });
    }

    const levelOfEducation = (val) => {
        switch (val) {
            case val = "PSC/5 pass":
                setExamDegreeList(examPscTitle);
                setConcentrationMajorGroup(false);
                setBoardShowHide(true);
                setTypeExamDegreeTitle(false);
                setExamDegreeTitleShowHide(true);
                setBoardShowHide(true);
                break;
            case val = "JSC/JDC/8 pass":
                setExamDegreeList(examJscTitle);
                setConcentrationMajorGroup(false);
                setBoardShowHide(true);
                setTypeExamDegreeTitle(false);
                setExamDegreeTitleShowHide(true);
                setBoardShowHide(true);
                break;
            case val = "Secondary":
                setExamDegreeList(examSecondaryTitle);
                setConcentrationMajorGroup(true);
                setBoardShowHide(true);
                setTypeExamDegreeTitle(false);
                setExamDegreeTitleShowHide(true);
                setBoardShowHide(true);
                break;
            case val = "Higher Secondary":
                setExamDegreeList(examHigherSecondaryTitle);
                setConcentrationMajorGroup(true);
                setBoardShowHide(true);
                break;
            case val = "Diploma":
                setExamDegreeList(examDiplomaTitle);
                setConcentrationMajorGroup(true);
                setBoardShowHide(false);
                setTypeExamDegreeTitle(false);
                setExamDegreeTitleShowHide(true);
                break;
            case val = "Bachelor/Honors":
                setExamDegreeList(examBachelorTitle);
                setConcentrationMajorGroup(true);
                setTypeExamDegreeTitle(false);
                setExamDegreeTitleShowHide(true);
                break;
            case val = "Masters":
                setExamDegreeList(examMasterTitle);
                setConcentrationMajorGroup(true);
                setBoardShowHide(false);
                setTypeExamDegreeTitle(false);
                setExamDegreeTitleShowHide(true);
                break;
            case val = "PhD (Doctor of Philosophy)":
                setExamDegreeTitleShowHide(false);
                setConcentrationMajorGroup(true);
                setBoardShowHide(false);
                setTypeExamDegreeTitle(true);
                setExamDegreeTitleShowHide(false);
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

    const levelOfEducationTitle = [
        { val : "-1" ,title : "PSC/5 pass"},
        { val : "-2" ,title : "JSC/JDC/8 pass"},
        { val : "1" , title: "Secondary"},
        { val : "2" , title: "Higher Secondary"},
        { val : "3" , title: "Diploma"},
        { val : "4" , title: "Bachelor/Honors"},
        { val : "5" , title: "Masters"},
        { val : "6" , title: "PhD (Doctor of Philosophy)"},
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



    const onChangeresultList = (val) => {
        switch (val) {
            case val = "First Division/Class" :
                setMarksShowHide(true);
                setCgpaScaleMarksShowHide(false);
                setExpectedYearShowHide(false);
                break;
            case val = "Second  Division/Class" :
                setMarksShowHide(true);
                setCgpaScaleMarksShowHide(false);
                setExpectedYearShowHide(false);
                setYearShowHide(true);
                break;
            case val = "Third Division/Class" :
                setMarksShowHide(true);
                setCgpaScaleMarksShowHide(false);
                setExpectedYearShowHide(false);
                setYearShowHide(true);
                break;
            case val = "Grade" :
                setCgpaScaleMarksShowHide(true);
                setMarksShowHide(false);
                setExpectedYearShowHide(false);
                setYearShowHide(true);
                break;
            case val = "Appeared" :
                setMarksShowHide(false);
                setCgpaScaleMarksShowHide(false);
                setExpectedYearShowHide(true);
                setYearShowHide(false);
                break;
            case val = "Enrolled" :
                setMarksShowHide(false);
                setCgpaScaleMarksShowHide(false);
                setExpectedYearShowHide(false);
                setYearShowHide(true);
                break;
            case val = "Awarded" :
                setMarksShowHide(false);
                setCgpaScaleMarksShowHide(false);
                setExpectedYearShowHide(false);
                setYearShowHide(true);
                break;
            case val = "Do not mention" :
                setMarksShowHide(false);
                setCgpaScaleMarksShowHide(false);
                setExpectedYearShowHide(false);
                setYearShowHide(true);
                break;
            case val = "Pass" :
                setMarksShowHide(false);
                setCgpaScaleMarksShowHide(false);
                setExpectedYearShowHide(false);
                setYearShowHide(true);
                break;
            default:
                break;
        }
    } 

    const educationSummaryhideshow = () => {
        setEducationFromShowHide(true);
        setAddButtonDisable(true);
    }

    const onChangeCgpaScaleMarks = (val) => {
        switch (val) {
            case val == "15" :
                
                break;
        
            default:
                break;
        }
    }

    const onClickCancel = () => {
        setAddButtonDisable(false);
        setEducationFromShowHide(false);
    }

    const educationInformationForm = (value) => {
        console.log('value', value);
        let postData = {
            "boardName": value?.board,
            "cgpa": value.cgpa ? value.cgpa : '',
            "durationInYears": value?.yearDuration,
            "employeeId": localStorage.getItem('employeeId'),
            "examTitle": value?.examDegreeTitle,
            "instituteName": value?.instituteName,
            "levelOfEducation": value?.levelOfEducation,
            "majorSubject": value.concentrationMajorGroup ? value.concentrationMajorGroup : '',
            "marksPercentage": value?.marks,
            "result": value?.examResultTitle,
            "scale": value.scale ? value.scale : '',
            "yearOfpassing": value?.yearOfPassing || value?.expectedYearOfPassing
          }
          saveEmployeeEducationInfo(postData)
          onClickCancel();
    }

    const deleteEducatioInfo = (val) => {
        deleteEmployeeEducationInfo(val)
        let id = localStorage.getItem('employeeId');
        fetchEmployeeEducationList(id);
    }
    
    const editEducationInfoMadal = (val) => {
        setIsModalVisible(true);
        updateForm.resetFields();
        let dataList:any = {};
        employeeEducationListData.map((item, index) => {
            if (item.educationId == val) {
                let dataInfo:any = {
                    boardName: item.boardName ? item.boardName : '',
                    cgpa: item.cgpa ? item.cgpa : '',
                    durationInYears: item.durationInYears ? item.durationInYears : '',
                    educationId: item.educationId ? item.educationId : '',
                    employeeId: item.employeeId ? item.employeeId : '',
                    employeeName: item.employeeName ? item.employeeName : '',
                    examTitle: item.examTitle ? item.examTitle : '',
                    instituteName: item.instituteName ? item.instituteName : '',
                    levelOfEducation: item.levelOfEducation ? item.levelOfEducation : '',
                    majorSubject: item.majorSubject ? item.majorSubject : '',
                    marksPercentage: item.marksPercentage ? item.marksPercentage : '',
                    result: item.result ? item.result : '',
                    scale: item.scale ? item.scale : '',
                    yearOfpassing: item.yearOfpassing ? item.yearOfpassing : '',
                }
                Object.assign(dataList, dataInfo);
            }
        });
        updateForm.setFieldsValue({
            levelOfEducationUpdate: dataList.levelOfEducation,
            examDegreeTitleUpdate: dataList.examTitle,
            typeExamDegreeTitleUpdate: dataList.examTitle,
            concentrationMajorGroupUpdate: dataList.majorSubject,
            boardUpdate: dataList.boardName,
            instituteNameUpdate: dataList.instituteName,
            examResultTitleUpdate: dataList.result,
            cgpaUpdate: dataList.cgpa,
            scaleUpdate: dataList.scale,
            marksUpdate: dataList.marksPercentage,
            yearOfPassingUpdate: dataList.yearOfpassing,
            yearDurationUpdate: dataList.durationInYears
        });
        setEmployeeEducationListRefineData(dataList);
    }

    const updateeducationInfoSubmit = (value) => {
        console.log('value', value);
        let data:any = {
            boardName: value.boardUpdate,
            cgpa: value.cgpaUpdate,
            durationInYears: value.yearDurationUpdate,
            educationId: employeeEducationListRefineData.educationId,
            employeeId: localStorage.getItem('employeeId'),
            employeeName: "",
            examTitle: value.examDegreeTitleUpdate,
            instituteName: value.instituteNameUpdate,
            levelOfEducation: value.levelOfEducationUpdate,
            majorSubject: value.concentrationMajorGroupUpdate,
            marksPercentage: value.marksUpdate ? value.marksUpdate : '',
            result: value.examResultTitleUpdate,
            scale: value.scaleUpdate,
            yearOfpassing: value.yearOfPassingUpdate
        } 
        updateEmployeeEducationInfo(data);
        setIsModalVisible(false);
    }

    const closeModalMethod = (e) => {
        updateForm.resetFields();
        setIsModalVisible(false);
    }
    
    return (
        <>
            <Card title="Employee Information">
                
                <>
                    {employeeEducationListData ? (
                        employeeEducationListData.map((item, index) => (
                            <>
                                <Row>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={3}>Academic {(index + 1)}</Title>
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6, offset:12}} lg={{ span: 6, offset:12}} xl={{ span: 6, offset:12}}>
                                        <div style={{ float:"right" }}>
                                            <Tooltip title="Edit">
                                                <Button type='primary'  icon={<EditOutlined />} onClick={() => editEducationInfoMadal(item?.educationId)}/>
                                            </Tooltip>
                                            &nbsp;
                                            <Popconfirm
                                                title="Are you sure to delete this?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => deleteEducatioInfo(item?.educationId)}
                                            >
                                            <Tooltip title="Delete">
                                                <Button danger  icon={<DeleteOutlined />} />
                                            </Tooltip>
                                        </Popconfirm>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider style={{ marginTop: 0, }}/>
                                <Row>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Level of Education </Title>
                                        <p>{item?.levelOfEducation}</p>
                                    </Col>
                                    {item?.examTitle ?
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Exam/Degree Title</Title>
                                        <p>{item?.examTitle}</p>
                                    </Col>
                                    : ''}
                                    {item?.boardName ? 
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Board Name </Title>
                                        <p>{item?.boardName}</p>
                                    </Col>
                                    : ''}
                                    {item?.majorSubject ? 
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>EConcentration/ Major/Group </Title>
                                        <p>{item?.majorSubject}</p>
                                    </Col>
                                    : ''}
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Institute Name </Title>
                                        <p>{item.instituteName}</p>
                                    </Col>
                                    {item?.result ?
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Result </Title>
                                        <p>{item?.result}</p>
                                    </Col>
                                    : ''}
                                    {item?.marksPercentage ? 
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Marks Percentage</Title>
                                        <p>{item?.marksPercentage}%</p>
                                    </Col>
                                    : ''}
                                    {item?.cgpa ? 
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>CGPA</Title>
                                        <p>{item?.cgpa}</p>
                                    </Col>
                                    : ''}
                                    {item.scale ? 
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Scale</Title>
                                        <p>{item?.scale}</p>
                                    </Col>
                                    : ''}
                                    {item.durationInYears ? 
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Duration Year</Title>
                                        <p>{item?.durationInYears}</p>
                                    </Col>
                                    : ''}
                                    {item.yearOfpassing ? 
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                        <Title level={5}>Year of Passing</Title>
                                        <p>{item?.yearOfpassing}</p>
                                    </Col>
                                    : ''}
                                </Row>
                            </>
                        ))
                    ) : (
                        ""
                    )}       
                </>
                {educationFromShowHide == true ? 
                <>
                    <Divider />
                    <Form
                        layout="vertical"
                        id="educationInformation"
                        form={form}
                        onFinish={educationInformationForm}
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
                                        <Option value="PSC/5 pass">PSC/5 pass</Option>
                                        <Option value="JSC/JDC/8 pass">JSC/JDC/8 pass</Option>
                                        <Option value="Secondary">Secondary</Option>
                                        <Option value="Higher Secondary">Higher Secondary</Option>
                                        <Option value="Diploma">Diploma</Option>
                                        <Option value="Bachelor/Honors">Bachelor/Honors</Option>
                                        <Option value="Masters">Masters</Option>
                                        <Option value="PhD (Doctor of Philosophy)">PhD (Doctor of Philosophy)</Option>
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
                            {boardShowHide == true ? 
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="board"
                                    label="Education Board"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Select Education Board" },
                                    ]}
                                >
                                    <Select style={{ width: "100%" }}  placeholder="select education board">
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
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="instituteName"
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
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="examResultTitle"
                                    label="Result"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Select Result" },
                                    ]}
                                >
                                    <Select style={{ width: "100%" }} placeholder="select result" onChange={(e) => onChangeresultList(e)}>
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
                            {cgpaScaleMarksShowHide == true ?
                                <>
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
                                </>
                            : ''}
                            {marksShowHide == true ? 
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
                            : '' }
                            { yearShowHide == true ? 
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
                            : '' }
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
                        </Row>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}}>
                                    <Space size="small" style={{ float: "right" }} >
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                            Save
                                        </Button>
                                        <Button type="primary" danger onClick={() => onClickCancel()}>
                                            Cancel
                                        </Button>
                                    </Space>
                            </Col>
                        </Row>
                    </Form>
                </>
                : ''}
                <Button type="primary"  icon={<PlusOutlined />} onClick={() => educationSummaryhideshow()} disabled={addButtonDisable == true ? true : false}>
                    Add Education (If Required)
                </Button>
            </Card>
            <Modal
                title="Update Education Information"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={(e) => closeModalMethod(e)}
                cancelText="Close"
                okText="Update"
                centered
                maskClosable={false}
                width={1000}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={updateeducationInfoSubmit}
                    form={updateForm}
                >
                    <Row>
                        <Col span={24}>
                            <EducationInfoUpdate data={employeeEducationListRefineData}/>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}