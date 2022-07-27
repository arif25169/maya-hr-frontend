import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Row,
    Select,
    Space,
    Tooltip,
    message,
    Modal,
    Checkbox,
    notification,
    Tabs,
    DatePicker,
    Skeleton,
    Descriptions,
} from "antd";
import { useStoreActions, useStoreState } from "../../../store/hooks/easyPeasy";
import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    FileExcelOutlined,
    SaveOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
import moment from "moment";
import { Table } from "ant-table-extensions-extended";

var year = new Date().getFullYear() * 1;

export default function EmployeeAttendanceMonthWiseAllReport() {
    const { Option } = Select;
    const [form] = Form.useForm();

    const attendanceDetailsAllEmployee2 = useStoreState(
        (state) => state.attendance.attendanceDetailsAllEmployee2
    );
    const fetchattendanceDetailsAllEmployee2 = useStoreActions(
        (state) => state.attendance.fetchattendanceDetailsAllEmployee2
    );
    const loading = useStoreState((state) => state.attendance.loading);

    const onsearch = (value) => {
        let postData = {
            fromDate: moment(value?.fromDate).format("YYYY-MM-DD"),
            toDate: moment(value?.toDate).format("YYYY-MM-DD"),
        };
        fetchattendanceDetailsAllEmployee2(postData);
    };

    const columns = [
        {
            title: "Id",
            dataIndex: "customEmployeeId",
            key: "customEmployeeId",
            showOnResponse: true,
            showOnDesktop: true,
        },
        {
            title: "Employee Name",
            dataIndex: "employeeName",
            key: "employeeName",
            showOnResponse: true,
            showOnDesktop: true,
        },
        {
            title: "Working Days",
            dataIndex: "totalWorkingDay",
            key: "totalWorkingDay",
            showOnResponse: true,
            showOnDesktop: true,
        },
        {
            title: "Present",
            dataIndex: "totalPresent",
            key: "totalPresent",
            showOnResponse: true,
            showOnDesktop: true,
        },
        {
            title: "Absent",
            dataIndex: "totalAbsent",
            key: "totalAbsent",
            showOnResponse: true,
            showOnDesktop: true,
        },
        {
            title: "Leave",
            dataIndex: "totalLeave",
            key: "totalLeave",
            showOnResponse: true,
            showOnDesktop: true,
        },
        {
            title: "Delay",
            dataIndex: "totalDelay",
            key: "totalDelay",
            showOnResponse: true,
            showOnDesktop: true,
        },
        {
            title: "Early Leave",
            dataIndex: "totalEarlyLeave",
            key: "totalEarlyLeave",
            showOnResponse: true,
            showOnDesktop: true,
        },

        ...(attendanceDetailsAllEmployee2?.firstDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.firstDay,
                    dataIndex: "firstDay",
                    key: "firstDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),

        ...(attendanceDetailsAllEmployee2?.secondDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.secondDay,
                    dataIndex: "secondDay",
                    key: "secondDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.thirdDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.thirdDay,
                    dataIndex: "thirdDay",
                    key: "thirdDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.fourthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.fourthDay,
                    dataIndex: "fourthDay",
                    key: "fourthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.fifthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.fifthDay,
                    dataIndex: "fifthDay",
                    key: "fifthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.sixthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.sixthDay,
                    dataIndex: "sixthDay",
                    key: "sixthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.seventhDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.seventhDay,
                    dataIndex: "seventhDay",
                    key: "seventhDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.eighthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.eighthDay,
                    dataIndex: "eighthDay",
                    key: "eighthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.ninethDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.ninethDay,
                    dataIndex: "ninethDay",
                    key: "ninethDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.tenthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.tenthDay,
                    dataIndex: "tenthDay",
                    key: "tenthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.eleventhDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.eleventhDay,
                    dataIndex: "eleventhDay",
                    key: "eleventhDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twelvethDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twelvethDay,
                    dataIndex: "twelvethDay",
                    key: "twelvethDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.thirteenthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.thirteenthDay,
                    dataIndex: "thirteenthDay",
                    key: "thirteenthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.fourteenthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.fourteenthDay,
                    dataIndex: "fourteenthDay",
                    key: "fourteenthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.fifteenthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.fifteenthDay,
                    dataIndex: "fifteenthDay",
                    key: "fifteenthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.sixteenthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.sixteenthDay,
                    dataIndex: "sixteenthDay",
                    key: "sixteenthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.seventeenthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.seventeenthDay,
                    dataIndex: "seventeenthDay",
                    key: "seventeenthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.eighteenthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.eighteenthDay,
                    dataIndex: "eighteenthDay",
                    key: "eighteenthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.nineteenthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.nineteenthDay,
                    dataIndex: "nineteenthDay",
                    key: "nineteenthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentythDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentythDay,
                    dataIndex: "twentythDay",
                    key: "twentythDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentyFirstDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentyFirstDay,
                    dataIndex: "twentyFirstDay",
                    key: "twentyFirstDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentySecondDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentySecondDay,
                    dataIndex: "twentySecondDay",
                    key: "twentySecondDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentyThirdDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentyThirdDay,
                    dataIndex: "twentyThirdDay",
                    key: "twentyThirdDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentyFourthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentyFourthDay,
                    dataIndex: "twentyFourthDay",
                    key: "twentyFourthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentyFifthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentyFifthDay,
                    dataIndex: "twentyFifthDay",
                    key: "twentyFifthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentySixthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentySixthDay,
                    dataIndex: "twentySixthDay",
                    key: "twentySixthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentySeventhDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentySeventhDay,
                    dataIndex: "twentySeventhDay",
                    key: "twentySeventhDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentyEighthDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentyEighthDay,
                    dataIndex: "twentyEighthDay",
                    key: "twentyEighthDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.twentyNinethDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.twentyNinethDay,
                    dataIndex: "twentyNinethDay",
                    key: "twentyNinethDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),        
            ...(attendanceDetailsAllEmployee2?.thirtythDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.thirtythDay,
                    dataIndex: "thirtythDay",
                    key: "thirtythDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),
        ...(attendanceDetailsAllEmployee2?.thirtyFirstDay !== ""
            ? [
                {
                    title: attendanceDetailsAllEmployee2?.thirtyFirstDay,
                    dataIndex: "thirtyFirstDay",
                    key: "thirtyFirstDay",
                    showOnResponse: true,
                    showOnDesktop: true,
                    render: (text, record) => {
                        return {
                            props: {
                                className:
                                    text === "P" || text === "P(L)" || text === "P (L)" ? "attpresent" : "atterror", // there it is!
                            },
                            children: text,
                        };
                    },
                },
            ]
            : []),

        // { title: attendanceDetailsAllEmployee2?.firstDay, dataIndex: 'firstDay', key: 'firstDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.secondDay, dataIndex: 'secondDay', key: 'secondDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.thirdDay, dataIndex: 'thirdDay', key: 'thirdDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.fourthDay, dataIndex: 'fourthDay', key: 'fourthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.fifthDay, dataIndex: 'fifthDay', key: 'fifthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.sixthDay, dataIndex: 'sixthDay', key: 'sixthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.seventhDay, dataIndex: 'seventhDay', key: 'seventhDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.eighthDay, dataIndex: 'eighthDay', key: 'eighthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.ninethDay, dataIndex: 'ninethDay', key: 'ninethDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.tenthDay, dataIndex: 'tenthDay', key: 'tenthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.eleventhDay, dataIndex: 'eleventhDay', key: 'eleventhDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twelvethDay, dataIndex: 'twelvethDay', key: 'twelvethDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.thirteenthDay, dataIndex: 'thirteenthDay', key: 'thirteenthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.fourteenthDay, dataIndex: 'fourteenthDay', key: 'fourteenthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.fifteenthDay, dataIndex: 'fifteenthDay', key: 'fifteenthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.sixteenthDay, dataIndex: 'sixteenthDay', key: 'sixteenthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.seventeenthDay, dataIndex: 'seventeenthDay', key: 'seventeenthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.eighteenthDay, dataIndex: 'eighteenthDay', key: 'eighteenthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.nineteenthDay, dataIndex: 'nineteenthDay', key: 'nineteenthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentythDay, dataIndex: 'twentythDay', key: 'twentythDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentyFirstDay, dataIndex: 'twentyFirstDay', key: 'twentyFirstDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentySecondDay, dataIndex: 'twentySecondDay', key: 'twentySecondDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentyThirdDay, dataIndex: 'twentyThirdDay', key: 'twentyThirdDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentyFourthDay, dataIndex: 'twentyFourthDay', key: 'twentyFourthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentyFifthDay, dataIndex: 'twentyFifthDay', key: 'twentyFifthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentySixthDay, dataIndex: 'twentySixthDay', key: 'twentySixthDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentySeventhDay, dataIndex: 'twentySeventhDay', key: 'twentySeventhDay', showOnResponse: true, showOnDesktop: true },
        // { title: attendanceDetailsAllEmployee2?.twentyEighthDay, dataIndex: 'twentyEighthDay', key: 'twentyEighthDay', showOnResponse: true, showOnDesktop: true },
        // attendanceDetailsAllEmployee2?.twentyNinethDay !== '' && { title: attendanceDetailsAllEmployee2?.twentyNinethDay, dataIndex: 'twentyNinethDay', key: 'twentyNinethDay', showOnResponse: true, showOnDesktop: true },
        // attendanceDetailsAllEmployee2?.thirtythDay !== '' && { title: attendanceDetailsAllEmployee2?.thirtythDay, dataIndex: 'thirtythDay', key: 'thirtythDay', showOnResponse: true, showOnDesktop: true },
        // attendanceDetailsAllEmployee2?.thirtyFirstDay !== '' && { title: attendanceDetailsAllEmployee2?.thirtyFirstDay, dataIndex: 'thirtyFirstDay', key: 'thirtyFirstDay', showOnResponse: true, showOnDesktop: true },
    ];

    return (
        <>
            <>
                <Row>
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 24 }}
                        lg={{ span: 20, offset: 4 }}
                        xl={{ span: 20, offset: 4 }}
                    >
                        <Form
                            layout="vertical"
                            id="sessionYearInfo"
                            onFinish={onsearch}
                            form={form}
                        >
                            <Row gutter={8}>
                                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                                    {" "}
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Form.Item
                                        name="fromDate"
                                        label="Start Date"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please enter from date" },
                                        ]}
                                    >
                                        <DatePicker
                                            style={{ width: "100%" }}
                                            placeholder="Select Date"
                                            format={"DD/MM/YYYY"}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Form.Item
                                        name="toDate"
                                        label="End Date"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please enter to date" },
                                        ]}
                                    >
                                        <DatePicker
                                            style={{ width: "100%" }}
                                            placeholder="Select Date"
                                            format={"DD/MM/YYYY"}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ height: 40, marginTop: 30 }}
                                        icon={<SearchOutlined />}
                                    >
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Skeleton loading={loading} paragraph={{ rows: 10 }} />
                {attendanceDetailsAllEmployee2?.staffList?.length > 0 && (
                    <Row>

                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 24 }}
                            style={{ marginTop: 15 }}
                        >
                            {/* <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: columns,
                                    rowKey: "customEmployeeId",
                                    dataSource: attendanceDetailsAllEmployee2?.staffList,
                                    filterData: attendanceDetailsAllEmployee2?.staffList,
                                    pagination: true,
                                    bordered: true
                                }}
                                mobileBreakPoint={768}
                            /> */}
                            <Table
                                dataSource={attendanceDetailsAllEmployee2?.staffList}
                                searchable
                                headerBackground="#b8d7cd"
                                searchableProps={{
                                    inputProps: {
                                        placeholder: "Search this table...",
                                        prefix: <SearchOutlined />,
                                    },
                                }}
                                columns={columns}
                            />
                            <br />
                            <Space size={"large"} style={{ float: "right" }}>
                                <Button
                                    type="primary"
                                    icon={<FileExcelOutlined />}
                                    onClick={() => {
                                        const excel: any = new Excel();
                                        excel
                                            .addSheet(`Attendance`)
                                            .addColumns(columns)
                                            .addDataSource(attendanceDetailsAllEmployee2?.staffList, {
                                                str2Percent: true,
                                            })
                                            .saveAs(`Date to date employee attendance.xlsx`);
                                    }}
                                >
                                    Download Excel
                                </Button>
                            </Space>
                        </Col>
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                            <Descriptions
                                title="Shortcut Symbol"
                                bordered
                                column={{ xxl: 1, xl: 1, lg: 3, md: 1, sm: 1, xs: 1 }}
                                style={{ marginBottom: 10, }}
                            >
                                <Descriptions.Item label={<strong>Present</strong>}>P</Descriptions.Item>
                                <Descriptions.Item label={<strong>Leave</strong>}>L</Descriptions.Item>
                                <Descriptions.Item label={<strong>Day Of</strong>}>O</Descriptions.Item>
                                <Descriptions.Item label={<strong>Holiday</strong>}>H</Descriptions.Item>
                                <Descriptions.Item label={<strong>Absent</strong>}>A</Descriptions.Item>
                                <Descriptions.Item label={<strong>Working Hours</strong>}>WH</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                )}
            </>
        </>
    );
}
