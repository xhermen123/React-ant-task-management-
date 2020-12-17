import React, { Component, FormEvent } from "react";
import { Card, Form, Input, Icon, Button, Row, Col, DatePicker, Upload, Select, message, Checkbox } from "antd";
import moment from "moment";
import { RcFile, UploadFile, UploadChangeParam } from "antd/lib/upload/interface";

import vibeify from '../../services/vibeify'
import eventService from "../../services/event-service";
import { EventServiceModel } from "../../models/event-service";
import { SelectValue } from "antd/lib/select";
import eventPhotoGallery from "../../services/event-photo-gallery";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { History } from "history";
import {makeId} from '../../util'

const Dragger = Upload.Dragger;
const Option = Select.Option;

interface CreateEventGalleryState {
    title: string;
    date: string;
    location: string;
    images: {
        url: string,
        uid: string
    }[];
    photographers: EventServiceModel[];
    photographer: string;
    description: string;
    passwordProtect: boolean;
    password: string;
    coverImage: UploadFile | undefined;
    uniqueId: string;
    featured: boolean;
    eventType: string;
}

interface CreateEventGalleryProps {
    history: History;
}

const dateFormat = 'YYYY-MM-DD';


class CreateEventGallery extends Component<CreateEventGalleryProps, CreateEventGalleryState> {
    state: CreateEventGalleryState = {
        title: '',
        date: moment().format(dateFormat),
        location: '',
        images: [],
        photographers: [],
        photographer: '',
        description: '',
        passwordProtect: false,
        password: '',
        coverImage: undefined,
        uniqueId: makeId(10),
        featured: false,
        eventType: ''
    }

    componentWillMount() {
        eventService.list().then(resp => {
            this.setState({
                photographers: resp.data.filter(item => item.serviceType.name.toLowerCase() === 'photographer')
            })
        })
    }

    private handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { title, date, location, images, description, photographer, coverImage, password, passwordProtect, featured, eventType } = this.state
        eventPhotoGallery.create({
            title,
            location,
            imgUrls: images.map(i => i.url),
            description,
            photographerId: photographer,
            password,
            passwordProtected: passwordProtect,
            coverImg: coverImage!.url!,
            date: moment(date).unix().toString(),
            featured,
            eventType
        }).then(_ => {
            message.success('Photo gallery was created!');
            this.clearForm()
            window.scrollTo(0,0)
        }).catch(err => {
            message.error(err.error);
        })
    }

    private clearForm() {
        this.setState({
            title: '',
            uniqueId: makeId(10), // this will "reset" the component
            date: moment().format(dateFormat),
            location: '',
            images: [],
            photographer: '',
            description: '',
            passwordProtect: false,
            password: '',
            coverImage: undefined,
            featured: false,
            eventType: ''
        })
    }

    private onDateChange = (_: any, date: string) => {
        this.setState({ date })
    }

    private uploadRequest = ({ file, onSuccess, onError }: any) => {
        vibeify.upload(file).then(resp => {
            onSuccess(resp, file)
        }).catch(err => {
            onError(err, file)
        })
    };

    private photographerOptions() {
        return this.state.photographers.map(photographer => (
            <Option key={photographer.id} value={photographer.id}>{photographer.stageName}</Option>
        ))
    }

    private handlePhotographerChange = (value: SelectValue) => {
        this.setState({
            photographer: value as string,
        });
    }

    private onPreviewClick = (file: UploadFile) => {
        const selectedFile = this.state.images.find(f => f.uid === file.uid)
        file.url = selectedFile!.url
        this.setState({
            coverImage: file
        })
    }

    private handleEventTypeChange = (value: SelectValue) => {
        this.setState({
            eventType: value as string,
        });
    }

    private uploadOnChange = (info: UploadChangeParam) => {
        if (info.file.status === 'done') {
            if (this.state.images.length === 0) {
                info.file.url = info.file.response.data.url
                this.setState({
                    images: [...this.state.images, {
                        url: info.file.response.data.url,
                        uid: info.file.uid
                    }],
                    coverImage: info.file
                })
                return
            }
            this.setState({
                images: [...this.state.images, {
                    url: info.file.response.data.url,
                    uid: info.file.uid
                }]
            })
        }
    }

    render() {
        const { uniqueId, title, date, location, description, passwordProtect, password, images, coverImage, featured, eventType } = this.state
        return (
            <Row key={uniqueId}>
                <Col xl={{ span: 12 }} lg={{ span: 14 }} md={{ span: 16 }} sm={{ span: 24 }}>
                    <h1>Create Event Photo Gallery</h1>
                    <p>Banjo narwhal health goth shoreditch shaman skateboard vaporware coloring book.</p>
                    <Card>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item label="Title">
                                <Input
                                    value={title}
                                    onInput={(e: any) => this.setState({ title: e.target.value })}
                                    prefix={<Icon type="branches" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Title" />
                            </Form.Item>
                            <Form.Item>
                                <Checkbox
                                    value={featured}
                                    defaultChecked={featured}
                                    onChange={(e: CheckboxChangeEvent) => this.setState({ featured: e.target.checked })}>Featured (will show in home page)</Checkbox>
                            </Form.Item>
                            <Form.Item label="Location">
                                <Input
                                    value={location}
                                    onInput={(e: any) => this.setState({ location: e.target.value })}
                                    prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Location" />
                            </Form.Item>
                            <Form.Item label="Event Date">
                                <DatePicker
                                    defaultValue={moment(date, dateFormat)}
                                    onChange={this.onDateChange}
                                    placeholder="Event Date" />
                            </Form.Item>
                            <Form.Item label="Photographer">
                                <Select onChange={this.handlePhotographerChange}>
                                    {this.photographerOptions()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Event Type">
                                <Select onChange={this.handleEventTypeChange}>
                                    <Option value="social">Social</Option>
                                    <Option value="wedding">Wedding</Option>
                                    <Option value="corporate">Corporate</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input.TextArea
                                    value={description}
                                    onInput={(e: any) => this.setState({ description: e.target.value })}
                                    placeholder="Description" />
                            </Form.Item>
                            <Form.Item label="Event Images">
                                <Dragger
                                    customRequest={this.uploadRequest}
                                    onPreview={this.onPreviewClick}
                                    multiple={true}
                                    listType="picture"
                                    onChange={this.uploadOnChange}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                                </Dragger>
                                {images.length > 0 ?
                                    <Row style={{ marginTop: 16 }}>
                                        <h4>Cover Image</h4>
                                        <Upload
                                            showUploadList={{showRemoveIcon: false}}
                                            listType="picture"
                                            fileList={[coverImage!]} />
                                    </Row>
                                    : null}
                            </Form.Item>
                            <Form.Item>
                                <Checkbox
                                    value={passwordProtect}
                                    defaultChecked={passwordProtect}
                                    onChange={(e: CheckboxChangeEvent) => this.setState({ passwordProtect: e.target.checked })}>Password protect?</Checkbox>
                            </Form.Item>
                            {passwordProtect ?
                                <Form.Item label="Password">
                                    <Input
                                        value={password}
                                        onInput={(e: any) => this.setState({ password: e.target.value })}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Password" />
                                </Form.Item>
                                : null}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Create
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default CreateEventGallery;