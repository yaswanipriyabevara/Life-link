import {
  CheckCircle,
  MapPin,
  Hospital,
  Phone,
  Ambulance,
  Clock,
  ShieldCheck,
  Radio
} from "lucide-react";

import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Timeline from "../components/Timeline";

function Tracking() {

  const events = [
    {
      title: "Incident Signal Received",
      description:
        "Simulated incident signals received from an authorized connected source.",
      time: "02:45 PM"
    },
    {
      title: "Signal Validated",
      description:
        "Multiple signals were validated as a possible accident.",
      time: "02:46 PM"
    },
    {
      title: "Location Acquired",
      description:
        "Simulated GPS location associated with the incident.",
      time: "02:46 PM"
    },
    {
      title: "Hospital Matched",
      description:
        "Suitable trauma hospital identified using mock availability data.",
      time: "02:47 PM"
    },
    {
      title: "Emergency Contact Notified",
      description:
        "Emergency contact notification initiated.",
      time: "02:48 PM"
    },
    {
      title: "Verified Responder Identified",
      description:
        "Nearest available verified responder identified.",
      time: "02:49 PM"
    }
  ];


  return (

    <div className="dashboard-page">


      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <p className="dashboard-label">
            EMERGENCY RESPONSE
          </p>

          <h1>
            Response Tracking
          </h1>

          <p>
            Track the simulated emergency-response workflow.
          </p>

        </div>


        <StatusBadge
          status="In Progress"
          type="info"
        />

      </div>



      {/* CURRENT RESPONSE */}

      <div className="tracking-summary">

        <Card title="Current Response">

          <div className="response-main">

            <Ambulance size={40} />

            <div>

              <strong>
                Responder Identified
              </strong>

              <p>
                Emergency response workflow
                is currently in progress.
              </p>

            </div>

          </div>


          <div className="eta-box">

            <Clock size={22} />

            <div>

              <span>
                Estimated Response Time
              </span>

              <strong>
                8 min
              </strong>

            </div>

          </div>


          <StatusBadge
            status="Simulated Estimate"
            type="info"
          />

        </Card>

      </div>



      {/* TIMELINE + SIDE INFORMATION */}

      <div className="tracking-grid">


        {/* TIMELINE */}

        <Card title="Response Timeline">

          <Timeline
            events={events}
          />

        </Card>



        {/* SIDE */}

        <div className="tracking-side">


          {/* LOCATION */}

          <Card title="Incident Location">

            <div className="tracking-info">

              <MapPin size={22} />

              <div>

                <strong>
                  Simulated GPS Location
                </strong>

                <p>
                  Latitude: 16.5062
                </p>

                <p>
                  Longitude: 80.648
                </p>

              </div>

            </div>


            <StatusBadge
              status="Simulated GPS"
              type="info"
            />

          </Card>



          {/* HOSPITAL */}

          <Card title="Matched Hospital">

            <div className="tracking-info">

              <Hospital size={22} />

              <div>

                <strong>
                  City Trauma Care Hospital
                </strong>

                <p>
                  2.4 km away
                </p>

                <p>
                  Trauma Level 1
                </p>

              </div>

            </div>


            <StatusBadge
              status="Mock Data"
              type="info"
            />

          </Card>



          {/* RESPONDER */}

          <Card title="Verified Responder">

            <div className="tracking-info">

              <ShieldCheck size={22} />

              <div>

                <strong>
                  Emergency Responder 01
                </strong>

                <p>
                  Verified Responder
                </p>

                <p>
                  1.2 km away
                </p>

              </div>

            </div>


            <StatusBadge
              status="Available"
              type="success"
            />

          </Card>



          {/* EMERGENCY CONTACT */}

          <Card title="Emergency Contact">

            <div className="tracking-info">

              <Phone size={22} />

              <div>

                <strong>
                  Contact Notification
                </strong>

                <p>
                  Emergency contact notification
                  has been initiated.
                </p>

              </div>

            </div>


            <StatusBadge
              status="Notified"
              type="success"
            />

          </Card>


        </div>

      </div>



      {/* RESPONSE STATUS */}

      <Card title="Response Status">

        <div className="info-row">

          <Radio size={22} />

          <div>

            <strong>
              Emergency workflow active
            </strong>

            <p>
              LIFELINK has validated the incident,
              identified the location, matched a
              suitable hospital and identified a
              nearby verified responder.
            </p>

          </div>

        </div>


        <StatusBadge
          status="Simulation"
          type="info"
        />

      </Card>



      {/* LIMITATION NOTICE */}

      <div className="tracking-notice">

        <CheckCircle size={18} />

        <span>
          Estimated response time and dispatch
          status are simulated for this prototype.
          LIFELINK does not guarantee real-world
          emergency response times.
        </span>

      </div>


    </div>

  );

}


export default Tracking;