import React, { Component, FormEvent } from "react";
import { EventPhotoGalleryModel } from "../../models/event-photo-gallery";
import { Spin, Empty, Row, Col, Card, Form, Input, Icon, DatePicker, Select, Upload, Checkbox, Button, message, Popconfirm } from "antd";
import moment from "moment";
import Dragger from "antd/lib/upload/Dragger";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import eventPhotoGallery from "../../services/event-photo-gallery";
import { match } from "react-router";
import { EventServiceModel } from "../../models/event-service";
import eventService from "../../services/event-service";
import { SelectValue } from "antd/lib/select";
import vibeify from "../../services/vibeify";
import { UploadFile } from "antd/lib/upload/interface";
import { UploadChangeParam } from "antd/lib/upload";
import { History } from "history";
import { cancel } from "redux-saga/effects";

interface EventGalleryDetailsState {
    fetchingGallery: boolean;
    gallery: EventPhotoGalleryModel | undefined;
    photographers: EventServiceModel[];
    images: UploadFile[];
    coverImg: UploadFile | undefined;
}

interface EventGalleryDetailsProps {
    match: match<any>;
    history: History;
}

const dateFormat = 'YYYY-MM-DD';

class EventGalleryDetails extends Component<EventGalleryDetailsProps, EventGalleryDetailsState> {
    state: EventGalleryDetailsState = {
        fetchingGallery: false,
        gallery: undefined,
        photographers: [],
        images: [],
        coverImg: undefined,
    }

    componentWillMount() {
        this.setState({ fetchingGallery: true })
        // clean up promises to own functions
        eventPhotoGallery.get(this.props.match.params.id).then(resp => {
            resp.data.photographerId = resp.data.photographer ? resp.data.photographer.id : ''
            this.setState({
                gallery: resp.data,
                images: this.convertImagesToUploadFiles(resp.data.imgUrls),
                coverImg: this.convertConverImgToUploadFile(resp.data.coverImg)
            })
            return eventService.list().then(resp => {
                this.setState({
                    photographers: resp.data.filter(item => item.serviceType.name.toLowerCase() === 'photographer')
                })
            })
        }).catch(err => {
            console.log({err})
            message.error(err.error)
        }).finally(() => this.setState({ fetchingGallery: false }))
    }

    private convertImagesToUploadFiles(imgUrls: string[]): UploadFile[] {
        return imgUrls.map((url, i) => {
            const splitter = url.split("/")
            return {
                uid: i.toString(),
                name: splitter[splitter.length - 1],
                status: 'done',
                url: url,
                size: 0,
            } as UploadFile
        })
    }

    private convertConverImgToUploadFile(coverImg: string): UploadFile {
        const splitter = coverImg.split("/")
        return {
            uid: 'coverkey',
            name: splitter[splitter.length - 1],
            status: 'done',
            url: coverImg,
            size: 0,
        } as UploadFile
    }

