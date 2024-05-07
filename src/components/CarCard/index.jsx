import { Col, Card, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <Col md={4} as={Link} to={`/cars/${car?.id}`}>
      <Card>
        <Card.Header>{car?.name}</Card.Header>
        <Card.Body>
          {car?.photo && (
            <Image src={car?.photo} className="img-fluid" rounded />
          )}

          <div className={car?.photo && "mt-4"}>
            <h5>{car?.name}</h5>
            <h6>{car?.class?.name}</h6>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

CarCard.propTypes = {
  car: PropTypes.object,
};

export default CarCard;
