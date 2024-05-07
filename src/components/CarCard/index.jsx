import { Col, Card, Image, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCar } from "../../redux/actions/car";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getCars());
  // }, [dispatch]);

  return (
    <Col md={4}>
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
          <Button
            variant="outline-success"
            as={Link}
            to={`/cars/${car?.id}`}
            className="w-100 mb-3"
          >
            Detail Data
          </Button>
          {user?.role == "admin" && (
            <>
              <Button
                variant="outline-success"
                as={Link}
                to={`/cars/edit/${car?.id}`}
                className="w-100 mb-3"
              >
                Edit Data
              </Button>
              <Button
                variant="outline-danger"
                as={Link}
                to={`/cars/${car?.id}`}
                className="w-100 mb-3"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm("Are you sure want to delete this car?")) {
                    dispatch(deleteCar(car?.id));
                  }
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

CarCard.propTypes = {
  car: PropTypes.object,
};

export default CarCard;
