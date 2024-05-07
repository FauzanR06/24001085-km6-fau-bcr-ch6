import { useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCars } from "../../redux/actions/car";
import CarCard from "../../components/CarCard";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const { cars } = useSelector((state) => state.car);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  return (
    <>
      <div style={{ backgroundColor: "" }}>
        {user?.role == "admin" && (
          <>
            <Button
              variant="outline-success"
              as={Link}
              to={"/cars/add"}
              className="w-100 mb-3"
            >
              Add Car
            </Button>
          </>
        )}
        <Row>
          {cars.length > 0 &&
            cars.map((car) => <CarCard key={car?.id} car={car} />)}
        </Row>
      </div>
    </>
  );
};

export default Home;
