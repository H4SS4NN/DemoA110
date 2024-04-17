import React from "react";
import DateDisplayComponent from "../../Resultat_location/Result_date";

const RecapFinale = ({ deliveryInfo ,  }) => {
  return (
    <div>
      <h2>Recapitulatif de votre location</h2>
      <DateDisplayComponent deliveryInfo={deliveryInfo} />
    </div>
  );
};

export default RecapFinale;
