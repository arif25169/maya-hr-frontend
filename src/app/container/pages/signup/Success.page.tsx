import { Button, Result } from 'antd'
import React from 'react'
import { Link } from "react-router-dom";

export default function Dashboard(props) {

    return (
        <>
            <br />
            <Result
                status="success"
                title="Your request has been submitted"
                subTitle="You will get notified once you get approved by an admin."
                extra={[
                    <Link to="/login">                    <Button type="primary" key="console">
                        Back to login
                    </Button></Link>
                ]}
            />
        </>
    )
}