    private handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const { gallery, images, coverImg } = this.state
        eventPhotoGallery.update({
            id: gallery!.id,
            title: gallery!.title,
            description: gallery!.description,
            imgUrls: images.map(i => i.url!),
            coverImg: coverImg!.url!,
            password: gallery!.password,
            passwordProtected: gallery!.passwordProtected,
            location: gallery!.location,
            date: moment(gallery!.date).unix().toString(),
            photographerId: gallery!.photographerId!,
            featured: gallery!.featured,
            eventType: gallery!.eventType,
        }).then(() => {
            message.success('Event gallery was updated!');
            this.props.history.push('/event-galleries');
        }).catch(err => {
            message.error(err.error)
        })
    }

    private handleDelete = (e: any) => {
        e.preventDefault()
        const { gallery } = this.state
        eventPhotoGallery.delete(gallery!.id).then(() => {
            message.success('Event gallery was deleted!')
            this.props.history.push('/event-galleries');
        }).catch(err => {
            message.error(err.error)
        })
    }

    private updateGalleryState(key: string, value: any) {
        const gallery: any = { ...this.state.gallery, [key]: value }
        this.setState({
            gallery: gallery,
        })
    }

    private onDateChange = (_: any, date: string) => {
        this.updateGalleryState('date', date)
    }

    private photographerOptions() {
        return this.state.photographers.map(photographer => (
            <Select.Option key={photographer.id} value={photographer.id}>{photographer.stageName}</Select.Option>
        ))
    }

    private handlePhotographerChange = (value: SelectValue) => {
        this.updateGalleryState('photographerId', value as string);
    }

    private handleEventTypeChange = (value: SelectValue) => {
        this.updateGalleryState('eventType', value as string);
    }

    private uploadRequest = ({ file, onSuccess, onError }: any) => {
        vibeify.upload(file).then(resp => {
            onSuccess(resp, file)
        }).catch(err => {
            onError(err, file)
        })
    };

    private onPreviewClick = (file: UploadFile) => {
        const selectedFile = this.state.images.find(f => f.uid === file.uid)
        file.url = selectedFile!.url
        this.setState({
            coverImg: file
        })
    }

    private uploadOnChange = (info: UploadChangeParam) => {
        if (info.file.status === 'done') {
            this.setState({
                images: [...this.state.images, {
                    ...info.file,
                    url: info.file.response.data.url,
                }]
            })
        }
    }

    render() {
        const { fetchingGallery, gallery, images, coverImg } = this.state
        if (fetchingGallery) {
            return <Spin size="large" />
        }
        if (!gallery) {
            return <Empty />
        }
        return (
            <Row>
                <Col xl={{ span: 12 }} lg={{ span: 14 }} md={{ span: 16 }} sm={{ span: 24 }}>
                    <h1>Update Event Photo Gallery</h1>
                    <p>Banjo narwhal health goth shoreditch shaman skateboard vaporware coloring book.</p>
                    <Card>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item label="Title">
                                <Input
                                    value={gallery.title}
                                    onInput={(e: any) => this.updateGalleryState('title', e.target.value)}
                                    prefix={<Icon type="branches" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Title" />
                            </Form.Item>
                            <Form.Item>
                                <Checkbox
                                    value={gallery.featured}
                                    defaultChecked={gallery.featured}
                                    onChange={(e: CheckboxChangeEvent) => this.updateGalleryState('featured', e.target.checked)}>Featured (will show in home page)</Checkbox>
                            </Form.Item>
                            <Form.Item label="Location">
                                <Input
                                    value={gallery.location}
                                    onInput={(e: any) => this.updateGalleryState('location', e.target.value)}
                                    prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Location" />
                            </Form.Item>
                            <Form.Item label="Event Date">
                                <DatePicker
                                    defaultValue={moment(gallery.date, dateFormat)}
                                    onChange={this.onDateChange}
                                    placeholder="Event Date" />
                            </Form.Item>
                            <Form.Item label="Photographer">
                                <Select
                                    defaultValue={gallery.photographerId}
                                    onChange={this.handlePhotographerChange}>
                                    {this.photographerOptions()}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Event Type">
                                <Select 
                                    defaultValue={gallery.eventType}
                                    onChange={this.handleEventTypeChange}>
                                    <Select.Option value="social">Social</Select.Option>
                                    <Select.Option value="wedding">Wedding</Select.Option>
                                    <Select.Option value="corporate">Corporate</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Description">
                                <Input.TextArea
                                    value={gallery.description}
                                    onInput={(e: any) => this.updateGalleryState('description', e.target.value)}
                                    placeholder="Description" />
                            </Form.Item>
                            <Form.Item label="Event Images">
                                <Dragger
                                    customRequest={this.uploadRequest}
                                    onPreview={this.onPreviewClick}
                                    multiple={true}
                                    defaultFileList={images}
                                    listType="picture"
                                    onChange={this.uploadOnChange}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                                </Dragger>
                                {coverImg ?
                                    <Row style={{ marginTop: 16 }}>
                                        <h4>Cover Image</h4>
                                        <Upload
                                            showUploadList={{showRemoveIcon: false}}
                                            listType="picture"
                                            fileList={[coverImg!]} />
                                    </Row>
                                    : null}
                            </Form.Item>
                            <Form.Item>
                                <Checkbox
                                    value={gallery.passwordProtected}
                                    defaultChecked={gallery.passwordProtected}
                                    onChange={(e: CheckboxChangeEvent) => this.updateGalleryState('passwordProtected', e.target.checked)}>Password protected</Checkbox>
                            </Form.Item>
                            {gallery.passwordProtected ?
                                <Form.Item label="Update Password (password not shown for security reasons)">
                                    <Input
                                        value={gallery.password}
                                        onInput={(e: any) => this.updateGalleryState('password', e.target.value)}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Password" />
                                </Form.Item>
                                : null}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                                <Popconfirm
                                    title="Are you sure delete this gallery?"
                                    onConfirm={this.handleDelete}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No">
                                    <Button
                                        style={{ marginLeft: 16 }}
                                        type="danger"
                                        htmlType="button">
                                        Delete
                                    </Button>
                                </Popconfirm>

                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default EventGalleryDetails;