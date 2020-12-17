import React from 'react';
import { Steps, Button, message, Row, Col, Card, Form, Switch } from 'antd';
import { VenueOptions, VenueModel } from '../../../models/venue';

interface EventTypeProps {
    venue: VenueModel;
    updateVenueState: Function;
    eventType: EventType;
}

const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 4 }
};

class EventType extends React.Component<EventTypeProps, {}> {
    constructor(props: any) {
        super(props);
        this.state = {
            
        };
    }

    onChange(checked: boolean, key: string) {
        const { updateVenueState, venue } = this.props;
        const { eventType = { social: false, corporate: false, wedding: false } } =
        venue || {};
        const {social, corporate, wedding} = eventType
        updateVenueState("eventType", { ...eventType, [key]: checked });
    };

    render() {
        const { updateVenueState, venue } = this.props;
        const { eventType = { social: false, corporate: false, wedding: false } } =
        venue || {};
        const {social, corporate, wedding} = eventType

        return (
            <Row>
                <Col
                    xl={{ span: 20 }}
                    lg={{ span: 24 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                >
                    <Card style={{ marginBottom: 20 }}>
                    <Form className="login-form" layout="vertical">
                        <Form.Item label="Social Event" {...formItemLayout}>
                            <Switch onChange={(checked: any)=>this.onChange(checked, 'social')} checked={social}/>
                        </Form.Item>
                        <Form.Item label="Wedding Event" {...formItemLayout}>
                            <Switch onChange={(checked: any)=>this.onChange(checked, 'wedding')} checked={wedding}/>
                        </Form.Item>
                        <Form.Item label="Corporate Event" {...formItemLayout}>
                            <Switch onChange={(checked: any)=>this.onChange(checked, 'corporate')} checked={corporate}/>
                        </Form.Item>
                    </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default EventType;