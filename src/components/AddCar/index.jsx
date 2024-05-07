import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCar } from "../../redux/actions/car";

import { Button, Form } from "react-bootstrap";

function AddCarComponents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [cartype_id, setCartype_id] = useState("");
  const [manufacture_id, setManufacture_id] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      addCar(
        navigate,
        name,
        cartype_id,
        rentPerDay,
        manufacture_id,
        photo,
        setIsLoading
      )
    );
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="id">
        <Form.Label>Car Name's *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Car Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="plate">
        <Form.Label>Car Type ID *</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Car Type"
          value={cartype_id}
          onChange={(e) => setCartype_id(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="capacity">
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

      <Form.Group controlId="image" className="mb-3">
        <Form.Label>Photo (optional)</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="mt-2 w-100"
        disabled={isLoading}
        onClick={() => {
          const confirm = window.confirm("Are you sure this data is correct?");
          if (confirm) {
            onSubmit();
          }
        }}
      >
        {isLoading ? "Processing..." : "Save"}
      </Button>
    </Form>
  );
}

export default AddCarComponents;
