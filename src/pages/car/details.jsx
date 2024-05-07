import { useEffect } from "react";
import { Row, Col, Card, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCar } from "../../redux/actions/car";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { car } = useSelector((state) => state.car);

  useEffect(() => {
    // get car details by params id
    dispatch(getCar(navigate, id));
  }, [dispatch, id, navigate]);

  return (
    <Row>
      <Col md={6} className="offset-md-3">
        <Card>
          <Card.Header>{car?.name}</Card.Header>
          <Card.Body>
            <Form>
              {!car ? (
                <>
                  <h2>Loading...</h2>
                </>
              ) : (
                <>
                  {car?.photo && (
                    <Image src={car?.photo} className="img-fluid" rounded />
                  )}

                  <div className={car?.photo && "mt-4"}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" value={car?.name} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Class</Form.Label>
                      <Form.Control type="text" value={car?.name} disabled />
                    </Form.Group>
                  </div>
                </>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
