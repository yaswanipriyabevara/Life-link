import { useState } from "react";

import {
  AlertTriangle,
  MapPin,
  Hospital,
  Activity,
  ShieldCheck,
  Radio,
  UserCheck,
  UserX
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import MapView from "../components/MapView";
import EscalationFlow from "../components/EscalationFlow";
import ResponseTimeline from "../components/timeline";

import incidentData from "../data/incidents.json";
import hospitalData from "../data/hospitals.json";
import responderData from "../data/responders.json";

import { detectAccident } from "../logic/crashDetection";
import { assessSeverity } from "../logic/severityEngine";
import { findBestHospital } from "../logic/hospitalMatcher";

import {
  createEscalation,
  cancelEscalation,
  getEscalationFlow,
  findNearestAvailableResponder
} from "../logic/escalation";


function Dashboard() {

  const [showModal, setShowModal] = useState(false);

  const [incident, setIncident] = useState(() => {

    try {

      const savedIncident =
        localStorage.getItem("lifelink_incident");

      if (savedIncident) {
        return JSON.parse(savedIncident);
      }

      return null;

    } catch (error) {

      console.error(
        "Unable to load saved incident:",
        error
      );

      localStorage.removeItem(
        "lifelink_incident"
      );

      return null;
    }

  });


  const [loading, setLoading] = useState(false);


  const [victimStatus, setVictimStatus] = useState(() => {

    try {

      return localStorage.getItem(
        "lifelink_victim_status"
      );

    } catch (error) {

      return null;

    }

  });


  const [escalation, setEscalation] = useState(null);


  const [error, setError] = useState("");


  const handleSimulateSignal = () => {

    setError("");
    setShowModal(true);

  };


  const handleConfirmSignal = () => {

    if (loading) {
      return;
    }

    setError("");
    setLoading(true);
    setShowModal(false);

    setTimeout(() => {

      try {

        if (
          !incidentData ||
          incidentData.length === 0
        ) {

          throw new Error(
            "No incident signal data is available."
          );

        }


        const signals = incidentData[0];


        const detectionResult =
          detectAccident(signals);


        if (!detectionResult.accidentDetected) {

          throw new Error(
            "The received signals could not be validated as an accident."
          );

        }


        const severityResult =
          assessSeverity(signals);


        const bestHospital =
          findBestHospital(
            hospitalData,
            severityResult.severity
          );


        const nearestResponder =
          findNearestAvailableResponder(
            responderData
          );


        const newIncident = {

          ...signals,

          ...detectionResult,

          ...severityResult,

          hospital: bestHospital,

          responder: nearestResponder

        };


        setIncident(newIncident);


        localStorage.setItem(
          "lifelink_incident",
          JSON.stringify(newIncident)
        );


        setVictimStatus(null);

        setEscalation(null);


        localStorage.removeItem(
          "lifelink_victim_status"
        );


        setLoading(false);

      } catch (err) {

        console.error(
          "Incident processing error:",
          err
        );


        setError(
          "Unable to process the incident signal. Please try again."
        );


        setLoading(false);

      }

    }, 800);

  };


  /*
   * VICTIM RESPONSE
   */

  const handleVictimResponse = (status) => {

    setVictimStatus(status);


    localStorage.setItem(
      "lifelink_victim_status",
      status
    );


    if (status === "safe") {

      const cancelled =
        cancelEscalation();

      setEscalation(cancelled);

      return;

    }


    if (status === "no-response") {

      const newEscalation =
        createEscalation(responderData);

      setEscalation(newEscalation);

    }

  };


  /*
   * RESET
   */

  const handleResetIncident = () => {

    setIncident(null);

    setVictimStatus(null);

    setEscalation(null);

    setError("");


    localStorage.removeItem(
      "lifelink_incident"
    );

    localStorage.removeItem(
      "lifelink_victim_status"
    );

  };


  /*
   * ESCALATION STEPS
   */

  const escalationSteps =
    escalation
      ? getEscalationFlow(escalation)
      : [];


  /*
   * RESPONSE TRACKING TIMELINE
   */

  const responseEvents = [

    {
      title: "Accident detected",
      description:
        "Incident signal successfully validated.",
      time: incident
        ? "Completed"
        : ""
    },

    {
      title: "Location acquired",
      description:
        incident
          ? `GPS location: ${incident.location.latitude}, ${incident.location.longitude}`
          : "Waiting for incident location.",
      time: incident
        ? "Completed"
        : "Pending"
    },

    {
      title: "Hospital selected",
      description:
        incident?.hospital
          ? `${incident.hospital.name} selected based on emergency requirements.`
          : "Hospital selection pending.",
      time: incident?.hospital
        ? "Completed"
        : "Pending"
    },

    {
      title: "Contact notified",
      description:
        victimStatus === "no-response"
          ? "Emergency contact notification initiated."
          : victimStatus === "safe"
          ? "Escalation cancelled because victim responded."
          : "Waiting for victim confirmation.",
      time:
        victimStatus === "no-response"
          ? "Completed"
          : victimStatus === "safe"
          ? "Cancelled"
          : "Pending"
    },

    {
      title: "Responder assigned",
      description:
        escalation?.responder
          ? `${escalation.responder.name} assigned for emergency response.`
          : victimStatus === "safe"
          ? "Responder assignment cancelled."
          : "Waiting for escalation.",
      time:
        escalation?.assigned
          ? "Completed"
          : victimStatus === "safe"
          ? "Cancelled"
          : "Pending"
    }

  ];


  return (

    <div className="dashboard-page">


      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <p className="dashboard-label">
            EMERGENCY RESPONSE SYSTEM
          </p>

          <h1>
            LIFELINK Dashboard
          </h1>

          <p>
            Intelligent incident detection
            and emergency coordination.
          </p>

        </div>


        <StatusBadge
          status="System Active"
          type="success"
        />

      </div>



      {/* SIMULATION CONTROL */}

      <div className="emergency-action">

        <div>

          <h2>
            Incident Signal Simulation
          </h2>

          <p>
            Demo control: generate simulated
            incoming signals from authorized
            connected sources.
          </p>

        </div>


        <Button
          onClick={handleSimulateSignal}
          disabled={loading}
        >

          <Radio size={18} />

          {loading
            ? "Validating..."
            : "Simulate Incoming Signal"}

        </Button>

      </div>



      {/* ERROR */}

      {error && (

        <Card title="Processing Error">

          <div className="empty-state">

            <AlertTriangle size={40} />

            <h3>
              Something went wrong
            </h3>

            <p>
              {error}
            </p>

            <Button
              onClick={handleSimulateSignal}
            >
              Try Again
            </Button>

          </div>

        </Card>

      )}



      {/* LOADING */}

      {loading && (

        <Card title="Signal Validation">

          <div className="empty-state">

            <Activity size={40} />

            <h3>
              Validating incoming incident signals...
            </h3>

            <p>
              LIFELINK is analyzing the
              simulated signal set.
            </p>

          </div>

        </Card>

      )}



      {/* NO INCIDENT */}

      {!loading &&
        !incident &&
        !error && (

        <Card title="Waiting for Incident Signal">

          <div className="empty-state">

            <Radio size={40} />

            <h3>
              No active incident
            </h3>

            <p>
              Use the demo control to simulate
              an incoming incident signal.
            </p>

          </div>

        </Card>

      )}



      {/* INCIDENT */}

      {!loading &&
        incident &&
        incident.accidentDetected && (

        <>


          {/* SIGNAL SOURCE */}

          <Card title="Incident Signal Source">

            <div className="info-row">

              <Radio size={24} />

              <div>

                <strong>
                  Signal Source: {incident.signalSource}
                </strong>

                <p>
                  LIFELINK received simulated
                  signals representing data from
                  authorized connected sources.
                </p>

              </div>

            </div>


            <StatusBadge
              status="Simulated"
              type="info"
            />

          </Card>



          {/* MAIN GRID */}

          <div className="dashboard-grid">


            {/* VALIDATION */}

            <Card title="Signal Validation">

              <div className="info-row">

                <Activity size={22} />

                <div>

                  <strong>
                    Incident Signal Validated
                  </strong>

                  <p>
                    {incident.signalCount}
                    {" "}
                    signals indicate a
                    possible accident.
                  </p>

                </div>

              </div>


              <StatusBadge
                status="Validated"
                type="success"
              />

            </Card>



            {/* SEVERITY */}

            <Card title="Severity Assessment">

              <div className="info-row">

                <AlertTriangle size={22} />

                <div>

                  <strong>
                    {incident.severity}
                  </strong>

                  <p>
                    Confidence:
                    {" "}
                    {incident.confidence}%
                  </p>

                </div>

              </div>


              <StatusBadge
                status={incident.severity}
                type="danger"
              />


              <p className="assessment-text">

                {incident.reason}

              </p>

            </Card>



            {/* LOCATION */}

            <Card title="Incident Location">

              <div className="info-row">

                <MapPin size={22} />

                <div>

                  <strong>
                    Location: Simulated GPS
                  </strong>

                  <p>
                    Latitude:
                    {" "}
                    {incident.location.latitude}
                  </p>

                  <p>
                    Longitude:
                    {" "}
                    {incident.location.longitude}
                  </p>

                </div>

              </div>


              <StatusBadge
                status="Simulated"
                type="info"
              />

            </Card>



            {/* HOSPITAL */}

            <Card title="Recommended Hospital">

              {incident.hospital ? (

                <>

                  <div className="info-row">

                    <Hospital size={22} />

                    <div>

                      <strong>
                        {incident.hospital.name}
                      </strong>

                      <p>
                        {incident.hospital.distance}
                        {" "}
                        km away • Trauma Level
                        {" "}
                        {incident.hospital.traumaLevel}
                      </p>

                    </div>

                  </div>


                  <StatusBadge
                    status="Mock Data"
                    type="info"
                  />


                  <p className="assessment-text">

                    Specialties:
                    {" "}
                    {incident.hospital.specialties.join(
                      ", "
                    )}

                  </p>

                </>

              ) : (

                <div className="empty-state">

                  <Hospital size={32} />

                  <h3>
                    No suitable hospital found
                  </h3>

                  <p>
                    No available hospital matches
                    the emergency requirements.
                  </p>

                </div>

              )}

            </Card>



            {/* RESPONDER */}

            <Card title="Nearest Verified Responder">

              {incident.responder ? (

                <>

                  <div className="info-row">

                    <ShieldCheck size={22} />

                    <div>

                      <strong>
                        {incident.responder.name}
                      </strong>

                      <p>
                        {incident.responder.role}
                      </p>

                      <p>
                        {incident.responder.distance}
                        {" "}
                        km away
                      </p>

                    </div>

                  </div>


                  <StatusBadge
                    status="Available"
                    type="success"
                  />


                  <p className="assessment-text">

                    Selected automatically from
                    available verified responders.

                  </p>

                </>

              ) : (

                <div className="empty-state">

                  <ShieldCheck size={32} />

                  <h3>
                    No responder available
                  </h3>

                  <p>
                    No verified responder is
                    currently available.
                  </p>

                </div>

              )}

            </Card>


          </div>



          {/* MAP */}

          <Card title="Incident Location Map">

            <MapView
              latitude={
                incident.location.latitude
              }
              longitude={
                incident.location.longitude
              }
              hospitals={hospitalData}
              recommendedHospital={incident.hospital}
            />

          </Card>



          {/* SIGNAL SUMMARY */}

          <Card title="Received Signal Summary">

            <div className="signal-list">

              {incident.detectedSignals.map(
                (signal, index) => (

                  <div
                    className="signal-item"
                    key={index}
                  >

                    <span>
                      {signal}
                    </span>

                    <StatusBadge
                      status="Detected"
                      type="danger"
                    />

                  </div>

                )
              )}

            </div>

          </Card>



          {/* VICTIM CONFIRMATION */}

          <Card title="Victim Confirmation">

            {!victimStatus && (

              <EscalationFlow
                escalation={null}
                onSafe={() =>
                  handleVictimResponse("safe")
                }
                onNoResponse={() =>
                  handleVictimResponse(
                    "no-response"
                  )
                }
              />

            )}



            {victimStatus === "safe" && (

              <EscalationFlow
                escalation={escalation}
                steps={[]}
              />

            )}



            {victimStatus === "no-response" && (

              <EscalationFlow
                escalation={escalation}
                steps={escalationSteps}
              />

            )}

          </Card>



          {/* RESPONSE TIMELINE */}

          <Card title="Emergency Response Timeline">

            <ResponseTimeline
              events={responseEvents}
            />

          </Card>



          {/* RESPONSE STATUS */}

          <Card title="Emergency Response Status">

            <div className="info-row">

              <ShieldCheck size={22} />

              <div>

                <strong>

                  {victimStatus === "safe"
                    ? "Escalation cancelled"
                    : victimStatus === "no-response"
                    ? escalation?.assigned
                      ? "Responder assigned"
                      : "Emergency escalation active"
                    : "Awaiting victim confirmation"}

                </strong>

                <p>

                  {victimStatus === "safe"
                    ? "Victim confirmed safety. No emergency escalation was required."
                    : victimStatus === "no-response"
                    ? escalation?.assigned
                      ? "Emergency contact notified and verified responder assigned."
                      : "LIFELINK is processing the emergency escalation workflow."
                    : "Waiting for victim response before escalation."}

                </p>

              </div>

            </div>


            <StatusBadge
              status={
                victimStatus === "safe"
                  ? "Cancelled"
                  : victimStatus === "no-response"
                  ? "Escalating"
                  : "Awaiting Response"
              }
              type={
                victimStatus === "safe"
                  ? "default"
                  : victimStatus === "no-response"
                  ? "danger"
                  : "info"
              }
            />

          </Card>



          {/* PROTOTYPE NOTICE */}

          <Card title="Prototype Data Notice">

            <p className="assessment-text">

              Location: Simulated GPS

              <br />

              Signal Source: Simulated

              <br />

              Hospital Availability: Mock Data

              <br />

              Responder Availability: Mock Data

              <br />

              Dispatch: Simulation

            </p>

          </Card>



          {/* RESET */}

          <div className="modal-actions">

            <Button
              onClick={handleResetIncident}
            >
              Reset Demo Incident
            </Button>

          </div>


        </>

      )}



      {/* MODAL */}

      <Modal
        isOpen={showModal}
        title="Incoming Incident Signal"
        onClose={() =>
          setShowModal(false)
        }
      >

        <div className="modal-alert">

          <Radio size={40} />

          <h3>
            Simulated incident signal received
          </h3>

          <p>
            LIFELINK has received a simulated
            signal set from an authorized
            connected source.
          </p>

          <StatusBadge
            status="Simulation"
            type="info"
          />

        </div>


        <div className="modal-actions">

          <Button
            onClick={() =>
              setShowModal(false)
            }
          >
            Cancel
          </Button>


          <Button
            onClick={handleConfirmSignal}
            disabled={loading}
          >

            {loading
              ? "Validating..."
              : "Validate Signal"}

          </Button>

        </div>

      </Modal>


    </div>

  );

}


export default Dashboard;