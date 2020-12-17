import React from 'react';
import { Steps, Button, message, Row, Card, Form, Switch, Icon } from 'antd';
import { VenueOptions, VenueModel } from '../../../models/venue';
import Dragger from 'antd/lib/upload/Dragger';

interface FoodDrinksProps {
    options: VenueOptions;
    venue: VenueModel;
    updateVenueState: Function;
}

const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 4 }
};

const draggerProps = {
    name: 'file',
    multiple: true,
    action: '',
    onChange(info: any) {
        const status = info.file.status;
        if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        }
        if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        }
    },
}

class FoodDrinks extends React.Component<FoodDrinksProps> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    onChange(id: any) {
        const { updateVenueState, venue } = this.props;
        const { foodDrinkOptions = [] } = venue || {};
        const exist = foodDrinkOptions.find(item => item === id);
        if (exist) {
          const newfoodDrinkOptions = foodDrinkOptions.filter(item => item !== id);
          updateVenueState("foodDrinkOptions", newfoodDrinkOptions);
        } else {
          updateVenueState("foodDrinkOptions", [...foodDrinkOptions, id]);
        }
    };

    render() {
        const { options, updateVenueState, venue } = this.props;
        const foodDrinkOptions = options && options.foodDrinkOptions ? options.foodDrinkOptions : [];

        return (
            <div>
                <Row>
                    <Card style={{ marginBottom: 20 }}>
                        <Form className="login-form" layout="vertical">
                            {foodDrinkOptions.map(option => (
                            <Form.Item key={option.id} label={option.name} {...formItemLayout}>
                                <Switch onChange={() => this.onChange(option.id)} />
                            </Form.Item>
                            ))}
                        </Form>
                    </Card>

                    <Card>
                        <legend>Dishes</legend>
                        <Form className="login-form" layout="vertical">
                            <Form.Item>
                                <Dragger {...draggerProps}>
                                    <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                                </Dragger>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={() => {}}>
                                    ADD DISH
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </div>
        );
    }
}

export default FoodDrinks;