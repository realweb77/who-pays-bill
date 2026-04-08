import { useContext, useRef, useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";

import { MyContext } from "../context";

const Stage1 = () => {
  const textinput = useRef();
  const context = useContext(MyContext);
  const [error, setError] = useState([false, ''])

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textinput.current.value;
    const validate = validateInput(value);

    /// Validation
    if (validate) {
      setError([false, ''])
      context.addPlayer(value);
      textinput.current.value = "";
    }
  }

  const validateInput = (value) => {
    if (value === '') {
      setError([true, 'Sorry, you need to add something'])
      return false;
    }
    if (value.length <= 2) {
      setError([true, 'Sorry, you need 3 char at least'])
      return false

    }

    return true;

  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add player name"
            name="player"
            ref={textinput}
          />
        </Form.Group>

        {error[0] ?
          <Alert>
            {error[1]}
          </Alert>
          : null}


        <Button className="miami" variant="primary" type="submit">
          Add Player
        </Button>
        {context.players && context.players.length > 0 ?
          <>
            <hr />
            <div>
              <ul className="list-group">
                {context.players.map((players, idx) => (
                  <li key={idx} className="list-group-item
            d-flex justify-content-between 
            align-items-center
            list-group-item-action">
                    {players}
                    <span
                      className="badge badge-danger"
                      onClick={()=>context.removePlayer(idx)}

                    >
                      x
                    </span>

 
                  </li>



                ))}
              </ul>

            </div>
            <div
              className="action_button"
              onClick={()=> context.next()}
            >
                NEXT
            </div>
          </>
          : null}








      </Form>
    </>
  )
}

export default Stage1;