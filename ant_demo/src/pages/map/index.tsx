import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import NewFacilityForm from "@/components/NewFacilityForm"
import { Button } from 'antd';

const AnyReactComponent = ({text}: any) => <div><Button>View Detail</Button></div>;
const APIKEY = "AIzaSyDzbER3z58Yod9AMiD0h1rGQHSYsLUmr10"

const MapMarker = ({text}: any) => {
  const [clicked, setclicked] = useState(false);
  // let element;
  // if (clicked == false) {
  //   element = <NewFacilityForm/>
  // }
  // else{
  //   element = <AnyReactComponent/>
  // }


  return(

    <div onClick={() => setclicked(true)}>
      <NewFacilityForm/>
    </div>
  )
  

}

const map = (props: any) => {
    const [center, setCenter] = useState({lat: 42.29553272103043, lng: -83.70988601483924 });
    const [zoom, setZoom] = useState(15);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIKEY }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <MapMarker
            lat={42.29469180081549}
            lng={-83.70942565331833}
          />
          <MapMarker
            lat={42.29300025249362}
            lng={-83.7154052233735}
          />
        </GoogleMapReact>
      </div>
    );
}

export default map;