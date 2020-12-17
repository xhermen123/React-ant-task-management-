import React from 'react';
import { Switch, Row, Card, Col, Divider, Form, Input, Button } from 'antd';
import { VenueOptions, VenueModel } from '../../../models/venue';

interface VenueAmenitiesProps {
    options: VenueOptions;
    venue: VenueModel;
    updateVenueState: Function;
}

const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 4 }
};

class VenueAmenities extends React.Component<VenueAmenitiesProps,{}> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    // renderAmenities = () => {
    //     return this.props.amenities.map((el, i) => {
    //         return (
    //             <Row className="toggle-item" gutter={30}>
    //                 <Col className="gutter-row" span={20}>
    //                     <p>{el.name}</p>
    //                 </Col>
    //                 <Col className="gutter-row" span={4}>
    //                     <Switch defaultChecked onChange={this.onChange}/>
    //                 </Col>
    //             </Row>
    //         )
    //     })
    // }

    onChange(id: any) {
        const { venue, updateVenueState } = this.props;
        const { amenities = [] } = venue;
        const exist = amenities.find(item => item === id);
        if (exist) {
            const newAmenities = amenities.filter(item => item !== id);
            updateVenueState("amenities", newAmenities);
        } else {
            updateVenueState("amenities", [...amenities, id]);
        }
    }

    render() {
        const { options } = this.props;
        const amenities = options && options.amenities ? options.amenities : [];

        return (
            <div className="step-2-content">
                <Row>
                    <Card>
                        <Form className="login-form" layout="vertical">
                            {amenities.map(option => (
                            <Form.Item key={option.id} label={option.name} {...formItemLayout}>
                                <Switch onChange={() => this.onChange(option.id)} />
                            </Form.Item>
                            ))}
                            <Divider />
                            <Row className="text-item" gutter={40} justify="space-between" align="bottom">
                                <Col className="gutter-row" span={16}>
                                    <Form.Item label="Amenity Name">
                                        <Input
                                        // type="number"
                                        // value={googleReviewQty}
                                        // onInput={(e: any) =>
                                        //     this.updateVenueState("googleReviewQty", e.target.value)
                                        // }
                                        placeholder="Amenity Name"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row button-wrapper" span={8}>
                                    <Button type="primary">Add Amenity</Button>
                                </Col>
                            </Row>
                        </Form>
                        
                    </Card>
                </Row>
            </div>
        );
    }
}

export default VenueAmenities;