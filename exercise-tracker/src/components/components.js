import React from "react";
import PopupToast from './popup-toast.component';
import Exercise from './exercise.component';

const Components = {
  popupToast: PopupToast,
  exercise: Exercise
}

// Imcoming Format
/*
  block = [
    componentType,
    data,
    arg
  ]

*/

const componentsList = block => {
    if (typeof Components[block.componentType] !== "undefined") {
      return React.createElement(Components[block.componentType], block
      /*
      return React.createElement(Components[block.component], {
        title: block.title, 
        message: block.message,
        keyid: block.keyid,
      }
      */
      );
    }
    return React.createElement(
      () => <div>The component {block.component} is not available.</div>
    );
  };

export default componentsList;