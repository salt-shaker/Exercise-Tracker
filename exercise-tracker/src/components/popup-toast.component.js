import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast'


const PopupToast = props => {
const [showA, setShowA] = useState(true);
const toggleShowA = () => setShowA(!showA);

    
return React.createElement(() =>
                <Toast key={props.data.keyid.toString()} show={showA} onClose={toggleShowA} delay={2000} animation={false} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                        />
                        <strong className="mr-auto">{props.data.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{props.data.message}</Toast.Body>
                </Toast>
    )
}


export default PopupToast;
