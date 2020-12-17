import React, { Fragment } from 'react';
import { Steps, Button, message, Row, Card, Divider, Col, Form, Input, Switch, Icon, Upload, Modal } from 'antd';
import { VenueOptions, VenueModel } from '../../../models/venue';
import Dragger from 'antd/lib/upload/Dragger';

interface VenueDetailsProps {
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

class VenueDetail extends React.Component<VenueDetailsProps, { previewVisible: boolean, previewImage: string, fileList: any[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        };
    }

    onChange(id: any) {
        const { updateVenueState, venue } = this.props;
        const { lookFeels = [] } = venue;
        const exist = lookFeels.find(item => item === id);
        if (exist) {
          const newLookFeels = lookFeels.filter(item => item !== id);
          updateVenueState("amenities", newLookFeels);
        } else {
          updateVenueState("amenities", [...lookFeels, id]);
        }
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file: any) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
  
    handleChange = ({ fileList }: any) => this.setState({ fileList })
  
    render() {

        const { options, updateVenueState, venue } = this.props;
        const lookFeels = options && options.lookFeels ? options.lookFeels : [];
        const {
            iGuideLink = "",
            standingCapacity = undefined,
            seatedCapacity = undefined,
            minCapacity = undefined,
            rentalFee = undefined,
            lunchPrice = { perPerson: 0, buyout: 0 },
            dinnerPrice = { perPerson: 0, buyout: 0 },
            venueType = undefined
        } = venue || {};

        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );

        return (
            <div className="step-3-content">
            <Row>
                <Card style={{ marginBottom: 20 }}>
                <Form className="login-form" layout="vertical">
                    <Form.Item label="Upload Venue Pictures (Max. 5 megabytes per photo)">
                        <Dragger {...draggerProps}>
                            <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                        </Dragger>
                    </Form.Item>
                    <Form.Item label="Featured Image">
                        <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Form.Item>
                    <Form.Item label="iGuide Link">
                        <Input
                            value={iGuideLink}
                            onInput={(e: any) =>
                            updateVenueState("iGuideLink", e.target.value)
                            }
                            placeholder="iGuide Link"
                        />
                    </Form.Item>
                    <Divider orientation="left">
                        What is the maximum venue capacity
                    </Divider>
                    <Row gutter={4}>
                    <Col span={12}>
                        <Form.Item label="Standing Capacity">
                        <Input
                            value={seatedCapacity}
                            type="number"
                            onInput={(e: any) =>
                            updateVenueState(
                                "seatedCapacity",
                                parseInt(e.target.value)
                            )
                            }
                            placeholder="Standing Capacity"
                        />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Seated Capacity">
                        <Input
                            value={standingCapacity}
                            type="number"
                            onInput={(e: any) =>
                            updateVenueState(
                                "standingCapacity",
                                parseInt(e.target.value)
                            )
                            }
                            placeholder="Seated Capacity"
                        />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Divider orientation="left">
                    What is the minimum venue capacity
                    </Divider>
                    <Row gutter={4}>
                    <Col span={24}>
                        <Form.Item label="Minimum Capacity">
                        <Input
                            value={minCapacity}
                            type="number"
                            onInput={(e: any) =>
                            updateVenueState("minCapacity", parseInt(e.target.value))
                            }
                            placeholder="Standing Capacity"
                        />
                        </Form.Item>
                    </Col>
                    </Row>
                    {(venueType !== "restaurant" && venueType !== "super_club") && (
                    <Fragment>
                        <Divider orientation="left">Rental fee for venue</Divider>
                        <Row gutter={4}>
                        <Col span={12}>
                            <Form.Item label="Rental Fees">
                            <Input
                                value={rentalFee}
                                type="number"
                                onInput={(e: any) =>
                                updateVenueState(
                                    "rentalFee",
                                    parseInt(e.target.value)
                                )
                                }
                                placeholder="Rental Fees"
                            />
                            </Form.Item>
                        </Col>
                        </Row>
                    </Fragment>
                    )}

                    {(venueType === "hall" ||
                    venueType === "restaurant" ||
                    venueType === "super_club") && (
                    <Fragment>
                        <Divider orientation="left">Lunch Prices</Divider>
                        <Row gutter={4}>
                        <Col span={12}>
                            <Form.Item label="Per Person">
                            <Input
                                value={lunchPrice.perPerson}
                                type="number"
                                onInput={(e: any) =>
                                updateVenueState("lunchPrice", {
                                    ...lunchPrice,
                                    perPerson: parseInt(e.target.value)
                                })
                                }
                                placeholder="Per Person"
                            />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Buy Out">
                            <Input
                                value={lunchPrice.buyout}
                                type="number"
                                onInput={(e: any) =>
                                updateVenueState("lunchPrice", {
                                    ...lunchPrice,
                                    buyout: parseInt(e.target.value)
                                })
                                }
                                placeholder="Per Person"
                            />
                            </Form.Item>
                        </Col>
                        </Row>

                        <Row gutter={4}>
                        <Col span={12}>
                            <Form.Item label="Per Person">
                            <Input
                                value={dinnerPrice.perPerson}
                                type="number"
                                onInput={(e: any) =>
                                updateVenueState("dinnerPrice", {
                                    ...dinnerPrice,
                                    perPerson: parseInt(e.target.value)
                                })
                                }
                                placeholder="Per Person"
                            />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Buy Out">
                            <Input
                                value={dinnerPrice.buyout}
                                type="number"
                                onInput={(e: any) =>
                                updateVenueState("dinnerPrice", {
                                    ...dinnerPrice,
                                    buyout: parseInt(e.target.value)
                                })
                                }
                                placeholder="Per Person"
                            />
                            </Form.Item>
                        </Col>
                        </Row>
                    </Fragment>
                    )}
                </Form>
                </Card>
                <Card>
                    <legend>Look and Feel</legend>
                    <Form className="login-form" layout="vertical">
                        {lookFeels.map(option => (
                        <Form.Item key={option.id} label={option.name} {...formItemLayout}>
                            <Switch onChange={() => this.onChange(option.id)} />
                        </Form.Item>
                        ))}
                    </Form>
                </Card>
                </Row>
            </div>
        );
    }
}

export default VenueDetail;