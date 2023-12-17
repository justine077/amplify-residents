/* eslint-disable react/prop-types */

import Residents from "../pages/residents";
import {
  fetchResidents,
  countResidents,
  countMaleResidents,
  countFemaleResidents,
  countAllAddresses,
} from "../context/residentServices/residentServices";

// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IoIosPeople, IoIosPerson } from "react-icons/io";
import { SlUserFemale } from "react-icons/sl";
import { FaHouseChimney } from "react-icons/fa6";

function Dashboard() {
  const [residents, setResidents] = useState([]);
  const maleResidents = countMaleResidents(residents);
  const femaleResidents = countFemaleResidents(residents);
  const totalAllAddresses = countAllAddresses(residents);

  useEffect(() => {
    // Fetch residents when the component mounts
    fetchResidents(setResidents);
  }, []);

  const totalResidents = countResidents(residents);
  return (
    <div>
      {/* <ResidentList residents={residents} /> */}
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="12">
                    <div className="icon-big text-center icon-warning ">
                      {/* <p className="card-category">Total Residents</p> */}

                      <IoIosPeople
                        size={50}
                        className="nc-icon nc-favourite-28 text-primary"
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer className="bg-dark text-center w-100">
                <Card.Title as="h4" className="text-white bg-dark p-1 mt-2">
                  <span>{totalResidents}</span>
                </Card.Title>
                <div className="stats">Total Residents</div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="12">
                    <div className="icon-big text-center icon-warning ">
                      {/* <p className="card-category">Total Residents</p> */}

                      <IoIosPerson
                        size={50}
                        className="nc-icon nc-favourite-28 text-primary"
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer className="bg-dark text-center w-100">
                <Card.Title as="h4" className="text-white bg-dark p-1 mt-2">
                  <span>{maleResidents}</span>
                </Card.Title>
                <div className="stats">Total Male</div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="12">
                    <div className="icon-big text-center icon-warning ">
                      {/* <p className="card-category">Total Residents</p> */}

                      <SlUserFemale
                        size={50}
                        className="nc-icon nc-favourite-28 text-primary"
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer className="bg-dark text-center w-100">
                <Card.Title as="h4" className="text-white bg-dark p-1 mt-2">
                  <span>{femaleResidents}</span>
                </Card.Title>
                <div className="stats">Total Female</div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="12">
                    <div className="icon-big text-center icon-warning ">
                      {/* <p className="card-category">Total Residents</p> */}

                      <FaHouseChimney
                        size={50}
                        className="nc-icon nc-favourite-28 text-primary"
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer className="bg-dark text-center w-100">
                <Card.Title as="h4" className="text-white bg-dark p-1 mt-2">
                  <span> {totalAllAddresses}</span>
                </Card.Title>
                <div className="stats">Total Households</div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Resident List</Card.Title>
                <p className="card-category">
                  All residents that were registered
                </p>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="12">
                    <Residents />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
