import React from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import SkyLight from 'react-skylight';

/* Setup the localizer by providing the moment (or globalize) Object
to the correct localizer. */
BigCalendar.momentLocalizer(moment);
/* or globalizeLocalizer */ 

class TrainingCalendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trainings: [],
            events: [],

            //store the event that is clicked
            clickedEvent: {},
        };

        this.loadTrainings = this.loadTrainings.bind(this);
        this.mapEvents = this.mapEvents.bind(this);
    }

    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(res => res.json())
            .then(resData => {
                if(resData.content[0].rel !== null) {
                    this.setState({ trainings: resData.content })
                    this.loadCustomerFromTrainings();
                }
            });
    }

    loadCustomerFromTrainings = () => {
        for (let training of this.state.trainings) {
            fetch(training.links[2].href)
                .then(res => res.json())
                .then(resData => {
                    training.customer = resData.firstname + ' ' + resData.lastname;
                    this.mapEvents();
                });
        }
    }

    mapEvents = () => {
        let newEvents = [], i = 0;
        for(let training of this.state.trainings) {
            let item = {}
            item.id = i;
            i++;
            item.title = training.activity;
            item.customer = training.customer;
            item.allDay = false;
            item.start = new Date(moment(training.date).format());
            item.end = new Date(moment(training.date).add(training.duration, 'minutes').format());
            newEvents.push(item);
        }
        this.setState({ events: newEvents });
        console.log(this.state.events);
    }

    render() {
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

        const smallInfoPopupSkyLight = {
            backgroundColor: '#fff',
            width: '40%',
            minWidth: 200,
            minHeight: 150,
            marginTop: '-300',
            marginLeft: '-10%',
            borderRadius: 5,
            borderColor: '#949494'
        };

        let { events, clickedEvent } = this.state;
        return (
            <div className="container-fluid" style={{height: 500}}>
                <BigCalendar
                    popup
                    selectable
                    views={allViews}
                    style={calendarStyle}
                    step={60}
                    timeslots={2}
                    events={events}
                    defaultView="month"
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={event => {
                        this.customDialog.show();
                        this.setState({ clickedEvent: event })
                    }}
                    onSelectSlot={slotInfo => {
                        this.customDialog.show();
                        slotInfo.title = 'Empty Slot';
                        this.setState({ clickedEvent: slotInfo });
                    }}
                />
                <SkyLight dialogStyles={smallInfoPopupSkyLight} hideOnOverlayClicked ref={ref => this.customDialog = ref} title={clickedEvent.title}>
                    <div>
                        <div>Customer: {clickedEvent.customer}</div>
                        <div>Start at: {moment(clickedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</div>
                        <div>End at: {moment(clickedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    </div>
                </SkyLight>
            </div>
        );
    }
}

export default TrainingCalendar;

const calendarStyle = {
    // backgroundColor: '#343a40', 
    // color: '#fff',
    eventTagColor: '42b0e5'
}