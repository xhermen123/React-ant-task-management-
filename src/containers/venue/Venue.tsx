import React from 'react';
import { Steps, Button, message, Layout, Row } from 'antd';
import VenueAmenities from './steps/VenueAmenities';
import VenueInformation from './steps/VenueInformation';
import './styles.scss';
import Sider from 'antd/lib/layout/Sider';
import StepThree from './steps/VenueDetail';
import VenueDetail from './steps/VenueDetail';
import FoodDrinks from './steps/FoodDrinks';
import EventType from './steps/EventType';
import { VenueModel, VenueOptions } from '../../models/venue';

const Step = Steps.Step;

const { Content, Header, Footer } = Layout;

interface CreateVanueState {
    current: number;
    venue: VenueModel | any;
}

class Venue extends React.Component<{actions: {fetchAmenities: any, fetchVenueOptions: any}, options: any, amenities: any}, CreateVanueState> {
    constructor(props: any) {
        super(props);
        this.state = {
            current: 0,
            venue: {}
        };
    }

    componentDidMount() {
        // fetch ameneties
        this.props.actions.fetchAmenities();
        this.props.actions.fetchVenueOptions();
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    private updateVenueState = (key: string, value: any) => {
        const venue: any = { ...this.state.venue, [key]: value };
        this.setState({
          venue: venue
        });
        console.log(venue);
    };

    // private createVenue = async () => {
    //     const { venue } = this.state;
    //     console.log(venue);
    //     try {
    //       const result = await venue.create(venue);
    //       console.log(result);
    //       message.success("Venue has been created successfully ");
    //     } catch (error) {
    //       console.log(error);
    //       message.error(`Could not Create Venue: \n${error.error}`);
    //     }
    // };

    render() {
        const { current, venue } = this.state;
        const { options } = this.props;

        const steps = [{
            title: 'Venue Information',
            desc: 'Let your future guests know how special your venue is!',
            content: <VenueInformation updateVenueState={this.updateVenueState} venue={venue}/>
        }, {
            title: 'Venue Amenities',
            desc: 'A large number of additional amenities help your venue in being chosen among the others.',
            content: <VenueAmenities updateVenueState={this.updateVenueState} options={options} venue={venue} />
        }, {
            title: 'Venue Detail',
            desc: 'Each venue is unique. Now is the moment to shine.',
            content: <VenueDetail updateVenueState={this.updateVenueState} options={options} venue={venue}/>
        }, {
            title: 'Food and Drinks Options',
            desc: 'Questions related to food options can sometimes be endless with certain customers. Let us know what you can offer so we can help them make their perfect choice.',
            content: <FoodDrinks updateVenueState={this.updateVenueState} options={options} venue={venue}/>
        }, {
            title: 'Event Type',
            desc: 'What Kind of Events Do You Host Most Often?',
            content: <EventType updateVenueState={this.updateVenueState} eventType={venue.eventType} venue={venue}/>
        }];
        return (
            <div className="create-venue">
                <div>
                    <h1 className="step-title">
                        {steps[current].title}
                    </h1>
                    <p className="step-desc">
                        {steps[current].desc}
                    </p>
                </div>
                <Layout>
                    <Sider width={300} style={{ background: '#f0f2f5' }}>
                        <Steps direction="vertical" current={current}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                    </Sider>
                    <Content>
                        <div className="steps-content">{steps[current].content}</div>
                    </Content>
                </Layout>
                <div className="steps-action">
                    {
                        current > 0
                        && (
                            <Button style={{ marginLeft: 10 }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )
                    }
                    {
                        current < steps.length - 1
                        && <Button style={{ marginLeft: 10 }} type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        current === steps.length - 1
                        && <Button style={{ marginLeft: 10 }} type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                </div>
            </div>
        );
    }
}

export default Venue;