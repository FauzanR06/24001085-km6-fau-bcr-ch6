import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCar, getCar } from "../../redux/actions/car";

import { Button, Form } from "react-bootstrap";

function EditCarComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { car } = useSelector((state) => state.car);

  const [name, setName] = useState("");
  const [cartype_id, setCartype_id] = useState("");
  const [manufacture_id, setManufacture_id] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getCar(navigate, id));
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (car) {
      setName(car.name);
      setCartype_id(car.cartype_id);
      setManufacture_id(car.manufacture_id);
      setRentPerDay(car.rentPerDay);
      setPhoto(car.photo);
    }
  }, [car]);

  const onSubmit = async (e) => {
    // console.log("Event object:", e);
    e.preventDefault();

    const confirm = window.confirm("Are you sure this data is correct?");
    if (confirm) {
      dispatch(
        editCar(
          id,
          navigate,
          name,
          cartype_id,
          rentPerDay,
          manufacture_id,
          photo,
          setIsLoading
        )
      );
      // toast.success(`Data is updated!`);
    }

    // dispatch(
    //   editCar(id, navigate, name, cartype_id, rentPerDay, manufacture_id, photo)
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Car Name's *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Car Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="cartype_id">
        <Form.Label>Car Type ID *</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Car Type"
          value={cartype_id}
          onChange={(e) => setCartype_id(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="manufacture_id">
        <Form.Label>Manufacture ID *</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Manufacture"
          value={manufacture_id}
          onChange={(e) => setManufacture_id(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="rentPerDay">
        <Form.Label>Rent Per Day *</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Rent Per Day"
          value={rentPerDay}
          onChange={(e) => setRentPerDay(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="photo" className="mb-3">
        <Form.Label>Photo (optional)</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-2 w-100">
        {isLoading ? "Processing..." : "Save"}
      </Button>
    </Form>
  );
}

export default EditCarComponent;
