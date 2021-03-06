import React, { useState} from 'react';
import Toast from 'react-bootstrap/Toast'


const PopupToast = props => {
    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);
   // const [toastDelay] = useState(2000);
   // const [toastCreated] = useState(new Date().getTime());
   // const [toastUpdated, setToastUpdated] = useState(new Date().getTime());
   // const [basicData, setBasicData] = useState(100);
    //const [componentMounted, setComponentMounted] = useState(false);

    /*
    function updateTimer(){
        setToastUpdated(new Date().getTime());
        let timePassed = toastUpdated - toastCreated;
        let timeRemaining;
        if (timePassed >= 2000){
            timeRemaining = 0;
        } else {
            timeRemaining = 2000 - timePassed;
        }
        setToastDelay(timeRemaining);
    }
    */

    /*
    useEffect(() => {
        //setToastUpdated(new Date().getTime());
        //setBasicData(toastUpdated - toastCreated)
    }, []);
    
    
    useEffect(() => {
        if(toastDelay >= (toastUpdated - toastCreated)){
           //setShowA(!showA); // NOT WORKING, useCallBack maybe?
        }
    }, []);
    */

    /*
    useEffect(() => {
        if (componentMounted) {
            setComponentMounted(true);
            
            const timer = setTimeout(() => {
                setShowA(!showA)
            }, 2000);
            return () => clearTimeout(timer);
        }
        setBasicData(basicData + 1);
    }, [basicData, showA]);
    */


    // delay={toastDelay >= (toastUpdated - toastCreated) ? (toastDelay - (toastUpdated - toastCreated)) : 0 }

    return React.createElement(() =>
        <Toast key={props.data.keyid.toString()} show={showA} onClose={toggleShowA} animation={false} autohide>
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
