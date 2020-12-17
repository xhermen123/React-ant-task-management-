import React, { Component } from "react";
import { EventPhotoGalleryModel } from '../../models/event-photo-gallery'
import { Spin, Empty, Table, message, Card } from 'antd'
import eventPhotoGallery from '../../services/event-photo-gallery'
import { History } from "history";
import moment from "moment";

interface GalleryDataSource {
    key: string;
    title: string;
    photographer: string;
    location: string;
    date: string;
    passwordProtected: string;
}

interface EventGalleriesState {
    fetchingGalleries: boolean;
    galleriesDataSource: GalleryDataSource[];
}

interface EventGalleriesProps {
    history: History;
}

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Photographer',
        dataIndex: 'photographer',
        key: 'photographer',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Password Protected',
        dataIndex: 'passwordProtected',
        key: 'passwordProtected',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
]

class EventGalleries extends Component<EventGalleriesProps, EventGalleriesState> {
    state: EventGalleriesState = {
        fetchingGalleries: false,
        galleriesDataSource: []
    }

    componentWillMount() {
        this.setState({ fetchingGalleries: true })
        eventPhotoGallery.list().then(resp => {
            const dataSource = resp.data.map(item => {
                return {
                    key: item.id,
                    title: item.title,
                    location: item.location,
                    date: moment(item.date).format('MM/DD/YYYY'),
                    photographer: item.photographer ? item.photographer.stageName : 'None',
                    passwordProtected: item.passwordProtected ? 'Yes' : 'No'
                }
            })
            this.setState({ galleriesDataSource: dataSource })
        }).catch(err => {
            message.error(err.error)
        }).finally(() => {
            this.setState({ fetchingGalleries: false })
        })
    }

    handleRowClick(record: GalleryDataSource) {
        this.props.history.push(`/event-gallery/${record.key}`)
    }

    render() {
        const { fetchingGalleries, galleriesDataSource } = this.state
        if (fetchingGalleries) {
            return (
                <Spin size="large" />
            )
        }
        return (
            <Card>
                <Table 
                    dataSource={galleriesDataSource} 
                    columns={columns}
                    onRow={(record) => {
                        return {
                          onClick: () => this.handleRowClick(record),
                        };
                      }} />
            </Card>
        )
    }
}

export default EventGalleries;