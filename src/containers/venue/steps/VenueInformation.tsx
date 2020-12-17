import React, { Component, FormEvent } from "react";
import {
  Spin,
  Empty,
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  DatePicker,
  Select,
  Upload,
  Checkbox,
  Button,
  message,
  Popconfirm
} from "antd";
import moment from "moment";
import { History } from "history";
import { match } from "react-router";
import { VenueModel } from "../../../models/venue";
import venue from "../../../services/venue";
import TextArea from "antd/lib/input/TextArea";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
const API_KEY = "AIzaSyC6lD9rxE5Numn2vRMr2m93lGzT1ipYisI";

const dateFormat = "YYYY-MM-DD";

interface VenueInfoProps {
  venue: VenueModel | undefined;
  updateVenueState: Function;
}

class VenueInformation extends Component<VenueInfoProps, { search: string; value: string; venue: VenueModel | undefined }> {
  constructor(props: any) {
    super(props);
    this.state = { venue: undefined, search: "", value: "" };
  }

  handleInputChange(e: any) {
    this.setState({ search: e.target.value, value: e.target.value });
  }

  handleSelectSuggest(suggest: any) {
    console.log(suggest);
    this.setState({ search: "", value: suggest.formatted_address });
  }

  private updateVenueState(key: string, value: any) {
    const venue: any = { ...this.state.venue, [key]: value };
    this.setState({
      venue: venue
    });
  }

  render() {
    const { venue } = this.state;
    const name = venue ? venue.name : "";
    const roomName = venue ? venue.roomName : "";
    const listingName = venue ? venue.listingName : "";
    const commission = venue ? venue.commission : "";
    const contactName = venue ? venue.contactName : "";
    const email = venue ? venue.contactName : "";
    const phoneNumber = venue ? venue.phoneNumber : "";
    const phoneExt = venue ? venue.phoneExt : "";
    const description = venue ? venue.description : "";
    const venueType = venue ? venue.venueType : "";
    const googleReviewQty = venue ? venue.googleReviewQty : 0;
    const googleReviewRating = venue ? venue.googleReviewRating : 0;
    const address = venue ? venue.address : "";
    const city = venue ? venue.city : "";
    return (
      <Row>
        <Col>
          <Card>
            <legend>Venue Information</legend>
            <Form className="login-form">
              <Form.Item label="Venue Name">
                <Input
                  value={email}
                  onInput={(e: any) =>
                    this.updateVenueState("email", e.target.value)
                  }
                  placeholder="Venue Name"
                />
              </Form.Item>
              <Form.Item label="Room Name">
                <Input
                  value={email}
                  onInput={(e: any) =>
                    this.updateVenueState("email", e.target.value)
                  }
                  placeholder="Room Name"
                />
              </Form.Item>
              <Form.Item label="Listing Name">
                <Input
                  value={email}
                  onInput={(e: any) =>
                    this.updateVenueState("email", e.target.value)
                  }
                  placeholder="Listing Name"
                />
              </Form.Item>
              <Form.Item label="Commission">
                <Input
                  value={email}
                  onInput={(e: any) =>
                    this.updateVenueState("email", e.target.value)
                  }
                  placeholder="Commission"
                />
              </Form.Item>
              <Form.Item label="Contact Name">
                <Input
                  value={email}
                  onInput={(e: any) =>
                    this.updateVenueState("email", e.target.value)
                  }
                  placeholder="Contact Name"
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  value={email}
                  onInput={(e: any) =>
                    this.updateVenueState("email", e.target.value)
                  }
                  placeholder="Email"
                />
              </Form.Item>
              <Row gutter={4}>
                <Col span={16}>
                  <Form.Item label="Phone Number">
                    <Input
                      value={phoneNumber}
                      onInput={(e: any) =>
                        this.updateVenueState("phoneNumber", e.target.value)
                      }
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Ext">
                    <Input
                      value={phoneExt}
                      onInput={(e: any) =>
                        this.updateVenueState("phoneExt", e.target.value)
                      }
                      placeholder="Ext"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Description">
                <TextArea
                  rows={8}
                  value={description}
                  onInput={(e: any) =>
                    this.updateVenueState("description", e.target.value)
                  }
                  placeholder="Description"
                />
              </Form.Item>
              <Form.Item label="Venue Type">
                <Input
                  value={venueType}
                  onInput={(e: any) =>
                    this.updateVenueState("venueType", e.target.value)
                  }
                  placeholder="Venue Type"
                />
              </Form.Item>
            </Form>
          </Card>
          <Card className="card-margin">
            <legend>Google Review</legend>
            <Form className="login-form">
              <Form.Item label="Rating">
                <Input
                  type="number"
                  value={googleReviewRating}
                  onInput={(e: any) =>
                    this.updateVenueState("googleReviewRating", e.target.value)
                  }
                  placeholder="Rating"
                />
              </Form.Item>
              <Form.Item label="Number of Reviews">
                <Input
                  type="number"
                  value={googleReviewQty}
                  onInput={(e: any) =>
                    this.updateVenueState("googleReviewQty", e.target.value)
                  }
                  placeholder="Number of Reviews"
                />
              </Form.Item>
            </Form>
          </Card>
          <Card className="card-margin">
            <legend>Location </legend>
            <Form className="location-form">
              <Form.Item label="Address">
                <ReactGoogleMapLoader
                  params={{
                    key: API_KEY,
                    libraries: "places,geocode"
                  }}
                  render={(googleMaps: any) =>
                    googleMaps && (
                      <div>
                        <ReactGooglePlacesSuggest
                          autocompletionRequest={{ input: this.state.search }}
                          googleMaps={googleMaps}
                          onSelectSuggest={this.handleSelectSuggest.bind(this)}
                        >
                          <input
                            type="text"
                            value={this.state.value}
                            placeholder="Search a location"
                            onChange={this.handleInputChange.bind(this)}
                          />
                        </ReactGooglePlacesSuggest>
                      </div>
                    )
                  }
                />
              </Form.Item>
              <Form.Item label="City">
                <Input
                  value={city}
                  onInput={(e: any) =>
                    this.updateVenueState("city", e.target.value)
                  }
                  placeholder="City"
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default VenueInformation;